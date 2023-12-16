/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef } from "react";
import { BeatLoader } from "react-spinners";

type ChatSectionProp = {
  theme?: string;
  chat: Array<any>;
  isLoading: boolean;
  clicked: boolean;
  onStop: () => void;
  setClicked: (arg: boolean) => void;
  cancelMessagesRef: React.MutableRefObject<string[]>;
};

function ChatSection(props: ChatSectionProp) {
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (
      chatEndRef.current &&
      typeof chatEndRef.current.scrollIntoView === "function"
    ) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    if (props.clicked) {
      // console.log("Function in child component executed!");
      scrollToBottom();
      props.setClicked(false);
    }
  }, [props.clicked, props.setClicked, props]);

  useEffect(() => {
    scrollToBottom();
  }, [props.chat]);

  return (
    <div className={` hiddenScrollBar ${props.theme}-ChatSection-container`}>
      <div className={` ${props.theme}-ChatSection-secondDiv`}>
        {props.chat?.map((item, index) => {
          return (
            <>
              <div id={"chatItem" + index}>
                {item.from == "user" ? (
                  <div
                    className={`  ${props.theme}-ChatSection-secondLevelofUser`}
                  >
                    {!props.cancelMessagesRef.current.find(
                      (cancelMessage) => cancelMessage == item.message_key
                    ) && (
                      <div
                        className={`  ${props.theme}-ChatSection-lastLevelofUser`}
                      >
                        {item.message}
                      </div>
                    )}
                  </div>
                ) : undefined}
                {item.from == "admin" ? (
                  <div className={` ${props.theme}-ChatSection-firstLevelofAi`}>
                    <div
                      className={`  ${props.theme}-ChatSection-secondLevelofAi`}
                    >
                      <div
                        className={` ${props.theme}-ChatSection-thirdLevelofAi`}
                      >
                        {/* <div className={styles.aiIcon} /> */}
                        <div
                          className={`  ${props.theme}-ChatSection-aiIcon`}
                        />
                      </div>
                      <div
                        className={`  ${props.theme}-ChatSection-lastLevelofAi`}
                      >
                        {item.message}
                      </div>
                    </div>
                  </div>
                ) : undefined}
              </div>
            </>
          );
        })}
        {props.isLoading ? (
          <div className={` ${props.theme}-ChatSection-firstLevelofAiLoader`}>
            <div className={`  ${props.theme}-ChatSection-secondLevelofAi`}>
              <div className={` ${props.theme}-ChatSection-thirdLevelofAi`}>
                <div className={`  ${props.theme}-ChatSection-aiIcon`} />
              </div>

              <div className={`   ${props.theme}-ChatSection-loader`}>
                <BeatLoader
                  data-testid="loader"
                  color="#A281C0"
                  size={10}
                ></BeatLoader>
                <p
                  onClick={props.onStop}
                  className={` ${props.theme}-ChatSection-stop`}
                >
                  Stop
                </p>
              </div>
            </div>
          </div>
        ) : // <div className="w-full h-11 rounded-[8px] flex justify-start pl-3 items-center bg-[#F4F5FF]">
        //   <BeatLoader color="#A281C0" size={10}></BeatLoader>
        // </div>
        undefined}
        {/* Dummy div to scroll to bottom */}
        <div ref={chatEndRef} data-testid="chat-end-ref" />
      </div>
    </div>
  );
}

export default ChatSection;
ChatSection.defaultProps = {
  theme: "Acord",
};
