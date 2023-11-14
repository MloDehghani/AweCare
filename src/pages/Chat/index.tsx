/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { Suggestions, VoiceRecorder } from "../../Acord";
// import HorizontalSuggestions from "../../Acord/HorizontalSuggestions";
import useSpeechToText from "react-hook-speech-to-text";
import Button from "../../Acord/Button";
import styles from "./Chat.module.css";
// import ChatSection from "../../components/ChatSection";
import { makeid, useConstructor } from "../../help";
import { useNavigate } from "react-router-dom";
import { getTokenFromLocalStorage } from "../../Storage/Token";
import { Flow } from "../../Api";
import ChatSection from "../../components/ChatSection";


const suggestions = [
  " When should I visit the doctor for a check-up?",

  "What points should I observe before surgery",

  "How long is the recovery period after surgery ",
];

// const hSuggestions = [
//   " What should I do in thiscase?",

//   "I need more information",

//   "Tell me more about surgery",
// ];

const Chat = () => {
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [hideHorizontalSuggestions, setHideHorizontalSuggestions] =
    useState(true);
  const [showTextBox, setShowTextBox] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [isTalking, setIsTalking] = useState(false);    
  const [chat, setChat] = useState<Array<any>>([]);  
  const [text, setText] = useState("");
  // const [isRecording, setIsRecording] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [useApikey, setApiKey] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_horizontalSelectedItem, _setHorizontalSelectedItem] = useState<
    string | null
  >(null);
  const [_verticalSelectedItem, _setVerticalSelectedItem] = useState<
    string | null
  >(null);
  const {
      isRecording,
      results,
      startSpeechToText,
      stopSpeechToText,
      setResults,
  } = useSpeechToText({
      continuous:true,
      crossBrowser: true,
      timeout:9000,
      googleCloudRecognitionConfig: {
        languageCode: 'en-US'
      },        
      googleApiKey: 'AIzaSyB904oDQEZb5M1vdJYxVhXOtU3_URla1Nk',
      // speechRecognitionProperties: { interimResults: true },
      useLegacyResults: false
  });  
  const audioRef = useRef<any>()    
  function handleClick() {
    if (showSuggestions)
      setHideHorizontalSuggestions((prevState) => !prevState);
  }
  // function handleHorizontalSelectItem(item: string | null) {
  //   setHorizontalSelectedItem(item);
  //   setHideHorizontalSuggestions(true);
  // }
  function sendToApi(text:string | null,timeStamp?:number) {
    setIsLoading(true)
    const adminChats = chat.filter(item => item.from === 'admin');
    const newChat = {
      type: 'text',
      message: text,
      from: 'user',
      question: text,
      message_key: makeid(15),
      weekDay: new Date().getDay(),
      month: new Date().getMonth(),
      day: new Date().getDate(),
      timestamp:timeStamp
    };    
    chat.push(newChat);
    setChat(chat);    
    setShowSuggestions(false)
    Flow.chat(
          {
            text: text,
            language: 'English',
            message_key: newChat.message_key,
            apikey: useApikey,
            getcurrentconvesationid:
              adminChats.length > 0
                ? adminChats[adminChats.length - 1].currentconverationid
                : 1,
          }
        ,(res) => {
          // console.log(res)
          const responseApi = {
            type: 'text',
            message: res.answer.answer,
            from: 'admin',
            video: res.answer.video_file,
            audio: res.answer.audio_file,
            question: '',
            currentconverationid: res.currentconverationid,
            weekDay: new Date().getDay(),
            month: new Date().getMonth(),
            day: new Date().getDate(),
            aisles:
              res.answer.suggestion_list !== 'NA'
                ? res.answer.suggestion_list
                : [],
            instanceid: res.instanceid,
            like:null,
            timestamp:timeStamp
            // aisles:JSON.parse(res.suggestion_list),
          };    
          // chat.push(responseApi);
          setChat([...chat,responseApi]);   
          setAudioUrl(responseApi.audio)
          setIsTalking(true);            
          setIsLoading(false)           
        }
    )
  }

  function handleVerticalSelected(item: string | null) {
    // setVerticalSelectedItem(item);
    sendToApi(item)
  }
  const voiceResHandler =() => {
    // const adminChats = chat.filter(item => item.from === 'admin');
    const chats:Array<any> = chat
    if(results.length>0){    
        if(!chats.map(item => item.timestamp).includes(results.map((item:any) => item.timestamp)[results.length -1])){
        // setShowAskTosend(true)
            if(results.map((item:any) => item.timestamp)[results.length -1] != chats[chats.length-1]?.timestamp){
              if(results.map((item:any) => item.transcript)[results.length -1]!= ''){
                sendToApi(results.map((item:any) => item.transcript)[results.length -1]);
                setResults([])
              }
            }
        }

    }  
  }      
  useEffect(() =>  {
    if(!isRecording){
      voiceResHandler()
    }
  }, [isRecording]);
  useEffect(() => {
      if(audioRef.current){
          const refren = audioRef.current  as any   
          refren.load()
      }   
  })
  const closeTextBox = (event:any) => {
      let paths = []
      paths = event.composedPath().map((item:HTMLElement) => item.id)
      if(!paths.includes('boxInput') && !paths.includes('boxInput-button')){
          setShowTextBox(false)
          document.removeEventListener('click',closeTextBox);
      }
  }  
  const navigate = useNavigate();    
  useConstructor(() => {
      setApiKey('e71d7ca511cb462694428833fe8377f9')
      if(!getTokenFromLocalStorage()){
        setTimeout(() => {
          navigate('/login');
        }, 200);
      }    
  })
  return (
    <div className={`${styles.container} hiddenScrollBar`}>
      {!showSuggestions && <ChatSection isLoading={isLoading} chat={chat} />}
      {showSuggestions && (
        <div className={styles.suggest}>
          <Suggestions
            onVSelectItem={handleVerticalSelected}
            suggestions={suggestions}
          />
        </div>
      )}
      <div className={styles.startTextContainer}>
        {showSuggestions && hideHorizontalSuggestions && !isRecording && (
          <div className={styles.startChat}>
            To start chatting, simply select either the voice recording button
            or the keyboard option
          </div>
        )}
      </div>

      {/* <div className={styles.hSuggestion}>
        <HorizontalSuggestions
          hide={hideHorizontalSuggestions}
          onHSelectItem={handleHorizontalSelectItem}
          suggestions={hSuggestions}
        />
      </div> */}

      <div className={styles.buttonsContainer}>
        {showTextBox ? (
          <div id="boxInput" placeholder="Ask a question" className={styles.showText}>
            <input
              value={text}
              onChange={(event) => setText(event.target.value)}
              className={styles.input}
            />
            {text.length > 0 &&  !isLoading ?
              // <div
              //   onClick={() => {
              //     setShowTextBox(false);
              //     sendToApi(text);
              //     setText("");
              //   }}
              //   className={styles.sendIcon}
              // />
              <img className={styles.sendIcon} onClick={() => {
                  setShowTextBox(false);
                  sendToApi(text);
                  setText("");                
              }} src="./Acord/Send.svg" alt="" />
            :
            undefined}
          </div>
        ) : (
          <div className={styles.twoButtonsContainer}>
            <Button theme="Awecare-RoundedButton" onClick={handleClick}>
              {/* <div className={styles.horizontalSuggestionIcon} /> */}
              <img src="./Acord/hSuggest.svg" />
            </Button>
            <div className={styles.voiceRecorder}>
              <VoiceRecorder
                disabled={false}
                isLoading={isLoading}
                isRecording={isRecording}
                isTalking={isTalking}
                onStart={() => {
                  startSpeechToText()
                  // setIsRecording(true);
                }}
                onStop={() => {
                  stopSpeechToText()
                  // setIsRecording(false);
                }}
              />
            </div>
            <Button
              theme="Awecare-RoundedButton"
              id="boxInput-button"
              onClick={() => {
                setShowTextBox(true);
                document.addEventListener('click',closeTextBox)
              }}
            >
              {/* <div className={styles.keyboardIcon} /> */}
              <img src="./Acord/keyboard3.svg" />
            </Button>
          </div>
        )}
      </div>
      <div style={{visibility:'hidden',top:0,left:0,position:'absolute',width:'0px',height:'0px'}}>
          <div style={{position:'absolute',zIndex:300}}>
          <audio ref={audioRef} controls onEnded={() => {
              setAudioUrl('')
              setIsTalking(false)
              // props.setVideoEnded(true)
              // console.log('end')
              // setvideourl(avatar=='ava1'?'https://codieappstorage.blob.core.windows.net/codievoice/Videos/V2_.mp4':'https://codieappstorage.blob.core.windows.net/codievoice/Videos/V1_.mp4')
              // props.setIsplaying(false)
          }} autoPlay={isTalking &&!isRecording}>
              <source id="audioPlayer" src={audioUrl} type="audio/mpeg"/>
          </audio>
          </div>             
      </div>       
    </div>
  );
};

export default Chat;
