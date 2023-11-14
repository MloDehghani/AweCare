/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./ChatSection.module.css";
import { BeatLoader } from "react-spinners";
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

type ChatSectionProp = {
  chat:Array<any>
  isLoading:boolean
}

function ChatSection(props:ChatSectionProp) {
  return (
    <div className={`hiddenScrollBar ${styles.chatSectionContainer}`}>
      <div className={styles.secondDiv}>
        {props.chat?.map((item, index) => {
          return (
            <>
              <div id={"chatItem" + index}>
                {
                  item.from == 'user'?
                    <div className={styles.secondLevelofUser}>
                      <div className={styles.lastLevelofUser}>{item.message}</div>
                    </div>
                  :undefined
                }
                {
                  item.from =='admin' ?
                    <div className={styles.firstLevelofAi}>
                      <div className={styles.secondLevelofAi}>
                        <div className={styles.thirdLevelofAi}>
                          <div className={styles.aiIcon} />
                        </div>
                        <div className={styles.lastLevelofAi}>{item.message}</div>
                      </div>
                    </div>
                  :
                  undefined
                }
              </div>
            </>
          );
        })}
        {props.isLoading ?
          <div className={styles.firstLevelofAi} style={{width:'100%'}}>
            <div className={styles.secondLevelofAi}>
              <div className={styles.thirdLevelofAi}>
                <div className={styles.aiIcon} />
              </div>
              
            <div className="w-full ml-3 h-11 rounded-[8px] flex justify-start pl-3 items-center bg-[#F4F5FF]">
              <BeatLoader color="#A281C0" size={10}></BeatLoader>
            </div>
            </div>
          </div>        
          // <div className="w-full h-11 rounded-[8px] flex justify-start pl-3 items-center bg-[#F4F5FF]">
          //   <BeatLoader color="#A281C0" size={10}></BeatLoader>
          // </div>
        :undefined}
      </div>
    </div>
  );
}

export default ChatSection;
