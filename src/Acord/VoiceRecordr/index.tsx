import { useState } from "react";

import WaveVoice from "../WaveVoice";
import { BeatLoader } from "react-spinners";

type RecordProps = {
  theme?: string;
  onStart: () => void;
  onStop: () => void;
  onTalkingClick: () => void;
  isRecording?: boolean;
  disabled?: boolean;
  isTalking: boolean;
  isLoading: boolean;
};

const VoiceRecorder: React.FC<RecordProps> = ({
  onStart,
  onStop,
  onTalkingClick,
  isRecording,
  disabled,
  isTalking,
  isLoading,
  theme,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  function toggleButton() {
    if (!isRecording && !isLoading && !disabled && !isTalking) {
      onStart();
    } else {
      onStop();
    }
    if (isTalking) onTalkingClick();
  }
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      aria-disabled={disabled}
      onClick={toggleButton}
      className={`${theme}-VoiceRecorder-container ${theme}-VoiceRecorder-containerBox `}
    >
      {isTalking ? (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {isHovered ? (
            <div className={`${theme}-VoiceRecorder-stop`} />
          ) : (
            <WaveVoice></WaveVoice>
          )}
        </div>
      ) : isLoading ? (
        <BeatLoader color="white" size={8}></BeatLoader>
      ) : (
        <div className={`${theme}-VoiceRecorder-icon`} />
      )}
      {isRecording ? (
        <>
          <div
            className={`${theme}-VoiceRecorder-WaveBox  ${theme}-VoiceRecorder-Wave1`}
          ></div>
          <div
            className={`${theme}-VoiceRecorder-WaveBox  ${theme}-VoiceRecorder-Wave2`}
          ></div>
          <div
            className={`${theme}-VoiceRecorder-WaveBox  ${theme}-VoiceRecorder-Wave3`}
          ></div>
          <div
            className={`${theme}-VoiceRecorder-WaveBox  ${theme}-VoiceRecorder-Wave4`}
          ></div>
        </>
      ) : undefined}
    </div>
  );
};

VoiceRecorder.defaultProps = {
  theme: "Acord",
};
export default VoiceRecorder;
