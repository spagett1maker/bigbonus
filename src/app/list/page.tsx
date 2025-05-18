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
    question_number: number
  }
}


export default async function QAList() {

  //랜덤으로 가져오기 (JS에서 10개 무작위 추출)
  const { data, error } = await supabase
    .from('answers')
    .select('answer_text, questions(question_text, question_number)')
    .limit(100)


  console.log(data)
  function getRandomItems<T>(arr: T[], n: number): T[] {
    return arr.sort(() => Math.random() - 0.5).slice(0, n);
  }

  const items = data ? getRandomItems(data as unknown as AnswerItem[], 10) : []


  if (error) {
    console.error('Supabase fetch error:', error.message)
    return <p className="text-red-500 text-center mt-10">데이터를 불러오지 못했습니다.</p>
  }

  return (
    <div className="flex flex-col min-h-screen bg-white px-6 py-8">
      <div className="flex-1">
        {items.map((item, idx) => (
          <div key={idx} className="mb-6 border-b border-gray-200 pb-6">
            <p className="text-base font-semibold mb-2">
              {item.questions?.question_number}. {item.questions?.question_text}
            </p>
            <p className="text-base text-gray-700">{item.answer_text}</p>
        </div>
        ))}
      </div>

      {/* Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 flex flex-col gap-3">
        <Link href="/404_not_found" className="w-full bg-black text-white rounded-full py-4 text-center">나의 답변 보기</Link>
        <Link href="/" className="w-full bg-black text-white rounded-full py-4 text-center">다음 질문</Link>
      </div>
    </div>
  )
}
