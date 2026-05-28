"use client"
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MaxAward = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const awards = [
        {
            id: 1,
            title: "ET Healthworld IVF Chain of the Year (South) 2021",
            image: "/images/lp/awards/award-1.webp"
        },
        {
            id: 2,
            title: "ET Healthworld IVF Champion of the year (National) 2022",
            image: "/images/lp/awards/award-2.webp"
        },
        
        // {
        //     id: 6,
        //     title: "ET Healthworld IVF Champion of the year 2022",
        //     image: "/images/lp/awards/award-2.png"
        // }
    ];

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % Math.max(1, awards.length - 3));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + Math.max(1, awards.length - 3)) % Math.max(1, awards.length - 3));
    };

    // Helper function to determine if items should be centered
    const shouldCenterItems = () => {
        return awards.length < 4; // For desktop (lg screens)
    };

    const shouldCenterTabletItems = () => {
        return awards.length < 3; // For tablet (md screens)
    };

    return (
        <section id='Awards' className="py-8 md:py-16">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-left mb-8 ">
                    <div className="text-[55px] md:text-5xl font-bold text-primary text-opacity-50">10+</div>
                    <h2 className="text-[26px] md:text-3xl font-bold text-[#692F69] mb-4">
                        Prestigious Awards,
                        Recognized as a Leader in <br />
                        the Fertility Industry
                    </h2>
                </div>

                {/* Mobile Version - Simple Slider */}
                <div className="sm:hidden overflow-x-auto">
                    <div className="flex space-x-4 pb-4" style={{ width: 'max-content' }}>
                        {awards.map((award) => (
                            <div key={award.id} className="flex-shrink-0 w-40">
                                <div className="text-center">
                                    {/* Award Image */}
                                    <div className="mb-3 flex items-center justify-center h-48 rounded-xl overflow-hidden">
                                        <img
                                            src={award.image}
                                            alt={award.title}
                                            className="w-[200px] h-[200px] object-fit"
                                        />
                                    </div>

                                    {/* Award Title */}
                                    <h3 className="text-sm font-semibold text-gray-800 leading-tight">
                                        {award.title}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Desktop Version - Carousel */}
                <div className="hidden sm:block relative">
                    <div className="overflow-hidden">
                        <div
                            className={`flex transition-transform duration-300 ease-in-out ${
                                shouldCenterItems() ? 'justify-center' : ''
                            } ${
                                shouldCenterTabletItems() && !shouldCenterItems() ? 'md:justify-center lg:justify-start' : ''
                            }`}
                            style={{ 
                                transform: shouldCenterItems() || shouldCenterTabletItems() ? 'none' : `translateX(-${currentIndex * 25}%)` 
                            }}
                        >
                            {awards.map((award) => (
                                <div key={award.id} className="flex-shrink-0 md:w-1/3 lg:w-1/4 px-3">
                                    <div className="text-center">
                                        {/* Award Image */}
                                        <div className="mb-4 flex items-center justify-center h-80 rounded-xl overflow-hidden">
                                            <img
                                                src={award.image}
                                                alt={award.title}
                                                className="w-full h-full object-fit"
                                            />
                                        </div>

                                        {/* Award Title */}
                                        <h3 className="text-base font-semibold text-gray-800 leading-tight">
                                            {award.title}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Arrows - Only show if there are enough items to scroll */}
                    {!shouldCenterItems() && !shouldCenterTabletItems() && (
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
                    )}
                    
                    {/* Dots Indicator - Only show if there are enough items to scroll */}
                    {!shouldCenterItems() && !shouldCenterTabletItems() && (
                        <div className="flex justify-center items-center mt-6 space-x-2">
                            {Array.from({ length: Math.max(1, awards.length - 3) }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-[#692F69] w-[20px] h-[20px]' : 'bg-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Disclaimer */}
                <div className=" mt-8 text-sm text-gray-600 flex flex-col md:flex-row md:gap-1 items-center">
                    <span><b>Disclaimer:</b> Highly Awarded IVF</span>
                    <span>Healthcare Clinic Chain in India</span>
                </div>
            </div>
        </section>
    );
};

export default MaxAward;