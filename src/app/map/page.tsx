"use client"
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const EmotionMapSketch = dynamic(() => import('./map'), {
  ssr: false,
})

export default function EmotionMapPage() {
  const [answers, setAnswers] = useState<{ sentiment: string }[]>([])

  useEffect(() => {
    const fetchAnswers = async () => {
      const userId = localStorage.getItem('bonus_user_id')
      if (!userId) return

      const { data, error } = await supabase
        .from('answers')
        .select('sentiment')
        .eq('user_id', userId)

      if (error) {
        console.error('Failed to fetch answers:', error)
        return
      }

      setAnswers(data || [])
    }

    fetchAnswers()
  }, [])

  return <EmotionMapSketch answers={answers} />
}
