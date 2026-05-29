'use client'
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useVideoStore } from "@/app/components/YoutubePlayer";
import { useInViewport } from 'react-in-viewport';
import { useEffect, useRef, useState } from "react";
import { UAParser } from 'ua-parser-js';

// Video Reel Skeleton Component Comment
const VideoReelSkeleton = () => {
  const getSkeletonCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 4;
      if (window.innerWidth >= 768) return 3;
      return 2;
    }
    return 4;
  };

//   Below is video skeleton

  return (
    <div className="max-w-screen-4xl mx-auto px-4 lg:px-10 xl:px-14 2xl:px-20 mb-10 lg:mb-16">
      <div className="flex justify-center mb-6 lg:mb-12">
        <div className="w-3/4 h-8 md:h-10 lg:h-12 xl:h-14 bg-gray-200 animate-pulse rounded-lg" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(getSkeletonCount())].map((_, index) => (
          <div key={index} className="relative rounded-xl overflow-hidden">
            <div className="aspect-[9/16] bg-gray-200 animate-pulse rounded-xl relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-10 sm:w-[64px] h-10 sm:h-[64px] bg-gray-300 animate-pulse rounded-full" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-5 lg:py-8 bg-gradient-to-t from-gray-900/50 to-transparent">
                <div className="h-4 sm:h-5 lg:h-6 bg-gray-300 animate-pulse rounded w-3/4 mx-auto" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <div className="w-10 2xl:w-[60px] h-10 2xl:h-[60px] bg-gray-200 animate-pulse rounded-full" />
        <div className="w-10 2xl:w-[60px] h-10 2xl:h-[60px] bg-gray-200 animate-pulse rounded-full" />
      </div>
    </div>
  );
};

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 3,
        slidesToSlide: 3
    },
    mobile: {
        breakpoint: { max: 767, min: 0 },
        items: 1.5,
        slidesToSlide: 2
    }
};
// Testing

