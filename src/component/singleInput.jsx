import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const SingleInput = ({
  type,
  labelText,
  name,
  value,
  onChange,
  error,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="py-4">
      <div className="relative">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`peer w-full border-0 border-b-2 pb-2 focus:outline-none focus:ring-0 ${
            error ? "border-red-500 focus:border-red-500" : "focus:border-black"
          } placeholder-transparent text-sm`}
          placeholder={name}
        />
        <label
          htmlFor={name}
          className={`absolute font-semibold left-0 -top-4 ${
            error ? "text-red-500" : "text-gray-400"
          } text-xs transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm peer-placeholder-shown:font-semibold peer-placeholder-shown:text-[#1d1e22] peer-focus:-top-4 peer-focus:text-xs ${
            error ? "peer-focus:text-red-500" : "peer-focus:text-gray-400"
          } pointer-events-none peer-focus:left-0 peer-placeholder-shown:left-2`}
        >
          {labelText}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? (
              <EyeOff size={18} className="text-gray-400" />
            ) : (
              <Eye size={18} className="text-gray-400" />
            )}
          </button>
        )}
      </div>

      {/* Error message */}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default SingleInput;
