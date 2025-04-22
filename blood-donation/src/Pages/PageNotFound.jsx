import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-6">
      <div className="text-center max-w-md mx-auto">
        {/* Error Icon with Golden Yellow */}
        <div className="mx-auto w-24 h-24 mb-6 text-[#FFC107]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0V9zm-.75 7.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Error Code with Crimson Red */}
        <h1 className="text-7xl font-bold text-[#D32F2F] mb-4">404</h1>

        {/* Title with Sindh Green */}
        <h2 className="text-3xl font-semibold text-[#115740] mb-3">Page Not Found</h2>

        {/* Description with Charcoal Gray */}
        <p className="text-lg text-[#333333] mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-[#115740] text-[#F9FAFB] rounded-lg font-medium hover:bg-opacity-90 transition-all"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-[#00B8D9] text-[#F9FAFB] rounded-lg font-medium hover:bg-opacity-90 transition-all"
          >
            Return Home
          </button>
        </div>

        {/* Optional decorative elements */}
        <div className="mt-12 flex justify-center space-x-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-full bg-[#FFC107] opacity-20"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;