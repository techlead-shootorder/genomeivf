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
                rating: 5,
                date: "a year ago",
                title: "Immense care and wonderful treatment",
                content: "Since 2020 I along with my wife Mousumi Ray got attached with Genome Fertility Centre. My wife was under the treatment of Dr Sujoy Dasgupta sir, and with his immense care and wonderful treatment, we had a great experience.",
                author: "Satyajit Ray",
                clientId: "GEN0072311"
            },
            {
                id: 2,
                rating: 5,
                date: "a year ago",
                title: "Exceptional care and expertise",
                content: "We had an incredible experience at Genome Kolkata, thanks to Dr. Sohini Munshi's exceptional care and expertise. Despite the initial complications, she handled our situation with utmost efficiency and compassion.",
                author: "J.Ghosh",
                clientId: "GEN0072312"
            },
            {
                id: 3,
                rating: 5,
                date: "a year ago",
                title: "One of the best experiences",
                content: "Had such a great experience here! Everyone was super friendly and made me feel really welcome from the start. The staffs and the doctor are really awesome — they were always helpful and made sure I was comfortable.",
                author: "Dhana chandra",
                clientId: "GEN0072313"
            },
            {
                id: 4,
                rating: 5,
                date: "11 months ago",
                title: "Best Infertility centre in Kolkata",
                content: "Genome is best Infertility centre among Kolkata. Dr Sohini Munsi is a good doctor. All staff of Genome is very Helpfull. We are thankful to Genome for Our Success.",
                author: "Rachana Bera",
                clientId: "GEN0072314"
            },
            {
                id: 5,
                rating: 5,
                date: "a year ago",
                title: "Exclusive service and affordable",
                content: "We are grateful for Genome the fertility (Kolkata) to provide exclusive service in our pregnancy journey. Dr. Sujay Dasgupta Sir is like God to us and other supportive staffs are very nice. Genome provided affordable price to help us.",
                author: "Biplab Paul",
                clientId: "GEN0072315"
            },
            {
                id: 6,
                rating: 5,
                date: "2 years ago",
                title: "Blessed with a baby girl",
                content: "Thanks to Genome and Dr. Sujoy Dasgupta as we have been blessed with a baby girl. The staff at Genome were very professional and helped us to a great extent. Extremely grateful for the service.",
                author: "Shatarupa Bhattacharya",
                clientId: "GEN0072316"
            },
            {
                id: 7,
                rating: 5,
                date: "3 years ago",
                title: "Amazing and compassionate process",
                content: "My sister was treated by Dr. Sujoy Dasgupta at Genome and he was really amazing. He helped her get pregnant after years of trying, and he was really kind and compassionate throughout the process. Highly recommend him.",
                author: "Sreya Das",
                clientId: "GEN0072317"
            },
            {
                id: 8,
                rating: 5,
                date: "a year ago",
                title: "Helpful counselor and staff",
                content: "Excellent Service. After 2 months we started our treatment under doctor Sabnam Parvin at Kolkata. Counselor and Other staff is very helpful and the journey was smooth.",
                author: "Babu Malik",
                clientId: "GEN0072318"
            },
            {
                id: 9,
                rating: 5,
                date: "2 years ago",
                title: "Incredible experience and guidance",
                content: "My experience with Genome centre is incredible. The staff is very friendly, my query regarding the treatment was well attended. Today we are blessed with beautiful baby girls with the proper guidance from Dr. Prajnanika Gurung.",
                author: "srijana thapa",
                clientId: "GEN0072319"
            },
            {
                id: 10,
                rating: 5,
                date: "3 years ago",
                title: "Trusted destination for couples",
                content: "Genome is truly a trusted destination for childless married couples. Outstanding patient centric approach & absolutely transparent, ethical & rational treatment protocol. We are really touched with their behaviour.",
                author: "Tripti Roychowdhury",
                clientId: "GEN0072320"
            },
        ],

        IVM: [
            {
                id: 1,
                rating: 5,
                date: "2 years ago",
                title: "Professional and helpful team",
                content: "Thanks to Genome we have been blessed with a child. We have been trying to conceive for some time. Doctors, support staff at Genome all have been very professional and helped us to a great extent.",
                author: "Amit Pal",
                clientId: "GEN0013472"
            },
            {
                id: 2,
                rating: 5,
                date: "4 years ago",
                title: "Comforting experience",
                content: "My experience at Genome was quite comforting. The staff and the doctors were helpful and ensured proper care of me. They made my dreams of expanding my family come true.",
                author: "DEBOJYOTI ROYCHOWDHURY",
                clientId: "GEN0015293"
            },
            {
                id: 3,
                rating: 5,
                date: "3 years ago",
                title: "Approachable and informed",
                content: "The assistance that I received from Genome The Fertility Centre is incredible. Dr. Sujoy Dasgupta and the staff were approachable and ensured that I am properly informed about my problem and treatment.",
                author: "Shreya Damani",
                clientId: "GEN0019814"
            },
            {
                id: 4,
                rating: 5,
                date: "3 years ago",
                title: "Constant support through IVF",
                content: "We are recently blessed with a healthy baby boy and this has been possible for the constant support and IVF treatment by Genome. Highly recommended for fertility care.",
                author: "Milon Dutta",
                clientId: "GEN0017538"
            },
            {
                id: 5,
                rating: 5,
                date: "3 years ago",
                title: "God sent for me",
                content: "Genome was a god sent for me. I was 41 and wanted to be a mother desperately. The folks at Genome were kind, skilled and so supportive - specially Dr. Gurung.",
                author: "Rhia Keridwen",
                clientId: "GEN0016381"
            },
            {
                id: 6,
                rating: 5,
                date: "3 years ago",
                title: "High quality patient care",
                content: "My elder sister consulted with Dr. Sabnam Parvin, reproductive medicine specialist. Doctor clears every query of her and treats her very well. Well behaviour of all staffs and doctors.",
                author: "Paramita Bhattacharjee",
                clientId: "GEN0010945"
            },
            {
                id: 7,
                rating: 5,
                date: "4 years ago",
                title: "Talented and patient-friendly doctor",
                content: "Thanks to Genome for their best services. I was Dr Sujoy Dasgupta's patient, he is a very talented, patient friendly doctor. He is the best in his field.",
                author: "Avijit Debnath",
                clientId: "GEN0014277"
            },
            {
                id: 8,
                rating: 5,
                date: "3 years ago",
                title: "Great economical centre",
                content: "A great economical centre for IVF patient. Specially Dr. Sabnam Parvin, her treatment is outstanding. 24*7 emergency helpline open and also good services.",
                author: "Pradip Bhattacharya",
                clientId: "GEN0017284"
            },
            {
                id: 9,
                rating: 5,
                date: "3 years ago",
                title: "Efficient and helpful staff",
                content: "Dr. Prajnanika Gurung treated my aunt very well. She advised tests for more details. Genome is a good hospital, the doctors are very efficient, and also staff is very helpful.",
                author: "Ashmit Boral",
                clientId: "GEN0016152"
            },
            {
                id: 10,
                rating: 5,
                date: "a year ago",
                title: "Grateful for second motherhood",
                content: "I am very grateful to Genome, Dr. Sujoy Dasgupta sir and the entire team of Genome for giving me the taste of motherhood for the second time. 🙏🙏🙏",
                author: "Tithi S",
                clientId: "GEN0012039"
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
                        <div className="text-[55px] md:text-5xl font-bold text-secondary md:mb-2">70,000+</div>
                        <h2 className="text-[29px] md:text-3xl font-bold text-[#1E4A6E]">
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
                                    ? 'bg-[#1E4A6E] text-white'
                                    : 'border border-[#1E4A6E] text-[#1E4A6E]'
                                    }`}
                            >
                                IVF Treatment
                            </button>
                            <button
                                onClick={() => setActiveTab('IVM')}
                                className={`px-6 py-1 rounded-full font-bold transition-colors ${activeTab === 'IVM'
                                    ? 'bg-[#1E4A6E] text-white'
                                    : 'border border-[#1E4A6E] text-[#1E4A6E]'
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
                                        <div className="font-semibold text-[#1E4A6E]">{review.author}</div>
                                        <div className="text-[#1E4A6E] text-sm ">Client ID: {review.clientId}</div>
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
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 flex items-center justify-center border border-[#1E4A6E] rounded-full w-[30px] h-[30px] transition-colors z-10"
                    >
                        <ChevronLeft className="w-[20px] h-[26px] text-[#1E4A6E]" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 flex items-center justify-center border border-[#1E4A6E] rounded-full w-[30px] h-[30px] transition-colors z-10"
                    >
                        <ChevronRight className="w-[20px] h-[26px] text-[#1E4A6E]" />
                    </button>

                    {/* Dots Indicator */}
                    {/* <div className="flex justify-center mt-6 space-x-2">
                        {Array.from({ length: Math.max(1, currentReviews.length - 1) }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-[#1E4A6E]' : 'bg-gray-300'
                                    }`}
                            />
                        ))}
                    </div> */}
                </div>

                {!hideEbook && (
                    <div className="text-center mt-4 md:mt-2">
                        <div className="text-[18px] sm:text-lg font-semibold text-[#1E4A6E] mb-4 px-4">
                            Preparing for IVF? <br className='visible md:hidden' />Follow This Simple Step-by-Step Guide
                        </div>
                        <button
                            className="flex text-white px-10 sm:px-8 py-3 rounded-full font-medium text-base sm:text-lg transition-shadow items-center space-x-2 mx-auto"
                            style={{ backgroundColor: '#E8772E' }}
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