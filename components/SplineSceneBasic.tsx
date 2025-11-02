'use client'

import { useState, useRef, useEffect } from 'react'

export function SplineSceneBasic() {
  const [url, setUrl] = useState('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setMousePosition({ x, y })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="w-full h-screen bg-black/[0.96] relative overflow-hidden" ref={containerRef}>
      <div className="flex h-full flex-col">
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white mb-6">URL Input</h2>
          <div className="flex gap-4 max-w-md">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL..."
              className="flex-1 px-4 py-3 bg-neutral-900 border border-neutral-700 rounded text-white placeholder-neutral-500 focus:border-neutral-500 focus:outline-none"
            />
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors">
              Submit
            </button>
          </div>
          {url && <p className="text-neutral-400 mt-4 text-sm">Input: {url}</p>}
        </div>
      </div>
    </div>
  )
}
