"use client";

import { useScroll, useSpring, useMotionValueEvent, motion, MotionValue } from "framer-motion";
import { useEffect, useRef, ReactNode } from "react";

interface ScrollyVideoProps {
  src: string;
  children?: (progress: MotionValue<number>) => ReactNode;
}

export default function ScrollyVideo({ src, children }: ScrollyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Scroll progress for the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll value
  const springScroll = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 400,
  });

  // iOS fix: play video silently once so we can control currentTime
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // iOS requires a play() once for programmatic currentTime updates
    const initVideo = async () => {
      try {
        video.muted = true;
        video.playsInline = true;
        await video.play();
        video.pause(); // pause immediately, we only need this to allow scroll-driven playback
      } catch (err) {
        console.log("iOS video play init blocked:", err);
      }
    };

    initVideo();
  }, []);

  // Update video time based on scroll
  useMotionValueEvent(springScroll, "change", (latest) => {
    const video = videoRef.current;
    if (!video || !video.duration || video.readyState < 2) return;

    // Set video time based on scroll (scroll-driven only)
    video.currentTime = latest * video.duration;
  });

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          className="h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
        />
        {children && children(springScroll)}
      </div>
    </div>
  );
}
