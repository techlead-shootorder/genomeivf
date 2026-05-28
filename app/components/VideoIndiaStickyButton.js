"use client";
import React, { useState, useEffect } from "react";
import MaxGooglePeekBoo from './MaxGooglePeekBoo'; // Import the separate component


const MaxFooterSitckyButton = ({ center, service, refferal = false, isMeta, meta = false }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

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

    const handleScroll = () => {
        if (window.scrollY > 650) { // Adjust scroll threshold as needed
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // const scrollToForm = () => {
    //     const formElement = document.getElementById("heroBannerHeading");
    //     formElement.scrollIntoView({ behavior: "smooth" });
    // };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleClick = (e) => {
        if (isQuoraPage) {
            e.preventDefault();
            scrollToLeadForm();
            return;
        }
        e.preventDefault();
        setShowPopup(true);
    }

    return (
        <div className={`fixed bottom-0 left-0 w-full z-50 md:hidden transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-[98%] mx-auto">
                {/* <NotificationBarlp3 hide={false} /> */}
                <a
                    href={isQuoraPage ? "#leadformlp3" : "tel:+919513736482"}
                    onClick={(e) => {
                        if (!isQuoraPage) return;
                        e.preventDefault();
                        scrollToLeadForm();
                    }}
                    className="bg-[#471847] flex justify-between items-center text-white py-2 px-2 rounded-full"
                >
                    <button
                       onClick={handleClick}
                        className="pl-8"
                    >
                        <div className="flex items-center justify-center gap-2 ">
                            <img src="/images/lp/maxlp/call icon.png" width={16} height={16} />
                            <p className="text-md font-semibold">Get Call Back</p>
                        </div>
                        <p className="text-[12px] p-0 leading-none font-normal">within 1 min</p>
                    </button>
                    <button
                       
                        className="bg-orange-500 rounded-full p-3 flex justify-center items-center gap-2"
                    >
                        <img src="/images/lp/maxlp/call icon.png" width={16} height={16} />
                        <p className="font-semibold">Talk to Expert</p>
                    </button>



                </a>

               
            </div>

            {/* Consultation Popup */}
           { isMeta ?
                <MaxGooglePeekBoo
                    isOpen={showPopup}
                    onClose={() => setShowPopup(false)}
                />
                :
                <MaxPeekBooPopup
                    isOpen={showPopup}
                    onClose={() => setShowPopup(false)}
                />
            }
        </div>
    );
};

export default MaxFooterSitckyButton;
