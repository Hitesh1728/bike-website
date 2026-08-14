'use client'

import React, { useRef, useLayoutEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, ContactShadows, useGLTF, Html, useProgress } from '@react-three/drei'
import gsap from 'gsap'

const Loader = () => {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center whitespace-nowrap">
        <div className="w-20 h-20 border-4 border-zinc-900 border-t-[#c2410c] rounded-full animate-spin mb-4 shadow-[0_0_20px_rgba(194,65,12,0.6)]"></div>
        <div className="text-white font-['Times_New_Roman',_Times,_serif] tracking-[0.3em] text-xl font-bold">
          {progress.toFixed(0)}%
        </div>
      </div>
    </Html>
  )
}

const RealBikeModel = () => {
  const bikeGroup = useRef()
  const speedRef = useRef(0.25) 
  const { scene } = useGLTF('/bike.glb')

  // CONTINUOUS 360 ROTATION IN BACKGROUND
  useFrame((state, delta) => {
    if (bikeGroup.current) {
      bikeGroup.current.rotation.y += speedRef.current * delta
    }
  })

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia()

      mm.add({
        isDesktop: "(min-width: 1024px)",
        isTablet: "(min-width: 768px) and (max-width: 1023px)",
        isMobile: "(max-width: 767px)"
      }, (context) => {
        let { isDesktop, isTablet, isMobile } = context.conditions

        // Bada size (Larger scale for a grand look)
        const scaleTarget = isDesktop ? 4.0 : isTablet ? 3.2 : 2.2

        gsap.fromTo(bikeGroup.current.scale, 
          { x: 0, y: 0, z: 0 },
          { x: scaleTarget, y: scaleTarget, z: scaleTarget, duration: 1.8, ease: "power3.out" }
        )
      })
    }) 

    return () => ctx.revert() 
  }, [])

  return (
    // Y position ko 0.1 par set kiya hai taaki bike upar ki taraf (center-upper) shift ho jaye
    <group ref={bikeGroup} position={[0, 0.1, 0]} scale={0}>
      <primitive object={scene} />
    </group>
  )
}

export default function BikeCanvas() {
  return (
    <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none overflow-hidden bg-black">
      {/* 🚀 FAST LOADING FIXES: dpr (Device Pixel Ratio) limit kiya taaki mobile GPU hang na ho, aur powerPreference set kiya */}
      <Canvas 
        camera={{ position: [0, 1.2, 7.5], fov: 45 }} 
        shadows 
        dpr={[1, 1.5]} 
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.8} />
        
        {/* PREMIUM STUDIO LIGHTING */}
        <spotLight position={[0, 15, 6]} angle={0.6} penumbra={0.8} intensity={7} castShadow shadow-bias={-0.0001} />
        <spotLight position={[12, 6, 6]} angle={0.4} penumbra={1} intensity={4} color="#ffffff" />
        <spotLight position={[-12, 6, -6]} angle={0.4} penumbra={1} intensity={4} color="#c2410c" />
        
        <Suspense fallback={<Loader />}>
          <RealBikeModel />
          {/* 🚀 FAST LOADING FIX: Environment map ki resolution 256 ki taaki HDRI file instantly download ho */}
          <Environment preset="studio" resolution={256} />
        </Suspense>
        
        {/* 🚀 FAST LOADING FIX: frames={1} aur resolution={256} lagaya taaki shadows har frame par re-calculate hokar lag na karein */}
        <ContactShadows position={[0, -1.2, 0]} opacity={0.7} scale={30} blur={1.8} far={6} color="#000000" resolution={256} frames={1} />
      </Canvas>
    </div>
  )
}

useGLTF.preload('/bike.glb')