"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ---------------- Icons ---------------- */

const Icons = {
  Home: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),

  Code: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),

  Zap: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),

  Compass: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),

  Star: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),

  BookOpen: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),

  Mail: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),

  FileText: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
};

/* ---------------- Items ---------------- */

const DOCK_ITEMS = [
  { id: "home", icon: Icons.Home, label: "Home", href: "#home" },
  { id: "projects", icon: Icons.Code, label: "Projects", href: "#projects" },
  { id: "testimonials", icon: Icons.Star, label: "Testimonials", href: "#testimonials" },
  { id: "blog", icon: Icons.BookOpen, label: "Blog", href: "#blog" },
  { id: "skills", icon: Icons.Zap, label: "Skills", href: "#skills" },
  { id: "journey", icon: Icons.Compass, label: "Journey", href: "#journey" },
  { id: "contact", icon: Icons.Mail, label: "Contact", href: "#contact" },
  { id: "resume", icon: Icons.FileText, label: "Resume", href: "/resume.pdf", external: true },
];

/* ---------------- Dock ---------------- */

export default function Dock() {
  const mouseX = useMotionValue(Infinity);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onTouchEnd={() => mouseX.set(Infinity)}
      onTouchCancel={() => mouseX.set(Infinity)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="
        fixed left-1/2 -translate-x-1/2 z-50

        bottom-4 sm:bottom-6 md:bottom-8

        flex items-end

        h-12 sm:h-14 md:h-16
        gap-2 sm:gap-3 md:gap-4
        px-2 sm:px-3 md:px-4
        pb-2 sm:pb-2.5 md:pb-3

        rounded-2xl
        border border-white/10
        bg-white/5
        backdrop-blur-md
      "
    >
      {DOCK_ITEMS.map((item) => (
        <DockIcon
          key={item.id}
          mouseX={mouseX}
          item={item}
          isMobile={isMobile}
        />
      ))}
    </motion.div>
  );
}

/* ---------------- Dock Icon ---------------- */

function DockIcon({
  mouseX,
  item,
  isMobile,
}: {
  mouseX: MotionValue;
  item: (typeof DOCK_ITEMS)[0];
  isMobile: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: 0,
    };

    return val - bounds.x - bounds.width / 2;
  });

  /* Smaller hover on mobile */
  const widthSync = useTransform(
    distance,
    [-150, 0, 150],
    isMobile ? [36, 36, 36] : [40, 80, 40]
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <Link href={item.href} target={item.external ? "_blank" : undefined}>
      <motion.div
        ref={ref}
        style={{ width }}
        className="
          aspect-square

          w-8 sm:w-9 md:w-10

          rounded-full
          bg-gray-700/50
          border border-white/10

          flex items-center justify-center

          sm:hover:bg-gray-600/80
          transition-colors
          group
          relative
        "
      >
        {/* Icon */}
        <item.icon
          className="
            w-4 h-4
            sm:w-5 sm:h-5
            md:w-1/2 md:h-1/2

            text-gray-200
            group-hover:text-white
          "
        />

        {/* Tooltip (Desktop only) */}
        <span
          className="
            hidden sm:block

            absolute -top-10 left-1/2 -translate-x-1/2

            bg-gray-900 text-white text-xs

            px-2 py-1 rounded

            opacity-0 group-hover:opacity-100
            transition-opacity

            pointer-events-none
            whitespace-nowrap

            border border-white/10
          "
        >
          {item.label}
        </span>
      </motion.div>
    </Link>
  );
}
