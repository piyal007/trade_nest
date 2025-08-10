import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.config';
import Swal from 'sweetalert2';
import { ClipLoader } from 'react-spinners';
import { useAuth } from '../../contexts/AuthContext';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const Register = () => {
  // Set document title for Register page
  useDocumentTitle('Register');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [photoURL, setPhotoURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { axiosSecure } = useAuth();

  const validatePassword = (password) => {
    const hasMinLength = password.length >= 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const errors = [];
    if (!hasMinLength) errors.push('Password must be at least 6 characters long');
    if (!hasUpperCase) errors.push('Password must contain at least one uppercase letter');
    if (!hasLowerCase) errors.push('Password must contain at least one lowercase letter');
    if (!hasSpecialChar) errors.push('Password must contain at least one special character');
    
    return errors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate password
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Password',
        html: passwordErrors.map(error => `- ${error}`).join('<br>'),
        confirmButtonColor: '#3B82F6'
      });
      return;
    }

    try {
      // Create user
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      if (!photoURL) {
        throw new Error('Photo URL is required');
      }

      // Update profile
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL
      });

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Registration successful!',
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/');
    } catch (error) {
      setIsLoading(false);
      let errorMessage = 'An error occurred during registration.';
      
      if (error.message === 'Photo URL is required') {
        errorMessage = 'Please provide a photo URL to complete registration.';
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Would you like to sign in instead?';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = 'Email/password registration is not enabled. Please contact support.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Please choose a stronger password.';
      }

      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: errorMessage,
        confirmButtonColor: '#3B82F6',
        showCancelButton: error.code === 'auth/email-already-in-use',
        cancelButtonText: 'Sign In',
        confirmButtonText: 'Try Again'
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
          navigate('/login');
        }
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Create Account</h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                placeholder="Create a password"
                value={password}
                onChange={(e) => {
                setPassword(e.target.value);
                setPasswordErrors(validatePassword(e.target.value));
              }}
              />
              <div className="mt-1">
                {password && (
                  passwordErrors.length > 0 ? (
                    passwordErrors.map((error, index) => (
                      <p key={index} className="text-xs text-red-500">{error}</p>
                    ))
                  ) : (
                    <p className="text-xs text-amber-500">Password meets all requirements ✓</p>
                  )
                )}
              </div>
            </div>

            <div>
              <label htmlFor="photo-url" className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
              <input
                id="photo-url"
                name="photo-url"
                type="url"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                placeholder="Enter your photo URL"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`ui-btn ui-btn--filled w-full justify-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <ClipLoader size={20} color="#ffffff" />
                  <span className="ml-2">Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </div>

          <div className="text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;