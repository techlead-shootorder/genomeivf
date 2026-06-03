'use client'
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import MaxReviewBar from '@/app/components/MaxReviewBar'

const MaxCenters = () => {
    return (
        <section id='Locations' className="bg-gray-50 py-8 md:py-16 relative">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-left mb-8 md:flex md:items-center md:gap-8">
                    <div className="text-[55px] md:text-5xl font-bold text-secondary">Our Center</div>
                    <h2 className="text-[29px] font-bold text-[#2B5F8A] md:mt-2">
                        Genome - The Fertility Centre
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Left Side: Address */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm h-full flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-[#1E4A6E] mb-4">Genome Kolkata</h3>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            61-E, Sarat Bose Rd, <br />
                            beside motor vehicle stoppage, <br />
                            Paddapukur, Bhowanipore, <br />
                            Kolkata, West Bengal 700025
                        </p>
                        <div className="mt-8">
                            <a 
                                href="https://www.google.com/maps/dir//Genome,+61-E,+Sarat+Bose+Rd,+beside+motor+vehicle+stoppage,+Paddapukur,+Bhowanipore,+Kolkata,+West+Bengal+700025" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-[#E8772E] font-semibold hover:underline"
                            >
                                Get Directions <ChevronRight className="ml-1 w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Right Side: Map */}
                    <div className="w-full rounded-2xl overflow-hidden shadow-sm h-[450px]">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.324040255141!2d88.3526759!3d22.529531099999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02771e26ef93f1%3A0x537b13c3077bb7aa!2sGenome!5e0!3m2!1sen!2sin!4v1779801931102!5m2!1sen!2sin" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>

            <MaxReviewBar />
        </section>
    )
}

export default MaxCenters