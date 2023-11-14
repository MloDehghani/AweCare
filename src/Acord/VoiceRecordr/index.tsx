import WaveVoice from "../WaveVoice";
import { BeatLoader } from "react-spinners";

type RecordProps = {
  theme?: string;
  onStart: () => void;
  onStop: () => void;
  isRecording: boolean;
  disabled?: boolean;
  isTalking: boolean;
  isLoading: boolean;
};

const VoiceRecorder: React.FC<RecordProps> = ({
  onStart,
  onStop,
  isRecording,
  disabled,
  isTalking,
  isLoading,
  theme,
}) => {
  function toggleButton() {
    if (!isRecording && !isLoading && !disabled && !isTalking) {
      onStart();
    } else {
      onStop();
    }
  }

  return (
    <div
      aria-disabled={disabled}
      onClick={toggleButton}
      className={`${theme}-VoiceRecorder-container`}
    >
      {isTalking ? (
        <WaveVoice></WaveVoice>
      ) : isLoading ? (
        <BeatLoader color="white" size={8}></BeatLoader>
      ) : (
        // <div className={`${theme}-VoiceRecorder-icon`} />
        <img src="./Acord/Record.svg" />
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
