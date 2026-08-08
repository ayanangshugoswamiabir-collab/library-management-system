function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">

      <div className="flex flex-col items-center gap-4">

        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>


        {/* Text */}
        <p className="text-gray-500 text-sm">
          Loading...
        </p>

      </div>

    </div>
  );
}

export default LoadingSpinner;