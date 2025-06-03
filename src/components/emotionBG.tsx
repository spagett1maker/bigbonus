'use client'

import { useEffect } from 'react'

export default function EmotionBackground() {
  useEffect(() => {
    const icons = [
      "icons8-disguised-face-48.png", "icons8-angry-face-with-horns-48.png", "icons8-cold-face-48.png",
      "icons8-dizzy-48.png", "icons8-confounded-face-48.png", "icons8-exploding-head-48.png",
      "icons8-beaming-face-with-smiling-eyes-48.png", "icons8-dashing-away-48.png", "icons8-beating-heart-48.png",
      "icons8-brown-heart-48.png", "icons8-blue-heart-48.png", "icons8-astonished-face-48.png",
      "icons8-kissing-face-48.png", "icons8-alien-48.png", "icons8-downcast-face-with-sweat-48.png",
      "icons8-drooling-face-48.png", "icons8-anguished-face-48.png", "icons8-anger-symbol-48.png",
      "icons8-expressionless-face-48.png", "icons8-clown-face-48.png", "icons8-collision-48.png",
      "icons8-confused-face-48.png", "icons8-broken-heart-48.png", "icons8-disappointed-face-48.png",
      "icons8-cowboy-hat-face-48.png", "icons8-bomb-48.png", "icons8-anxious-face-with-sweat-48.png",
      "icons8-neutral-face-48.png", "icons8-dotted-line-face-48.png", "icons8-black-heart-48.png"
    ];

    const container = document.getElementById('emoji-container')!;
    const canvas = document.getElementById('line-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const emojis: { x: number, y: number }[] = [];

    for (let i = 0; i < 30; i++) {
      const img = document.createElement('img');
      img.src = `/icons/${icons[Math.floor(Math.random() * icons.length)]}`;
      img.className = 'emoji';

      const x = Math.random() * (window.innerWidth - 48);
      const y = Math.random() * (window.innerHeight - 48);
      img.style.left = `${x}px`;
      img.style.top = `${y}px`;
      img.style.setProperty('--i', Math.random().toString());

      container.appendChild(img);
      emojis.push({ x, y });
    }

    ctx.strokeStyle = '#aaa';
    ctx.lineWidth = 1.2;
    for (let i = 0; i < emojis.length - 1; i++) {
      const p1 = emojis[i];
      const p2 = emojis[i + Math.floor(Math.random() * 5) + 1] || emojis[0];
      ctx.beginPath();
      ctx.moveTo(p1.x + 24, p1.y + 24);
      ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p2.x + 24, p2.y + 24);
      ctx.stroke();
    }
  }, []);

  return (
    <>
      <div id="emoji-container" className="fixed top-0 left-0 w-full h-full z-0 opacity-40 pointer-events-none" />
      <canvas id="line-canvas" className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none mix-blend-screen opacity-50" />
      <style jsx global>{`
        .emoji {
          position: absolute;
          width: 48px;
          filter: saturate(0.6) brightness(0.9);
          animation: float 3s ease-in-out infinite;
          animation-delay: calc(var(--i) * 2s);
        }
        .emoji:hover {
          transform: scale(1.3);
        }
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
