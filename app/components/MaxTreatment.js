"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MaxGooglePeekBoo from './MaxGooglePeekBoo'
// Phone number hardcoded for India LP
const PHONE_NUMBER = '9513736432';

const MaxTreatment = ({ service, isMeta, center }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('IVF');
    const [showPopup, setShowPopup] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");

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

    // Set initial active tab based on service prop
    useEffect(() => {
        if (service) {
            const serviceUpper = service.toUpperCase();
            if (serviceUpper === 'IUI') {
                setActiveTab('IUI');
            } else if (serviceUpper === 'IVF' || serviceUpper === 'FERTILITY') {
                setActiveTab('IVF');
            } else {
                setActiveTab('IVF'); // default to IVF for any other service
            }
        }
    }, [service]);

    const allTreatments = [
        {
            id: 1,
            title: "IVF (In Vitro Fertilization)",
            description: "IVF combines eggs and sperm in a lab for precise fertilization and embryo transfer. Choose Oasis for advanced tech, expert care, and personalized solutions, ensuring your best chance at parenthood.",
            image: "/images/lp/treatments/updated/Infertility_Treatments/IVF.webp",
            gradient: "from-pink-200 via-purple-300 to-purple-500",
            category: "IVF"
        },
        {
            id: 2,
            title: "Drug Free IVF (IVM)",
            description: "IVM (In-Vitro Maturation) nurtures immature eggs in the lab, reducing hormonal impact. Oasis excels with precision technology, trusted specialists, and individualized care for a safer, more effective fertility journey.",
            image: "/images/lp/treatments/updated/Infertility_Treatments/IVM.webp",
            gradient: "from-blue-400 via-purple-400 to-purple-600",
            category: "IVF"
        },
        {
            id: 3,
            title: "ICSI Treatment",
            description: "ICSI (Intracytoplasmic Sperm Injection) involves injecting a single sperm directly into an egg. This advanced IVF technique is ideal for male factor infertility and severe fertility issues.",
            image: "/images/lp/treatments/updated/Infertility_Treatments/IVF.webp",
            gradient: "from-purple-300 via-pink-400 to-purple-500",
            category: "IVF"
        },
        {
            id: 4,
            title: "OITI Treatment",
            description: "OITI (Ovulation Induction with Timed Intercourse) uses medications to stimulate the ovaries to produce eggs. This is followed by timed intercourse during ovulation. It's the first line of treatment for women with irregular ovulation.",
            image: "/images/lp/treatments/updated/Infertility_Treatments/IVF.webp",
            gradient: "from-blue-300 via-green-400 to-blue-500",
            category: "IUI"
        },
        {
            id: 5,
            title: "IUI Treatment",
            description: "IUI (Intrauterine Insemination) places prepared sperm directly into the uterus during ovulation. A less invasive option with higher success rates when combined with expert timing and care.",
            image: "/images/lp/treatments/updated/Infertility_Treatments/IVF.webp",
            gradient: "from-green-300 via-blue-400 to-purple-500",
            category: "IUI"
        },
        {
            id: 6,
            title: "Timed Intercourse",
            description: "Timed intercourse involves monitoring ovulation and timing sexual activity accordingly. A natural approach that can be enhanced with fertility medications.",
            image: "/images/lp/treatments/updated/Infertility_Treatments/IVF.webp",
            gradient: "from-green-200 via-blue-300 to-green-500",
            category: "IUI"
        },
        {
            id: 7,
            title: "Genetic Testing (PGT)",
            description: "Preimplantation Genetic Testing screens embryos for genetic abnormalities before transfer. This advanced technique increases success rates and reduces miscarriage risk.",
            image: "/images/lp/treatments/updated/Infertility_Treatments/IVF.webp",
            gradient: "from-orange-300 via-pink-400 to-purple-500",
            category: "Other"
        },
        {
            id: 8,
            title: "Egg Freezing",
            description: "Egg freezing preserves your fertility for the future. Advanced vitrification techniques ensure high survival rates when you're ready to conceive.",
            image: "/images/lp/treatments/updated/Infertility_Treatments/IVF.webp",
            gradient: "from-cyan-300 via-blue-400 to-purple-500",
            category: "Other"
        },
        {
            id: 9,
            title: "Donor Programs",
            description: "Comprehensive donor egg, sperm, and embryo programs with extensive screening. Our donor programs offer hope when other treatments aren't suitable.",
            image: "/images/lp/treatments/updated/Infertility_Treatments/IVF.webp",
            gradient: "from-pink-300 via-purple-400 to-indigo-500",
            category: "Other"
        }
    ];

    const tabs = [
        { id: 'IVF', label: 'IVF', count: allTreatments.filter(t => t.category === 'IVF').length },
        { id: 'IUI', label: 'IUI', count: allTreatments.filter(t => t.category === 'IUI').length },
        { id: 'Other', label: 'Other', count: allTreatments.filter(t => t.category === 'Other').length }
    ];

    // Filter treatments based on active tab
    const filteredTreatments = allTreatments.filter(treatment => treatment.category === activeTab);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % Math.max(1, filteredTreatments.length - 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + Math.max(1, filteredTreatments.length - 1)) % Math.max(1, filteredTreatments.length - 1));
    };

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        setCurrentIndex(0); // Reset carousel to first slide when changing tabs
    };

    return (
        <>
            <section className="py-8 md:py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    {/* Header */}
                    <div className="text-left mb-8 sm:flex sm:items-center sm:gap-8">
                        <div className="text-[55px] font-bold text-primary text-opacity-50">20+</div>
                        <h1 className="text-[29px] font-bold text-[#4E204E]">
                            Treatments Available
                        </h1>
                    </div>

                    {/* Treatment Categories */}
                    <div className="flex justify-center mb-8">
                        <div className='bg-pink-100 p-1 rounded-full'>
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabClick(tab.id)}
                                    className={`px-4 md:px-0 py-[6px] sm:py-2 rounded-full font-semibold text-[14px] sm:text-sm transition-colors w-[96px] ${activeTab === tab.id
                                        ? 'bg-[#4E204E] text-white'
                                        : 'text-[#4E204E] hover:bg-pink-50'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Version - Slider with 2 cards initially visible */}
                    <div className="sm:hidden">
                        <div className="overflow-x-auto">
                            <div className="flex space-x-4 pb-4" style={{ width: 'max-content' }}>
                                {filteredTreatments.map((treatment) => (
                                    <div key={treatment.id} className="flex-shrink-0 w-[174px]">
                                        <div className="bg-[#FFE6F159] p-2 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[374px]">
                                            {/* Image container with fixed height */}
                                            <img
                                                src={treatment.image}
                                                alt={treatment.title}
                                                className="w-full h-[116px] object-cover rounded-lg flex-shrink-0"
                                            />

                                            {/* Content container */}
                                            <div className="mt-4 px-1 pb-2 flex-1 flex flex-col">
                                                <h3 className="text-sm font-bold text-[#4E204E] mb-2 line-clamp-2 leading-tight">
                                                    {treatment.title}
                                                </h3>
                                                <p className="text-xs text-gray-600 leading-relaxed flex-1">
                                                    {treatment.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Desktop Version - Carousel Design (>= sm) */}
                    <div className="hidden sm:block relative ">
                        <div className="overflow-hidden">
                            <div
                                className="flex transition-transform duration-300 ease-in-out"
                                style={{ transform: `translateX(-${currentIndex * 50}%)` }}
                            >
                                {filteredTreatments.map((treatment) => (
                                    <div key={treatment.id} className="flex-shrink-0 w-1/2 ">
                                        <div className="bg-[#FFE6F159] rounded-2xl  overflow-hidden mx-6 h-[380px] flex flex-col">
                                            {/* Image container */}
                                            <div className="h-[180px] relative overflow-hidden p-4">
                                                <img
                                                    src={treatment.image}
                                                    alt={treatment.title}
                                                    className='w-full h-[164px] object-cover rounded-2xl'
                                                />
                                            </div>

                                            {/* Content container */}
                                            <div className="p-6">
                                                <div>
                                                    <h3 className="text-[22px] font-bold text-[#333333] mb-4 line-clamp-2">
                                                        {treatment.title}
                                                    </h3>
                                                    <p className="text-[16px] text-[#333333] leading-relaxed line-clamp-5">
                                                        {treatment.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Arrows - Only show if there are more than 2 items */}
                        {filteredTreatments.length > 2 && (
                            <div className='absolute -top-40 right-6 flex gap-4'>
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
                        )}
                    </div>

                    {/* Bottom CTA Section */}
                    <div className="text-center mt-4 md:mt-10 mb-4">
                        <div className="text-[18px] sm:text-lg font-semibold text-[#4E204E] mb-4 px-4">
                            Confused <br className='visible md:hidden' /> Which Treatment is Best for You?
                        </div>
                        
                                                <>
                            {/* Desktop: Show popup button */}
                            <button
                                className="hidden md:flex text-white px-10 sm:px-8 py-3 rounded-full font-medium text-base sm:text-lg transition-shadow items-center space-x-2 mx-auto"
                                style={{ backgroundColor: '#F77B2F' }}
                                onClick={() => setShowPopup(true)}
                            >
                                <img src='/images/lp/maxlp/white-call-icon.png' width={21} height={21} />
                                <span className='text-[18px]'>Talk to an Expert</span>
                            </button>
                            
                            {/* Mobile: Show phone link */}
                            <a
                                href={isQuoraPage ? "#leadformlp3" : `tel:${phoneNumber.replace(/\s|-/g, '')}`}
                                onClick={(e) => {
                                    if (!isQuoraPage) return;
                                    e.preventDefault();
                                    scrollToLeadForm();
                                }}
                                className="md:hidden flex w-fit items-center justify-center gap-2 text-white px-10 sm:px-8 py-3 rounded-full font-medium text-base sm:text-lg transition-shadow mx-auto"
                                style={{ backgroundColor: '#F77B2F' }}
                            >
                                <img
                                    src="/images/lp/maxlp/white-call-icon.png"
                                    width={21}
                                    height={21}
                                    className="object-contain"
                                    alt="Call"
                                />
                                <span className="text-[18px] leading-none">Talk to an Expert</span>
                            </a>
                        </>
                    </div>
                </div>
            </section >
            
            {/* Consultation Popup */}
            
                <MaxGooglePeekBoo
                    isOpen={showPopup}
                    onClose={() => setShowPopup(false)}
                />
            ) : (
        </>
    );
};

export default MaxTreatment;