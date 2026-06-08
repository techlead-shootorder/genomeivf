'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useFormValidation } from './hooks/useFormValidation';
import { YourController } from './YourController';
import Image from 'next/image';

// Toast Component (simple implementation)
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
  // STATE MANAGEMENT
  const [formData, setFormData] = useState({
    firstName: '',
    mobileNo: '+91',
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

  // HOOKS & VALIDATION
  const { isFormValid, validateField, getFieldError } = useFormValidation(formData, formState);

  // EFFECTS
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
      location_interest_ms: urlParams.get('location_interest_ms') || '',
      location_physical_ms: urlParams.get('location_physical_ms') || '',
    };

    const filtered = Object.fromEntries(
      Object.entries(utmParams).filter(([, v]) => v)
    );

    if (Object.keys(filtered).length > 0) {
      localStorage.setItem('utmParams', JSON.stringify(filtered));
    }
  }, []);

  // EVENT HANDLERS
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'mobileNo') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({
        ...prev,
        mobileNo: '+91' + numericValue,
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Update age options when gender changes
    if (name === 'gender') {
      if (value === 'Male') {
        setAgeOptions([...Array(21).keys()].map(i => 25 + i)); // 25-45
      } else if (value === 'Female') {
        setAgeOptions([...Array(26).keys()].map(i => 20 + i)); // 20-45
      } else {
        setAgeOptions([]);
      }
      // Reset age when gender changes
      setFormData(prev => ({
        ...prev,
        age: '',
      }));
    }
  };

  // OTP Input Handler
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

  // OTP Backspace Handler
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

  // Send OTP
  const handleSendOtp = async () => {
    // Validation
    if (!formData.firstName?.trim()) {
      setFormState(prev => ({ ...prev, error: 'Please enter your name' }));
      return;
    }

    if (formData.firstName.trim().length < 3) {
      setFormState(prev => ({ ...prev, error: 'Name must be at least 3 characters' }));
      return;
    }

    if (formData.mobileNo.length < 13) {
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

    // Clear OTP
    setFormData(prev => ({ ...prev, otp: '' }));

    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setRandomOtp(otp);

    // Send OTP via API
    setFormState(prev => ({ ...prev, otpSent: true, error: '', loading: true }));

    try {
      const response = await new YourController().sendOtp({
        mobile: formData.mobileNo,
        otp_val: otp,
      });

      if (response.ok) {
        setFormState(prev => ({
          ...prev,
          showOtpInput: true,
          error: '',
        }));

        ToastComponent.success('OTP sent successfully!');

        // Disable button for 30 seconds
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

  // Verify OTP
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

  // reCAPTCHA Success (mock)
  const handleRecaptchaSuccess = () => {
    setFormState(prev => ({
      ...prev,
      recaptchaVerified: true,
    }));
  };

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation
    if (!isFormValid) {
      setFormState(prev => ({
        ...prev,
        error: 'Please complete all required fields and verifications.',
      }));
      return;
    }

    setFormState(prev => ({ ...prev, loading: true }));

    try {
      // Get UTM params from localStorage
      const utmParams = localStorage.getItem('utmParams')
        ? JSON.parse(localStorage.getItem('utmParams'))
        : {};

      // Build submission payload
      const submitData = {
        timestamp: new Date().toISOString(),
        firstName: formData.firstName,
        mobileNo: formData.mobileNo,
        gender: formData.gender,
        age: formData.age,
        consent: formData.consent,
        center: center?.center_name || 'India',
        service,
        ...utmParams,
        referralUrl: typeof document !== 'undefined' ? document.referrer || window.location.href : '',
        pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      };

      // Push to GTM
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'formSubmission',
          phone_number: formData.mobileNo,
          form_type: 'registration',
        });
      }

      // Submit to APIs
      const controller = new YourController();

      // Submit to Salesforce Lead API
      await controller.submitLeadForm(submitData);

      // Also submit to our local form API for backup
      await controller.submitForm(submitData);

      ToastComponent.success('Thank you! Our team will contact you shortly.');

      // Reset form
      setFormData({
        firstName: '',
        mobileNo: '+91',
        gender: '',
        age: '',
        consent: true,
        otp: '',
      });

      // Reset state
      setFormState({
        loading: false,
        error: '',
        otpSent: false,
        otpVerified: false,
        recaptchaVerified: false,
        showOtpInput: false,
        showRecaptcha: false,
      });

      // Clear localStorage
      localStorage.removeItem('utmParams');

      // Redirect
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

  // RENDER
  return (
    <div className="rounded-[27px] bg-cover bg-center bg-[#f3c1d7] overflow-hidden relative">
      <p className="text-white mb-4 bg-primary text-center py-2 text-[18px] sm:text-[22px] font-bold">
        FREE CONSULTATION
      </p>

      <form onSubmit={handleSubmit} className="px-4 lg:px-5 xl:px-6">

        {/* Full Name Input */}
        <div className="relative mb-3 xl:mb-4">
          <input
            type="text"
            id="fullName"
            name="firstName"
            placeholder="Full Name"
            className="w-full p-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.firstName}
            onChange={handleInputChange}
            maxLength={24}
          />
          {formState.error && !formData.firstName && (
            <span className="absolute right-3 top-3 text-red-500">*</span>
          )}
        </div>

        {/* Gender & Age Selects */}
        <div className="flex space-x-4 mb-3 xl:mb-4">
          <div className="relative w-1/2">
            <select
              id="gender"
              name="gender"
              className="w-full p-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formData.gender}
              onChange={handleInputChange}
              aria-label="gender"
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="relative w-1/2">
            <select
              id="age"
              name="age"
              className="w-full p-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-200"
              value={formData.age}
              onChange={handleInputChange}
              disabled={!formData.gender}
              aria-label="age"
            >
              <option value="">Age</option>
              {ageOptions.map(age => (
                <option key={age} value={age}>
                  {age}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Mobile Number Input with Send OTP Button */}
        <div className="relative mb-3 xl:mb-4">
          <input
            type="text"
            id="phone"
            name="mobileNo"
            placeholder="+91"
            className="w-full p-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.mobileNo}
            maxLength={13}
            onChange={handleInputChange}
          />
          <button
            type="button"
            onClick={handleSendOtp}
            disabled={formState.otpSent || formState.loading}
            className={`absolute top-0 right-0 w-[111px] h-full text-white text-sm rounded-lg focus:outline-none ${
              formState.otpSent || formState.loading ? 'bg-purple-300 cursor-not-allowed' : 'bg-primary hover:bg-red-600'
            }`}
          >
            {formState.loading ? 'SENDING...' : 'SEND OTP'}
          </button>
        </div>

        {/* OTP Input Boxes */}
        {formState.showOtpInput && (
          <div className="flex gap-3 items-center mb-3 xl:mb-4">
            {Array(4).fill(0).map((_, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                maxLength={1}
                inputMode="numeric"
                className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                value={formData.otp[index] || ''}
                onChange={e => handleOtpChange(e.target.value, index)}
                onKeyDown={e => handleKeyDown(e, index)}
              />
            ))}
            <button
              type="button"
              onClick={handleVerifyOtp}
              className="px-4 h-10 sm:h-12 text-sm bg-primary text-white rounded-lg hover:bg-red-600"
            >
              VERIFY
            </button>
          </div>
        )}

        {/* Mock reCAPTCHA */}
        {formState.showRecaptcha && (
          <div className="mb-3 p-3 border rounded-lg bg-white">
            <button
              type="button"
              onClick={handleRecaptchaSuccess}
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              ✓ I'm not a robot (Click to verify)
            </button>
          </div>
        )}

        {/* Consent Checkbox */}
        <div className="flex items-center justify-center mb-2 xl:mb-2">
          <input
            type="checkbox"
            name="consent"
            id="consent"
            className="mr-2"
            checked={formData.consent}
            onChange={handleInputChange}
          />
          <label htmlFor="consent" className="text-sm lg:text-lg">
            I consent Oasis Fertility to contact me
          </label>
        </div>

        {/* Error Message */}
        {formState.error && (
          <p className="text-red-500 text-sm mb-3 text-center">{formState.error}</p>
        )}

        {/* Submit Button */}
        <div className="bg-primary py-4 px-4">
          <button
            type="submit"
            disabled={formState.loading || !isFormValid}
            className={`w-full py-2 text-white text-[22px] rounded-lg font-medium ${
              formState.loading || !isFormValid
                ? 'bg-red-400 cursor-not-allowed'
                : 'bg-[#D7052B] hover:bg-red-700'
            }`}
          >
            {formState.loading ? 'Submitting...' : 'Get A Call Back'}
            {!formState.loading && (
              <p className="text-[12px] font-normal">within 1 minute</p>
            )}
          </button>

          <div className="flex items-center justify-center mt-2">
            <svg className="w-4 h-4 mr-2" fill="white" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
            </svg>
            <span className="text-white text-sm">Your data is 100% safe with us.</span>
          </div>
        </div>
      </form>

      <div className="bg-[#DEDEDE] text-center py-2 px-3 text-black">
        <p className="text-sm md:text-[18px] leading-[1.4]">
          Get 0% interest on <strong>EMI</strong> | Starting ₹4,999* p/m
        </p>
      </div>
    </div>
  );
}
