import React, { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  theme?: string;
};

const Button: React.FC<ButtonProps> = ({ children, theme, ...props }) => {
  return (
    <button className={`${theme}-Button-container`} {...props}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  theme: "Acord",
};

export default Button;
