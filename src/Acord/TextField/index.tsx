import React, { InputHTMLAttributes, useState } from "react";

// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  theme?: string;
  label?: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: "text" | "password";
  inValid: boolean | string;
  errorMessage?: string;
}

function inputId(): string {
  return "textfield" + Math.floor(Math.random() * 100000).toString();
}

const TextField: React.FC<InputProps> = ({
  theme,
  label,
  name,
  type,
  placeholder,
  onChange,
  onBlur,
  value,
  inValid,
  errorMessage,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const getInputType = () => {
    if (type === "password" && showPassword) {
      return "text";
    }
    return type;
  };

  return (
    <div className={`${theme}-TextField-container w-[100%]`}>
      <label className={`${theme}-TextField-label`} htmlFor={inputId()}>
        {label}
      </label>
      <div
        data-testid="input-container"
        className={` w-[100%]  ${
          inValid && `${theme}-TextField-inValid`
        } ${theme}-TextField-box `}
      >
        <input
          data-testid="input-id"
          {...props}
          className={`${theme}-TextField-input w-[100%] `}
          type={getInputType()}
          id={inputId()}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        />
        {type === "password" && (
          <div
            data-testid="toggle-password"
            className={`${theme}-TextField-togglePassword `}
            onClick={togglePassword}
          >
            {showPassword ? (
              // <AiOutlineEyeInvisible size="20px" />
              <div className={`${theme}-TextField-icon-eyeOff`} />
            ) : (
              // <AiOutlineEye size="20px" />
              <div className={`${theme}-TextField-icon-eye`} />
            )}
          </div>
        )}
      </div>
      {inValid && (
        <div className={`${theme}-TextField-error`}>{errorMessage}</div>
      )}
    </div>
  );
};

TextField.defaultProps = {
  theme: "Acord",
};

export default TextField;
