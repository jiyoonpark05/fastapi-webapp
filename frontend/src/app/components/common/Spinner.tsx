const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="spinner border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-12 h-12"></div>
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .spinner {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Spinner;
