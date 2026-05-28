// HeroMax.js
"use client";

import React, { Suspense, memo } from "react";
import Image from "next/image";
// import GoogleLeadFormlp3 from './GoogleLeadFormlp3';
import MaxGoogleDeskForm from './MaxGoogleDeskForm';
import MaxGoogleMobForm from './MaxGoogleMobForm';

// Skeleton Components
const FormSkeleton = memo(() => (
  <div className="animate-pulse bg-white rounded-lg p-4 w-full max-w-md">
    <div className="h-8 bg-gray-200 rounded mb-4" />
    <div className="space-y-3">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-10 bg-gray-200 rounded" />
      ))}
    </div>
    <div className="h-12 bg-gray-200 rounded mt-4" />
  </div>
));
FormSkeleton.displayName = "FormSkeleton";

const BannerSkeleton = memo(() => (
  <div className="animate-pulse">
    <div className="hidden md:block h-[787px] w-full bg-gray-200" />
    <div className="md:hidden h-[452px] w-full bg-gray-200" />
  </div>
));
BannerSkeleton.displayName = "BannerSkeleton";

// Dynamic Banner Configuration
const LOCATION_BANNERS = {
  // Default banner
  default: {
    desktop: {
      src: "/images/lp/lp2/desk-banner/Landing-Page-Banners_2_Feb.webp",
      width: 1728,
      height: 787,
      className: "w-full object-cover absolute left-0 top-0 hidden md:block h-full",
      style: { objectPosition: "25% 0" },
      sizes: "(min-width: 768px) 100vw, 0vw"
    },
    mobile: {
      src: "/images/lp/lp1/mob-banner/Landing-Page-Banners_Mobile.webp",
      width: 428,
      height: 452,
      className: "w-full object-cover absolute left-0 -top-[0px] md:hidden h-full",
      sizes: "(max-width: 767px) 100vw, 0vw"
    }
  },
};

// test


// Preload images for faster LCP
const preloadImages = (isFemaleAssessment) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';

  if (isFemaleAssessment) {
    link.href = window.innerWidth >= 768 ? FEMALE.desktop.src : FEMALE.mobile.src;
  } else {
    const location = 'default';
    const bannerConfig = LOCATION_BANNERS[location] || LOCATION_BANNERS.default;
    link.href = window.innerWidth >= 768 ? bannerConfig.desktop.src : bannerConfig.mobile.src;
  }

  document.head.appendChild(link);
};

if (typeof window !== 'undefined') {
  // Initial preload will use default, actual preload happens in component
  preloadImages();
}

// Memoized Image Component
const HeroBanner = memo(({ type }) => {


  // Normalize center name and get corresponding banner config
  const normalizedCenterName = '';
  const locationKey = Object.keys(LOCATION_BANNERS).find(key =>
    normalizedCenterName.includes(key)
  ) || 'default';

  const bannerConfig = LOCATION_BANNERS[locationKey];

  return (
    <Image
      {...bannerConfig[type]}
      alt={`Banner`}
      priority={true}
      quality={85}
      fetchPriority="high"
      decoding="async"
    />
  );
});
HeroBanner.displayName = "HeroBanner";



