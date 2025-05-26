'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() { 
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (countdown <= 0) {
      router.push('/list/question2')
      return
    }

    const timer = setTimeout(() => {
      setCountdown(prev => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [countdown, router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center justify-between h-full max-w-md px-6 py-8">
        {/* Empty space at top */}
        <div className="flex-1"></div>

        {/* Main content - vertically centered */}
        <div className="flex flex-col items-center text-center mb-32">
          <h1 className="text-3xl font-normal text-black mb-8">404 not found</h1>
          <p className="text-sm text-gray-500">
            당신의 감정은 아직 남아 있습니다. <br/>
            다시 접근하려면, 하나의 응답이 더 필요합니다. <br/>
            반복하시겠습니까?
          </p>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          {countdown}초 후 답변 열람 페이지로 이동합니다.
        </p>
       
      </div>
    </div>
  )
}
