"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const LampContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({
  children,
  className,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      containerRef.current.style.setProperty("--mouse-x", `${x}px`);
      containerRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className={cn(
          "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050505] w-full rounded-md z-0",
          className
        )}
      >
        {/* Pattern Background */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.2]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Interactive Background Effect - Smoothed Gradient */}
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(139, 92, 246, 0.25) 0%, transparent 600px)`
          }}
        />

        {/* Lamp Effect - Positioned higher and made larger */}
        <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 -translate-y-32">
          <motion.div
            initial={{ opacity: 0.5, width: "15rem" }}
            whileInView={{ opacity: 1, width: "50rem" }}
            transition={{
              delay: 0.3,
              duration: 2.0,
              ease: "easeInOut",
            }}
            style={{
              backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            }}
            className="absolute inset-auto right-1/2 h-56 overflow-visible w-[50rem] bg-gradient-conic from-brand-purple via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
          >
            <div className="absolute  w-[100%] left-0 bg-[#050505] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
            <div className="absolute  w-40 h-[100%] left-0 bg-[#050505]  bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0.5, width: "15rem" }}
            whileInView={{ opacity: 1, width: "50rem" }}
            transition={{
              delay: 0.3,
              duration: 2.0,
              ease: "easeInOut",
            }}
            style={{
              backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            }}
            className="absolute inset-auto left-1/2 h-56 w-[50rem] bg-gradient-conic from-transparent via-transparent to-brand-purple text-white [--conic-position:from_290deg_at_center_top]"
          >
            <div className="absolute  w-40 h-[100%] right-0 bg-[#050505]  bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
            <div className="absolute  w-[100%] right-0 bg-[#050505] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          </motion.div>

          {/* Core Glow Elements */}
          <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-[#050505] blur-2xl"></div>
          <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
          <div className="absolute inset-auto z-50 h-36 w-[40rem] -translate-y-1/2 rounded-full bg-brand-purple opacity-50 blur-3xl"></div>

          <motion.div
            initial={{ width: "10rem" }}
            whileInView={{ width: "25rem" }}
            transition={{
              delay: 0.3,
              duration: 2.0,
              ease: "easeInOut",
            }}
            className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-brand-purple blur-2xl"
          ></motion.div>

          <motion.div
            initial={{ width: "25rem" }}
            whileInView={{ width: "50rem" }}
            transition={{
              delay: 0.3,
              duration: 2.0,
              ease: "easeInOut",
            }}
            className="absolute inset-auto z-50 h-0.5 w-[50rem] -translate-y-[7rem] bg-brand-purple "
          ></motion.div>

          <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-[#050505] "></div>
        </div>

        <div className="relative z-50 flex -translate-y-10 flex-col items-center px-5">
          {children}
        </div>
      </div>
    );
  };