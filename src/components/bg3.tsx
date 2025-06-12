'use client'

import { useEffect, useRef } from 'react'

interface Dot {
  x: number
  y: number
  size: number
  opacity: number
  dx: number
  dy: number
}

export default function Bg3() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    const dots: Dot[] = []
    const numDots = 9000

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    for (let i = 0; i < numDots; i++) {
      const angle = Math.random() * 2 * Math.PI
      const radius = 200 * Math.sqrt(Math.random())
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)

      dots.push({
        x,
        y,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.5,
        dx: (Math.random() - 0.5) * 5, // 느리게 이동
        dy: (Math.random() - 0.5) * 5
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const dot of dots) {
        dot.x += dot.dx
        dot.y += dot.dy

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity})`
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="absolute top-0 left-0 w-full h-screen object-cover z-0">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-10 bg-black" />
    </div>
  )
}
