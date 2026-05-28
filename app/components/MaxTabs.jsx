'use client'

import React, { useState } from 'react';

const MaxTabs = () => {
  const [activeTab, setActiveTab] = useState('Happy Families');

  const tabList = ['Happy Families', 'Doctors', 'Testimonials', 'Reviews', 'Awards', 'Locations', 'FAQs'];

  const handleTabClick = (tab) => {
    setActiveTab(tab);

    const element = document.getElementById(tab);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Tab Navigation for mobile */}
      <div className='md:hidden bg-[#471847] py-10'>
        <div className="max-w-7xl mx-auto flex flex-wrap gap-[12px] md:gap-8 justify-center bg-[#471847]">
          {tabList.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`px-3 py-2 rounded-full font-medium text-[15px] transition-all ${
                activeTab === tab
                  ? 'bg-white text-[#471847] border border-white'
                  : 'text-white border border-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Navigation for desktop */}
      <div className='hidden md:block bg-white py-16'>
        <div className="max-w-7xl mx-auto flex flex-wrap gap-[12px] md:gap-4 lg:gap-8 justify-center">
          {tabList.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`px-3 py-2 rounded-full font-medium text-[15px] transition-all ${
                activeTab === tab
                  ? 'bg-[#471847] text-white border border-[#471847]'
                  : 'text-[#471847] border border-[#471847]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default MaxTabs;
