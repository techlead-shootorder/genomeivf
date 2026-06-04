"use client";
import React from "react";

const MaxFertilityMessage = () => {
  return (
    <section className="py-8 md:py-16 bg-gradient-to-b from-gray-50 to-gray-50 mb-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* ================= MOBILE HEADING (ONLY MOBILE) ================= */}
          <div className="block md:hidden">
            <div className="relative pl-5 mb-4">
              <span className="absolute left-0 h-[52px] w-1 rounded-full bg-[#E8772E]" />
              <h2
                className="max-w-xl text-xl font-bold text-[#1E4A6E] leading-[1.15]"
              >
                Genome IVF is now a part of
                <span className="block mt-1 leading-[1.3] text-[#874487]">
                  Oasis Fertility
                </span>
              </h2>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-6 px-1">
              Eastern India’s trusted fertility expertise is now backed by one of India’s leading fertility networks — bringing advanced reproductive care, experienced specialists, and personalized fertility treatments closer to you.
            </p>
          </div>

          {/* ================= LEFT SIDE - IMAGE ================= */}
          <div className="w-full">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/Oasis Genome.png"
                alt="Oasis Fertility + Genome IVF"
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* ================= RIGHT SIDE - CONTENT (DESKTOP ONLY) ================= */}
          <div className="w-full">
            <div className="space-y-5 md:space-y-6">

              {/* DESKTOP HEADING */}
              <div className="relative pl-5 hidden md:block">
                <span className="absolute left-0 h-[52px] md:h-[88px] w-1 rounded-full bg-[#E8772E]" />
                <h2
                  className="max-w-xl text-xl sm:text-2xl md:text-3xl lg:text-[38px] 
                  font-bold text-[#1E4A6E] leading-[1.15]"
                >
                  Genome IVF is now a part of
                  <span className="block mt-1 leading-[1.3] text-[#874487]">
                    Oasis Fertility
                  </span>
                </h2>
              </div>

              {/* CONTENT (HIDDEN ON MOBILE) */}
              <div className="space-y-3 pt-1 hidden md:block">
                <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-normal">
                  Eastern India’s trusted fertility expertise is now backed by one of India’s leading fertility networks — bringing advanced reproductive care, experienced specialists, and personalized fertility treatments closer to you.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MaxFertilityMessage;
