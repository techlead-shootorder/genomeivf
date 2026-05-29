"use client";
import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdCall } from "react-icons/md";

const PhoneSection = memo(() => {
    const PhoneNum = "9513736476";
    return (
        <div className="number flex items-center gap-2 md:mr-[40px] lg:mr-[60px] xl:mr-[100px]">

            <div className=" sm:mr-0 bg-white flex items-center px-2 py-1 rounded-full gap-1">
                <MdCall className="text-[22px] sm:text-[30px] text-primary" />

                <Link
                    href={`tel:${PhoneNum}`}
                    className=" text-primary font-semibold text-[14px] sm:text-[16px] leading-none"
                >
                    {PhoneNum}
                </Link>
            </div>


        </div>
    );
});

PhoneSection.displayName = 'PhoneSection';

// Desktop Header
const DesktopHeader = memo(({ center, metanum, googel1num }) => (
    <nav className="hidden md:block max-w-screen-4xl mx-auto px-4 lg:px-10 xl:px-14 2xl:px-20 bg-gray-100">
        <div className="px-2 lg:px-4 xl:px-4 2xl:px-8 flex justify-between items-center py-3">
            <div className="flex items-center">
                <img
                    src='https://genomeivf.com/images/logo.png'
                    alt='Genome IVF logo'
                    width={150}
                    height={50}
                    className='object-contain'
                    style={{ height: 'auto' }}
                />
            </div>
            {!googel1num && <PhoneSection center={center} metanum={metanum} />}
        </div>
    </nav>
));

DesktopHeader.displayName = 'DesktopHeader';

// Mobile Header - Fixed Version
const MobileHeader = memo(({isMeta, googel1num}) => (
    <nav className="flex md:hidden fixed w-full top-[0px] z-[9] items-center justify-between bg-gray-100 px-4 py-2">
        <div className="flex items-center text-white">
            <img
                src='https://genomeivf.com/images/logo.png'
                alt='Genome IVF logo'
                width={120}
                height={40}
                className='object-contain'
                style={{ height: 'auto' }}
            />
        </div>
        <div className="flex items-center">
            {!googel1num && <PhoneSection/>}
        </div>
    </nav>
));

MobileHeader.displayName = 'MobileHeader';

// Main Header Component
const HeaderTesting = ({ center, metanum, googel1num, isMeta }) => {


    return (
        <>
            <DesktopHeader center={center} metanum={metanum} googel1num={googel1num} isMeta={isMeta} />
            <MobileHeader isMeta={isMeta} googel1num={googel1num}/>
        </>
    );
};

export default memo(HeaderTesting);