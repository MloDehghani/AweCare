interface InformationItem {
  text: string;
  imageUrl: string;
}
interface ChatInformationProps {
  information: InformationItem[];
  theme?: string;
}

import { useState } from "react";
const ChatInformation: React.FC<ChatInformationProps> = ({
  information,
  theme,
}) => {
  const [showInformation, setShowInformation] = useState(true);
  return (
    <>
      {showInformation && (
        <div className={`${theme}-ChatInformation-firstContainer`}>
          <div className={`${theme}-ChatInformation-container `}>
            <div className={`${theme}-ChatInformation-secondDiv`}>
              <div className={`${theme}-ChatInformation-thirdDiv`}>
                <div
                  data-testid="cross-icon"
                  onClick={() => setShowInformation(false)}
                  className={`${theme}-ChatInformation-crossIcon`}
                />
              </div>
              {information.map((item, index) => (
                <div
                  key={index}
                  className={`${theme}-ChatInformation-forthDiv`}
                >
                  <p className={`${theme}-ChatInformation-fifthDiv`}>
                    {item.text}
                  </p>
                  <img
                    src={item.imageUrl}
                    alt={item.text}
                    className={`${theme}-ChatInformation-image `}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatInformation;

ChatInformation.defaultProps = {
  theme: "Acord",
};
