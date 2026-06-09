'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useFormValidation } from './hooks/useFormValidation';
import { YourController } from './YourController';

const ToastComponent = {
  success: (message) => {
    console.log('✅ Success:', message);
  },
  error: (message) => {
    console.error('❌ Error:', message);
  },
};

export default function RegistrationForm({
  center,
  service = 'IVF',
  internal = false,
}) {
  const [formData, setFormData] = useState({
    firstName: '',
    mobileNo: '',
    gender: '',
    age: '',
    consent: true,
    otp: '',
  });

  const [formState, setFormState] = useState({
    loading: false,
    error: '',
    otpSent: false,
    otpVerified: false,
    recaptchaVerified: true, // Disabled for development
    showOtpInput: false,
    showRecaptcha: false, // Disabled for development
  });

  const [ageOptions, setAgeOptions] = useState([]);
  const [randomOtp, setRandomOtp] = useState(null);
  const inputRefs = useRef([]);

  const { isFormValid } = useFormValidation(formData, formState);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const utmParams = {
      utmSource: urlParams.get('utm_source') || '',
      utmMedium: urlParams.get('utm_medium') || '',
      utmCampaign: urlParams.get('utm_campaign') || '',
      utmTerm: urlParams.get('utm_term') || '',
      utmContent: urlParams.get('utm_content') || '',
      gclid: urlParams.get('gclid') || '',
      fbclid: urlParams.get('fbclid') || '',
      campaignid: urlParams.get('campaignid') || '',
      adgroupid: urlParams.get('adgroupid') || '',
      device: urlParams.get('device') || '',
      devicemodel: urlParams.get('devicemodel') || '',
      matchtype: urlParams.get('matchtype') || '',
    };

    const filtered = Object.fromEntries(
      Object.entries(utmParams).filter(([, v]) => v)
    );

    if (Object.keys(filtered).length > 0) {
      localStorage.setItem('utmParams', JSON.stringify(filtered));
    }
  }, []);

  useEffect(() => {
    if (formState.showOtpInput && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [formState.showOtpInput]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'mobileNo') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, mobileNo: numericValue }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === 'gender') {
      if (value === 'Male') {
        setAgeOptions([...Array(21).keys()].map(i => 25 + i));
      } else if (value === 'Female') {
        setAgeOptions([...Array(26).keys()].map(i => 20 + i));
      } else {
        setAgeOptions([]);
      }
      setFormData(prev => ({ ...prev, age: '' }));
    }
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d$/.test(value) && value !== '') return;

    const otpArray = formData.otp.split('');
    otpArray[index] = value;

    setFormData(prev => ({
      ...prev,
      otp: otpArray.join(''),
    }));

    if (value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const otpArray = formData.otp.split('');

      if (otpArray[index]) {
        otpArray[index] = '';
        setFormData(prev => ({
          ...prev,
          otp: otpArray.join(''),
        }));
      } else if (inputRefs.current[index - 1]) {
        otpArray[index - 1] = '';
        setFormData(prev => ({
          ...prev,
          otp: otpArray.join(''),
        }));
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSendOtp = async () => {
    if (!formData.firstName?.trim()) {
      setFormState(prev => ({ ...prev, error: 'Please enter your name' }));
      return;
    }

    if (formData.firstName.trim().length < 3) {
      setFormState(prev => ({ ...prev, error: 'Name must be at least 3 characters' }));
      return;
    }

    if (!formData.gender) {
      setFormState(prev => ({ ...prev, error: 'Please select gender' }));
      return;
    }

    if (!formData.age) {
      setFormState(prev => ({ ...prev, error: 'Please select age' }));
      return;
    }

    if (formData.mobileNo.length < 10) {
      setFormState(prev => ({ ...prev, error: 'Please enter a valid mobile number' }));
      return;
    }

    setFormData(prev => ({ ...prev, otp: '' }));

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setRandomOtp(otp);

    setFormState(prev => ({ ...prev, otpSent: true, error: '', loading: true }));

    try {
      const response = await new YourController().sendOtp({
        mobile: '+91' + formData.mobileNo,
        otp_val: otp,
      });

      if (response.ok) {
        setFormState(prev => ({
          ...prev,
          showOtpInput: true,
          error: '',
        }));

        ToastComponent.success('OTP sent successfully!');

        setTimeout(() => {
          setFormState(prev => ({ ...prev, otpSent: false }));
        }, 30000);
      } else {
        setFormState(prev => ({
          ...prev,
          error: 'Failed to send OTP. Please try again.',
        }));
      }
    } catch (error) {
      console.error('OTP Error:', error);
      setFormState(prev => ({
        ...prev,
        error: 'Failed to send OTP. Please try again.',
      }));
    } finally {
      setFormState(prev => ({ ...prev, loading: false }));
    }
  };

  const handleVerifyOtp = () => {
    if (randomOtp === formData.otp) {
      setFormState(prev => ({
        ...prev,
        otpVerified: true,
        showRecaptcha: false, // Disabled - skip reCAPTCHA
        error: '',
      }));
      ToastComponent.success('OTP verified successfully! Select "Get a Call Back" to submit.');
    } else {
      setFormState(prev => ({
        ...prev,
        otpVerified: false,
        error: '❌ Invalid OTP. Please try again.',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      setFormState(prev => ({
        ...prev,
        error: 'Please complete all required fields and verifications.',
      }));
      return;
    }

    setFormState(prev => ({ ...prev, loading: true }));

    try {
      const utmParams = localStorage.getItem('utmParams')
        ? JSON.parse(localStorage.getItem('utmParams'))
        : {};

      const submitData = {
        timestamp: new Date().toISOString(),
        firstName: formData.firstName,
        mobileNo: '+91' + formData.mobileNo,
        gender: formData.gender,
        age: formData.age,
        consent: formData.consent,
        center: center?.center_name || 'India',
        service,
        ...utmParams,
      };

      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'formSubmission',
          phone_number: '+91' + formData.mobileNo,
          form_type: 'registration',
        });
      }

      const controller = new YourController();

      await controller.submitLeadForm(submitData);
      await controller.submitForm(submitData);

      ToastComponent.success('Thank you for showing interest. Our executive will get back to you shortly.');

      setFormData({
        firstName: '',
        mobileNo: '',
        gender: '',
        age: '',
        consent: true,
        otp: '',
      });

      setFormState({
        loading: false,
        error: '',
        otpSent: false,
        otpVerified: false,
        recaptchaVerified: false,
        showOtpInput: false,
        showRecaptcha: false,
      });

      localStorage.removeItem('utmParams');

      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.location.href = '/thank-you';
        }
      }, 1500);
    } catch (error) {
      console.error('Submission error:', error);
      setFormState(prev => ({
        ...prev,
        error: 'Failed to submit form. Please try again.',
      }));
      ToastComponent.error('Failed to submit form. Please try again.');
    } finally {
      setFormState(prev => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="relative w-full max-w-sm mx-auto rounded-[20px] bg-blue-100 z-[8] mb-10 md:mt-10">
      {/* Header */}
      <div className="flex justify-center -mt-6">
        <div className="bg-[url('/images/lp/maxlp/orange-bg.png')] bg-cover bg-no-repeat bg-center h-[44px] w-full max-w-[240px] flex flex-col items-center justify-center rounded-t-[20px]">
          <div className="text-center">
            <h1 className="text-white text-[16px] font-semibold leading-tight">
              Free Consultation
            </h1>
            <p className="text-[10px] font-normal text-white">with senior {['ivf', 'iui', 'fertility'].includes(service?.toLowerCase()) ? service : 'IVF'} Specialist</p>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-8">
        {/* EMI Text */}
        <div className="text-center text-[#5E2671] text-[13px] font-bold mt-2 mb-4">
          Get 0% interest on EMI
          <br />
          <span className="">Starting ₹4,999* p/m</span>
        </div>

        {/* Error Message */}
        {formState.error && (
          <div className="mt-2 flex justify-center">
            <p className="text-red-500 text-[14px] text-center font-medium">{formState.error}</p>
          </div>
        )}

        {/* Form Fields */}
        <div className="mt-4 space-y-4 px-2">
          {/* Full Name */}
          <div className="flex items-center border-b border-[#5E2671] pb-1">
            <img
              src="/images/lp/maxlp/profile-orange.png"
              alt="Profile"
              className="w-[20px] h-[20px] mr-4 object-contain"
            />
            <div className="w-full">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.firstName}
                onChange={handleInputChange}
                name="firstName"
                disabled={formState.loading}
                className="w-full bg-transparent text-[#333333] placeholder-[#333333] placeholder:text-[16px] outline-none mt-2 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Gender & Age */}
          <div className="flex gap-3 pt-2">
            <div className="flex-1">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                disabled={formState.loading}
                className="w-full bg-transparent text-[#5E2671] outline-none border-b border-[#5E2671] pb-1 text-[14px] disabled:opacity-50"
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="flex-1">
              <select
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                disabled={!formData.gender || formState.loading}
                className="w-full bg-transparent text-[#5E2671] outline-none border-b border-[#5E2671] pb-1 text-[14px] disabled:opacity-50"
              >
                <option value="">Age</option>
                {ageOptions.map(age => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Number */}
          <div className="flex items-center border-b border-[#5E2671] pb-1 relative pt-2">
            <img
              src="/images/lp/maxlp/flag.png"
              alt="India Flag"
              className="w-[20px] h-[20px] mr-2 object-contain"
            />
            <span className="text-[#333333] font-bold text-[14px] md:text-[16px] mr-2">+91</span>
            <div className="w-[1px] mr-2 h-6 bg-[#333333]"></div>
            <div className="flex-1">
              <input
                type="tel"
                placeholder="Mobile Number"
                value={formData.mobileNo}
                onChange={handleInputChange}
                name="mobileNo"
                maxLength="10"
                disabled={formState.loading}
                className="w-full bg-transparent text-[#333333] placeholder-[#333333] placeholder:font-bold placeholder:text-[14px] md:placeholder:text-[16px] outline-none py-1 disabled:opacity-50"
              />
            </div>
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={formState.otpSent || formState.loading}
              className={`ml-2 px-2 py-1 text-xs font-bold rounded ${
                formState.otpSent || formState.loading
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-red-600'
              }`}
            >
              {formState.loading ? 'SENDING...' : 'SEND OTP'}
            </button>
          </div>

          {/* OTP Input */}
          {formState.showOtpInput && (
            <div className="flex gap-2 pt-2 items-center">
              {Array(4).fill(0).map((_, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  maxLength={1}
                  inputMode="numeric"
                  className="w-10 h-10 text-center text-lg border border-[#5E2671] rounded outline-none bg-transparent text-[#5E2671]"
                  value={formData.otp[index] || ''}
                  onChange={e => handleOtpChange(e.target.value, index)}
                  onKeyDown={e => handleKeyDown(e, index)}
                />
              ))}
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="ml-2 px-3 py-1 text-xs font-bold bg-primary text-white rounded hover:bg-red-600"
              >
                VERIFY
              </button>
            </div>
          )}

          {/* Call Back Button */}
          <div className="w-full flex justify-center !mt-8 !mb-2">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={formState.loading || !isFormValid}
              className={`${formState.loading || !isFormValid
                ? 'bg-secondary cursor-not-allowed opacity-70'
                : 'bg-secondary hover:bg-[#d06a28]'
                } text-white font-semibold py-2 w-full rounded-full flex flex-col items-center justify-center transition-colors duration-200`}
            >
              {formState.loading ? (
                <p className="text-[16px] sm:text-[23px] leading-tight">
                  Submitting...
                </p>
              ) : (
                <>
                  <p className="text-[16px] sm:text-[23px] leading-tight">
                    Get a Call Back
                  </p>
                  <div className="flex items-center justify-center">
                    <img src="/images/lp/maxlp/call icon.png" className="mr-2" width="14" height="14" />
                    <span className="font-normal text-[14px]">Within 1 min</span>
                  </div>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="py-4 text-[#2B5F8A] flex items-start gap-3 text-sm">
          <img src="/images/lp/maxlp/shield.png" className="" width={29} height={31} />
          <span className="text-[12px]">
            We keep your data <strong>100% safe</strong>. By submitting, you accept our{" "}
            <span className="font-semibold cursor-pointer">Terms and Conditions</span>
          </span>
        </div>
      </div>
    </div>
  );
}
