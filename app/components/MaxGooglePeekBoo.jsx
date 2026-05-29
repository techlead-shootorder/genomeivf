'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X } from 'lucide-react';
// import { Nanum_Pen_Script } from 'next/font/google';
import { LeadController } from "@/app/components/LeadController";
import { ToastComponent } from "@/app/components/Toast";
const AppConstant = { websiteUrl: "https://oasisindia.in" };
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";


// Use CSS font-family instead of Google Fonts import to avoid timeout issues
const nanumPenScript = {
  className: '',
  style: { fontFamily: '"Nanum Pen Script", cursive' }
};

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const MaxGooglePeekBoo = ({ isOpen, onClose }) => {
  // Using exact same state names as MaxLeadForm without OTP functionality
  const [formData, setFormData] = useState({
    firstName: "",
    mobileNo: "",
    consent: true
  });

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Same UTM parameter logic as MaxLeadForm
    let utmSource = searchParams?.has('utm_source') ? searchParams?.get('utm_source') : '';
    let utmMedium = searchParams?.has('utm_medium') ? searchParams?.get('utm_medium') : '';
    let utmCampaign = searchParams?.has('utm_campaign') ? searchParams?.get('utm_campaign') : '';
    let utmTerm = searchParams?.has('utm_term') ? searchParams?.get('utm_term') : '';
    let utmContent = searchParams?.has('utm_content') ? searchParams?.get('utm_content') : 'English|';
    let location_interest_ms = searchParams?.has('location_interest_ms') ? searchParams?.get('location_interest_ms') : '';
    let location_physical_ms = searchParams?.has('location_physical_ms') ? searchParams?.get('location_physical_ms') : '';
    let fbclid = searchParams?.has('fbclid') ? searchParams?.get('fbclid') : '';
    let gclid = searchParams?.has('gclid') ? searchParams?.get('gclid') : '';
    let campaignid = searchParams?.has("campaignid")
      ? searchParams?.get("campaignid")
      : "";
    let adgroupid = searchParams?.has("adgroupid")
      ? searchParams?.get("adgroupid")
      : "";
    let device = searchParams?.has("device") ? searchParams?.get("device") : "";
    let devicemodel = searchParams?.has("devicemodel") ? searchParams?.get("devicemodel") : "";
    let matchtype = searchParams?.has("matchtype") ? searchParams?.get("matchtype") : "";

    if (
      (utmSource && utmSource?.length > 0) ||
      (utmMedium && utmMedium?.length > 0) ||
      (utmCampaign && utmCampaign?.length > 0) ||
      (utmTerm && utmTerm?.length > 0) ||
      (utmContent && utmContent?.length > 0) ||
      (location_interest_ms && location_interest_ms?.length > 0) ||
      (location_physical_ms && location_physical_ms?.length > 0) ||
      (fbclid && fbclid?.length > 0) ||
      (gclid && gclid?.length > 0) ||
      (campaignid && campaignid?.length > 0) ||
      (adgroupid && adgroupid?.length > 0) ||
      (device && device?.length > 0) ||
      (devicemodel && devicemodel?.length > 0) ||
      (matchtype && matchtype?.length > 0)
    ) {
      let UTMParams = {
        utmSource,
        utmMedium,
        utmCampaign,
        utmTerm,
        utmContent,
        location_interest_ms,
        location_physical_ms,
        fbclid,
        gclid,
        campaignid,
        adgroupid,
        device: device,
        devicemodel: devicemodel,
        matchtype: matchtype,
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('utmParams', JSON.stringify(UTMParams));
      }
    }
    const referrer = Cookies.get('referrer');
    if (typeof window !== 'undefined') {
      localStorage.setItem('referrer', referrer)
    }
  }, []);

  // Same validation logic as MaxLeadForm
  const handleNameChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, firstName: value }));

    // Clear error when user starts typing
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 10) {
      setFormData(prev => ({ ...prev, mobileNo: value }));
    }

    // Clear error when user starts typing
    if (errorMessage) {
      setErrorMessage("");
    }
  };



  // Form validation function
  const isFormValid = () => {
    const basicFieldsValid = formData.firstName !== "" &&
      formData.mobileNo !== "" &&
      formData.mobileNo.length === 10 &&
      formData.consent;

    return basicFieldsValid;
  };

  const validateForm = () => {
    // Check if fields are empty first
    if (!formData.firstName.trim() || !formData.mobileNo.trim()) {
      setErrorMessage("All fields are mandatory");
      return false;
    }

    // Validate full name
    if (formData.firstName.length < 3) {
      setErrorMessage("Name must be at least 3 characters long");
      return false;
    } else if (formData.firstName.length > 25) {
      setErrorMessage("Name must not exceed 25 characters");
      return false;
    }

    // Validate mobile number
    if (formData.mobileNo.length !== 10) {
      setErrorMessage("Mobile number must be exactly 10 digits");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const submitForm = async () => {
    if (!validateForm()) {
      return;
    }

    const completePhoneNumber = `+91${formData.mobileNo}`;

    setIsSubmitting(true);

    try {
      const utmParameters = localStorage.getItem("utmParams");
      const utmParams = utmParameters ? JSON.parse(utmParameters) : {};

      //ensure utmContent is not empty ""
      if (utmParams?.utmContent == "" || utmParams?.utmContent == "-" || utmParams?.utmContent == "_") {
        utmParams.utmContent = "English|";
      }

      const leadFormRequestBody = {
        firstName: formData.firstName,
        mobileNo: completePhoneNumber,
        gender: "",
        age: "",
        looking_for: "",
        consent: formData.consent,
        placement: "Do not close",
        ...utmParams,
        referralUrl:
          document.referrer ||
          localStorage.getItem("referrer") ||
          window.location.href,
        pageUrl: window.location.href || AppConstant.websiteUrl + pathname,
      };

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'userProvidedData',
        phone_number: completePhoneNumber,
      });

      await new LeadController().submitLeadForm(leadFormRequestBody);

      ToastComponent.success("Thank you for showing interest. Our executive will get back to you shortly.");
      router.push('/thank-you');

      // Reset all states
      setFormData({
        firstName: "",
        mobileNo: "",
        consent: true
      });

      if (typeof window !== "undefined") {
        localStorage.removeItem("utmParams");
        localStorage.removeItem("referrer");
      }

      // Close popup after successful submission
      onClose();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }
      setErrorMessage("There was an error submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Debounced submit handler
  const debouncedSubmit = useCallback(
    debounce(submitForm, 500), // 500ms debounce
    [formData, pathname]
  );

  const handleSubmit = () => {
    if (isSubmitting) return; // Prevent multiple clicks
    debouncedSubmit();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[#163D5C] sm:bg-opacity-80 flex items-center justify-center z-[9999999]"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full h-screen bg-gradient-to-br from-orange-400 via-blue-500 to-blue-700 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-6 sm:top-16 sm:right-20 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border border-white hover:bg-opacity-30 transition-all z-10"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        <div className="flex flex-col sm:flex-row h-full">
          {/* Mobile heading */}
          <div className="block sm:hidden mb-4 pl-6 mt-6">
            <h2 className={`${nanumPenScript.className} text-[44px] font-bold font-nanum-pen text-white mb-2`}>
              Don&apos;t close
            </h2>
          </div>
          {/* Left Side - Baby Image */}
          <div className="sm:w-1/2 flex items-center justify-center p-4 sm:p-8">
            <div className="relative">
              {/* <h2 className={`${nanumPenScript.className} absolute -top-10 -right-2 sm:-top-16 sm:right-10  text-white text-[36px] sm:text-[44px] md:text-[68px] leading-none rotate-[-16deg]`}>Peek-a-boo...</h2>
              <p className={`${nanumPenScript.className} absolute top-0 -right-20 sm:top-0 sm:-right-10 text-[26px] text-white leading-none rotate-[-16deg]`}>I&apos;m  hiding in <br /> your dreams!</p> */}

              <img
                src="/images/lp/maxlp/popup-baby-image-2.webp"
                alt="Happy Baby"
                className="w-[150px]  sm:w-[200px] md:w-[90%] max-w-sm h-auto object-cover"
              />
            </div>
          </div>

          {/* Right Side - Form */}
          <div className='sm:w-1/2 sm:bg-[#1a3d5c] flex items-center'>
            <div className="p-4 sm:p-8 flex flex-col justify-center w-full sm:w-fit sm:ml-20 relative">
              <div className="hidden sm:block mb-8">
                <h2 className={`${nanumPenScript.className} text-[44px] sm:text-4xl font-bold font-nanum-pen text-white mb-2`} style={{ fontSize: '66px' }}>
                  Don&apos;t close
                </h2>
                <p className="text-white text-left text-opacity-90 text-[16px]">
                  The answer you&apos;ve been searching <br />
                  for is just one click away.
                </p>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="mb-4 flex justify-center">
                  <p className="text-red-300 text-[14px] text-center font-medium">{errorMessage}</p>
                </div>
              )}

              <div className="space-y-6 sm:mt-4">
                {/* Name Input */}
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <img
                      src="/images/lp/maxlp/outline-profile.png"
                      alt="Profile Icon"
                      className="w-4 h-4"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your Name"
                    value={formData.firstName}
                    onChange={handleNameChange}
                    disabled={isSubmitting}
                    className="w-full pl-14 pr-4 py-2 bg-transparent border-b border-white text-white placeholder:text-white focus:outline-none focus:border-opacity-100 transition-all text-sm sm:text-lg disabled:opacity-50"
                  />
                </div>

                {/* Mobile Input without OTP Button */}
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <img
                      src="/images/lp/maxlp/call icon.png"
                      alt="Phone Icon"
                      className="w-4 h-4"
                    />
                  </div>
                  <input
                    type="tel"
                    placeholder="Mobile Number*"
                    value={formData.mobileNo}
                    onChange={handleMobileChange}
                    maxLength="10"
                    disabled={isSubmitting}
                    className="w-full pl-14 pr-4 py-2 bg-transparent border-b border-white text-white placeholder-white focus:outline-none focus:border-opacity-100 transition-all text-sm sm:text-lg disabled:opacity-50"
                  />
                </div>

                {/* Submit Button Desktop */}
                <div className="hidden sm:flex pt-4 flex-col justify-center items-center">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !isFormValid()}
                    className={`${isSubmitting || !isFormValid()
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-orange-500 hover:bg-orange-600'
                      } text-white font-bold py-2 px-10 rounded-full flex items-center justify-center space-x-3 transition-colors text-lg shadow-lg`}
                  >
                    {isSubmitting ? 'Submitting...' : "Let's Begin Our Story"}
                  </button>
                  <p className='text-[12px] text-white mt-2'>Get a Call Back Within 1 min</p>
                </div>

                {/* EMI Info Desktop*/}
                <div className="hidden sm:block text-center text-white text-sm pt-3">
                  <p>Free Consultation + 0% EMI</p>
                </div>

                {/* Submit Button mobile */}
                <div className="flex flex-col sm:hidden pt-2 justify-center items-center">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !isFormValid()}
                    className={`${isSubmitting || !isFormValid()
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-orange-500 hover:bg-orange-600'
                      } text-white font-bold py-2 px-2 rounded-full flex items-center space-x-3 transition-colors text-lg shadow-lg mb-4`}
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <img
                          src="/images/lp/maxlp/outline-incoming.png"
                          alt="Call Icon"
                          className="w-6 h-6 ml-1"
                        />
                        <span>Get a Call Back</span>
                        <span className="bg-white text-black px-3 py-2 rounded-full text-sm font-medium">
                          Within 1 min
                        </span>
                      </>
                    )}
                  </button>

                  {/* EMI Info  */}
                  <div className="text-center text-white text-sm">
                    <p>Get 0% Interest on EMI</p>
                    <p>Starting ₹4,999* p/m</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaxGooglePeekBoo;