const UpdateDataPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] pt-16 pb-8 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 text-blue-600 dark:text-blue-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
              />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Update Your Data
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          You can update your information here
        </p>
        
        {/* Simple Update Form Example */}
        <form className="space-y-4">
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter new username"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
          >
            Update Information
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateDataPage;