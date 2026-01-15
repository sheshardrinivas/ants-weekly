"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
gsap.registerPlugin(useGSAP);

export default function Header({ stay }: { stay?: boolean }) {
    const menuBtn = useRef<HTMLDivElement>(null);
    const sidebar = useRef<HTMLDivElement>(null);
    const text = useRef<HTMLParagraphElement>(null);
    const  router = useRouter();
    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".border-header",
                { opacity: 0, width: 0 },
                {
                    opacity: 1,
                    width: "90%",
                    duration: 1.2,
                    ease: "power3.out",
                }
            );

            const sidebarTl = gsap.timeline({ paused: true,
                reversed: true, });

            sidebarTl
                .fromTo(
                    sidebar.current,
                    { width: 0, opacity: 0 },
                    {
                        width: "20%",
                        opacity: 1,
                        duration: 0.9,
                        ease: "power4.inOut",
                    }
                )
                .fromTo(
                    text.current,
                    { y: 30, opacity: 0, scale: 0.95 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        ease: "power3.out",
                    },
                    "-=0.3"
                );

            menuBtn.current?.addEventListener("click", () => {
                sidebarTl.reversed() ? sidebarTl.play() : sidebarTl.reverse();
            });



            text.current?.addEventListener("click", () => {
                sidebarTl.reversed() ? sidebarTl.play() : sidebarTl.reverse();
            })
        });

        return () => ctx.revert();
    }, []);
    async function logout() {
        await fetch("/api/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
       router.push("/");
    }
    function login() {
        router.push("/login");
    }

    return (
        <>
            <header className="border-header w-0 h-1/18 border-b-2 border-white absolute z-20 flex items-center justify-between px-5 opacity-0">
                <div ref={menuBtn} className="flex gap-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
                    Menu
                </div>
                <div className="font-bold font-sofia text-2xl">ANTS WEEKLY</div>
                {!stay ? (
                    <div className="flex gap-2 cursor-pointer" onClick={login}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>
                        Login
                    </div>
                ) : (
                    <div className="flex gap-2 cursor-pointer" onClick={logout}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>
                        Logout
                    </div>
                )}

            </header>

            <div
                ref={sidebar}
                className="absolute left-0 top-0 h-full w-0 opacity-0 z-20 bg-background/50 backdrop-blur-[2rem] grid grid-rows-20 grid-cols-2 items-center justify-center gap-4 "
            >
                <p ref={text} className="text-4xl font-league row-4 col-span-full   items-center justify-items-center"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg> </p>
                <p  className="text-2xl font-league row-5 col-span-2   text-center transition-transform duration-600 hover:-translate-y-[0.2rem]">hello </p>
                <p  className="text-2xl font-league row-6 col-span-2   text-center transition-transform  duration-600 hover:-translate-y-[0.2rem]">dumb</p>
            </div>
        </>
    );
}
