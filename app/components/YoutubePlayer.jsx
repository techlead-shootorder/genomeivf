'use client'
import React from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { FaTimes } from "react-icons/fa";
import { FaArrowsAlt } from "react-icons/fa";
import { create } from 'zustand';

// Create the video store
const useVideoStore = create((set) => ({
    videoPlayer: {
        video: "",
        visible: false,
        inViewPort: false,
        time: 0
    },
    startVideoPlayer: (video, time) => set((state) => ({
        ...state,
        videoPlayer: {
            ...state.videoPlayer,
            video: video,
            visible: true,
            time: time
        }
    })),
    stopVideoPlayer: () => set((state) => ({
        ...state,
        videoPlayer: { ...state.videoPlayer, video: "", visible: false }
    })),
    displayVideoPlayer: (inViewPort) => set((state) => ({
        ...state,
        videoPlayer: { ...state.videoPlayer, inViewPort: inViewPort }
    }))
}));

const YoutubePlayer = () => {
    const videoPlayer = useVideoStore(state => state.videoPlayer);
    const stopVideoPlayer = useVideoStore(state => state.stopVideoPlayer);

    if (!videoPlayer.visible) {
        return null;
    }

    return (
        <Draggable handle=".handle">
            <div className="custom-youtube-player">
                <ResizableBox width={450} height={300}>
                    <iframe
                        id="player"
                        style={{ width: "100%", height: "100%" }}
                        src={`https://www.youtube.com/embed/${videoPlayer.video}?autoplay=1&start=${Math.floor(videoPlayer.time)}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />

                    <div
                        className="close flex justify-center"
                        onClick={stopVideoPlayer}
                    >
                        <FaTimes />
                    </div>
                    <div className="handle flex justify-center">
                        <FaArrowsAlt />
                    </div>
                </ResizableBox>
            </div>
        </Draggable>
    );
};

export { useVideoStore };
export default YoutubePlayer;
