import { useState } from 'react';
import SingleInput from '../../component/singleInput';


const SignUpForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      console.log('Login Data:', loginData);
    } else {
      // Basic password match validation
      if (signupData.password !== signupData.confirmPassword) {
        console.log('Passwords do not match!');
        return;
      }
      console.log('Signup Data:', signupData);
    }
  };

  const toggleMode = (e) => {
    e.preventDefault();
    setIsLogin(!isLogin);
  };

  return (
    <div className="bg-[#fff] text-[#1e1f23] py-9 px-19 flex flex-col items-center justify-between rounded-[10px] min-h-[500px]">
      <div className="w-full">
        <div className="mb-10">
          <h1 className="text-center text-3xl font-bold">x</h1>
          <h1 className="text-center text-4xl font-bold py-3">
            {isLogin ? "Welcome back!" : "Create Account"}
          </h1>
          <p className="text-xs font-semibold text-center">
            {isLogin ? "Please enter your details" : "Please fill in your information"}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="block w-full">
          {!isLogin && (
            <SingleInput
              labelText="Full Name" 
              type="text" 
              name="fullName"
              value={signupData.fullName}
              onChange={handleSignupChange}
            />
          )}
          
          <SingleInput 
            labelText="Email" 
            type="email" 
            name="email"
            value={isLogin ? loginData.email : signupData.email}
            onChange={isLogin ? handleLoginChange : handleSignupChange}
          />
          
          <SingleInput 
            labelText="Password" 
            type="password" 
            name="password"
            value={isLogin ? loginData.password : signupData.password}
            onChange={isLogin ? handleLoginChange : handleSignupChange}
          />
          
          {!isLogin && (
            <SingleInput 
              labelText="Confirm Password" 
              type="password" 
              name="confirmPassword"
              value={signupData.confirmPassword}
              onChange={handleSignupChange}
            />
          )}

          {isLogin && (
            <div className="flex text-[10px] justify-between mb-4">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  name="rememberMe"
                  checked={loginData.rememberMe}
                  onChange={handleLoginChange}
                  className="w-3 h-3 border-gray-300 rounded"
                />
                <p className="ml-1">Remember for 30 days</p>
              </div>
              <div>
                <a href="" className="text-[#666] hover:text-[#333] transition-colors duration-200">
                  forgot password?
                </a>
              </div>
            </div>
          )}

          <div className="flex mt-4">
            <button 
              type="submit"
              className="cursor-pointer bg-[#1d1e22] text-[#fff] block w-full rounded-full py-2 text-lg hover:bg-[#2d2e32] transition-colors duration-200"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>
        </form>
      </div>

      <p className="text-sm justify-self-end mt-6">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <a 
          href="" 
          className="font-semibold hover:text-[#666] transition-colors duration-200"
          onClick={toggleMode}
        >
          {isLogin ? "sign up" : "login"}
        </a>
      </p>
    </div>
  );
};

export default SignUpForm;