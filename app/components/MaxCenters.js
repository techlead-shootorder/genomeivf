'use client'
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import MaxReviewBar from '@/app/components/MaxReviewBar'

const MaxCenters = ({center}) => {
    const centerName = center?.center_name;

    const statesData = {
        'Telangana': [
            'Banjara Hills',
            'Gachibowli',
            'Tolichowki',
            'Miyapur',
            'Dilshuk Nagar',
            'Kompally',
            'Secunderabad',
            'Uppal',
            'Kokapet',
            'Hanumakonda',
            'Karimnagar',
            'Khammam',
            'AS Rao Nagar'
        ],
        'Andhra Pradesh': [
            'Vijayawada',
            'Suryaraopet',
            'Vizag',
            'Madhurawada',
            'Ongole',
            'Tirupati',
            'Guntur',
            'Kurnool',
            'Kakinada',
            'Rajahmundry',
            'Eluru'
        ],
        'Maharashtra': [
            'Wakad',
            'Kharadi',
            'Kondhwa',
            'Nashik'
        ],
        'Karnataka': [
            'Bengaluru',
            'Banashankari',
            'Hebbal',
            'Belgavi'
        ],
        'Odisha': [
            'Bhubaneswar',
            'Cuttack'
        ],
        'Chhattisgarh': [
            'Raipur'
        ],
        'Tamil Nadu': [
            'Chennai'
        ],
        'Gujarat': [
            'Vadodara'
        ],
        'Jharkhand': [
            'Ranchi'
        ],
        'Madhya Pradesh': [
            'Indore'
        ]
    };

    // Function to find matching state based on center name or URL
    const findMatchingState = () => {
        const cityToStateMap = {
            'hyderabad': 'Telangana',
            'banjara-hills': 'Telangana',
            'banjarahills': 'Telangana',
            'gachibowli': 'Telangana',
            'dilshuknagar': 'Telangana',
            'secunderabad': 'Telangana',
            'miyapur': 'Telangana',
            'kompally': 'Telangana',
            'uppal': 'Telangana',
            'hanamkonda': 'Telangana',
            'hanumakonda': 'Telangana',
            'karimnagar': 'Telangana',
            'tolichowki': 'Telangana',
            'khammam': 'Telangana',
            'kokapet': 'Telangana',
            'as-rao-nagar': 'Telangana',
            'asraonagar': 'Telangana',
            'vijayawada': 'Andhra Pradesh',
            'visakhapatnam': 'Andhra Pradesh',
            'vizag': 'Andhra Pradesh',
            'guntur': 'Andhra Pradesh',
            'ongole': 'Andhra Pradesh',
            'tirupati': 'Andhra Pradesh',
            'kurnool': 'Andhra Pradesh',
            'suryaraopet': 'Andhra Pradesh',
            'suryaraopeta': 'Andhra Pradesh',
            'madhurawada': 'Andhra Pradesh',
            'kakinada': 'Andhra Pradesh',
            'rajahmundry': 'Andhra Pradesh',
            'vizianagaram': 'Andhra Pradesh',
            'eluru': 'Andhra Pradesh',
            'bengaluru': 'Karnataka',
            'hsr': 'Karnataka',
            'banashankari': 'Karnataka',
            'hebbal': 'Karnataka',
            'belgavi': 'Karnataka',
            'belagavi': 'Karnataka',
            'jpnagar': 'Karnataka',
            'chennai': 'Tamil Nadu',
            'pune': 'Maharashtra',
            'wakad': 'Maharashtra',
            'kharadi': 'Maharashtra',
            'kondhwa': 'Maharashtra',
            'nashik': 'Maharashtra',
            'raipur': 'Chhattisgarh',
            'vadodara': 'Gujarat',
            'ranchi': 'Jharkhand',
            'bhubaneswar': 'Odisha',
            'cuttack': 'Odisha',
            'indore': 'Madhya Pradesh'
        };

        // Check URL path first
        if (typeof window !== 'undefined') {
            let decodedPathname = '';
            try {
                decodedPathname = decodeURIComponent(window.location.pathname).toLowerCase();
            } catch (e) {
                decodedPathname = window.location.pathname.toLowerCase();
            }
            
            const segments = decodedPathname.split('/').map(s => s.trim()).filter(Boolean);
            
            for (const segment of segments) {
                if (cityToStateMap[segment]) {
                    return cityToStateMap[segment];
                }
            }
        }
        
        if (!centerName) return 'Telangana'; // Default fallback
        
        const centerLower = centerName.toLowerCase();
        
        if (cityToStateMap[centerLower]) {
            return cityToStateMap[centerLower];
        }
        
        // Check for exact or partial city matches
        for (const [state, cities] of Object.entries(statesData)) {
            const matchingCity = cities.find(city => 
                centerLower.includes(city.toLowerCase()) || 
                city.toLowerCase().includes(centerLower)
            );
            
            if (matchingCity) {
                return state;
            }
        }
        
        // Fallback to prefix matching if no exact match found
        const centerPrefix = centerName.toLowerCase().substring(0, 3);
        for (const [state, cities] of Object.entries(statesData)) {
            const matchingCity = cities.find(city => 
                city.toLowerCase().substring(0, 3) === centerPrefix
            );
            
            if (matchingCity) {
                return state;
            }
        }
        
        return 'Telangana'; // Default fallback if no match found
    };

    const [openState, setOpenState] = useState(findMatchingState());

    // Update openState if centerName changes
    useEffect(() => {
        setOpenState(findMatchingState());
    }, [centerName]);

    const toggleState = (stateName) => {
        setOpenState(openState === stateName ? null : stateName)
    }

    return (
        <section id='Locations' className="bg-gray-50 py-8 md:py-16 relative">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-left mb-8 md:flex md:items-center md:gap-8">
                    <div className="text-[55px] md:text-5xl font-bold text-primary text-opacity-50">30+ Centers</div>
                    <h2 className="text-[29px] font-bold text-[#2B5F8A] md:mt-2">
                        10 States, 22 cities
                    </h2>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:block">
                    <div className="grid grid-cols-2 gap-40">
                        {/* Left Column */}
                        <div className="space-y-2">
                            {/* Telangana - Now follows same pattern as other states */}
                            <div className={`p-4 ${openState === 'Telangana' && 'bg-white rounded-xl'}`}>
                                <button
                                    onClick={() => toggleState('Telangana')}
                                    className="flex items-center justify-between w-full text-left text-[18px] font-semibold text-[#1E4A6E]"
                                >
                                    Telangana
                                    {openState === 'Telangana' ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                                </button>
                                {openState === 'Telangana' && (
                                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-2 ml-4 mt-2">
                                        {statesData['Telangana'].map((city, index) => (
                                            <div key={index} className="text-gray-700 text-base font-semibold">
                                                {city}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Other states in left column */}
                            {['Andhra Pradesh', 'Karnataka', 'Tamil Nadu', 'Madhya Pradesh'].map((state) => (
                                <div key={state} className={`p-4 ${openState === state && 'bg-white rounded-xl'}`}>
                                    <button
                                        onClick={() => toggleState(state)}
                                        className="flex items-center justify-between w-full text-left text-[18px] font-semibold text-gray-800"
                                    >
                                        {state}
                                        {openState === state ? <ChevronDown className='w-5 h-5' /> : <ChevronRight className="w-5 h-5" />}
                                    </button>
                                    {openState === state && (
                                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-2 ml-4 mt-2">
                                            {statesData[state].map((city, index) => (
                                                <div key={index} className="text-gray-700 text-base pl-4 font-semibold">
                                                    {city}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Right Column */}
                        <div className="space-y-2">
                            {['Maharashtra', 'Gujarat', 'Jharkhand', 'Odisha', 'Chhattisgarh'].map((state) => (
                                <div key={state} className={`p-4 ${openState === state && 'bg-white rounded-xl'}`}>
                                    <button
                                        onClick={() => toggleState(state)}
                                        className="flex items-center justify-between w-full text-left text-[18px] font-semibold text-gray-800"
                                    >
                                        {state}
                                        {openState === state ? <ChevronDown className='w-5 h-5' /> : <ChevronRight className="w-5 h-5" />}
                                    </button>
                                    {openState === state && (
                                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-2 ml-4 mt-2">
                                            {statesData[state].map((city, index) => (
                                                <div key={index} className="text-gray-700 text-base pl-4 font-semibold">
                                                    {city}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden">
                    <div className="space-y-2">
                        {/* All states including Telangana follow same pattern */}
                        {Object.keys(statesData).map((state) => (
                            <div key={state} className={`p-2 ${openState === state && 'bg-white rounded-xl'}`}>
                                <button
                                    onClick={() => toggleState(state)}
                                    className="flex items-center justify-between w-full text-left text-lg font-semibold text-[#1E4A6E] py-2"
                                >
                                    {state}
                                    {openState === state ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                                </button>
                                {openState === state && (
                                    <div className="grid grid-cols-3 mt-2 mb-4 gap-x-4 gap-y-2">
                                        {statesData[state].map((city, index) => (
                                            <div key={index} className="text-[#333333] text-[14px] sm:text-[16px]">
                                                {city}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <MaxReviewBar />
        </section>
    )
}

export default MaxCenters