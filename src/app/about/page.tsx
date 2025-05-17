"use client"

import { useRouter } from "next/navigation"

export default function About() {
  const router = useRouter()
  return (
    <div className="flex flex-col min-h-screen bg-white px-6 py-8">
      <div className="mb-12">
        <h1 className="text-2xl font-bold mb-8 text-center">
          잠깐 당신의 이야기를 빌려주세요.
        </h1>
        
        <div className="space-y-4 text-base">
          <p>
            〈잠깐, 당신의 이야기를 들려주세요〉는 감정이 저장되지 않는 실험적 인터페이스입니다. 이곳에서 당신은 하나의 질문을 받고, 단 하나의 응답을 남깁니다. 당신의 응답은 피드에 공유되지만, 24시간 후 자동으로 사라집니다. 다시 보려면, 새로운 질문에 다시 응답해야만 합니다.
          </p>
          
          <p>
            이 구조는 SNS나 피드백 시스템처럼 감정이 즉시 데이터로 환원되고, 응답이 노동이 되는 플랫폼의 논리에 질문을 던집니다.
          </p>
          
          <p>
            오늘날, 우리는 &apos;호의&apos;조차 지표가 되고, &apos;응답&apos;이 자산이 되는 시대를 살아갑니다. 당신이 마음을 나누는 순간, 플랫폼은 그것을 자본으로 전환합니다. 〈잠깐, 당신의 이야기를 들려주세요〉는 이 감정노동의 구조를 거부합니다.
          </p>
        </div>
      </div>
      
      <div className="mt-auto">
        <button 
          className="w-full bg-black text-white rounded-full py-4"
          onClick={() => router.push('/')}
        >
          질문하기
        </button>
      </div>
    </div>
  )
}
