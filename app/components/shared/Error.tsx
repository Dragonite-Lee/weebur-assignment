interface ErrorProps {
  message: string;
}

export const Error = ({ message }: ErrorProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 shadow-lg">
        <svg
          className="h-16 w-16 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
          />
        </svg>
        <p className="text-lg font-semibold text-gray-800">에러 발생</p>
        <p className="text-center text-sm text-gray-600">
          {message || "상품을 불러오지 못했습니다."}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
};
