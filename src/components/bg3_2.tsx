'use client'

import { useEffect, useRef } from 'react'

interface Dot {
  x: number
  y: number
  originX: number
  originY: number
  size: number
  baseSize: number
  opacity: number
  dx: number
  dy: number
  sparkle?: number
  floatAngle: number
  floatSpeed: number
}

export default function Bg3_2() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999, down: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    const dots: Dot[] = []
    const numDots = 7000
    const maxSpeed = 2

    const resizeCanvas = () => {
      const prevWidth = canvas.width || window.innerWidth
      const prevHeight = canvas.height || window.innerHeight
      const newWidth = window.innerWidth
      const newHeight = window.innerHeight

      for (const dot of dots) {
        dot.x = (dot.x / prevWidth) * newWidth
        dot.y = (dot.y / prevHeight) * newHeight
        dot.originX = (dot.originX / prevWidth) * newWidth
        dot.originY = (dot.originY / prevHeight) * newHeight
      }

      canvas.width = newWidth
      canvas.height = newHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    const handleMouseDown = () => {
      mouse.current.down = true
    }

    const handleMouseUp = () => {
      mouse.current.down = false
    }

    const handleClick = () => {
      for (const dot of dots) {
        const dx = dot.x - mouse.current.x
        const dy = dot.y - mouse.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 100) {
          dot.sparkle = 30
        }
      }
    }

    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('click', handleClick)

    resizeCanvas()

    for (let i = 0; i < numDots; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const size = Math.random() * 2 + 1

      dots.push({
        x,
        y,
        originX: x,
        originY: y,
        size,
        baseSize: size,
        opacity: Math.random() * 0.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.2,
        dy: (Math.random() - 0.5) * 0.2,
        floatAngle: Math.random() * Math.PI * 2,
        floatSpeed: Math.random() * 0.02 + 0.005
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const dot of dots) {
        const dxToMouse = dot.x - mouse.current.x
        const dyToMouse = dot.y - mouse.current.y
        const distToMouse = Math.sqrt(dxToMouse * dxToMouse + dyToMouse * dyToMouse)
        const influenceRadius = 100

        if (distToMouse < influenceRadius) {
          const force = (influenceRadius - distToMouse) / influenceRadius
          const angle = Math.atan2(dyToMouse, dxToMouse)

          if (mouse.current.down) {
            dot.dx -= Math.cos(angle) * force * 0.1
            dot.dy -= Math.sin(angle) * force * 0.1
          } else {
            dot.dx += Math.cos(angle) * force * 0.05
            dot.dy += Math.sin(angle) * force * 0.05
          }
        }

        // 원래 위치로 되돌아가는 힘
        const ox = dot.originX - dot.x
        const oy = dot.originY - dot.y
        dot.dx += ox * 0.0015
        dot.dy += oy * 0.0015

        // 감속 및 속도 제한
        dot.dx *= 0.98
        dot.dy *= 0.98
        dot.dx = Math.max(-maxSpeed, Math.min(maxSpeed, dot.dx))
        dot.dy = Math.max(-maxSpeed, Math.min(maxSpeed, dot.dy))

        // sparkle 효과
        if (dot.sparkle && dot.sparkle > 0) {
          dot.size = dot.baseSize + 2
          dot.opacity = 1
          dot.sparkle--
        } else {
          dot.size = dot.baseSize
        }

        // 위치 업데이트
        dot.x += dot.dx
        dot.y += dot.dy

        if (dot.x < 0) dot.x = canvas.width
        if (dot.x > canvas.width) dot.x = 0
        if (dot.y < 0) dot.y = canvas.height
        if (dot.y > canvas.height) dot.y = 0

        // 부유 진동 효과
        dot.floatAngle += dot.floatSpeed
        const floatOffsetX = Math.cos(dot.floatAngle) * 0.5
        const floatOffsetY = Math.sin(dot.floatAngle) * 0.5
        const renderX = dot.x + floatOffsetX
        const renderY = dot.y + floatOffsetY

        ctx.beginPath()
        ctx.arc(renderX, renderY, dot.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity})`
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('click', handleClick)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="absolute top-0 left-0 w-full h-screen object-cover z-0">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 bg-black" />
    </div>
  )
}
