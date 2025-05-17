"use client"
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'


export default function Home() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const secretKey = searchParams.get('key')
  const [copied, setCopied] = useState(false)
  const [countdown, setCountdown] = useState(5)


  const handleCopy = async () => {
    if (!secretKey) return
    try {
      await navigator.clipboard.writeText(secretKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // 2초 후 복사 메시지 사라짐
    } catch (err) {
      console.error('복사 실패:', err)
      alert('복사에 실패했습니다.')
    }
  }

  useEffect(() => {
    if (countdown <= 0) {
      router.push('/list')
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
          <h1 className="text-3xl font-normal text-black mb-3">네, 수고하셨습니다.</h1>
          <p className="text-sm text-gray-500">이 응답은 24시간 뒤에 삭제됩니다.</p>
        </div>

        {/* Bottom content with exact spacing */}
        <div className="flex flex-col items-center w-full mt-auto">
          <p className="text-gray-400 mb-2 text-sm">{secretKey}</p>
          <button className="w-full text-black font-semiboldbg-white rounded-md p-2" onClick={handleCopy}>
            {copied ? '복사되었음' : '기억하기'}
          </button>
        </div>
        
        <p className="text-xs text-gray-400 mt-4">
          {countdown}초 후 답변 열람 페이지로 이동합니다.
        </p>
      </div>
    </div>
  )
}
