import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface AnswerItem {
  answer_text: string
  questions: {
    question_text: string
  }
}


export default async function QAList() {

  const { data, error } = await supabase
  .from('answers')
  .select('answer_text, questions(question_text)')
  .order('created_at', { ascending: false })
  .limit(5)

  const items = data as unknown as AnswerItem[]


  if (error) {
    console.error('Supabase fetch error:', error.message)
    return <p className="text-red-500 text-center mt-10">데이터를 불러오지 못했습니다.</p>
  }

  return (
    <div className="flex flex-col min-h-screen bg-white px-6 py-8">
      <div className="flex-1">
        {items.map((item, idx) => (
          <div key={idx} className="mb-12">
            <p className="text-base font-normal mb-1">{item.questions.question_text}</p>
            <p className="text-base font-normal">{item.answer_text}</p>
          </div>
        ))}
      </div>

      {/* Bottom Buttons */}
      <div className="mt-auto flex flex-col gap-3">
        <Link href="/my" className="w-full bg-black text-white rounded-full py-4 text-center">나의 답변 보기</Link>
        <Link href="/" className="w-full bg-black text-white rounded-full py-4 text-center">다음 질문</Link>
      </div>
    </div>
  )
}
