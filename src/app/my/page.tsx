'use client'

import { useEffect, useState } from 'react'

interface Answer {
  answer_text: string
  created_at: string
  questions: { question_text: string }
}

function ensureUserId(): string {
  let userId = localStorage.getItem('bonus_user_id')
  if (!userId) {
    userId = crypto.randomUUID()
    localStorage.setItem('bonus_user_id', userId)
  }
  return userId
}

export default function MyAnswersPage() {
  const [answers, setAnswers] = useState<Answer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userId = ensureUserId()
    fetch(`/api/my?user_id=${userId}`)
      .then(res => res.json())
      .then(data => {
        setAnswers(data.answers || [])
        setLoading(false)
      })
  }, [])

  if (loading) return <p className="text-center mt-10">불러오는 중...</p>

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">나의 답변</h1>
      {answers.length === 0 ? (
        <p className="text-center text-gray-500">아직 저장된 답변이 없습니다.</p>
      ) : (
        answers.map((a, idx) => (
          <div key={idx} className="mb-10">
            <p className="text-base font-semibold mb-2">{a.questions?.question_text}</p>
            <p className="text-base text-gray-700">{a.answer_text}</p>
            <p className="text-sm text-gray-400 mt-1">{new Date(a.created_at).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  )
}
