'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface ImageCompareProps {
  beforeImage: string
  afterImage: string
  alt: string
}

export default function ImageComparison({ beforeImage, afterImage, alt }: ImageCompareProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleInteraction = (clientX: number) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const newPosition = (x / rect.width) * 100
    setSliderPosition(Math.min(Math.max(newPosition, 0), 100))
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (event: MouseEvent) => handleInteraction(event.clientX)
    const handleTouchMove = (event: TouchEvent) => handleInteraction(event.touches[0].clientX)

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('touchmove', handleTouchMove)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      setSliderPosition(prev => Math.max(prev - 1, 0))
    } else if (event.key === 'ArrowRight') {
      setSliderPosition(prev => Math.min(prev + 1, 100))
    }
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto cursor-col-resize"
      style={{ aspectRatio: '16/9' }}
      tabIndex={0}
      role="slider"
      aria-label="Image comparison slider"
      aria-valuenow={sliderPosition}
      aria-valuemin={0}
      aria-valuemax={100}
      onKeyDown={handleKeyDown}
    >
      <Image
        src={afterImage}
        alt={`${alt} - Después`}
        fill
        className="object-cover"
      />
      <div
        className="absolute top-0 left-0 bottom-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <Image
          src={beforeImage}
          alt={`${alt} - Antes`}
          fill
          className="object-cover"
        />
      </div>
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white"
        style={{ left: `${sliderPosition}%` }}
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
            <path d="M8 5v14l8-7-8-7z"/>
          </svg>
        </div>
      </div>
    </div>
  )
}