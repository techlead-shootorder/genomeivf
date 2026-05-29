'use client'
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
const AppConstant = { websiteUrl: "https://oasisindia.in" };
import { LeadController } from "@/app/components/LeadController";

const MaxBookPopupInstant = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        mobileNo: '',
        e_book: 'true'
    });

    const [errMsg, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Get UTM params from localStorage
        if (typeof window !== 'undefined') {
            const referrer = Cookies.get('referrer');
            if (referrer) {
                localStorage.setItem('referrer', referrer);
            }
        }
    }, []);

    const handleClose = () => {
        if (onClose) onClose();
    };

    // Validation function
    const isFormValid = () => {
        const { firstName, mobileNo } = formData;

        // Check if all fields are filled
        if (!firstName.trim() || !mobileNo) {
            return false;
        }

        // Check name length (min 3, max 24 characters)
        if (firstName.trim().length < 3 || firstName.trim().length > 24) {
            return false;
        }

        // Check if mobile number is exactly 10 digits
        if (mobileNo.length !== 10) {
            return false;
        }

        // Check if mobile number doesn't start with invalid patterns
        if (mobileNo.startsWith('01234') || mobileNo.startsWith('1234')) {
            return false;
        }

        return true;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setErrorMessage('');

        if (name === 'mobileNo') {
            // Only allow digits and limit to 10 characters
            const numericValue = value.replace(/\D/g, '').slice(0, 10);

            // Check for invalid number patterns
            if (numericValue.startsWith('01234') || numericValue.startsWith('1234')) {
                setErrorMessage('Please enter a valid mobile number');
            }

            setFormData(prev => ({
                ...prev,
                [name]: numericValue,
            }));
        } else if (name === 'firstName') {
            // Check name length validation
            if (value.length > 24) {
                setErrorMessage('Name cannot be more than 24 characters');
                return;
            }

            setFormData(prev => ({
                ...prev,
                [name]: value,
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        if (e) e.preventDefault();

        // Validate form before submission
        if (!isFormValid()) {
            if (formData.firstName.trim().length < 3) {
                setErrorMessage('Name must be at least 3 characters long');
            } else if (formData.firstName.trim().length > 24) {
                setErrorMessage('Name cannot be more than 24 characters');
            } else if (formData.mobileNo.startsWith('01234') || formData.mobileNo.startsWith('1234')) {
                setErrorMessage('Please enter a valid mobile number');
            } else if (formData.mobileNo.length !== 10) {
                setErrorMessage('Mobile number must be exactly 10 digits');
            } else {
                setErrorMessage('Please fill all fields correctly');
            }
            return;
        }

        setIsSubmitting(true);

        const userDetails = { ...formData, mobileNo: "+91" + formData.mobileNo }
        console.log('Form submitted:', userDetails);

        try {
            const utmParameters = localStorage.getItem("utmParams");
            const utmParams = utmParameters ? JSON.parse(utmParameters) : {};
            const leadFormRequestBody = {
                ...userDetails,
                placement: "E-book",
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
                phone_number: userDetails.mobileNo,
            });

            console.log('🔍 DEBUG: MaxBookPopupInstant (Instant) form submission triggered');
            console.log('📊 DEBUG: Form data:', userDetails);
            console.log('🔗 DEBUG: Calling submitLeadForm (Salesforce only)');

            new LeadController().submitLeadForm(leadFormRequestBody).then(() => {
                console.log('✅ DEBUG: MaxBookPopupInstant submitLeadForm completed successfully');
                // Clear form data
                setFormData({
                    firstName: "",
                    mobileNo: "",
                    e_book: "true",
                });

                if (typeof window !== "undefined") {
                    localStorage.removeItem("utmParams");
                    localStorage.removeItem("referrer");
                }

                // Download ebook
                const link = document.createElement('a');
                link.download = 'e-book.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                const currentUrl = window.location.href;

                if (currentUrl.includes('paid')) {
                    window.open('https://paid.oasisindia.in/ebooks/e-book.pdf', '_blank');
                }
                else {
                    window.open('https://oasis-staging-links.vercel.app/ebooks/e-book.pdf', '_blank');

                }

                // Redirect to thank you page
                window.location.href = '/thank-you'; // Adjust the URL as needed

                handleClose();

                // Re-enable button after 3 seconds
                setTimeout(() => {
                    setIsSubmitting(false);
                }, 3000);
            }).catch(error => {
                console.error(error);
                setErrorMessage("There was an error submitting the form. Please try again.");
                setTimeout(() => {
                    setIsSubmitting(false);
                }, 3000);
            });

        } catch (error) {
            console.error(error);
            setErrorMessage(
                "There was an error submitting the form. Please try again."
            );
            setTimeout(() => {
                setIsSubmitting(false);
            }, 3000);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    // Don't render if not open
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-[#163D5C] sm:bg-opacity-100 flex items-center justify-center z-[9999999]"
            onClick={handleOverlayClick}
        >
            <div className="relative w-full h-screen bg-gradient-to-br from-orange-400 via-blue-500 to-blue-700 rounded-2xl overflow-hidden">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-10 right-4 w-6 h-6 sm:w-8 sm:h-8  border border-white rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all z-10"
                >
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>

                <div className="flex flex-col sm:flex-row h-full">
                    {/* Mobile heading */}
                    <div className="block sm:hidden mb-8 pl-6 mt-10">
                        <h2 className="text-xl sm:text-4xl font-bold text-white mb-2">
                          IVF Preparation Checklist (Doctor-Approved)
                        </h2>
                        <p className="text-white text-center text-opacity-90 text-sm sm:text-lg">
                            A clear, easy guide for couples planning IVF
                        </p>
                    </div>
                    {/* Left Side - Baby Image */}
                    <div className="sm:w-1/2 flex items-center justify-center p-0 sm:p-8">
                        <div className="relative">
                            <img
                                src="/images/lp/maxlp/Book.png"
                                alt="Happy Baby"
                                className=" w-[120px] sm:w-full sm:max-w-sm h-auto object-cover rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className=' sm:w-1/2 sm:bg-[#1a3d5c]'>
                        <div className="p-8 flex flex-col justify-center sm:ml-20 sm:mt-24 relative w-full sm:w-fit">
                            <div className="hidden sm:block text-center mb-8">
                                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                                   IVF Preparation Checklist (Doctor-Approved)
                                </h2>
                                <p className="text-white text-center text-opacity-90 text-lg">
                                    A clear, easy guide for couples planning IVF
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-10 mt-4">
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
                                        name="firstName"
                                        placeholder="Enter your Name*"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full pl-14 pr-4 py-2 bg-transparent border-b border-white text-white placeholder:text-white focus:outline-none focus:border-opacity-100 transition-all text-sm sm:text-lg"
                                    />
                                </div>

                                {/* Mobile Input */}
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
                                        name="mobileNo"
                                        placeholder="Mobile Number*"
                                        value={formData.mobileNo}
                                        onChange={handleInputChange}
                                        required
                                        maxLength="10"
                                        className="w-full pl-14 pr-4 py-2 bg-transparent border-b border-white text-white placeholder-white placeholder-opacity-80 focus:outline-none focus:border-opacity-100 transition-all text-sm sm:text-lg"
                                    />
                                </div>

                                {/* Error Message */}
                                {errMsg && <p className='text-sm text-red-300'>{errMsg}</p>}

                                {/* Submit Button desktop */}
                                <div className="hidden sm:flex pt-4 justify-center">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full font-bold py-2 px-2 rounded-full flex items-center justify-center space-x-3 transition-colors text-lg shadow-lg ${isSubmitting
                                            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                            : 'bg-orange-500 hover:bg-orange-600 text-white cursor-pointer'
                                            }`}
                                    >
                                        {isSubmitting ? 'Processing...' : 'Download'}
                                    </button>
                                     
                                </div>
                                 <div className="text-center text-white text-sm">
                                        <p>🔒 100% confidential • No spam • Doctor-curated</p>
                                    </div>

                                {/* Submit Button mobile */}
                                <div className="flex flex-col sm:hidden pt-2 justify-center items-center">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-fit text-center font-bold py-2 px-10 rounded-full flex items-center space-x-3 transition-colors text-lg shadow-lg mb-4 ${isSubmitting
                                            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                            : 'bg-orange-500 hover:bg-orange-600 text-white cursor-pointer'
                                            }`}
                                    >
                                        <span>{isSubmitting ? 'Processing...' : 'Download Free IVF Guide'}</span>
                                    </button>

                                    {/* EMI Info  */}
                                    <div className="text-center text-white text-sm">
                                        <p>🔒 100% confidential • No spam • Doctor-curated</p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MaxBookPopupInstant;