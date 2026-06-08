'use client';
import React, { memo } from 'react';
import MetaHeader from '@/app/components/MetaHeader';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';

// Static Data
import pageData from '../data.json';
const { filteredCity } = pageData;
const isMeta = true;

const Page = memo(() => {
    return (
        <main>
            <MetaHeader isMeta={isMeta}/>
            <section className="max-w-7xl mx-auto px-4 py-8">
                <div className="max-w-md mx-auto">
                    <RegistrationForm
                        center={filteredCity}
                        service="Fertility"
                    />
                </div>
            </section>
        </main>
    );
});

Page.displayName = "PmaxPage";
export default Page;
