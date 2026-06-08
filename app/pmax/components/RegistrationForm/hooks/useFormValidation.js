import { useEffect, useState } from 'react';

export const useFormValidation = (formData, formState) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // recaptchaVerified is not required since reCAPTCHA is disabled
    const valid =
      formData.firstName?.trim() !== '' &&
      formData.firstName?.trim().length >= 3 &&
      formData.mobileNo?.length === 10 && // 10 digits, no +91 prefix stored
      formData.gender !== '' &&
      formData.age !== '' &&
      formData.consent === true &&
      formState.otpVerified === true;

    setIsValid(valid);
  }, [formData, formState]);

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'firstName':
        return value?.trim().length >= 3 && value?.trim().length <= 24;
      case 'mobileNo':
        return value?.length === 13;
      case 'gender':
        return value !== '';
      case 'age':
        return value !== '';
      default:
        return false;
    }
  };

  const getFieldError = (fieldName) => {
    const errors = {
      firstName: formData.firstName?.trim().length < 3 ? 'Name must be at least 3 characters' : '',
      mobileNo: formData.mobileNo?.length < 10 ? 'Enter valid 10-digit number' : '',
      gender: !formData.gender ? 'Please select gender' : '',
      age: !formData.age ? 'Please select age' : '',
    };
    return errors[fieldName] || '';
  };

  return {
    isFormValid: isValid,
    validateField,
    getFieldError,
  };
};
