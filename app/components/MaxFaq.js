"use client"
import { useState } from 'react';
import { FaAngleRight, FaAngleDown } from "react-icons/fa6";

const MaxFaq = ({center}) => {
     const [openDropdown, setOpenDropdown] = useState(null);
    
        const toggleDropdown = (index) => {
            setOpenDropdown(openDropdown === index ? null : index);
        };
    
        const faqData = [
            {
                question: "Is Genome IVF now part of Oasis Fertility?",
                answer:
                    "Yes, Genome IVF is now a part of Oasis Fertility, bringing together trusted fertility expertise and advanced reproductive care.",
            },
            {
                question: "Will the doctors and services remain the same?",
                answer:
                    "Patients can continue to receive trusted fertility care along with access to enhanced technology and a wider fertility network.",
            },
            {
                question: "What fertility treatments are available?",
                answer:
                    "We offer IVF, ICSI, IUI, fertility evaluation, fertility preservation, donor programs, and advanced reproductive treatments.",
            },
            {
                question: "How can I book an appointment?",
                answer:
                    "You can fill out the enquiry form or speak with our fertility experts directly.",
            },
            {
                question: "Do We Need IVF injections & How do They Work?",
                answer:
                    "Yes, IVF injections are safe hormonal medicaltions that are needed to stimulate the ovaries to produce multiple eggs for retrieval and fertilization.",
            },
            {
                question: "What Are The Common Side Effects of IVF Treatment?",
                answer:
                    "Common side effects of IVF treatment include mild bloating, cramping, mood swings, breast tenderness, and reactions at the injection site.",
            },
            {
                question: "How effective is IVF in getting pregnant?",
                answer:
                    "IVF success rates vary by age and individual factors, but on average, it offers a 40–70% chance of pregnancy per cycle with expert care and advanced technology.",
            },
            {
                question: "Is IVF treatment painful?",
                answer:
                    "IVF treatment is generally not painful, but some women may experience mild discomfort from injections, bloating, or cramping during egg retrieval which is manageable with proper care and support.",
            },
        ];

         function capitalizeFirstLetter(str) {
        if (!str) return ""; // handle empty string
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <section id='FAQs' className="bg-blue-50 py-8 md:py-16 relative">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-left mb-8 md:flex md:justify-center md:gap-8 ">
                    <div className="text-[55px] md:text-5xl font-bold text-secondary">FAQs</div>
                    <h2 className="text-[29px] md:text-3xl font-bold text-[#2B5F8A] mb-4 md:mt-3">
                       about Oasis Fertility Genome
                    </h2>
                </div>

                 <div className="mx-auto mt-5 lg:mt-6 max-w-4xl grid divide-y divide-gray-200 divide-y-2">
                {faqData.map((faq, index) => (
                    <div key={'faq-lp-' + index} className="py-4 xl:py-8 last:pb-0">
                        <div
                            className="flex justify-between items-center cursor-pointer gap-5"
                            onClick={() => toggleDropdown(index)}
                        >
                            <h3 className="text-base md:text-[19px] text-black font-semibold">{faq.question}</h3>
                            <span className="text-[16px] md:text-[16px] text-[#333333]">{openDropdown === index ? <FaAngleDown /> : <FaAngleRight />}</span>
                        </div>
                        {openDropdown === index ? <div className="mt-4 text-sm lg:text-base">
                            <p>{faq.answer}</p>
                        </div> : ''}
                    </div>
                ))}
            </div>


            </div>
        </section>
    )
}

export default MaxFaq
