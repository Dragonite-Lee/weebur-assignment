interface NotFoundProps {
  searchTerm: string;
}

export const NotFound = ({ searchTerm }: NotFoundProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 shadow-lg">
        <svg
          className="h-16 w-16 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <p className="text-lg font-semibold text-gray-800">검색 결과 없음</p>
        <p className="text-center text-sm text-gray-600">
          "<span className="font-bold text-blue-600">{searchTerm}</span>"에 대한
          상품을 찾을 수 없습니다.
        </p>
        <button
          onClick={() => (window.location.href = "?")}
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
        >
          필터 초기화
        </button>
      </div>
    </div>
  );
};
