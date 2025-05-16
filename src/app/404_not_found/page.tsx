export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center justify-between h-full max-w-md px-6 py-8">
        {/* Empty space at top */}
        <div className="flex-1"></div>

        {/* Main content - vertically centered */}
        <div className="flex flex-col items-center text-center mb-32">
          <h1 className="text-3xl font-normal text-black mb-8">404 not found</h1>
          <p className="text-sm text-gray-500">
            답변 열람은 다음 질문에 대한 <br/>
            응답 이후에 가능합니다.
          </p>
        </div>

       
      </div>
    </div>
  )
}
