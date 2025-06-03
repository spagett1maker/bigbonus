"use client"

import { useState , useEffect} from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface Question {
  id: string,
  question_number: number,
  question_text: string
}

import seedrandom from 'seedrandom'
import EmotionBackground from "@/components/emotionBG"

function generateRandomMap(seed: string): { [key: string]: string } {
  const base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  const specials = ['♠', '♣', '♦', '★', '☆', '☯', '☢', '⚡', '@', '#', '%', '&', '*']

  const rng = seedrandom(seed)
  const shuffled = base
    .split('')
    .sort(() => rng() - 0.5)

  const map: { [key: string]: string } = {}
  for (let i = 0; i < base.length; i++) {
    const original = base[i]
    const sub = shuffled[i]
    map[original] = rng() < 0.4
      ? specials[Math.floor(rng() * specials.length)] + sub
      : sub
  }
  return map
}

function encryptAnswerFancy(answer: string): string {
  const base64 = btoa(unescape(encodeURIComponent(answer)))
  const seed = answer // or you could use userId + answer, etc.
  const map = generateRandomMap(seed)
  return base64
    .split('')
    .map((ch) => map[ch] || ch)
    .join('')
}

export default function Home() {
  const router = useRouter()
  const [question, setQuestion] = useState<Question | null>(null)
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [user_id, setUserId] = useState('')

  useEffect(() => {
    let userId = localStorage.getItem('bonus_user_id')
    if (!userId) {
      userId = crypto.randomUUID()
      localStorage.setItem('bonus_user_id', userId)
      console.log('✅ user_id 생성됨:', userId)
    } else {
      console.log('🔁 기존 user_id 사용:', userId)
    }
    setUserId(userId)
  }, [])

  useEffect(() => {
    fetch('/api/question')
      .then(res => res.json())
      .then(data => setQuestion(data.question))
  }, [])

  const handleSubmit = async () => {
    if (!question || !answer.trim()) return
    setLoading(true)

    const res = await fetch('/api/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question_id: question.id,
        answer_text: answer,
        encrypted_answer: encryptAnswerFancy(answer),
        user_id: user_id
      }),
    })

    const data = await res.json()
    setLoading(false)

    if (res.ok) {
      router.push(`/end?key=${user_id}`)
    } else {
      alert('답변 저장 실패: ' + data.error)
    }
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-10 py-8 bg-white">

      {/* <video
        className="absolute top-0 left-0 w-full h-screen object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/video2.mp4" type="video/mp4" />
        브라우저가 영상을 지원하지 않습니다.
      </video> */}

      {/* <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-10" /> */}
      <EmotionBackground />

      <div className="w-full max-w-md z-20">
        <h1 className="mb-12 text-4xl font-normal leading-tight text-black">
          {question?.question_number}. {question?.question_text}
        </h1>

        <div className="mb-6">
          <textarea
            className="w-full p-4 bg-gray-100 border-none shadow-lg placeholder:text-gray-500 rounded-lg resize-none h-36 focus:outline-none"
            placeholder={
              '잠깐 당신의 이야기를 빌려주세요.\n지금 떠오르는 것이 감정인지 잘 모르겠다면, \n괜찮습니다. 그냥 지금 떠오른 생각을 적어주세요.'
            }
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>

        <button className="w-full py-3 mb-12 text-white bg-black rounded-full" onClick={handleSubmit} disabled={loading}>
          {loading ? '전송중...' : '전송'}
        </button>

        <div className="flex justify-center">
          <Link href="/about" className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 3L19 12L5 21V3Z" fill="currentColor" />
            </svg>
          </Link>
        </div>
        
      </div>
    </div>
  )
}
