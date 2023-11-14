import React, { ChangeEvent, ReactNode } from "react";

function inputId(): string {
  return "checkbox" + Math.floor(Math.random() * 100000).toString();
}

interface CheckboxProps {
  theme?: string;
  label: string | ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  // onBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  theme,
  label,
  checked,
  onChange,
  ...props
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div className={`${theme}-Checkbox-container`}>
      <input
        data-testid="input-id"
        {...props}
        className={`${theme}-Checkbox-input`}
        type="checkbox"
        id={inputId()}
        checked={checked}
        onChange={handleChange}
      />
      <label className={`${theme}-Checkbox-label`} htmlFor={inputId()}>
        {label}
      </label>
    </div>
  );
};

Checkbox.defaultProps = {
  theme: "Acord",
};

export default Checkbox;
