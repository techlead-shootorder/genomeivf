"use client";
import React, { useState } from "react";

const MaxFertilityMessage = () => {
  const [playVideo, setPlayVideo] = useState(false);

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
                A Message from Our Senior
                <span className="block mt-1 leading-[1.3]">
                  Fertility Specialist
                </span>
              </h2>
            </div>
          </div>

          {/* ================= LEFT SIDE - VIDEO ================= */}
          <div className="w-full">
            <div
              className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black"
              style={{ paddingBottom: "56.25%" }}
            >
              {!playVideo ? (
                <>
                  <img
                    src="/images/Thumbnail.webp"
                    alt="Oasis Fertility Video"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setPlayVideo(true)}
                      className="w-16 h-16 md:w-20 md:h-20 
                        bg-[#7A3C7A]/80 rounded-full 
                        flex items-center justify-center
                        shadow-2xl cursor-pointer
                        hover:scale-105 transition-transform duration-200"
                      aria-label="Play video"
                    >
                      <svg
                        className="w-8 h-8 md:w-10 md:h-10 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                </>
              ) : (
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/IgfH9K9O9Ws?autoplay=1&rel=0&modestbranding=1&showinfo=0"
                  title="Oasis Fertility Message"
                  frameBorder="0"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </div>

          {/* ================= RIGHT SIDE - CONTENT (DESKTOP ONLY) ================= */}
          <div className="w-full">
            <div className="space-y-5 md:space-y-6">

              {/* DESKTOP HEADING (UNCHANGED) */}
              <div className="relative pl-5 hidden md:block">
                <span className="absolute left-0 h-[52px] md:h-[88px] w-1 rounded-full bg-[#E8772E]" />
                <h2
                  className="max-w-xl text-xl sm:text-2xl md:text-3xl lg:text-[38px] 
                  font-bold text-[#1E4A6E] leading-[1.15]"
                >
                  A Message from Our Senior
                  <span className="block mt-1 leading-[1.3]">
                    Fertility Specialist
                  </span>
                </h2>
              </div>

              {/* BULLET POINTS (HIDDEN ON MOBILE) */}
              <div className="space-y-3 pt-1 hidden md:block">
                <div className="flex items-start gap-3">
                  <span className="mt-2 w-2 h-2 bg-[#E8772E] rounded-full flex-shrink-0" />
                  <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-normal">
                    Our fertility experts follow globally accepted IVF protocols
                    to deliver personalised and ethical fertility care.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-2 w-2 h-2 bg-[#E8772E] rounded-full flex-shrink-0" />
                  <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-normal">
                    At Oasis Fertility, every patient is treated through a
                    structured, science-driven IVF process led by experienced
                    fertility specialists.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-2 w-2 h-2 bg-[#E8772E] rounded-full flex-shrink-0" />
                  <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-normal">
                    This message represents the medical standards and care
                    philosophy followed by Oasis Fertility doctors across
                    locations.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MaxFertilityMessage;
