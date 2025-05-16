export default function Home() {
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
          <p className="text-gray-400 mb-2 text-sm">m8Xj 2qa9</p>
          <button className="w-full text-black font-semiboldbg-white rounded-md">기억하기</button>
        </div>
      </div>
    </div>
  )
}
