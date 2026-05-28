"use client"
import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import MaxBookPopupInstant from './MaxBookPopupInstant'



const ReviewsSection = ({ hideEbook = false }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('IVF');
    const [showBookInstantPopup, setShowBookInstantPopup] = useState(false);

    const reviewsData = {
        IVF: [
            {
                id: 1,
                rating: 4.5,
                date: "May 25 : 10AM",
                title: "Supportive throughout the journey",
                content: "I had so many doubts before starting IVF, but the doctor at Oasis Fertility patiently explained every step. Thanks for the support throughout my IVF journey.",
                author: "Bhavana Karthik",
                clientId: "OASIS0072311"
            },
            {
                id: 2,
                rating: 5,
                date: "May 25 : 10:30AM",
                title: "Gentle and reassuring staff",
                content: "IVF injections were scary at first, but the nurses at Oasis Fertility were so gentle and reassuring. I felt confident after the doctor and team explained me about the process and every step.",
                author: "Divya Menon",
                clientId: "OASIS0072312"
            },
            {
                id: 3,
                rating: 5,
                date: "May 25 : 11AM",
                title: "Very smooth IVF experience",
                content: "My IVF at Oasis was very smooth. I appreciate how the doctors and staff at Oasis Fertility made it a really comfortable experience.",
                author: "Meenakshi Sreenivas",
                clientId: "OASIS0072313"
            },
            {
                id: 4,
                rating: 4.5,
                date: "May 25 : 11:30AM",
                title: "Updated lab and caring team",
                content: "During IVF, the embryo development stage made me anxious if the lab standards would be good or what if they get mixed. But at Oasis they have advanced labs and the team kept us updated. It meant a lot.",
                author: "Vidya Rajasekar",
                clientId: "OASIS0072314"
            },
            {
                id: 5,
                rating: 5,
                date: "May 25 : 12PM",
                title: "Blessed with twins!",
                content: "Thanks to the experienced team at Oasis Fertility, my IVF treatment went perfectly. We are so happy whenever we see our kids. We have been blessed with twins. Thanks again Oasis Fertility for everything. I recommend Oasis to everyone who wants to have kids.",
                author: "Savitha Elango",
                clientId: "OASIS0072315"
            },
            {
                id: 6,
                rating: 5,
                date: "May 25 : 12:30PM",
                title: "Counselling and care helped us",
                content: "The toughest part of IVF was the two-week wait after embryo transfer. Oasis Fertility's counselling helped us stay calm and positive and we are so happy that our test results came positive. We are very happy and can't wait to hold our baby. Thanks to Oasis.",
                author: "Sayali Deshmukh",
                clientId: "OASIS0072316"
            },
            {
                id: 7,
                rating: 5,
                date: "May 25 : 1PM",
                title: "Dream of baby came true",
                content: "Thank you, Oasis Fertility, for making our dream of having a baby come true. We had miscarriages previously, and thought we might never have kids. But the doctors at Oasis changed it. IVF at Oasis is safe.",
                author: "Pallavi Jadhav",
                clientId: "OASIS0072317"
            },
            {
                id: 8,
                rating: 4.5,
                date: "May 25 : 1:30PM",
                title: "Grateful after failed IVF cycles",
                content: "I had 2 failed IVF cycles elsewhere and I was confused about trying again. But after meeting with the doctor at Oasis Fertility it gave me and my husband a hope, and this time IVF worked. Really grateful and thankful to Oasis team.",
                author: "Ipsita Panda",
                clientId: "OASIS0072318"
            },
            {
                id: 9,
                rating: 5,
                date: "May 25 : 2PM",
                title: "Positive reviews led us here",
                content: "We chose Oasis for IVF after hearing positive reviews, and we're glad we did. From start to finish, they were exceptional.",
                author: "Jinal Patel",
                clientId: "OASIS0072319"
            },
            {
                id: 10,
                rating: 4.5,
                date: "May 25 : 2:30PM",
                title: "Smooth journey and expert team",
                content: "IVF is an emotional journey, but Oasis Fertility made it smoother with their expert team and constant care. Highly recommended!",
                author: "Chaitra Nagesh",
                clientId: "OASIS0072320"
            },
        ],

        IVM: [
            {
                id: 1,
                rating: 5,
                date: "May 24 : 10AM",
                title: "Smooth IVM experience with PCOS",
                content: "I have PCOS and I was nervous about IVM treatment, but doctor and the team at Oasis Fertility made me feel so comfortable. From the initial consultation to egg collection, everything was so smooth. Thank you Oasis.",
                author: "Ananya Sharma",
                clientId: "OASIS0013472"
            },
            {
                id: 2,
                rating: 4.5,
                date: "May 24 : 10:30AM",
                title: "Grateful for guidance and support",
                content: "We chose IVM due to hormonal sensitivity. The doctor explained every step clearly. The nurses were very helpful and supporting. We are now pregnant and can't wait to hold our baby. We are always grateful to Oasis.",
                author: "Sneha Rao",
                clientId: "OASIS0015293"
            },
            {
                id: 3,
                rating: 4.5,
                date: "May 24 : 11AM",
                title: "Referred and satisfied with treatment",
                content: "A friend of ours suggested we try Oasis. At first we were very tensed and were not really sure. But our journey at Oasis was smooth. Oasis staff is super kind and skilled.",
                author: "Priya Nair",
                clientId: "OASIS0019814"
            },
            {
                id: 4,
                rating: 5,
                date: "May 24 : 11:30AM",
                title: "Effective for PCOS",
                content: "IVM worked well for me as I had PCOS. I recommend it to all women who are suffering with PCOS. The low medication and very less injections made the entire process easy and painless. Doctors at Oasis guided me so well they explained every detail.",
                author: "Meenakshi Pillai",
                clientId: "OASIS0017538"
            },
            {
                id: 5,
                rating: 5,
                date: "May 24 : 12PM",
                title: "Treated like family",
                content: "From Day 1, Oasis staff treated us like family, Doctor and counselor support was amazing. We're so thankful for their constant support and encouragement.",
                author: "Sunita Joshi",
                clientId: "OASIS0016381"
            },
            {
                id: 6,
                rating: 4.5,
                date: "May 24 : 12:30PM",
                title: "IVM was the perfect alternative",
                content: "I was scared of injections, and IVM was the perfect alternative. The entire process felt so easy thanks to the doctor's guidance and support. We are happy parents to a girl baby.",
                author: "Anandhi Venkatesh",
                clientId: "OASIS0010945"
            },
            {
                id: 7,
                rating: 5,
                date: "May 24 : 1PM",
                title: "Made a big difference",
                content: "I never thought I could go through fertility treatment, but IVM at Oasis was so manageable. The counseling before and after each step made a big difference.",
                author: "Anjali Reddy",
                clientId: "OASIS0014277"
            },
            {
                id: 8,
                rating: 5,
                date: "May 24 : 1:30PM",
                title: "Drug Free IVF worked",
                content: "I have PCOD and though IVF would be the only way I could pregnant but Drug Free IVF was something we didn't know about before. Oasis doctors made the whole journey stress-free. So grateful! Now we have a beautiful baby boy.",
                author: "Revathi Ramesh",
                clientId: "OASIS0017284"
            },
            {
                id: 9,
                rating: 4.5,
                date: "May 24 : 2PM",
                title: "Minimal medication, great care",
                content: "Minimal medication, great care is what IVM at Oasis is. I was treated with care and so much compassion at Oasis right from Day 1. The follow-up and constant support from the team was very relieving.",
                author: "Lakshmi Priya Nair",
                clientId: "OASIS0016152"
            },
            {
                id: 10,
                rating: 5,
                date: "May 24 : 2:30PM",
                title: "Hope and blessings",
                content: "The staff, the clinic environment, and the process everything at Oasis Fertility was top-notch. IVM gave us hope without IVF as we were tensed about the IVF process. Forever thankful to team Oasis as we are now blessed with a baby boy.",
                author: "Keerthana Rajan",
                clientId: "OASIS0012039"
            }
        ]

    };

    const currentReviews = reviewsData[activeTab];

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % Math.max(1, currentReviews.length - 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + Math.max(1, currentReviews.length - 1)) % Math.max(1, currentReviews.length - 1));
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => {
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 !== 0;
            
            if (index < fullStars) {
                // Full star
                return (
                    <Star
                        key={index}
                        className="w-4 h-4 text-orange-400 fill-orange-400"
                    />
                );
            } else if (index === fullStars && hasHalfStar) {
                // Half star
                return (
                    <div key={index} className="relative w-4 h-4">
                        <Star className="w-4 h-4 text-gray-300 fill-gray-300 absolute" />
                        <div className="overflow-hidden absolute" style={{ width: '50%' }}>
                            <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                        </div>
                    </div>
                );
            } else {
                // Empty star
                return (
                    <Star
                        key={index}
                        className="w-4 h-4 text-gray-300 fill-gray-300"
                    />
                );
            }
        });
    };

    return (
        <section id='Reviews' className="py-10 md:pb-16 md:pt-28">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}

                <div className='flex flex-col sm:flex-row sm:justify-between'>
                    <div className="text-left mb-8">
                        <div className="text-[55px] md:text-5xl font-bold text-primary text-opacity-50 md:mb-2">60,000+</div>
                        <h2 className="text-[29px] md:text-3xl font-bold text-[#471847]">
                            Verified Reviews
                        </h2>

                    </div>

                    {/* Mobile rating platforms section */}
                    <div className="md:hidden px-4 py-2 border border-[#FFC5DF] bg-[#fff6fa] w-[354px] flex items-center gap-4 rounded-full w-fit mb-10">
                        {/* Logo group with overlap */}
                        <div className="relative w-[60px] h-[35px]">
                            <img
                                src="/images/lp/maxlp/practo-white-icon.png"
                                className="absolute top-0 left-0 z-[5]"
                                width={36}
                                height={36}
                                alt="Practo"
                            />
                            <img
                                src="/images/lp/maxlp/fb-icon.png"
                                className="absolute top-0 left-[12px] z-[6]"
                                width={36}
                                height={36}
                                alt="Facebook"
                            />
                            <img
                                src="/images/lp/maxlp/google-icon.png"
                                className="absolute top-0 left-[32px] z-[7]"
                                width={36}
                                height={36}
                                alt="Google"
                            />
                        </div>

                        {/* Rating */}
                        <h2 className="text-[24px] mt-1 font-semibold text-gray-800">4.8</h2>

                        {/* Stars */}
                        <img
                            src="/images/lp/maxlp/review-star.png"
                            width={133}
                            height={19}
                            alt="Stars"
                            className='mr-10'
                        />
                    </div>


                    {/* Tabs */}
                    <div className=''>
                        <div className="flex justify-start md:justify-center space-x-2 mb-2 md:mt-10">
                            <button
                                onClick={() => setActiveTab('IVF')}
                                className={`px-6 py-1 rounded-full font-bold transition-colors ${activeTab === 'IVF'
                                    ? 'bg-[#471847] text-white'
                                    : 'border border-[#471847] text-[#471847]'
                                    }`}
                            >
                                IVF Treatment
                            </button>
                            <button
                                onClick={() => setActiveTab('IVM')}
                                className={`px-6 py-1 rounded-full font-bold transition-colors ${activeTab === 'IVM'
                                    ? 'bg-[#471847] text-white'
                                    : 'border border-[#471847] text-[#471847]'
                                    }`}
                            >
                                IVM Treatment
                            </button>
                        </div>
                    </div>
                </div>




                {/* Mobile Version - Simple Slider */}
                <div className="sm:hidden overflow-x-auto">
                    <div className="flex space-x-4" style={{ width: 'max-content' }}>
                        {currentReviews.map((review) => (
                            <div key={review.id} className="flex-shrink-0 w-80 h-[380px]">
                                <div className="bg-white rounded-lg shadow-md p-6 h-80 flex flex-col mt-8 ml-4" style={{ boxShadow: '0 20px 40px -5px rgba(0, 0, 0, 0.15), 0 8px 16px -200px rgba(0, 0, 0, 0.1)' }}>
                                    {/* Google Icon and Rating */}
                                    <div className="flex items-center space-x-2 mb-3 flex-shrink-0">
                                        <img src='/images/lp/maxlp/google-icon.png' width={30} height={30} />
                                        <div className="flex space-x-1">
                                            {renderStars(review.rating)}
                                        </div>
                                        <span className='mx-4'>|</span>
                                        {/* <span className="text-gray-500 text-sm ml-auto">{review.date}</span> */}
                                    </div>

                                    {/* Title */}
                                    <h3 className="font-bold text-[#333333] mb-3 text-lg flex-shrink-0">{review.title}</h3>

                                    {/* Scrollable Content Area */}
                                    <div className="flex-1 overflow-y-auto mb-4">
                                        <p className="text-[#36474F] text-sm leading-relaxed pr-2">
                                            {review.content}
                                        </p>
                                    </div>

                                    {/* Author */}
                                    <div className="flex-shrink-0">
                                        <div className="font-semibold text-[#4E204E]">{review.author}</div>
                                        <div className="text-[#4E204E] text-sm ">Client ID: {review.clientId}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Desktop Version - Carousel */}
                <div className="hidden sm:block relative h-[400px]">
                    <div className="overflow-hidden" >
                        <div
                            className="flex transition-transform duration-300 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 50}%)` }}

                        >
                            {currentReviews.map((review) => (
                                <div key={review.id} className="flex-shrink-0 w-1/2 px-3 h-[400px]" >
                                    <div className="bg-white rounded-lg p-6 h-full mx-2 mt-10 max-h-[300px] flex flex-col" style={{ boxShadow: '0 20px 40px -5px rgba(0, 0, 0, 0.15), 0 8px 16px -200px rgba(0, 0, 0, 0.1)' }}>
                                        {/* Google Icon and Rating */}
                                        <div className="flex items-center space-x-2 mb-3 flex-shrink-0">
                                            <img src='/images/lp/maxlp/google-icon.png' width={30} height={30} />
                                            <div className="flex space-x-1">
                                                {renderStars(review.rating)}
                                            </div>
                                            {/* <span className='mx-4'>|</span> */}
                                            {/* <span className="text-[#333333] text-sm ml-auto">{review.date}</span> */}
                                        </div>

                                        {/* Title */}
                                        <h3 className="font-bold text-gray-800 mb-3 text-lg flex-shrink-0">{review.title}</h3>

                                        {/* Scrollable Content Area */}
                                        <div className="flex-1 overflow-y-auto mb-4">
                                            <p className="text-gray-600 text-sm leading-relaxed pr-2">
                                                {review.content}
                                            </p>
                                        </div>

                                        {/* Author */}
                                        <div className="flex-shrink-0">
                                            <div className="font-semibold text-gray-800">{review.author}</div>
                                            <div className="text-gray-500 text-sm">Client ID: {review.clientId}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 flex items-center justify-center border border-[#471847] rounded-full w-[30px] h-[30px] transition-colors z-10"
                    >
                        <ChevronLeft className="w-[20px] h-[26px] text-[#471847]" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 flex items-center justify-center border border-[#471847] rounded-full w-[30px] h-[30px] transition-colors z-10"
                    >
                        <ChevronRight className="w-[20px] h-[26px] text-[#471847]" />
                    </button>

                    {/* Dots Indicator */}
                    {/* <div className="flex justify-center mt-6 space-x-2">
                        {Array.from({ length: Math.max(1, currentReviews.length - 1) }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-purple-800' : 'bg-gray-300'
                                    }`}
                            />
                        ))}
                    </div> */}
                </div>

                {!hideEbook && (
                    <div className="text-center mt-4 md:mt-2">
                        <div className="text-[18px] sm:text-lg font-semibold text-[#4E204E] mb-4 px-4">
                            Preparing for IVF? <br className='visible md:hidden' />Follow This Simple Step-by-Step Guide
                        </div>
                        <button
                            className="flex text-white px-10 sm:px-8 py-3 rounded-full font-medium text-base sm:text-lg transition-shadow items-center space-x-2 mx-auto"
                            style={{ backgroundColor: '#F77B2F' }}
                            onClick={() => setShowBookInstantPopup(true)} // Add this onClick handler
                        >
                            <span className='text-[18px]'>Download E-book</span>
                        </button>
                    </div>
                )}


            </div>

            {/* Book Download Popup */}
            <MaxBookPopupInstant
                isOpen={showBookInstantPopup}
                onClose={() => setShowBookInstantPopup(false)}
            />


        </section >
    );
};

export default ReviewsSection;