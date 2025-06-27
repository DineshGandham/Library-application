import { useLogin } from "../../hooks/Login/useLogin";
import { motion } from "framer-motion";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';

const PremiumLoginPage = () => {
  const { userData, handleSubmit, handleChange, isLoading, isError, message } = useLogin();
  return (
    console.log("Rendering PremiumLoginPage"),
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full max-w-md bg-white/90 p-10 rounded-3xl shadow-2xl backdrop-blur-lg border border-blue-100"
      >
        <div className="flex flex-col items-center mb-8">
          <img src="/vite.svg" alt="Library Logo" className="w-16 h-16 mb-2" />
          <h1 className="text-3xl font-extrabold text-blue-700 mb-1 tracking-tight">Library Login</h1>
          <p className="text-gray-500 text-sm">Welcome back! Please login to your account.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {isError && <p className="text-red-500 text-center text-sm">{message}</p>}
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              className="w-full px-4 py-2 mt-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
              placeholder="Enter your email"
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              className="w-full px-4 py-2 mt-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
              placeholder="Enter your password"
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </div>
          <div className="flex justify-between items-center text-xs">
            <span></span>
            <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 rounded-xl shadow-lg font-semibold text-lg transition-all duration-200">
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="my-6 flex items-center">
          <div className="flex-grow h-px bg-gray-200" />
          <span className="mx-3 text-gray-400 text-xs">or login with</span>
          <div className="flex-grow h-px bg-gray-200" />
        </div>
        <div className="flex justify-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 transition-all">
            <GoogleIcon className="text-red-500" />
            <span className="text-sm font-medium text-gray-700">Google</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 transition-all">
            <FacebookIcon className="text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Facebook</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 transition-all">
            <GitHubIcon className="text-gray-800" />
            <span className="text-sm font-medium text-gray-700">GitHub</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PremiumLoginPage;