function IVFClinicSliderV2({userAgentString, cityVideos }) {
    //  const cityVideos = [
    //    {
    //     "id": "1",
    //     "influencer_name": "Kishor Babu",
    //     "videoId": "Xxfm_uXZa-Y",
    //     "VideoTitleText": "Healthy Twin Babies",
    //     "concern": "Concern: PCOS",
    //     "videoImage": "/images/home/testimonials/Kishor Babu.jpg",
    //     "youTubeVideoUrl": "https://www.youtube.com/shorts/Xxfm_uXZa-Y",
    //     "language": "Eng-Telugu",
    //     "lang": "Watch in English",
    //     "isSelected": false,

    // },
    // {
    //     "id": "2",
    //     "influencer_name": "Madhu Kiran",
    //     "videoId": "2__vfnI8BF0",
    //     "VideoTitleText": "Healthy Twin Babies",
    //     "concern": "Concern: Advanced Maternal Age",
    //     "videoImage": "/images/home/testimonials/Madhu Kiran.jpg",
    //     "youTubeVideoUrl": "https://www.youtube.com/shorts/2__vfnI8BF0",
    //     "language": "Eng-Telugu",
    //     "lang": "Watch in English",
    //     "isSelected": false,
    // },
    // {
    //     "id": "3",
    //     "influencer_name": "Deevi Prasad",
    //     "videoId": "PqtmTf0iBc8",
    //     "VideoTitleText": "Healthy Twin Babies",
    //     "concern": "Concern: Fallopian Tube Issues",
    //     "videoImage": "/images/home/testimonials/Deevi Prasad.jpg",
    //     "youTubeVideoUrl": "https://www.youtube.com/shorts/PqtmTf0iBc8",
    //     "language": "Telugu",
    //     "lang": "Watch in Telugu",
    //     "isSelected": false,
    // },
    // {
    //     "id": "4",
    //     "influencer_name": "Shekhar Almury",
    //     "videoId": "7wwrDjGFaMY",
    //     "VideoTitleText": "Healthy Twin Babies",
    //     "concern": "Concern: Repeated Miscarriages",
    //     "videoImage": "/images/home/testimonials/Shekhar Almury.jpg",
    //     "youTubeVideoUrl": "https://www.youtube.com/shorts/7wwrDjGFaMY",
    //     "language": "English",
    //     "lang": "Watch in English",
    //     "isSelected": false,
    // },
    // ]

    // console.log("city videos", cityVideos);


    const [isLoading, setIsLoading] = useState(true);
    let parser = new UAParser(userAgentString);
    const result = parser.getResult();
    const deviceType = (result.device && result.device.type) || 'desktop';

    // const ivfClinicVideos = [
    //     { videoId: 'TSUFeOgscYM', VideoTitleText: "Everything about pregnancy planning", videoImage: '/images/home/pregnancyplan1.png', youTubeVideoUrl: 'https://youtube.com/shorts/TSUFeOgscYM', isSelected: false },
    //     { videoId: 'KDz_mfG1AEo', VideoTitleText: "What are the factors that affect the success rate of egg freezing?", videoImage: '/images/home/pregnancyplan2.png', youTubeVideoUrl: 'https://youtu.be/KDz_mfG1AEo', isSelected: false },
    //     { videoId: 'HARgKEK7ihA', VideoTitleText: "Kids Planning", videoImage: '/images/home/pregnancyplan3.png', youTubeVideoUrl: 'https://youtube.com/shorts/HARgKEK7ihA', isSelected: false },
    //     { videoId: 'p6W3t5FcIyQ', VideoTitleText: "Does the use of cosmetics, perfume, and deo affect fertility in women?", videoImage: '/images/home/pregnancyplan5.png', youTubeVideoUrl: 'https://youtube.com/shorts/p6W3t5FcIyQ', isSelected: false },
    //     { videoId: '9qT8zaJV56U', VideoTitleText: "Get Ready for Parenthood with Advanced Infertility Treatments in 2024 With Oasis Fertility", videoImage: '/images/home/Rohit_Marina.png', youTubeVideoUrl: 'https://youtube.com/shorts/9qT8zaJV56U', isSelected: false }
    // ];

    const startVideoPlayer = useVideoStore(state => state?.startVideoPlayer);
    const currentVideoRef = useRef();
    const [currentVideo, setCurrentVideo] = useState();
    const stopVideoPlayer = useVideoStore(state => state?.stopVideoPlayer);
    const [ivfClinicsList, setIvfClinicsList] = useState(cityVideos);
    const displayVideoPlayer = useVideoStore(state => state?.displayVideoPlayer);
    const [youTubeEvent, setYoutubeEvent] = useState();

    const { inViewport } = useInViewport(
        currentVideoRef,
        {},
        { disconnectOnLeave: true }
    );

    // const opts = {
    //     playerVars: {
    //         autoplay: 1,
    //     },
    // };

    useEffect(() => {
        if (cityVideos?.length) {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [cityVideos]);

    useEffect(() => {
        displayVideoPlayer(inViewport);
        if (!inViewport && currentVideo) {
            startVideoPlayer(currentVideo, youTubeEvent?.getCurrentTime());
            let ivfClinicsListTemp = [...ivfClinicsList];
            ivfClinicsListTemp?.forEach((videoEle, index) => {
                if (videoEle?.videoId == currentVideo) {
                    ivfClinicsListTemp[index].isSelected = false;
                }
                setIvfClinicsList(ivfClinicsListTemp);
                setCurrentVideo(null);
            });
        }
    }, [inViewport]);

    // const ButtonGroup = ({ next, previous }) => {
    //     return (
    //         <div className="py-10">
    //             <div className="carousel-button-group absolute left-[50%] translate-x-[-50%] bottom-0 flex 2xl:gap-8 gap-4">
    //                 <button onClick={previous}>
    //                     <Image className="w-10 2xl:w-[60px] h-10 2xl:h-[60px]" src="/images/ic-prev2.png" width={60} height={60} alt="prev" />
    //                 </button>
    //                 <button onClick={next}>
    //                     <Image className="w-10 2xl:w-[60px] h-10 2xl:h-[60px]" src="/images/ic-next2.png" width={60} height={60} alt="next" />
    //                 </button>
    //             </div>
    //         </div>
    //     );
    // };

    if (isLoading) return <VideoReelSkeleton />;

    return (
        <div id='Testimonials' className=" max-w-7xl mx-auto px-4 lg:px-10 xl:px-14 2xl:px-20  py-8 xl:py-10 rounded-3xl">
            <div className="mb-6 relative">
               <div className="text-left mb-8 sm:flex sm:items-center sm:gap-8">
                    <div className="text-[55px] md:text-5xl font-bold text-primary text-opacity-50">100k+</div>
                    <h2 className="text-[29px] md:text-3xl font-bold text-[#1E4A6E]">
                        Trusted & Successed
                    </h2>
                </div>

                <Carousel 
                    responsive={responsive} 
                    className="my-2 lg:my-12 font-lato position-unset" 
                    partialVisbile 
                    itemClass="px-2"
                    // customButtonGroup={<ButtonGroup />}
                    arrows={false}
                    swipeable={true}
                    ssr={true}
                    deviceType={deviceType}
                    autoPlay={false}
                >
                    {ivfClinicsList?.map((video, index) => {
                        return (
                            <div ref={currentVideoRef} key={video?.VideoTitleText}>
                                {video.isSelected == false ? 
                                    <div className="relative rounded-xl overflow-hidden">
                                        <div className="text-white font-semibold text-[14px] md:text-[18px] absolute top-2 left-4 z-20">{video?.successStory}</div>
                                        <Image 
                                            className="absolute top-0 left-0 h-full w-full object-cover" 
                                            src={video?.videoImage} 
                                            width={359} 
                                            height={0} 
                                            alt={`pregnancyplan${index + 1}`} 
                                        />
                                        <button 
                                            onClick={() => {
                                                let ivfClinicsListTemp = [...ivfClinicsList];
                                                ivfClinicsListTemp?.forEach((videoEle, index) => {
                                                    if (videoEle?.videoId == video?.videoId) {
                                                        ivfClinicsListTemp[index].isSelected = true;
                                                    } else {
                                                        ivfClinicsListTemp[index].isSelected = false;
                                                    }
                                                    setIvfClinicsList(ivfClinicsListTemp);
                                                    setCurrentVideo(video?.videoId);
                                                    stopVideoPlayer();
                                                });
                                            }}
                                            className="p-0 m-0 border-none outline-none absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-20"
                                        >
                                            <Image 
                                                src="/images/home/ic-playbtn.png" 
                                                width={114} 
                                                height={0} 
                                                alt="ic playbtn" 
                                                className="w-10 sm:w-[114px]" 
                                            />
                                        </button>
                                        <div className="relative z-10 aspect-[9/16] flex flex-col justify-end px-2 pb-2 bg-custom-gradient">
                                            <div className="ml-2 md:ml-3 mb-1 sm:mb-3">
                                                <h4 className=" text-[12px] md:text-[18px] font-semibold mb-1 sm:mb-2 text-white">
                                                    {video?.VideoTitleText}
                                                </h4>
                                                <p className="text-[12px] md:text-[16px] text-white mb-2 sm:mb-4">{video?.concern}</p>
                                                <h4 className="text-[11px] md:text-sm text-[#E8772E] font-semibold ">
                                                    {video?.lang}
                                                </h4>
                                            </div>
                                        </div>
                                    </div> 
                                    : 
                                    <div className="aspect-[9/16]">
                                        <iframe 
                                            onClick={(event) => {
                                                console.log('youEmbedVideoref', setYoutubeEvent(event?.target));
                                            }}
                                            id="player"
                                            style={{ width: "100%", height: "100%" }}
                                            src={`https://www.youtube.com/embed/${video?.videoId}?autoplay=${inViewport ? '1' : '1'}`}
                                            allow="autoplay"
                                            className="aspect-[9/16] w-full h-full rounded-xl"
                                        />
                                    </div>
                                }
                            </div>
                        );
                    })}
                </Carousel>
            </div>
        </div>
    );
}

export default IVFClinicSliderV2;