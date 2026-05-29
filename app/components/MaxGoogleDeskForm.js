"use client"
import React, { useState, useEffect, useCallback, useRef } from "react";
import { LeadController } from "@/app/components/LeadController";
import { ToastComponent } from "@/app/components/Toast";
const AppConstant = { websiteUrl: "https://oasisindia.in" };
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
// import { HiThumbUp, HiThumbDown } from "react-icons/hi";

// import ReCAPTCHA from "react-google-recaptcha";

const MaxGoogleDeskForm = ({ formatService, isInhouse }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    mobileNo: "",
    consent: true,
    selectedClinic: ""
  });

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // UTM parameters handling (same as original)
    let utmSource = searchParams?.has('utm_source') ? searchParams?.get('utm_source') : '';
    let utmMedium = searchParams?.has('utm_medium') ? searchParams?.get('utm_medium') : '';
    let utmCampaign = searchParams?.has('utm_campaign') ? searchParams?.get('utm_campaign') : '';
    let utmTerm = searchParams?.has('utm_term') ? searchParams?.get('utm_term') : '';
    let utmContent = searchParams?.has('utm_content') ? searchParams?.get('utm_content') : 'English|';
    let location_interest_ms = searchParams?.has('location_interest_ms') ? searchParams?.get('location_interest_ms') : '';
    let location_physical_ms = searchParams?.has('location_physical_ms') ? searchParams?.get('location_physical_ms') : '';
    let fbclid = searchParams?.has('fbclid') ? searchParams?.get('fbclid') : '';
    let gclid = searchParams?.has('gclid') ? searchParams?.get('gclid') : '';
    let campaignid = searchParams?.has("campaignid") ? searchParams?.get("campaignid") : "";
    let adgroupid = searchParams?.has("adgroupid") ? searchParams?.get("adgroupid") : "";
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
  }, [])

  const handleNameChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, firstName: value }));

    // Dispatch custom event to reset popup timer
    window.dispatchEvent(new CustomEvent('leadFormUserTyping'));

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

    // Dispatch custom event to reset popup timer
    window.dispatchEvent(new CustomEvent('leadFormUserTyping'));

    // Clear error when user starts typing
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleClinicChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, selectedClinic: value }));
    window.dispatchEvent(new CustomEvent("leadFormUserTyping"));
    if (errorMessage) {
      setErrorMessage("");
    }
  };



  // Form validation function
  const isFormValid = () => {
    const basicFieldsValid = formData.firstName !== "" &&
      formData.mobileNo !== "" &&
      formData.mobileNo.length === 10 &&
      (!isInhouse || formData.selectedClinic !== "") &&
      formData.consent;

    return basicFieldsValid;
  };

  const validateForm = () => {
    // Check if fields are empty first
    if (!formData.firstName.trim() || !formData.mobileNo.trim() || (isInhouse && !formData.selectedClinic.trim())) {
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
    console.log("Form submitted:", {
      firstName: formData.firstName,
      phoneNumber: completePhoneNumber
    });

    setIsSubmitting(true);

    try {
      const utmParameters = localStorage.getItem("utmParams");
      const utmParams = utmParameters ? JSON.parse(utmParameters) : {};

      //ensure utmContent is not empty ""
      if (utmParams?.utmContent == "" || utmParams?.utmContent == "-" || utmParams?.utmContent == "_") {
        utmParams.utmContent = "English|";
      }

      const leadFormRequestBody = {
        timestamp: new Date().toLocaleString(),
        firstName: formData.firstName,
        mobileNo: completePhoneNumber,
        gender: "",
        age: "",
        looking_for: "",
        consent: formData.consent,
        placement: "Hero",
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

      console.log("reached");

      await new LeadController().submitLeadForm(leadFormRequestBody);
      await new LeadController().pabbly(leadFormRequestBody);

      ToastComponent.success("Thank you for showing interest. Our executive will get back to you shortly.");
      router.push('/thank-you');

      // Reset all states
      setFormData({
        firstName: "",
        mobileNo: "",
        consent: true,
        selectedClinic: ""
      });

      if (typeof window !== "undefined") {
        localStorage.removeItem("utmParams");
        localStorage.removeItem("referrer");
      }
    } catch (error) {
      console.error(error);
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

  return (
    <div className={`hidden md:block relative max-w-sm mx-auto rounded-[20px] bg-blue-100 z-10 ${isInhouse ? 'mt-[60px]' : 'mt-10'}`}>
      {/* Header */}
      <div className="flex justify-center">
        <div className="bg-[url('/images/lp/maxlp/rectangle.png')] bg-cover bg-center h-[53px] w-[254px]">
          <div className="">
            <h1 className="text-white text-[20px] font-bold text-center">
              Free Consultation
            </h1>
            <p className="text-[11px] font-normal text-white text-center">with senior {['ivf', 'iui', 'fertility'].includes(formatService?.toLowerCase()) ? formatService : 'IVF'} Specialist</p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="absolute top-[187px] left-12 z-20">
          <p className="text-red-500 text-[14px] font-medium bg-white px-2 py-1 rounded shadow-lg">{errorMessage}</p>
        </div>
      )}

      <div className="px-8">
        {/* Form Fields */}
        <div className="mt-6 space-y-4 px-2">
          {/* Full Name */}
          <div className="flex items-center border-b border-[#5E2671] pb-1 mb-8">
            <img
              src="/images/lp/maxlp/profile.png"
              alt="Profile"
              className="w-[32px] h-[32px] mr-4 object-contain"
            />
            <div className="w-full">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.firstName}
                onChange={handleNameChange}
                disabled={isSubmitting}
                className="w-full bg-transparent text-[#5E2671] placeholder-primary placeholder:font-bold placeholder:text-[14px] outline-none mt-2 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Mobile Number without OTP Button */}
          <div className="flex items-center border-b border-[#5E2671] pb-1 relative">
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
                onChange={handleMobileChange}
                maxLength="10"
                disabled={isSubmitting}
                className="w-full bg-transparent text-[#5E2671] placeholder-primary placeholder:font-bold placeholder:text-[14px] outline-none disabled:opacity-50"
              />
            </div>
          </div>

          {/* Clinic Location (Only for inhouse) */}
          {isInhouse && (
            <div className="flex items-center border-b border-[#5E2671] pb-1 mt-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-[32px] h-[32px] mr-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <div className="w-full">
                <select
                  value={formData.selectedClinic}
                  onChange={handleClinicChange}
                  disabled={isSubmitting}
                  className={`w-full bg-transparent text-[#5E2671] outline-none mt-2 disabled:opacity-50 ${formData.selectedClinic ? 'font-bold text-[14px]' : 'text-primary font-bold text-[14px]'}`}
                >
                  <option value="" disabled className="text-primary font-bold">Select Clinic Location</option>
                  <option value="AS Rao Nagar">AS Rao Nagar</option>
                  <option value="Banjara Hills">Banjara Hills</option>
                  <option value="Dilsukhnagar">Dilsukhnagar</option>
                  <option value="Gachibowli">Gachibowli</option>
                  <option value="Kokapet">Kokapet</option>
                  <option value="Kompally">Kompally</option>
                  <option value="Miyapur">Miyapur</option>
                  <option value="Secunderabad">Secunderabad</option>
                  <option value="Tolichowki">Tolichowki</option>
                  <option value="Uppal">Uppal</option>
                </select>
              </div>
            </div>
          )}

          {/* Call Back Button */}
          <div className="hidden md:flex w-full justify-center !mt-8 !mb-2">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !isFormValid()}
              className={`${isSubmitting || !isFormValid()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#E8772E] hover:bg-[#d06a28]'
                } text-white font-bold py-2 px-[10px] w-[308px] rounded-full flex items-center justify-between transition-colors duration-200`}
            >
              {isSubmitting ? (
                <p className="text-[20px] leading-tight w-full text-center">
                  Submitting...
                </p>
              ) : (
                <>
                  <p className="text-[20px] ml-8 leading-tight">
                    Get a Call Back
                  </p>
                  <span className="bg-white text-[#50AF35] font-medium text-[14px] px-2 py-1 rounded-full">Within 1 min</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="py-4 text-gray-600 flex items-start gap-2 text-sm">
          <img src="/images/lp/maxlp/shield.png" className="ml-[20px]" width={26} height={28} />
          <span className="text-[12px] text-[#2B5F8A]">
            We keep your data <strong>100% safe</strong>. By submitting, you accept our{" "}
            <span className="cursor-pointer font-semibold">Terms and Conditions</span>
          </span>
        </div>
      </div>
    </div>
  );
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

export default MaxGoogleDeskForm;