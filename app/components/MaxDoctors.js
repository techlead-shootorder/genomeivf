"use client"
import React, { useState, memo, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MaxGooglePeekBoo from './MaxGooglePeekBoo';
// Phone number hardcoded for India LP
const PHONE_NUMBER = '9513736432';

const DesktopDoctorCard = memo(({ doctor, service }) => {
    const experience = doctor?.experience?.match(/\d+/)?.[0] || '';

    function removeFertilitySpecialist(input) {
        const suffix = "Fertility Specialist";
        if (input.endsWith(suffix)) {
            return input.slice(0, -suffix.length).trim();
        }
        return input; // Return original string if it doesn't end with the suffix
    }

    const getSpecialist = (service) => {
        switch (service) {
            case 'ivf':
                return 'IVF';
            case 'iui':
                return 'IUI';
            case 'fertility':
                return 'Fertility';
            default:
                return 'Fertility';
        }
    }

    return (
        <div className="flex-shrink-0 md:w-1/3 lg:w-1/4 px-2">
            <div className="bg-pink-100 rounded-2xl shadow-lg overflow-hidden border border-primary mx-2 h-[400px] flex flex-col">
                <div className="relative p-6 pt-8 flex-1 flex flex-col">
                    <div className="flex justify-center mb-0">
                        <div className="relative">
                            <img
                                src={`/images/doctor/newDoctors/${doctor.docterImage}`}
                                alt={doctor?.fullname || "Doctor Image"}
                                className="w-48 h-48 object-cover"
                            />
                            {doctor.experience && <div className="absolute bottom-6 -left-8 bg-white text-gray-800 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                                <img src='/images/lp/maxlp/green-badge.png' alt='badge' className='h-[20px] w-[18px]' />
                                <span className='text-[14px] font-bold'>{experience} yrs exp</span>
                            </div>}
                            {doctor.practoRating && <div className="absolute top-12 -right-4 bg-white text-black rounded-full py-1 px-2 flex items-center justify-center gap-1 text-xs font-bold">
                                <div className="bg-white rounded-full flex items-center justify-center">
                                    <img src='/images/lp/lp3/Practo_Health_Logo.png' alt='practo' className='object-contain w-5 h-5' />
                                </div>
                                {doctor.practoRating}
                            </div>}
                        </div>
                    </div>

                    <div className="text-center flex-1 flex flex-col justify-center">
                        <h3 className="text-lg font-bold text-primary mb-2 min-h-[2rem] flex items-center justify-center">{doctor?.fullname}</h3>
                        <p className="text-sm text-gray-600 mb-1 min-h-[1.25rem]">{doctor?.qualification}</p>
                        <p className="text-sm text-gray-700 font-medium min-h-[1.25rem]"> {removeFertilitySpecialist(doctor?.designation)} <span className=''>{getSpecialist(service)}</span> Specialist</p>
                    </div>
                </div>
            </div>
        </div>
    )
});

DesktopDoctorCard.displayName = "DesktopDoctorCard";

const MobileDoctorCard = memo(({ doctor, service }) => {
    const experience = doctor?.experience?.match(/\d+/)?.[0] || '';

    function removeFertilitySpecialist(input) {
        const suffix = "Fertility Specialist";
        if (input.endsWith(suffix)) {
            return input.slice(0, -suffix.length).trim();
        }
        return input; // Return original string if it doesn't end with the suffix
    }

    const getSpecialist = (service) => {
        switch (service) {
            case 'ivf':
                return 'IVF';
            case 'iui':
                return 'IUI';
            case 'fertility':
                return 'Fertility';
            default:
                return 'Fertility';
        }
    }

    return (
        <div className="flex-shrink-0 w-[361px] h-[435px] md:w-80">
            <div className="bg-[#ffe6f1] rounded-2xl shadow-lg overflow-hidden border border-[#642564] h-full flex flex-col">
                <div className="relative p-6 flex-1 flex flex-col">
                    <div className="flex justify-center mb-4">
                        <div className="relative">
                            <img
                                src={`/images/doctor/newDoctors/${doctor.docterImage}`}
                                alt={doctor.fullname || "Doctor Image"}
                                className="w-[290px] h-[290px] object-cover"
                            />
                            {doctor.experience && <div className="absolute bottom-4 -left-6 bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                                <img src='/images/lp/maxlp/green-badge.png' className='h-[28px] w-[24.33px]' />
                                <span className='text-[18px] font-bold'>{experience} yrs exp</span>
                            </div>}
                            {doctor.practoRating && <div className="absolute top-14 -right-[12px] bg-white text-black rounded-full py-1 px-2 flex items-center justify-center gap-2 text-[18px] font-bold">
                                <img
                                    src="/images/lp/lp3/Practo_Health_Logo.png"
                                    loading="lazy"
                                    className="h-[32px] w-[32px] lg:h-10"
                                />
                                {doctor.practoRating}
                            </div>}
                        </div>
                    </div>

                    <div className="text-center flex-1 flex flex-col justify-center">
                        <h3 className="text-[22px] font-bold text-[#692F69] min-h-[2.5rem] flex items-center justify-center">
                            {doctor?.fullname}
                        </h3>
                        <p className="text-sm text-[#333333] mb-1 min-h-[1.25rem] font-bold">{doctor?.qualification}</p>
                        <p className="text-[15px] text-[#333333] min-h-[1.25rem] !font-bold">
                            {removeFertilitySpecialist(doctor?.designation)} <span className=''>{getSpecialist(service)}</span> Specialist
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
})

MobileDoctorCard.displayName = "MobileDoctorCard";

const MaxDoctors = ({center, filteredDoctors, service, isMeta }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const formatService = service ? service == 'fertility' ? 'Fertility' : service?.toUpperCase() : 'IVF';

    const city = center?.center_name && center.center_name !== 'branding' && center.center_name !== 'jananiyatra' ? center.center_name.toLowerCase() : '';

    useEffect(() => {
        setPhoneNumber(PHONE_NUMBER);
    }, []);

    const isQuoraPage = typeof window !== 'undefined' && window.location?.pathname === '/lp2/quora';

    const scrollToLeadForm = () => {
        if (typeof window === 'undefined') return;
        const el = document.getElementById('leadformlp3');
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elTop = rect.top + window.scrollY;
        const targetY = elTop - (window.innerHeight / 2) + (rect.height / 2);
        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % Math.max(1, filteredDoctors.length - 3));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + Math.max(1, filteredDoctors.length - 3)) % Math.max(1, filteredDoctors.length - 3));
    };

    if (!filteredDoctors?.length) return null;

    function capitalizeFirstLetter(str) {
        if (!str) return ""; // handle empty string
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const displayCity = (center?.center_name && center.center_name !== 'branding' && center.center_name !== 'jananiyatra') ? capitalizeFirstLetter(center.center_name) : 'India';

    return (
        <>
            <section id='Doctors' className="bg-[#fff1f7] py-8 md:py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-left mb-8 sm:flex sm:items-center sm:gap-8">
                        <div className="text-[55px] font-bold text-primary text-opacity-50">50+</div>
                        <h1 className="text-[29px] font-bold text-[#4E204E]">
                            Expert IVF Doctors & Fertility Specialists in {displayCity}
                        </h1>
                    </div>

                    {/* Mobile Version - Original Design (< sm) */}
                    <div className="md:hidden overflow-x-auto">
                        <div className="flex space-x-6 pb-4" style={{ width: 'max-content' }}>
                            {filteredDoctors.map(doctor => doctor.docterImage && (
                                <MobileDoctorCard
                                    key={doctor.id}
                                    doctor={doctor}
                                    service={service}
                                />
                            )
                            )}
                        </div>
                    </div>

                    {/* Desktop Version - Carousel Design (>= sm) */}
                    <div className="hidden md:block relative">
                        <div className="overflow-hidden">
                            <div
                                className="flex transition-transform duration-300 ease-in-out"
                                style={{ transform: `translateX(-${currentIndex * 25}%)` }}
                            >
                                {filteredDoctors.map(doctor => doctor.docterImage && (
                                    <DesktopDoctorCard
                                        key={doctor.id}
                                        doctor={doctor}
                                        service={service}
                                    />
                                )
                                )}
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        <div className='absolute -top-20 right-6 flex gap-4'>
                            <button
                                onClick={prevSlide}
                                className="flex items-center justify-center border border-[#471847] rounded-full w-[30px] h-[30px] transition-colors z-10"
                            >
                                <ChevronLeft className="w-[20px] h-[26px] text-[#471847]" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="flex items-center justify-center border border-[#471847] rounded-full w-[30px] h-[30px] transition-colors z-10"
                            >
                                <ChevronRight className="w-[20px] h-[26px] text-[#471847]" />
                            </button>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="text-center mt-4 md:mt-12">
                        <div className="text-[20px] font-semibold text-[#4E204E] mb-4">Time Matters in {formatService}. <br className='visible md:hidden' /> Get the Right Advice</div>
                        
                                                <>
                            {/* Desktop: Show popup button */}
                            <button
                                onClick={() => setShowPopup(true)}
                                className="hidden md:flex bg-[#F77B2F] text-white px-8 py-3 rounded-full font-semibold text-[18px] shadow-lg hover:shadow-xl transition-shadow items-center space-x-2 mx-auto"
                            >
                                <img src="/images/lp/maxlp/white-call-icon.png" className='w-[21px] h-[21px]' />
                                <span>Get a Free Consultation</span>
                            </button>
                            
                            {/* Mobile: Show phone link */}
                            <a
                                href={isQuoraPage ? "#leadformlp3" : `tel:${phoneNumber.replace(/\s|-/g, '')}`}
                                onClick={(e) => {
                                    if (!isQuoraPage) return;
                                    e.preventDefault();
                                    scrollToLeadForm();
                                }}
                                className="md:hidden flex bg-[#F77B2F] text-white px-8 py-3 rounded-full font-semibold text-[18px] shadow-lg hover:shadow-xl transition-shadow items-center justify-center space-x-2 mx-auto w-fit"
                            >
                                <img
                                    src="/images/lp/maxlp/white-call-icon.png"
                                    className="w-[21px] h-[21px]"
                                    alt="Call icon"
                                />
                                <span>Get a Free Consultation</span>
                            </a>
                        </>
                    </div>
                </div>
            </section>

            {/* Consultation Popup */}
            
                <MaxGooglePeekBoo
                    isOpen={showPopup}
                    onClose={() => setShowPopup(false)}
                />
            ) : (
        </>
    );
};

export default MaxDoctors;