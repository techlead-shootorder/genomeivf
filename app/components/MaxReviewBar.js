'use client'
import Image from 'next/image'

const MaxReviewBar = () => {
  return (
    <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 -bottom-10 z-20 bg-[#1E4A6E] text-white rounded-full py-6 px-10 w-[90%] max-w-7xl flex justify-between items-center shadow-lg">
      {/* Google */}
      <div className="flex items-center space-x-2">
        <Image src="/images/lp/lp3/google icon.png" alt="Google" width={39} height={39} className='rounded-full' />
        <div className="text-sm">
          <div className="flex items-center">
            <span className="font-semibold mr-2 text-[18px]">4.9</span>
           <img src='/images/lp/maxlp/rating-stars-4.png' width={100} height={18}/>
          </div>
          <div className="text-xs text-white">25087+ Verified Reviews</div>
        </div>
      </div>

      {/* Practo */}
      <div className="flex items-center space-x-2">
        <Image src="/images/lp/maxlp/practo-white-icon.png" alt="Practo" width={39} height={39} className='!rounded-full' />
        <div className="text-sm">
          <div className="flex items-center">
            <span className="font-semibold mr-2 text-[18px]">4.8</span>
            <img src='/images/lp/maxlp/rating-stars-4.png' width={100} height={18}/>
          </div>
          <div className="text-xs text-white">12000+ Verified Reviews</div>
        </div>
      </div>

      {/* Facebook */}
      <div className="flex items-center space-x-2">
        <Image src="/images/lp/maxlp/fb-icon.png" alt="Facebook" width={39} height={39} className='rounded-full' />
        <div className="text-sm">
          <div className="flex items-center">
            <span className="font-semibold mr-2 text-[18px]">4.9</span>
            <img src='/images/lp/maxlp/rating-stars-4.png' width={100} height={18}/>
          </div>
          <div className="text-xs text-white">6000+ Verified Reviews</div>
        </div>
      </div>
    </div>
  )
}

export default MaxReviewBar;
