'use client'

import { useEffect, useRef } from 'react'
import p5 from 'p5'

interface Props {
  answers: { sentiment: string }[]
}

export default function EmotionMapSketch({ answers }: Props) {
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (answers.length === 0) return

    const sketch = (p: p5) => {
      const dots: { x: number; y: number; vx: number; vy: number; color: p5.Color }[] = []
      let t = 0
      let sentimentColorMap: { [key: string]: p5.Color } = {}

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight)
        p.noStroke()

        sentimentColorMap = {
          positive: p.color(74, 222, 128, 160),
          neutral: p.color(250, 204, 21, 130),
          negative: p.color(248, 113, 113, 180),
        }

        const centerX = p.width / 2
        const centerY = p.height / 2

        for (const ans of answers) {
          const angle = p.random(p.TWO_PI)
          const radius = p.random(100, 300)
          const x = centerX + radius * Math.cos(angle)
          const y = centerY + radius * Math.sin(angle)
          const vx = p.random(-0.5, 0.5)
          const vy = p.random(-0.5, 0.5)

          const color = sentimentColorMap?.[ans.sentiment] || p.color(200, 200, 200)

          dots.push({ x, y, vx, vy, color })
        }
      }

      p.draw = () => {
        p.background(255, 255, 255, 15)
        const waveY = p.height / 2 + p.sin(t) * 30

        p.fill(200, 200, 255, 50)
        for (let i = 0; i < p.width; i += 10) {
          const y = waveY + p.sin(t + i * 0.01) * 20
          p.ellipse(i, y, 5, 5)
        }

        for (const dot of dots) {
          dot.x += dot.vx
          dot.y += dot.vy

          if (dot.x < 0 || dot.x > p.width) dot.vx *= -1
          if (dot.y < 0 || dot.y > p.height) dot.vy *= -1

          p.fill(dot.color)
          p.ellipse(dot.x, dot.y, 8, 8)
        }

        t += 0.01
      }
    }

    const instance = new p5(sketch, canvasRef.current!)
    return () => instance.remove()
  }, [answers])

  return <div ref={canvasRef} className="w-full h-screen" />
}
