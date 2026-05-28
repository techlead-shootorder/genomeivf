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
                question: "Do We Need IVF injections & How do They Work?",
                answer:
                    "Yes, IVF injections are safe hormonal medicaltions that are needed to stimulate the ovaries to produce multiple eggs for retrieval and fertilization.",
            },
            {
                question: "What can you expect after IVF treatment? ",
                answer:
                    "After IVF treatment, you can expect a short recovery, followed by a two-week wait to take a pregnancy test and monitor for early pregnancy symptoms.",
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
                question: "How long does IVF take to get pregnant?",
                answer:
                    "IVF typically takes about 4–6 weeks per cycle, from ovarian stimulation to embryo transfer. Pregnancy is usually confirmed about 10–14 days after the embryo transfer.",
            },
            {
                question: "How soon after a failed IVF procedure can you try again?",
                answer:
                    "You can usually try again after one full menstrual cycle or about 4–6 weeks, depending on your doctor's advice and your physical and emotional readiness.",
            },
            {
                question: "Can I select the gender of the baby during IVF?",
                answer:
                    "No, gender selection is illegal in India and not allowed during IVF.",
            },
            {
                question: "What is the best age to get IVF?",
                answer:
                    "The ideal age for IVF is below 35, as success rates are highest when the woman is younger. However, IVF can still be effective for women up to their early 40s with personalized care and advanced techniques.",
            },
            {
                question: "Is IVF treatment painful?",
                answer:
                    "IVF treatment is generally not painful, but some women may experience mild discomfort from injections, bloating, or cramping during egg retrieval which is manageable with proper care and support.",
            },
            {
                question: "Who is eligible for IVF?",
                answer:
                    "IVF is suitable for couples or individuals facing issues like, blocked or damaged fallopian tubes, male infertility (low sperm count or motility) PCOS, unexplained infertility, failed IUI treatments, advanced maternal age.",
            },
            {
                question: "Who is not eligible for IVF?",
                answer:
                    "Unmarried couples, same-sex couples, single men, foreign nationals (except OCI card holders), women aged below 21 or above 50 and men aged below 21 or above 55 are not eligible for IVF.",
            },
        ];

         function capitalizeFirstLetter(str) {
        if (!str) return ""; // handle empty string
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <section id='FAQs' className="bg-[#FFE6F18C] py-8 md:py-16 relative">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-left mb-8 md:flex md:justify-center md:gap-8 ">
                    <div className="text-[55px] md:text-5xl font-bold text-primary text-opacity-50">FAQs</div>
                    <h2 className="text-[29px] md:text-3xl font-bold text-[#692F69] mb-4 md:mt-3">
                       about IVF Treatment in {center?.center_name ? capitalizeFirstLetter(center?.center_name) : 'India'}
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
