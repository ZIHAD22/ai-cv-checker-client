import SingleInput from "../../component/singleInput";
import axios from "axios";
import { Loader, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Initialize isLogin based on URL parameter
  const [isLogin, setIsLogin] = useState(() => {
    const params = new URLSearchParams(location.search);
    const method = params.get('method');
    return method === 'signup' ? false : true;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  });

  // Update state when URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const method = params.get('method');
    setIsLogin(method === 'signup' ? false : true);
  }, [location.search]);

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
      general: "",
    };

    const currentData = isLogin ? loginData : signupData;

    // Email validation
    if (!currentData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(currentData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Password validation
    if (!currentData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (!isLogin && currentData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    // Confirm password validation (signup only)
    if (!isLogin) {
      if (!currentData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
        isValid = false;
      } else if (currentData.password !== currentData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
        isValid = false;
      }
    }

    setError(newErrors);
    return isValid;
  };

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError((prev) => ({ ...prev, general: "" }));

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/sign-up";
      const payload = isLogin
        ? { email: loginData.email, password: loginData.password }
        : { email: signupData.email, password: signupData.password };
        const { data, status } = await axios.post(endpoint, payload, {
          withCredentials: true,
        });

      if (status === 201) {
        navigate("/dashboard");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        `${isLogin ? "Login" : "Sign up"} failed. Please try again.`;
      setError((prev) => ({ ...prev, general: errorMessage }));
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    const newIsLogin = !isLogin;
    setIsLogin(newIsLogin);
    
    // Update URL
    const params = new URLSearchParams(location.search);
    params.set('method', newIsLogin ? 'login' : 'signup');
    navigate(`${location.pathname}?${params.toString()}`);
    
    // Reset form states
    setError({ email: "", password: "", confirmPassword: "", general: "" });
    setLoginData({ email: "", password: "", rememberMe: false });
    setSignupData({ email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#fff] text-[#1e1f23] py-9 px-6 sm:px-8 flex flex-col items-center justify-between rounded-[10px] min-h-[500px]">
      {isLoading ? (
        <div className="w-full flex justify-center items-center min-h-[400px]">
          <Loader className="animate-spin w-8 h-8 text-gray-500" />
        </div>
      ) : (
        <>
          <div className="w-full">
            <div className="mb-8">
              <h1 className="text-center text-4xl font-bold py-3">
                {isLogin ? "Welcome back!" : "Create Account"}
              </h1>
              <p className="text-sm font-semibold text-center text-gray-600">
                {isLogin
                  ? "Please enter your details"
                  : "Please fill in your information"}
              </p>
            </div>

            {error.general && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-red-600">{error.general}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <SingleInput
                labelText="Email"
                type="email"
                name="email"
                value={isLogin ? loginData.email : signupData.email}
                onChange={isLogin ? handleLoginChange : handleSignupChange}
                error={error.email}
                required
              />

              <SingleInput
                labelText="Password"
                type="password"
                name="password"
                value={isLogin ? loginData.password : signupData.password}
                onChange={isLogin ? handleLoginChange : handleSignupChange}
                error={error.password}
                required
              />

              {!isLogin && (
                <SingleInput
                  labelText="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={signupData.confirmPassword}
                  onChange={handleSignupChange}
                  error={error.confirmPassword}
                  required
                />
              )}

              {isLogin && (
                <div className="flex text-sm justify-between mb-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={loginData.rememberMe}
                      onChange={handleLoginChange}
                      className="w-4 h-4 border-gray-300 rounded"
                    />
                    <p className="ml-2">Remember for 30 days</p>
                  </div>
                  <div>
                    <a
                      href=""
                      className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-[#1d1e22] text-white rounded-full text-base font-medium hover:bg-[#2d2e32] transition-colors duration-200 mt-6"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>
          </div>

          <p className="text-sm mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              className="font-semibold text-[#1d1e22] hover:text-[#666] transition-colors duration-200"
              onClick={toggleMode}
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>
        </>
      )}
    </div>
  );
};

export default SignUpForm;