'use client'
import React, { useState } from 'react'
import { X } from 'lucide-react'

const MaxFooter = () => {
  const [modalContent, setModalContent] = useState(null)

  const openModal = (type) => {
    setModalContent(type)
  }

  const closeModal = () => {
    setModalContent(null)
  }

  const termsContent = (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-[#4E204E] mb-4">Terms & Conditions</h2>
      <div className="space-y-3 text-gray-700">
        <p>Welcome to OASIS FERTILITY. These terms and conditions outline the rules and regulations for the use of our services.</p>
        
        <h3 className="font-semibold text-lg">1. Acceptance of Terms</h3>
        <p>By accessing and using our services, you accept and agree to be bound by the terms and provision of this agreement.</p>
        
        <h3 className="font-semibold text-lg">2. Services</h3>
        <p>OASIS FERTILITY provides fertility treatment and related medical services. All treatments are subject to medical evaluation and approval.</p>
        
        <h3 className="font-semibold text-lg">3. Patient Responsibilities</h3>
        <p>Patients are responsible for providing accurate medical history and following prescribed treatment plans.</p>
        
        <h3 className="font-semibold text-lg">4. Limitation of Liability</h3>
        <p>OASIS FERTILITY shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.</p>
        
        <p className="text-sm text-gray-600 mt-6">Last updated: January 2026</p>
      </div>
    </div>
  )

  const privacyContent = (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-[#4E204E] mb-4">Privacy Policy</h2>
      <div className="space-y-3 text-gray-700">
        <p>At OASIS FERTILITY, we are committed to protecting your privacy and ensuring the security of your personal information.</p>
        
        <h3 className="font-semibold text-lg">1. Information We Collect</h3>
        <p>We collect personal and medical information necessary to provide fertility treatment services, including contact details, medical history, and treatment records.</p>
        
        <h3 className="font-semibold text-lg">2. How We Use Your Information</h3>
        <p>Your information is used solely for providing medical care, treatment planning, and communicating about your healthcare needs.</p>
        
        <h3 className="font-semibold text-lg">3. Information Sharing</h3>
        <p>We do not share your personal information with third parties except as required by law or for legitimate medical purposes with your consent.</p>
        
        <h3 className="font-semibold text-lg">4. Data Security</h3>
        <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
        
        <h3 className="font-semibold text-lg">5. Your Rights</h3>
        <p>You have the right to access, correct, or delete your personal information. Contact us to exercise these rights.</p>
        
        <p className="text-sm text-gray-600 mt-6">Last updated: January 2026</p>
      </div>
    </div>
  )

  return (
    <>
      <div className=' py-4 text-sm text-black flex flex-col items-center gap-2 mb-16 md:mb-0'>
        <p className=''>Copyright © 2026, OASIS FERTILITY.</p>
        <div className='text-[#4E204E]'>
          <button 
            onClick={() => openModal('terms')}
            className='mr-2 hover:underline cursor-pointer'
          >
            Terms & Conditions
          </button> 
          | 
          <button 
            onClick={() => openModal('privacy')}
            className='ml-2 hover:underline cursor-pointer'
          >
            Privacy and Policy
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999999] p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <div></div>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {modalContent === 'terms' ? termsContent : privacyContent}
            </div>
            
            {/* Modal Footer */}
            <div className="flex justify-end p-6 border-t bg-gray-50">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-[#4E204E] text-white rounded hover:bg-[#3d1a3d] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MaxFooter