// Memoized Content Components
const HeroHeading = memo(({ formatService }) => (
  <div className="absolute p-4 top-[60px] left-2 md:top-[100px] md:left-[24px] lg:left-[40px] xl:left-[60px] 2xl:left-[100px] z-[7]">
    {/* <h1 id="heroBannerHeading" className="text-[30px] leading-none  md:text-[45px] font-bold text-primary sm:py-2 text-center md:text-left w-full md:w-auto font-bold">
      Planning <span >{formatService}?</span>
    </h1>
    <p className="text-[16px] md:text-[24px] font-semibold md:font-bold text-[#452A45] mb-3  text-center md:text-left">You&apos;re in the Right Hands.</p> */}

    <div className="bg-[#FFC5DF78] px-2 py-2 sm:px-6 sm:py-2 rounded-full flex items-center justify-center space-x-4">
     
      <div className="flex items-center space-x-2">
        <span className="text-[14px] sm:text-2xl font-bold text-gray-800">50+</span>
        <span className="text-[10px] sm:text-[12px] text-gray-800 font-bold mt-1">Expert <br /> Doctors</span>
      </div>
      
      <div className="w-px h-8 bg-gray-800"></div>
      
      <div className="flex items-center space-x-2">
        <span className="text-[14px] sm:text-2xl font-bold text-gray-800">1 Lac+</span>
        <div className="text-sm text-gray-800">
          <div className="font-bold text-[10px] sm:text-[12px] leading-tight">Healthy Babies with <br /> {formatService} Treatment</div>
        </div>
      </div>
    </div>

    {/* Offer Text Section */}
    <div className="mt-3 sm:mt-4">
      <div className="bg-primary px-3 py-2 sm:px-4 sm:py-3 rounded-lg shadow-lg border border-white">
        <div className="flex items-center justify-center">
          <div className="bg-[#FFE6F1] text-black px-2 py-1 rounded-full text-[10px] sm:text-xs font-bold mr-2 shadow-md">
            FREE
          </div>
          <div className="text-white text-center">
            <div className="text-[11px] sm:text-sm md:text-base font-bold leading-tight">
              First Consultation, Scan, 1 AMH Test & 1 Semen Analysis
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
));
HeroHeading.displayName = "HeroHeading";

const InvisibleArticle = memo(() => (
  <article className="invisible h-80">

  </article>
));
InvisibleArticle.displayName = "InvisibleArticle";

// const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

const LeadFormWrapper = memo(({ formatService, isMeta }) => (

  <>

    {isMeta ? (
      <>
        <MaxGoogleMobForm formatService={formatService} />
        <MaxGoogleDeskForm formatService={formatService} />
      </>
    ) : (
      <>
        <MaxLeadForm formatService={formatService} />
        <MaxLeadDeskForm formatService={formatService} />
      </>)
    }

  </>
));
LeadFormWrapper.displayName = "LeadFormWrapper";
// added comment to push code

const MobileLeadForm = memo(({ formatService, isMeta }) => (
  <div id="leadformlp3" className="md:hidden flex items-center -mt-[60px] w-full">
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-center w-full">
        {/* <div className="bg-[#874487] text-white w-[80%] text-center py-0.5 rounded-t-2xl font-semibold z-50">
          IVF @ 94,999* &nbsp; | &nbsp; LIMITED VALIDITY
        </div> */}
      </div>
      <div className="w-[90%]">
        <LeadFormWrapper formatService={formatService} isMeta={isMeta} />
      </div>
    </div>
  </div>
));
MobileLeadForm.displayName = "MobileLeadForm";




// Main Component
const HeroV2 = ({ service, isMeta, isfemaleAssessment }) => {
  // const centerName = React.useMemo(() => formatCenterName(center?.center_name_heading), [center?.center_name_heading]);
  const formatService = service ? service == 'fertility' ? 'Fertility' : service?.toUpperCase() : 'IVF';
  // Preload correct banner after component mounts
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      preloadImages(isfemaleAssessment);

      // Console log banner images
      const bannerConfig = LOCATION_BANNERS.default;
    }
  }, [isfemaleAssessment, service, formatService]);

//   added comment to push

  return (
    <Suspense fallback={
      <div className="animate-pulse bg-[#fde9f2] h-screen">
        <BannerSkeleton />
      </div>
    }>
      <section id="herolp3" className={`bg-[#fde9f2] ${isMeta ? 'md:h-[366px]' : 'md:h-[366px]'} relative max-w-screen-4xl mx-auto px-4 lg:px-10 xl:px-14 2xl:px-20`}>
        <div>
          {/* <HeroHeading formatService={formatService} /> */}
          <div>
            <HeroBanner type="desktop" />
            <HeroBanner type="mobile" />
          </div>
        </div>

        <div className="relative pt-24 pb-14 md:pt-14 md:pb-0  flex items-end justify-between h-full lg:flex">
          <InvisibleArticle />
          <div className="hidden md:block md:mr-[0px] lg:mr-[50px] xl:mr-[100px] relative z-50">
            <LeadFormWrapper isMeta={isMeta} formatService={formatService} />
          </div>
        </div>
      </section>

      <MobileLeadForm isMeta={isMeta} formatService={formatService} />
    </Suspense>
  );
};

export default memo(HeroV2);