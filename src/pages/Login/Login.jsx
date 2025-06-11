import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.config';
import Swal from 'sweetalert2';
import { FcGoogle } from 'react-icons/fc';
import { ClipLoader } from 'react-spinners';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Successfully logged in!',
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/');
    } catch (error) {
      setIsGoogleLoading(false);
      setIsLoading(false);
      console.error(`Login Error: ${error.code} - ${error.message}`);
      let errorMessage = 'An error occurred during sign in.';
      let showRegisterButton = false;
      
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'Invalid email or password. Please check your credentials and try again.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled. Please contact support.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email.';
          showRegisterButton = true;
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later.';
          break;
        default:
          errorMessage = 'Invalid email or password. Please try again.';
          console.error(`Unhandled error code: ${error.code} - ${error.message}`);
      }

      Swal.fire({
        icon: 'error',
        title: 'Sign In Failed',
        text: errorMessage,
        confirmButtonColor: '#3B82F6',
        showCancelButton: showRegisterButton,
        cancelButtonText: 'Create Account',
        confirmButtonText: 'Try Again'
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
          navigate('/register');
        }
      });
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Successfully logged in with Google!',
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/');
    } catch (error) {
      setIsGoogleLoading(false);
      setIsLoading(false);
      console.error(`Google Login Error: ${error.code} - ${error.message}`);
      let errorMessage = 'An error occurred while signing in with Google.';
      
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign in cancelled. Please try again.';
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Pop-up blocked by browser. Please allow pop-ups for this site.';
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        errorMessage = 'An account already exists with the same email but different sign-in credentials.';
      }

      Swal.fire({
        icon: 'error',
        title: 'Google Sign In Failed',
        text: errorMessage,
        confirmButtonColor: '#3B82F6',
        confirmButtonText: 'Try Again'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-sm text-gray-600">Sign in to access your account</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleEmailLogin}>
          <div className="space-y-4">
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <ClipLoader color="#ffffff" size={20} className="mr-2" />
              ) : null}
              Sign in
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
              className="cursor-pointer w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isGoogleLoading ? (
                <ClipLoader color="#1d4ed8" size={20} className="mr-2" />
              ) : (
                <FcGoogle className="h-5 w-5 mr-2" />
              )}
              Sign in with Google
            </button>
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 transition duration-200">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;