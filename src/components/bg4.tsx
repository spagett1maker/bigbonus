'use client'

import { useEffect, useRef } from 'react'

interface Dot {
  x: number
  y: number
  targetX: number
  targetY: number
  radius: number
  speed: number
}

export default function Bg4() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let animationFrameId: number
    let dots: Dot[] = []

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    const resizeCanvas = () => {
      if (!canvas || !ctx) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    fetch('/dot_coordinates_from_b_image.json')
      .then(res => res.json())
      .then((data: { x: number; y: number }[]) => {
        if (!canvas || !ctx) return

        const scaleX = canvas.width / 400
        const scaleY = canvas.height / 400

        dots = data.map(p => {
          const targetX = p.x * scaleX
          const targetY = p.y * scaleY
          return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            targetX,
            targetY,
            radius: Math.random() * 1.8 + 0.5,
            speed: Math.random() * 0.005 + 0.001
          }
        })

        animate()
      })

    const animate = () => {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const dot of dots) {
        const dx = dot.targetX - dot.x
        const dy = dot.targetY - dot.y
        dot.x += dx * dot.speed
        dot.y += dy * dot.speed

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 bg-[#232323]"
    />
  )
}
