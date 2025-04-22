export const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        <p className="text-lg font-semibold text-gray-700">로딩 중...</p>
      </div>
    </div>
  );
};
