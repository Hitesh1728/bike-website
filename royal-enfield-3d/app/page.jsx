'use client'

import React, { useRef, useLayoutEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const BikeCanvas = dynamic(() => import('../components/BikeCanvas'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#080808]"></div> 
})

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', date: '' })
  const [formStatus, setFormStatus] = useState(null)
  
  const mainRef = useRef()

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".hero-elem", {
        x: -40, 
        opacity: 0,
        duration: 1.5,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.8
      })

      const sections = gsap.utils.toArray('.scroll-section')
      sections.forEach((sec) => {
        const fadeElements = sec.querySelectorAll('.fade-up')
        gsap.from(fadeElements, {
          y: 40,
          opacity: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 75%", 
            toggleActions: "play none none reverse"
          }
        })
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={mainRef} id="main-scroll-container" className="relative w-full bg-[#080808] selection:bg-[#c2410c] selection:text-white font-['Times_New_Roman',_Times,_serif] overflow-x-hidden">
      
      {/* 🚀 FAST LOADING TRICK: Force browser to download 3D model immediately */}
      <link rel="preload" href="/bike.glb" as="fetch" type="model/gltf-binary" crossOrigin="anonymous" />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <BikeCanvas />
      </div>

      <header className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-gradient-to-b from-black/95 to-transparent">
        <div className="hero-elem flex items-center gap-4 cursor-pointer group">
          <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full p-[2px] bg-gradient-to-b from-zinc-400 via-zinc-800 to-black shadow-[0_4px_15px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full rounded-full bg-[#080808] overflow-hidden flex items-center justify-center border border-zinc-700/60 shadow-inner">
              <img 
                src="/logo.jpg" 
                alt="Royal Enfield Logo" 
                fetchPriority="high" 
                className="w-full h-full object-cover filter contrast-125 brightness-110 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]" 
              />
            </div>
          </div>
          <div className="text-xl md:text-2xl font-bold tracking-[0.3em] text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-['Times_New_Roman',_Times,_serif]">
            Royal Enfield
          </div>
        </div>
        <nav className="hero-elem hidden md:flex gap-12 text-xs font-bold tracking-widest text-gray-300 uppercase font-sans">
          <a href="#craftsmanship" className="hover:text-white transition-colors">Craftsmanship</a>
          <a href="#performance" className="hover:text-white transition-colors">Performance</a>
        </nav>
      </header>

      {/* SEC 1: HERO */}
      <section id="hero" className="scroll-section relative w-full min-h-screen flex flex-col items-center justify-center z-10 pointer-events-none px-4 md:px-12 pt-20">
        <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto text-center">
          <div className="hero-elem text-[#c2410c] font-['Times_New_Roman',_Times,_serif] font-bold tracking-[0.3em] md:tracking-[0.5em] uppercase text-xs md:text-sm lg:text-base mb-4 md:mb-6 drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
            A LEGEND REBORN
          </div>
          <div className="hero-elem font-['Times_New_Roman',_Times,_serif] text-[12vw] md:text-[9.5rem] lg:text-[11rem] font-bold text-white leading-none tracking-normal drop-shadow-[0_20px_20px_rgba(0,0,0,0.9)] select-none">
            CLASSIC 350
          </div>
          <div className="hero-elem text-zinc-300 font-['Times_New_Roman',_Times,_serif] tracking-[0.25em] md:tracking-[0.4em] font-light text-xs md:text-sm lg:text-base uppercase mt-4 md:mt-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
            MADE LIKE A GUN. GOES LIKE A BULLET.
          </div>
        </div>
      </section>

      {/* SEC 2: CRAFTSMANSHIP */}
      <section id="craftsmanship" className="scroll-section relative w-full min-h-screen flex items-center justify-end z-10 pointer-events-none px-6 md:px-24 py-20">
        <div className="max-w-xl bg-[#080808]/60 p-8 md:p-12 border border-zinc-800/50 backdrop-blur-xl shadow-2xl pointer-events-auto">
          <div className="fade-up text-[#c2410c] text-xs font-bold tracking-[0.2em] uppercase mb-3 font-sans">
            Unrivaled Build
          </div>
          <h2 className="fade-up text-4xl md:text-6xl font-bold mb-4 text-white leading-tight">
            Mastery in Metal.
          </h2>
          <p className="fade-up text-gray-300 leading-relaxed text-base md:text-lg mb-6">
            Every component is meticulously crafted to perfection. From the signature teardrop fuel tank to the polished chrome finishes, the Classic 350 commands attention.
          </p>
          <div className="fade-up flex flex-col gap-4 mt-4 h-48 md:h-56 overflow-y-auto pr-2 custom-scrollbar">
            <div className="p-4 border-l border-white/20 bg-black/40">
              <h4 className="text-white font-bold text-lg md:text-xl mb-1">Casquette Headlamp</h4>
              <p className="text-zinc-400 text-sm">Vintage design housing modern, piercing illumination for safe night rides.</p>
            </div>
            <div className="p-4 border-l border-white/20 bg-black/40">
              <h4 className="text-white font-bold text-lg md:text-xl mb-1">Signature Saddle</h4>
              <p className="text-zinc-400 text-sm">Premium brown leather-finish seat crafted for absolute touring comfort.</p>
            </div>  
          </div>
        </div>
      </section>

      {/* SEC 3: PERFORMANCE */}
      <section id="performance" className="scroll-section relative w-full min-h-screen flex flex-col justify-center items-start z-10 pointer-events-none px-6 md:px-24 py-20">
        <div className="w-full max-w-xl bg-[#080808]/60 p-8 md:p-12 border border-zinc-800/50 backdrop-blur-xl shadow-2xl flex flex-col items-start pointer-events-auto">
          <div className="fade-up text-[#c2410c] text-xs font-bold tracking-[0.2em] uppercase mb-3 font-sans">
            Refined Engineering
          </div>
          <h2 className="fade-up text-5xl md:text-6xl font-bold mb-6 text-white">
            The J-Series Heart.
          </h2>
          <p className="fade-up text-gray-300 leading-relaxed text-lg mb-10">
            The all-new J-series engine delivers an ultra-smooth ride while retaining the legendary Royal Enfield thump. Precision tuning meets raw mechanical soul.
          </p>
          <div className="fade-up grid grid-cols-2 gap-px bg-zinc-800 p-px shadow-2xl w-full">
            {[
              { label: 'Displacement', value: '349 cc' },
              { label: 'Max Power', value: '20.2 bhp' },
              { label: 'Max Torque', value: '27.0 Nm' },
              { label: 'Transmission', value: '5-Speed' }
            ].map((spec, i) => (
              <div key={i} className="bg-[#050505] p-6 hover:bg-zinc-900 transition-colors duration-500 flex flex-col justify-center group">
                <div className="text-xs tracking-widest text-zinc-500 uppercase mb-2 group-hover:text-[#c2410c] transition-colors font-sans">
                  {spec.label}
                </div>
                <div className="text-3xl text-white font-bold">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEC 4: FIND LOCAL STORES */}
      <section id="locate" className="scroll-section relative w-full min-h-screen flex items-center justify-end z-10 px-6 md:px-24 py-20 pointer-events-none">
        <div className="bg-[#080808]/70 border border-white/10 p-10 md:p-14 max-w-lg w-full backdrop-blur-2xl pointer-events-auto shadow-2xl flex flex-col items-start">
          <div className="fade-up text-[#c2410c] text-xs font-bold tracking-[0.2em] uppercase mb-4">
            Make It Yours
          </div>
          <h2 className="fade-up text-5xl font-bold mb-4 text-white">
            Own the Legacy.
          </h2>
          <p className="fade-up text-gray-400 mb-8 leading-relaxed text-sm">
            Schedule an exclusive viewing and experience the pure ride at your nearest premium Royal Enfield dealership.
          </p>
          <div className="fade-up w-full">
            <a 
              href="https://www.google.com/search?q=Royal+Enfield+showroom+near+me" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full text-center bg-white text-black py-5 font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#c2410c] hover:text-white transition-all duration-300 block shadow-lg"
            >
              Find Local Stores
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative w-full py-6 text-center z-50 bg-black/95 border-t border-white/10 backdrop-blur-md">
        <p className="text-zinc-500 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">
          &copy; Hitesh Rai Sharma 2026. All Rights Reserved.
        </p>
      </footer>

    </main>
  )
}