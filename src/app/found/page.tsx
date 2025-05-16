import Link from "next/link";



export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8 bg-white">
      <div className="w-full max-w-md">

        <div className="mb-3">
          <textarea
            className="w-full p-4 bg-gray-100 border-none rounded-lg resize-none h-14 focus:outline-none"
            placeholder="암호키를 입력해주세요."
          />
        </div>

        <button className="w-full py-3 mb-8 text-white bg-black rounded-full">확인</button>

        <Link href="/">
          <p className="text-xs text-gray-500 text-center">
            암호키를 잊으셨나요?
          </p>
        </Link>
      </div>
    </div>
  )
}
