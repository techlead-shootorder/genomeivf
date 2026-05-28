'use client';
import React, { memo, Suspense } from 'react';
import dynamic from 'next/dynamic';
import MetaHeader from '@/app/components/MetaHeader';
import HeroMetalp from '@/app/components/HeroMetalp';

// Static Data
import pageData from './data.json';
const { filteredCity, doctors: filteredDoctors, videos: cityVideos } = pageData;
const isMeta = true;

const MinimalLoader = () => <div className="animate-pulse bg-gray-200 h-10" />;
const ComponentLoader = () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg" />;

const DynamicComponents = {
    MaxTestimonials: dynamic(() => import('@/app/components/MaxTestimonials'), { loading: () => <ComponentLoader /> }),
    MaxDoctors: dynamic(() => import('@/app/components/MaxDoctors'), { loading: () => <ComponentLoader /> }),
    MaxTreatment: dynamic(() => import('@/app/components/MaxTreatment'), { loading: () => <ComponentLoader /> }),
    MaxTrusted: dynamic(() => import('@/app/components/MaxTrusted'), { loading: () => <ComponentLoader /> }),
    MaxWhyChoose: dynamic(() => import('@/app/components/MaxWhyChoose'), { loading: () => <ComponentLoader /> }),
    MaxCenters: dynamic(() => import('@/app/components/MaxCenters'), { loading: () => <ComponentLoader /> }),
    MaxReviewSection: dynamic(() => import('@/app/components/MaxReviewSection'), { loading: () => <ComponentLoader /> }),
    MaxAward: dynamic(() => import('@/app/components/MaxAward'), { loading: () => <ComponentLoader /> }),
    MaxFaq: dynamic(() => import('@/app/components/MaxFaq'), { loading: () => <ComponentLoader /> }),
    MaxFooter: dynamic(() => import('@/app/components/MaxFooter'), { loading: () => <MinimalLoader /> }),
    VideoIndiaStickyButton: dynamic(() => import('@/app/components/VideoIndiaStickyButton'), { loading: () => <MinimalLoader /> }),
}

const Page = memo(() => {
    return (
        <main>
            <MetaHeader isMeta={isMeta}/>
            <HeroMetalp isMeta={isMeta}/>

            <Suspense fallback={<ComponentLoader />}>
                <DynamicComponents.MaxTestimonials />
            </Suspense>

            <Suspense fallback={<ComponentLoader />}>
                <DynamicComponents.MaxDoctors
                    center={filteredCity}
                    filteredDoctors={filteredDoctors}
                    isMeta={isMeta}
                />
            </Suspense>

            <Suspense fallback={<ComponentLoader />}>
                <DynamicComponents.MaxTreatment isMeta={isMeta} />
            </Suspense>

            <div className='bg-pink-50'>
                <Suspense fallback={<ComponentLoader />}>
                    <DynamicComponents.MaxTrusted
                        center={filteredCity}
                        cityVideos={cityVideos}
                    />
                </Suspense>
            </div>

            <Suspense fallback={<ComponentLoader />}>
                <DynamicComponents.MaxWhyChoose
                  isMeta={isMeta}
                  center={filteredCity}
                />
            </Suspense>

            <Suspense fallback={<ComponentLoader />}>
                <DynamicComponents.MaxCenters />
            </Suspense>

            <Suspense fallback={<ComponentLoader />}>
                <DynamicComponents.MaxReviewSection />
            </Suspense>

            <Suspense fallback={<ComponentLoader />}>
                <DynamicComponents.MaxAward />
            </Suspense>

            <Suspense fallback={<ComponentLoader />}>
                <DynamicComponents.MaxFaq />
            </Suspense>

            <Suspense fallback={<MinimalLoader />}>
                <DynamicComponents.MaxFooter />
            </Suspense>

            <Suspense fallback={<MinimalLoader />}>
                <DynamicComponents.VideoIndiaStickyButton isMeta={isMeta} />
            </Suspense>
        </main>
    );
});

Page.displayName = "Page";
export default Page;
