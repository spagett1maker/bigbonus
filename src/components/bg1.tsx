'use client'

import p5 from 'p5'
import { useEffect, useRef } from 'react'

export default function EmotionCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let p5Instance: any = null

    const loadSketch = async () => {
      const p5 = (await import('p5')).default

      const sketch = (p: p5) => {
        const dots: any[] = []
        const rawDots: { x: number; y: number }[] = []
        let img: p5.Image

        p.preload = () => {
          img = p.loadImage('/bg.jpg')
        }

        p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasRef.current!)
          p.noStroke()
          p.background(41, 46, 73)

          const scaleX = p.width / img.width
          const scaleY = p.height / img.height

          img.loadPixels()
          for (let y = 0; y < img.height; y += 2) {
            for (let x = 0; x < img.width; x += 2) {
              const idx = (y * img.width + x) * 4
              const r = img.pixels[idx]
              const g = img.pixels[idx + 1]
              const b = img.pixels[idx + 2]
              if (r > 200 && g > 200 && b > 200) {
                rawDots.push({ x, y })
              }
            }
          }

          for (let i = 0; i < 3000; i++) {
            const d = p.random(rawDots)
            dots.push({
              baseX: d.x * scaleX,
              baseY: d.y * scaleY,
              offset: p.random(1000),
              r: p.random(0.8, 4.0),
              color: p.color(
                p.lerp(83, 187, p.random()),
                p.lerp(105, 210, p.random()),
                p.lerp(118, 197, p.random()),
                p.random(50, 120)
              )
            })
          }
        }

        p.draw = () => {
          p.background(41, 46, 73, 30)
          const t = p.millis() * 0.001
          for (const d of dots) {
            const x = d.baseX + p.sin(t + d.offset) * 1.8
            const y = d.baseY + p.cos(t + d.offset) * 1.8
            p.fill(d.color)
            p.ellipse(x, y, d.r)
          }
        }

        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight)
        }
      }

      p5Instance = new p5(sketch)
    }

    loadSketch()

    return () => {
      if (p5Instance) {
        p5Instance.remove()
      }
    }
  }, [])

  return (
    <div
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-[-1]"
      style={{ backgroundColor: '#292E49' }}
    />
  )
}
