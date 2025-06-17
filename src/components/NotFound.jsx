import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';

const NotFound = () => {
  // Set document title for 404 page
  useDocumentTitle('404 - Page Not Found', false);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <div className="space-y-2">
          <h2 className="text-4xl font-semibold text-gray-800">Page Not Found</h2>
          <p className="text-gray-600 text-lg">Oops! The page you're looking for doesn't exist.</p>
        </div>
        <Link 
          to="/" 
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;