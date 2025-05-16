export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8 bg-white">
      <div className="w-full max-w-md">
        <h1 className="mb-12 text-4xl font-normal leading-tight text-black">
          가장 최근에 느낀
          <br />
          고마움은
          <br />
          무엇이었나요?
        </h1>

        <div className="mb-6">
          <textarea
            className="w-full p-4 bg-gray-100 border-none rounded-lg resize-none h-36 focus:outline-none"
            placeholder="잠깐 당신의 이야기를 발려주세요."
          />
        </div>

        <button className="w-full py-3 mb-8 text-white bg-black rounded-full">전송</button>

        <div className="flex justify-center">
          <button className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 3L19 12L5 21V3Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
