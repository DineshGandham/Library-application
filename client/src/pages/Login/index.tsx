import React from "react";
import { useLogin } from "../../hooks/Login/useLogin";

const LoginPage = () => {
  
  const { userData,handleSubmit,handleChange,isLoading,isError,message } = useLogin()
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
        {isError && <p style={{ color: 'red' }}>{message}</p>}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-lg">
             {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
