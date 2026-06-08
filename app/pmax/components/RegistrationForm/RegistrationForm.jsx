'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useFormValidation } from './hooks/useFormValidation';
import { YourController } from './YourController';

const ToastComponent = {
  success: (message) => {
    console.log('✅ Success:', message);
    alert(message);
  },
  error: (message) => {
    console.error('❌ Error:', message);
    alert(message);
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
    recaptchaVerified: false,
    showOtpInput: false,
    showRecaptcha: false,
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

    if (formData.mobileNo.length < 10) {
      setFormState(prev => ({ ...prev, error: 'Please enter a valid mobile number' }));
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
        showRecaptcha: true,
        error: '',
      }));
      ToastComponent.success('OTP verified successfully!');
    } else {
      setFormState(prev => ({
        ...prev,
        otpVerified: false,
        error: '❌ Invalid OTP. Please try again.',
      }));
    }
  };

  const handleRecaptchaSuccess = () => {
    setFormState(prev => ({
      ...prev,
      recaptchaVerified: true,
    }));
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

      ToastComponent.success('Thank you! Our team will contact you shortly.');

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
    <div className="hidden md:block relative max-w-sm mx-auto rounded-[20px] bg-blue-100 z-10 mt-10">
      {/* Header */}
      <div className="flex justify-center -mt-6">
        <div className="bg-[url('/images/lp/maxlp/orange-bg.png')] bg-cover bg-no-repeat bg-center h-[44px] w-full max-w-[240px] flex flex-col items-center justify-center rounded-t-[20px]">
          <div className="text-center">
            <h1 className="text-white text-[16px] font-bold leading-tight">
              Free Consultation
            </h1>
            <p className="text-[10px] font-normal text-white">with senior {['ivf', 'iui', 'fertility'].includes(service?.toLowerCase()) ? service : 'IVF'} Specialist</p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {formState.error && (
        <div className="absolute top-[187px] left-12 z-20">
          <p className="text-red-500 text-[14px] font-medium bg-white px-2 py-1 rounded shadow-lg">{formState.error}</p>
        </div>
      )}

      <div className="px-6">
        {/* Form Fields */}
        <div className="mt-4 space-y-2 px-1">
          {/* Full Name */}
          <div className="flex items-center border-b border-[#5E2671] pb-1 mb-4">
            <img
              src="/images/lp/maxlp/profile-orange.png"
              alt="Profile"
              className="w-[32px] h-[32px] mr-4 object-contain"
            />
            <div className="w-full">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.firstName}
                onChange={handleInputChange}
                name="firstName"
                disabled={formState.loading}
                className="w-full bg-transparent text-[#5E2671] placeholder-primary placeholder:font-bold placeholder:text-[14px] outline-none py-1 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Gender & Age */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                disabled={formState.loading}
                className="w-full bg-transparent text-[#5E2671] placeholder:text-primary placeholder:font-bold outline-none border-b border-[#5E2671] pb-1 text-[14px] disabled:opacity-50"
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
                className="w-full bg-transparent text-[#5E2671] placeholder:text-primary placeholder:font-bold outline-none border-b border-[#5E2671] pb-1 text-[14px] disabled:opacity-50"
              >
                <option value="">Age</option>
                {ageOptions.map(age => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Number */}
          <div className="flex items-center border-b border-[#5E2671] pb-1 relative mb-3">
            <img
              src="/images/lp/maxlp/flag.png"
              alt="India Flag"
              className="w-[32px] h-[32px] mr-2 object-contain"
            />
            <span className="text-primary font-bold text-[14px] mr-2">+91</span>
            <div className="w-[1px] mr-2 h-6 bg-primary"></div>
            <div className="flex-1">
              <input
                type="tel"
                placeholder="Mobile Number"
                value={formData.mobileNo}
                onChange={handleInputChange}
                name="mobileNo"
                maxLength="10"
                disabled={formState.loading}
                className="w-full bg-transparent text-[#5E2671] placeholder-primary placeholder:font-bold placeholder:text-[14px] outline-none py-1 disabled:opacity-50"
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
            <div className="flex gap-2 mb-3 items-center">
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

          {/* reCAPTCHA */}
          {formState.showRecaptcha && (
            <div className="mb-3 p-2 border border-[#5E2671] rounded bg-transparent">
              <button
                type="button"
                onClick={handleRecaptchaSuccess}
                className="w-full py-1 bg-primary text-white rounded text-sm font-bold hover:bg-red-600"
              >
                ✓ I'm not a robot
              </button>
            </div>
          )}

          {/* Consent */}
          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              name="consent"
              id="consent"
              checked={formData.consent}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label htmlFor="consent" className="text-[12px] text-[#5E2671]">
              I consent Oasis Fertility to contact me
            </label>
          </div>

          {/* Call Back Button */}
          <div className="hidden md:flex w-full justify-center !mt-4 !mb-1">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={formState.loading || !isFormValid}
              className={`${formState.loading || !isFormValid
                ? 'bg-secondary cursor-not-allowed opacity-70'
                : 'bg-secondary hover:bg-[#d06a28]'
                } text-white font-bold py-2 px-[10px] w-[280px] rounded-full flex items-center justify-between transition-colors duration-200`}
            >
              {formState.loading ? (
                <p className="text-[18px] leading-tight w-full text-center">
                  Submitting...
                </p>
              ) : (
                <>
                  <p className="text-[18px] ml-6 leading-tight">
                    Get a Call Back
                  </p>
                  <span className="bg-white text-[#E8772E] font-medium text-[12px] px-2 py-0.5 rounded-full">Within 1 min</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="py-2 text-gray-600 flex items-start gap-2 text-sm">
          <img src="/images/lp/maxlp/shield.png" className="ml-[16px]" width={20} height={20} />
          <span className="text-[11px] text-[#2B5F8A]">
            We keep your data <strong>100% safe</strong>. By submitting, you accept our{" "}
            <span className="cursor-pointer font-semibold">Terms and Conditions</span>
          </span>
        </div>
      </div>
    </div>
  );
}
