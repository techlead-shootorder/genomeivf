"use client";
import React, { useState, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MaxTabs from '@/app/components/MaxTabs'
import MaxFertilityMessage from './Maxfertilitymessage';

// Static gallery images for India LP (default set)
const galleryImages = [
    { id: 3, image: "/images/home/gallery/3.webp", title: "1st attempt", subtitle: "Healthy Baby", count: "3/12" },
    { id: 5, image: "/images/home/gallery/5.webp", title: "1st attempt", subtitle: "Healthy Baby", count: "5/12" },
    { id: 6, image: "/images/home/gallery/6.webp", title: "1st attempt", subtitle: "Healthy Baby", count: "6/12" },
    { id: 7, image: "/images/home/gallery/7.webp", title: "1st attempt", subtitle: "Healthy Baby", count: "7/12" },
    { id: 8, image: "/images/home/gallery/8.webp", title: "1st attempt", subtitle: "Healthy Baby", count: "8/12" },
    { id: 9, image: "/images/home/gallery/9.webp", title: "1st attempt", subtitle: "Healthy Baby", count: "9/12" },
    { id: 10, image: "/images/home/gallery/10.webp", title: "1st attempt", subtitle: "Healthy Baby", count: "10/12" },
    { id: 11, image: "/images/home/gallery/11.webp", title: "1st attempt", subtitle: "Healthy Baby", count: "11/12" },
    { id: 12, image: "/images/home/gallery/12.webp", title: "1st attempt", subtitle: "Healthy Baby", count: "12/12" },
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
                            <div className="text-[55px] md:text-[55px] font-bold mt-3 text-primary text-opacity-50">1,15,000+</div>
                            <div className="text-[29px] font-bold mb-2 text-[#692F69]">
                                Families <span className="font-normal">We&apos;ve Helped Create</span>
                                <div className="text-[14px] opacity-90 text-[#692F69] text-left">Many couples experience positive outcomes in their early treatment cycles</div>
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
                                            <div className="absolute top-2 right-[18px] bg-[#471847] bg-opacity-50 text-white px-2 py-[2px] rounded-full text-sm">
                                                {testimonial.count}
                                            </div>
                                        </div>
                                        <div className="absolute bottom-4 w-fit mb-4 p-2 text-white bg-[#471847] bg-opacity-60 rounded-tr-full rounded-br-full">
                                            <div className="flex items-center">
                                                <div className="px-3 py-1 rounded-full text-[17px] font-medium">
                                                    {testimonial.title}
                                                </div>
                                                |
                                                <div className="px-3 py-1 rounded-full text-[17px] font-medium">
                                                    {testimonial.subtitle}
                                                </div>
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
                                            <div className="absolute bottom-4 w-fit mb-4 p-2 text-white bg-primary bg-opacity-50 rounded-tr-full rounded-br-full">
                                                <div className="flex items-center text-nowrap">
                                                    <div className="px-3 py-1 rounded-full text-sm font-medium">
                                                        {testimonial.title}
                                                    </div>
                                                    |
                                                    <div className="px-3 py-1 rounded-full text-sm font-medium">
                                                        {testimonial.subtitle}
                                                    </div>
                                                </div>
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
                </div>
            </div>
        </section>
    );
};

export default MaxTestimonials;