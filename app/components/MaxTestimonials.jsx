"use client";
import React, { useState, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MaxTabs from '@/app/components/MaxTabs'
import MaxFertilityMessage from './Maxfertilitymessage';

// Static gallery images from all centers
const galleryImages = [
    { id: 1, image: "/images/gallery/Hyderabad/01.webp", title: "1st attempt", subtitle: "Healthy Baby", count: "1/17" },
    { id: 2, image: "/images/gallery/Gachibowli/01.webp", title: "1st attempt", subtitle: "Healthy Baby", count: "2/17" },
    { id: 3, image: "/images/gallery/Dilshuknagar/01.webp", title: "1st attempt", subtitle: "Healthy Baby", count: "3/17" },
    { id: 4, image: "/images/gallery/Vijayawada/01.webp", title: "1st attempt", subtitle: "Healthy Baby", count: "4/17" },
    { id: 5, image: "/images/gallery/Vizag/01.webp", title: "1st attempt", subtitle: "Healthy Baby", count: "5/17" },
    { id: 6, image: "/images/gallery/Guntur/01.webp", title: "1st attempt", subtitle: "Healthy Baby", count: "6/17" },
    { id: 7, image: "/images/gallery/Hanamkonda/01.webp", title: "1st attempt", subtitle: "Healthy Baby", count: "7/17" },
    { id: 8, image: "/images/gallery/Pune/01.webp", title: "1st attempt", subtitle: "Healthy Baby", count: "8/17" },
    { id: 9, image: "/images/gallery/Wakad/01.webp", title: "1st attempt", subtitle: "Healthy Baby", count: "9/17" },
    { id: 10, image: "/images/gallery/Kharadi/01.webp", title: "1st attempt", subtitle: "Healthy Baby", count: "10/17" },
    { id: 11, image: "/images/gallery/Nashik/01.webp", title: "1st attempt", subtitle: "Healthy Baby", count: "11/17" },
    { id: 12, image: "/images/gallery/Ongole/01.webp", title: "1st attempt", subtitle: "Healthy Baby", count: "12/17" },
    { id: 13, image: "/images/gallery/Uppal/01.webp", title: "1st attempt", subtitle: "Healthy Baby", count: "13/17" },
    { id: 14, image: "/images/gallery/Secunderabad/1.webp", title: "1st attempt", subtitle: "Healthy Baby", count: "14/17" },
    { id: 15, image: "/images/gallery/Kurnool/1.webp", title: "1st attempt", subtitle: "Healthy Baby", count: "15/17" },
    { id: 16, image: "/images/gallery/Ranchi/1.webp", title: "1st attempt", subtitle: "Healthy Baby", count: "16/17" },
    { id: 17, image: "/images/gallery/Hyderabad/02.webp", title: "1st attempt", subtitle: "Healthy Baby", count: "17/17" },
];

const MaxTestimonials = () => {

    const [currentIndex, setCurrentIndex] = useState(0);

    // Memoize the max value calculation
    const maxIndex = useMemo(() => Math.max(1, galleryImages.length - 3), []);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % maxIndex);
    }, [maxIndex]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + maxIndex) % maxIndex);
    }, [maxIndex]);

    return (
        <section id='Happy Families' className="pb-14">

            <MaxTabs />

            <MaxFertilityMessage />

            <div className="max-w-7xl mx-auto px-4">
                {/* Tab Content */}
                <div className="text-left sm:text-center">
                    <div className='mb-4'>
                        <div className='flex flex-col sm:flex-row sm:items-center sm:gap-8'>
                            <div className="text-[55px] md:text-[55px] font-bold mt-3 text-secondary">70,000+</div>
                            <div className="text-[29px] font-bold mb-2 text-[#2B5F8A]">
                                Families <span className="font-normal">We&apos;ve Helped Create</span>
                                <div className="text-[14px] opacity-90 text-[#2B5F8A] text-left">Many couples experience positive outcomes in their early treatment cycles</div>
                            </div>
                        </div>

                        {/* below div for the carousel  arrows in desktop version*/}
                        <div>

                        </div>

                    </div>

                    {/* Mobile Version - Horizontal Scroll (for screens < sm) */}
                    <div className="sm:hidden overflow-x-auto">
                        <div className="flex space-x-4 pb-4" style={{ width: 'max-content' }}>
                            {galleryImages.map((testimonial) => (
                                <div key={testimonial.id} className="flex-shrink-0 w-[300px] h-[300px]">
                                    <div className="relative rounded-lg overflow-hidden shadow-lg">
                                        <div className="relative">
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.title}
                                                className="w-full object-cover"
                                            />
                                            <div className="absolute top-2 right-[18px] bg-[#1E4A6E] bg-opacity-50 text-white px-2 py-[2px] rounded-full text-sm">
                                                {testimonial.count}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Desktop Version - Carousel with Navigation (for screens >= sm) */}
                    <div className="hidden sm:block relative">
                        <div className="overflow-hidden">
                            <div
                                className="flex transition-transform duration-300 ease-in-out"
                                style={{ transform: `translateX(-${currentIndex * 25}%)` }}
                            >
                                {galleryImages.map((testimonial) => (
                                    <div key={testimonial.id} className="flex-shrink-0 w-1/4 px-2 ">
                                        <div className="bg-white rounded-lg overflow-hidden shadow-lg mx-2">
                                            <div className="relative">
                                                <img
                                                    src={testimonial.image}
                                                    alt={testimonial.title}
                                                    className="w-full md:[280px] lg:h-[300px] object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        <div className='absolute -top-20 right-6 flex gap-4'>
                            <button
                                onClick={prevSlide}
                                className="flex items-center justify-center border border-[#1E4A6E] rounded-full w-[30px] h-[30px] transition-colors z-10"
                            >
                                <ChevronLeft className="w-[20px] h-[26px] text-[#1E4A6E]" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="flex items-center justify-center border border-[#1E4A6E] rounded-full w-[30px] h-[30px] transition-colors z-10"
                            >
                                <ChevronRight className="w-[20px] h-[26px] text-[#1E4A6E]" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MaxTestimonials;