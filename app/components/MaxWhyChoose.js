'use client'
import React, { useState, useEffect } from 'react';
import { CheckCircle, Settings, DollarSign, Clock, Heart } from 'lucide-react';
import Image from 'next/image';
import MaxBookPopupInstant from './MaxBookPopupInstant'
import MaxGooglePeekBoo from './MaxGooglePeekBoo'
// Phone number hardcoded for India LP
const PHONE_NUMBER = '9513736432';

const MaxWhyChoose = ({ center, isMeta, hideEbook = false }) => {

    const [showPopup, setShowPopup] = useState(false);
    const [showBookInstantPopup, setShowBookInstantPopup] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");

    const isQuoraPage = typeof window !== 'undefined' && window.location?.pathname === '/lp2/quora';

    const city = center?.center_name && center.center_name !== 'branding' && center.center_name !== 'jananiyatra' ? center.center_name.toLowerCase() : '';

    useEffect(() => {
        setPhoneNumber(PHONE_NUMBER);
    }, []);

    const scrollToLeadForm = () => {
        if (typeof window === 'undefined') return;
        const el = document.getElementById('leadformlp3');
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elTop = rect.top + window.scrollY;
        const targetY = elTop - (window.innerHeight / 2) + (rect.height / 2);
        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
    };

    const oasisData = [
        {
            icon: '/images/lp/maxlp/check-icon.png',
            oasisText: "Upto 70% Success, data-backed",
            otherText: "Varies widely and unverified"
        },
        {
            icon: '/images/lp/maxlp/customize-icon.png',
            oasisText: "Custom Plans for Every Couple",
            otherText: "Generic, One-size-fits-all"
        },
        {
            icon: '/images/lp/maxlp/microscope-icon.png',
            oasisText: "Advanced Technology like MACS, Micro TESE",
            otherText: "Conventional methods"
        },
        {
            icon: '/images/lp/maxlp/rupees-bag-icon.png',
            oasisText: "No Hidden costs & 100% Transparency",
            otherText: "Confusing packages and Surprise bills"
        },
        {
            icon: '/images/lp/maxlp/watch-icon.png',
            oasisText: "Flexible, with evening clinics for Working Couples",
            otherText: "Fixed timings"
        },
        {
            icon: '/images/lp/maxlp/heart-icon.png',
            oasisText: "Same Specialist + Emotional & Male Fertility Support",
            otherText: "Frequent doctor changes, No Holistic Support"
        }
    ];

    const otherClinicsData = [
        {
            icon: <CheckCircle className="w-5 h-5 text-white" />,
            oasisText: "Upto 70% Success, data-backed",
            otherText: "Varies widely and unverified"
        },
        {
            icon: <Settings className="w-5 h-5 text-white" />,
            oasisText: "Custom Plans for Every Couple",
            otherText: "Generic, One-size-fits-all"
        },
        {
            icon: <Settings className="w-5 h-5 text-white" />,
            oasisText: "Advanced Technology like MACS, Micro TESE",
            otherText: "Conventional methods"
        },
        {
            icon: <DollarSign className="w-5 h-5 text-white" />,
            oasisText: "No Hidden costs & 100% Transparency",
            otherText: "Confusing packages and Surprise bills"
        },
        {
            icon: <Clock className="w-5 h-5 text-white" />,
            oasisText: "Flexible, with evening clinics for Working Couples",
            otherText: "Fixed timings"
        },
        {
            icon: <Heart className="w-5 h-5 text-white" />,
            oasisText: "Same Specialist + Emotional & Male Fertility Support",
            otherText: "Frequent doctor changes, No Holistic Support"
        }
    ];

    function capitalizeFirstLetter(str) {
        if (!str) return ""; // handle empty string
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const displayCity = (center?.center_name && center.center_name !== 'branding' && center.center_name !== 'jananiyatra') ? capitalizeFirstLetter(center.center_name) : 'India';

    return (
        <>
            <section className="py-8 pb-16 md:pb-20 md:py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="block md:hidden text-left mb-8 ml-4">
                        <h1 className='text-[50px] md:text-[55px] font-bold text-primary text-opacity-50'>Why Choose</h1>
                        <h2 className='text-[26px] md:text-3xl font-bold text-[#2B5F8A]'>Oasis Fertility {displayCity}</h2>

                        <div className='mt-4'>
                            <p>Choose Oasis Fertility for advanced tech, expert care, and personalized fertility solutions, ensuring your best chance at parenthood.</p>
                        </div>
                    </div>

                    {/* Desktop Version */}
                    <div className="">
                        <div className="">
                            <div className=' flex  md:gap-10 lg:gap-20 w-full '>
                                {/* Header, Description and CTA */}
                                <div className='hidden md:flex  flex-col gap-8 w-[400px]'>
                                    <div>
                                        <h1 className='text-5xl md:text-5xl font-bold text-primary text-opacity-50 mb-2'>Why Choose</h1>
                                        <h2 className='text-2xl md:text-3xl font-bold text-primary'>Oasis Fertility {displayCity}</h2>
                                    </div>

                                    <div>
                                        <p>Choose Oasis Fertility for advanced tech, expert care, and personalized fertility solutions, ensuring your best chance at parenthood.</p>
                                    </div>
                                    <div className=" flex items-start space-x-8">
                                        <div className="flex-shrink-0">
                                            <>
                                                {/* Desktop: Show popup button */}
                                                <button
                                                    className="hidden md:flex bg-[#E8772E] text-white px-6 py-[10px] rounded-lg font-semibold text-sm flex items-center space-x-2 transition-colors"
                                                    onClick={() => setShowPopup(true)}
                                                >
                                                    <img src='/images/lp/maxlp/white-call-icon.png' width={17} height={21} />
                                                    <span>Book Now</span>
                                                </button>
                                                
                                                {/* Mobile: Show phone link */}
                                                <a
                                                    href={isQuoraPage ? "#leadformlp3" : `tel:${phoneNumber.replace(/\s|-/g, '')}`}
                                                    onClick={(e) => {
                                                        if (!isQuoraPage) return;
                                                        e.preventDefault();
                                                        scrollToLeadForm();
                                                    }}
                                                    className="md:hidden bg-[#E8772E] text-white px-6 py-[10px] rounded-lg font-semibold text-sm flex items-center space-x-2 transition-colors"
                                                >
                                                    <img src='/images/lp/maxlp/white-call-icon.png' width={17} height={21} />
                                                    <span>Book Now</span>
                                                </a>
                                            </>
                                        </div>
                                    </div>
                                </div>

                                {/* Oasis Comparision Card */}
                                <div className='flex'>
                                    <div className='rounded-lg overflow-hidden bg-[#1E4A6E] '>
                                        <div className='flex'>
                                            <div className='h-[100px] w-[55px] text-white bg-[#163D5C] flex justify-center items-center p-4'></div>
                                            <div className='h-[100px] text-white bg-[#1E4A6E] w-full flex items-center px-2'>
                                                <img src="https://genomeivf.com/images/logo.png" alt='Genome IVF logo' height={54} width={125} className='object-contain' />
                                            </div>
                                        </div>
                                        {oasisData.map((item, index) => (
                                            <div key={index} className='flex border-b border-gray-500 border-dotted'>
                                                <div className={`text-white bg-[#163D5C] flex justify-center items-center p-4 ${index == oasisData.length - 1 ? 'h-[80px]' : 'h-[60px]'}`}> <img src={item.icon} width={24} height={33} /> </div>
                                                <div className={`text-white text-xs sm:text-sm bg-[#1E4A6E] w-full flex items-center px-2 ${index == oasisData.length - 1 ? 'h-[80px]' : 'h-[60px]'}`}> {item.oasisText}</div>
                                            </div>
                                        ))}
                                        <div className='px-2 py-2'>
                                            <>
                                                {/* Desktop: Show popup button */}
                                                <button
                                                    className='hidden md:flex w-full bg-[#E8772E] px-2 py-3 justify-center items-center text-[18px] text-white font-bold gap-4 rounded-lg'
                                                    onClick={() => setShowPopup(true)}
                                                >
                                                    <img src='/images/lp/maxlp/white-call-icon.png' width={22} height={22} />
                                                    Book Now
                                                </button>
                                                
                                                {/* Mobile: Show phone link */}
                                                <a
                                                    href={isQuoraPage ? "#leadformlp3" : `tel:${phoneNumber.replace(/\s|-/g, '')}`}
                                                    onClick={(e) => {
                                                        if (!isQuoraPage) return;
                                                        e.preventDefault();
                                                        scrollToLeadForm();
                                                    }}
                                                    className='md:hidden w-full bg-[#E8772E] px-2 py-3 flex justify-center items-center text-[18px] text-white font-bold gap-4 rounded-lg'
                                                >
                                                    <img src='/images/lp/maxlp/white-call-icon.png' width={22} height={22} />
                                                    Book Now
                                                </a>
                                            </>
                                        </div>
                                    </div>

                                    <div className='rounded-tr-lg rounded-br-lg h-fit overflow-hidden mt-[10px]'>
                                        <div className='bg-[#2B5F8A] pt-6 pb-[38px]'>
                                            <p className='text-white ml-4 sm:ml-8 text-lg'>Other Clinics</p>
                                        </div>
                                        {otherClinicsData.map((item, index) => (
                                            <div key={index} className={`flex  ${index != otherClinicsData.length - 1 ? 'border-b border-gray-900 border-dotted' : ''}`}>
                                                <div
                                                    className={` text-xs sm:text-sm text-white bg-[#2B5F8A] w-full flex pt-4 pl-4 sm:pl-8 pr-2 ${index == otherClinicsData.length - 1 ? 'h-[100px] md:h-[70px]' : 'h-[60px]'}`}
                                                > {item.otherText}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {!hideEbook && (
                                <div className="text-center mt-4 md:mt-16">
                                    <div className="text-[18px] sm:text-lg font-semibold text-[#1E4A6E] mb-4 px-4">
                                        Preparing for IVF? <br className='visible md:hidden' />Follow This Simple Step-by-Step Guide
                                    </div>
                                    <button
                                        className="flex text-white px-10 sm:px-8 py-3 rounded-full font-medium text-base sm:text-lg transition-shadow items-center space-x-2 mx-auto"
                                        style={{ backgroundColor: '#E8772E' }}
                                        onClick={() => setShowBookInstantPopup(true)}
                                    >
                                        <span className='text-[18px]'>Download E-book</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Consultation Popup */}
            <MaxGooglePeekBoo
                isOpen={showPopup}
                onClose={() => setShowPopup(false)}
            />

            {/* Book Download Popup */}
            <MaxBookPopupInstant
                isOpen={showBookInstantPopup}
                onClose={() => setShowBookInstantPopup(false)}
            />
        </>
    );
};

export default MaxWhyChoose;