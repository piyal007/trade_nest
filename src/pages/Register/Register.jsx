import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.config';
import Swal from 'sweetalert2';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [photoURL, setPhotoURL] = useState('');
  const navigate = useNavigate();

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
      
      // Update profile
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL || "https://i.postimg.cc/yxzXkbkL/avatar.jpg",
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
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.message,
        confirmButtonColor: '#3B82F6'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 py-20 px-4 sm:px-6 lg:px-8">
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
                    <p className="text-xs text-green-500">Password meets all requirements ✓</p>
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
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                placeholder="Enter photo URL (optional)"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="cursor-pointer group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 transform hover:scale-[1.02]"
            >
              Create Account
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