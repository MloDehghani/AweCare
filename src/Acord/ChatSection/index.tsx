/* eslint-disable @typescript-eslint/no-explicit-any */

import { BeatLoader } from "react-spinners";

type ChatSectionProp = {
  theme?: string;
  chat: Array<any>;
  isLoading: boolean;
};

function ChatSection(props: ChatSectionProp) {
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
                    <div
                      className={`  ${props.theme}-ChatSection-lastLevelofUser`}
                    >
                      {item.message}
                    </div>
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

              <div className={`  ${props.theme}-ChatSection-loader`}>
                <BeatLoader
                  data-testid="loader"
                  color="#A281C0"
                  size={10}
                ></BeatLoader>
              </div>
            </div>
          </div>
        ) : // <div className="w-full h-11 rounded-[8px] flex justify-start pl-3 items-center bg-[#F4F5FF]">
        //   <BeatLoader color="#A281C0" size={10}></BeatLoader>
        // </div>
        undefined}
      </div>
    </div>
  );
}

export default ChatSection;
ChatSection.defaultProps = {
  theme: "Acord",
};

// import styles from "./ChatSection.module.css";

// const data = [
//   { user: "Hi, how are you?", ai: "Hello! I am doing great, thank you!" },
//   {
//     user: "My sutures are bleeding, what should I do?",
//     ai: "Hello! Don't worry, I'm here to help you, Can you tell how much bleeding you have?",
//   },
//   {
//     user: "How can I learn React quickly?",
//     ai: "You can start with the official React documentation.",
//   },
// ];

// function ChatSection() {
//   return (
//     <div className={`hiddenScrollBar ${styles.chatSectionContainer}`}>
//       <div className={styles.secondDiv}>
//         {data.map((item, index) => {
//           return (
//             <>
//               <div id={"chatItem" + index}>
//                 <div className={styles.secondLevelofUser}>
//                   <div className={styles.lastLevelofUser}>{item.user}</div>
//                 </div>

//                 <div className={styles.firstLevelofAi}>
//                   <div className={styles.secondLevelofAi}>
//                     <div className={styles.thirdLevelofAi}>
//                       <div className={styles.aiIcon} />
//                     </div>
//                     <div className={styles.lastLevelofAi}>{item.ai}</div>
//                   </div>
//                 </div>
//               </div>
//             </>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default ChatSection;
