const AuthCheckPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] pt-16 pb-8 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 text-green-600 dark:text-green-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Authentication Verified
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          You are successfully authenticated!
        </p>
      </div>
    </div>
  );
};

export default AuthCheckPage;