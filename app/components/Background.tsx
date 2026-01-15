"use client";
import React from "react";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";

gsap.registerPlugin(useGSAP);
type BackgroundProps = {
    children?: React.ReactNode;
};

export default function Background({ children }: BackgroundProps) {
useGSAP(() => {
    gsap.to(".blob_red", {
        top: "25rem",
        left: "35rem",
        duration: 2,
        ease: "sine.inOut",
        stagger:0.4,
    })
    gsap.to(".blob", {
      scale:2.2,
        duration: 1,
        ease: "sine.inOut",
        stagger:0.2,
        yoyo:true,
        repeat:-1,
        repeatDelay:0.1,
        delay:1.5,
    })
});
    return (
        <div className="relative h-screen w-screen overflow-hidden bg-background items-center justify-items-center">

            <div className="blob_red blob absolute top-0 left-0 w-[32rem] h-[32rem] bg-red-500 rounded-full blur-[100px] opacity-70"></div>
            <div className="blob_red blob absolute top-0 left-0 w-[24rem] h-[24rem] bg-red-400 rounded-full blur-[100px] opacity-70"></div>

            <div className="absolute blob top-80 right-70 w-[26rem] h-[26rem] bg-emerald-500 rounded-full blur-[100px] opacity-70"></div>
            <div className="absolute blob top-82 right-110 w-[22rem] h-[22rem] bg-emerald-400 rounded-full blur-[100px] opacity-70"></div>

            <div className="absolute blob bottom-20 right-100 w-[28rem] h-[28rem] bg-blue-500 rounded-full blur-[100px] opacity-70"></div>
            <div className="absolute blob -bottom-32 right-52 w-[24rem] h-[24rem] bg-blue-400 rounded-full blur-[100px] opacity-70"></div>

            <div className="absolute inset-0 z-10 bg-black/18 backdrop-blur-[8.5rem] flex  items-center justify-center">{children}</div>

        </div>


    );
}
