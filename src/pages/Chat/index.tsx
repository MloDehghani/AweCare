/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import {
  Button, 
  ChatSection,
  ChatTextInput,
  Setting,
  Suggestions,
  VoiceRecorder 
} from "../../Acord";
import useSpeechToText from "react-hook-speech-to-text";
import styles from "./Chat.module.css";
// import ChatSection from "../../components/ChatSection";
import { makeid, useConstructor } from "../../help";
import { useNavigate } from "react-router-dom";
import { getTokenFromLocalStorage } from "../../Storage/Token";
import { Flow, checkBotId } from "../../Api";

const Chat = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const textInputRef = useRef<HTMLInputElement>(null);
  const settingRef = useRef<HTMLDivElement>(null);
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
  const handleKeyPress = (event: any) => {
      setIsTalking(false)
      if (event.key === "Enter" && text.length > 0) {
        sendToApi(text)
         setShowTextBox(false);
          setText('') 
      }
  };     
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
          console.log(res)
          const responseApi = {
            type: 'text',
            message: res.data.answer.answer,
            from: 'admin',
            video: res.data.answer.video_file,
            audio: res.data.answer.audio_file,
            question: '',
            currentconverationid: res.data.currentconverationid,
            weekDay: new Date().getDay(),
            month: new Date().getMonth(),
            day: new Date().getDate(),
            aisles:
              res.data.answer.suggestion_list !== 'NA'
                ? res.data.answer.suggestion_list
                : [],
            instanceid: res.data.instanceid,
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
      checkBotId("e71d7ca511cb462694428833fe8377f9").then((res) => {
        console.log(res)

        setSuges(res.suggestion_list)
        setShowSuggestions(true)
      })
  })
  const[suges,setSuges] = useState<Array<string>>([])
  const [boxHeight, setBoxHeight] = useState(window.innerHeight);
  const [showSetting, setShowSetting] = useState(false);
  const handleResize = () => {
    setBoxHeight(window.innerHeight);
  };
  useEffect(() => {
    setBoxHeight(window.innerHeight);
    window.addEventListener("resize", handleResize, false);
  }, []);  
  return (
    <div  style={{
        backgroundColor: "white",
        position: "relative",
        height: boxHeight,
        overflowY: "scroll",
      }} className={`${styles.container} hiddenScrollBar`}>
      {/* <div style={{position:'absolute',display:'flex',justifyContent:'center',width:'100%',top:'16px'}}>
        <div style={{width:'90%',display:'flex',paddingBottom:'8px',backgroundColor:'white',justifyContent:'end'}}>
          <img onClick={() => {
            Auth.logout()
            localStorage.clear()
            navigate('/login')
          }} className="cursor-pointer" style={{width:24}} src="./logOut.svg" alt="" />
        </div>
      </div> */}
      <div>
        {showSetting && (
          <Setting
            settingRef={settingRef}
            onChangeLanguage={() => {}}
            onClearHistory={() => {}}
            onLogout={() => {}}
          />
        )}
        {/* <div className="Acord-Setting-logoutIcon " /> */}
        <div
          onClick={() => {
            setShowSetting((prev) => !prev);
          }}
          className={styles.settingIcon}
        />
      </div>      
      {!showSuggestions && <ChatSection  isLoading={isLoading} chat={chat} />}
      {showSuggestions && (
        <div className={styles.suggest}>
          <div className={styles.suggestDiv}>
            <div className={styles.avatIcon} />
            <Suggestions
              onVSelectItem={handleVerticalSelected}
              suggestions={suges}
            />
          </div>
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
          <div className="w-[-webkit-fill-available] flex justify-center absolute bottom-6">
            <div className="flex w-[90%] justify-between items-center ">
              <div className="relative w-[-webkit-fill-available]">
                <ChatTextInput
                  send={sendToApi}
                  isLoading={false}
                  onKeyDown={handleKeyPress}
                  textInputRef={textInputRef}
                  text={text}
                  setText={setText}
                  setShowTextBox={setShowTextBox}
                />
              </div>
              <div
                onClick={() => {
                  setShowTextBox(false);
                }}
                className="w-9 h-9 cursor-pointer rounded-full flex justify-center ml-2 items-center bg-primary-color"
              >
                <img className="w-[10px]" src="./Acord/Record.svg" alt="" />
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.twoButtonsContainer}>
            <Button theme="Awecare-RoundedButton" onClick={handleClick}>
              <div className={styles.horizontalSuggestionIcon} />
              {/* <img src="./Acord/hSuggest.svg" /> */}
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
                onTalkingClick={() => {
                  setIsTalking(false)
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
              <div className={styles.keyboardIcon} />
              {/* <img src="./Acord/keyboard3.svg" /> */}
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
