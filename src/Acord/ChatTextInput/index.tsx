import React, { InputHTMLAttributes } from "react";

type TextInputProps  = InputHTMLAttributes<HTMLInputElement> & {
  textInputRef: React.RefObject<HTMLDivElement>;
  theme?: string;
  isLoading: boolean;
  text: string;
  send:(text:string) =>void;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setShowTextBox: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatTextInput: React.FC<TextInputProps> = ({
  isLoading,
  theme,
  text,
  setText,
  send,
  setShowTextBox,
  textInputRef,
   ...props
}) => {
  return (
    <div
      ref={textInputRef}
      id="boxInput"
      className={`${theme}-ChatTextInput-container`}
    >
      <input
        placeholder="Message..."
        // ref={inputRef}
        value={text}
        onChange={(event) => setText(event.target.value)}
        className={`${theme}-ChatTextInput-input`}
        {...props}
      />
      {text.length > 0 && !isLoading && (
        <div
          onClick={() => {
            setShowTextBox(false);
            send(text)
            setText("");
          }}
          className={`${theme}-ChatTextInput-sendIcon `}
        />
      )}
    </div>
  );
};

export default ChatTextInput;

ChatTextInput.defaultProps = {
  theme: "Acord",
};
