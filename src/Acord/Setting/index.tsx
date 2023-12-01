import { useState, useEffect } from "react";
import {
  HistorySvg,
  LanguageModal,
  LanguageSvg,
  LogoutModal,
  LogoutSvg,
} from "..";

const LanguagesList = [
  "English",
  "German",
  "French",
  "Persian",
  "Chinese",
  "Arabic",
];

type SettingProps = {
  theme?: string;
  settingRef: React.RefObject<HTMLDivElement>;
  onChangeLanguage: (selectedLanguage: string) => void; // Updated onChangeLanguage prop

  onClearHistory: () => void;
  onLogout: () => void;
};

const Setting: React.FC<SettingProps> = ({
  theme,
  settingRef,
  onChangeLanguage,
  onClearHistory,
  onLogout,
}) => {
  const [showLanguageList, setShowLanguageList] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);
  // const [confirmLogout, setConfirmLogout] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [newLanguage, setNewLanguage] = useState<string>("");
  const [languageClicked, setLanguageClicked] = useState(false);
  const [clearHistoryClicked, setClearHistoryClicked] = useState(false);
  const [logoutClicked, setLogoutClicked] = useState(false);
  function handleCloseLanguageModal() {
    setShowLanguageModal(false);
  }
  function handleCloseLogoutModal() {
    setShowLogoutModal(false);
  }

  function handleLanguage() {
    setShowLanguageList((prev) => !prev);
    setConfirmClearHistory(false);
    // setConfirmLogout(false);
    setLanguageClicked(true);
    setClearHistoryClicked(false);
    setLogoutClicked(false);
  }
  function handleClearHistory() {
    if (confirmClearHistory) {
      onClearHistory();
      setConfirmClearHistory(false);
    } else {
      setConfirmClearHistory(true);
    }
    setShowLanguageList(false);
    // setConfirmLogout(false);
    setClearHistoryClicked(true);
    setLanguageClicked(false);
    setLogoutClicked(false);
  }
  function handleLogoutClick() {
    // if (confirmLogout) {
    setShowLogoutModal(true);
    // setConfirmLogout(false);
    // } else {
    //   setConfirmLogout(true);
    // }
    setShowLanguageList(false);
    setConfirmClearHistory(false);
    setLogoutClicked(true);
    setLanguageClicked(false);
    setClearHistoryClicked(false);
  }
  function handleLogout() {
    setShowLogoutModal(false);
    onLogout();
  }

  useEffect(() => {
    // Load selected language from storage when component mounts
    const storedLanguage = localStorage.getItem("selectedLanguage");
    if (storedLanguage && LanguagesList.includes(storedLanguage)) {
      setSelectedLanguage(storedLanguage);
      setNewLanguage(storedLanguage); // Set newLanguage here
    }
  }, []);
  function handleChangeLanguage() {
    setNewLanguage(selectedLanguage);
    onChangeLanguage(selectedLanguage);
    localStorage.setItem("selectedLanguage", selectedLanguage);
    setShowLanguageModal(false);
  }

  function handleLanguageClick(item: string) {
    setSelectedLanguage(item);
    // onChangeLanguage(item);
    setShowLanguageModal(true);
    // localStorage.setItem("selectedLanguage", item);
  }
  return (
    <div ref={settingRef} className={`${theme}-Setting-container`}>
      <LanguageModal
        onConfirm={handleChangeLanguage}
        showModal={showLanguageModal}
        onCloseModal={handleCloseLanguageModal}
      />
      <LogoutModal
        onConfirm={handleLogout}
        showModal={showLogoutModal}
        onCloseModal={handleCloseLogoutModal}
      />
      <div className={`${theme}-Setting-secondDiv`}>
        <div className={`${theme}-Setting-thirdDiv`}>
          <div className={`${theme}-Setting-fourthDiv`}>
            <div className={`${theme}-Setting-fifthDiv`}>
              {/* <div className={`${theme}-Setting-translateIcon `} /> */}
              {languageClicked ? (
                <LanguageSvg color="#0CBC84" />
              ) : (
                <LanguageSvg color="#253343" />
              )}
              <p
                onClick={handleLanguage}
                className={` ${theme}-Setting-language  ${
                  languageClicked
                    ? `${theme}-Setting-clicked`
                    : `${theme}-Setting-unClicked`
                }`}
              >
                Language
              </p>
              {showLanguageList && (
                <div className={`${theme}-Setting-languageListContainer `}>
                  <ul className={`${theme}-Setting-languageList `}>
                    {LanguagesList.map((item, index) => (
                      <li
                        className={`${theme}-Setting-listItem `}
                        onClick={() => handleLanguageClick(item)}
                        value={item}
                        key={index}
                      >
                        {item}
                        {newLanguage === item && (
                          <span className={`${theme}-Setting-listItemIcon `}>
                            &#10003;
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className={`${theme}-Setting-fifthDiv`}>
              {confirmClearHistory ? (
                <div className={`${theme}-Setting-alertIcon `} />
              ) : clearHistoryClicked ? (
                <HistorySvg color="#0CBC84" />
              ) : (
                <HistorySvg color="#253343" />
              )}

              <p
                onClick={handleClearHistory}
                className={`${theme}-Setting-history  ${
                  clearHistoryClicked
                    ? `${theme}-Setting-clicked`
                    : `${theme}-Setting-unClicked`
                }`}
              >
                {confirmClearHistory ? (
                  <p className={`${theme}-Setting-listItemSure`}>Sure? </p>
                ) : (
                  <p>Clear History</p>
                )}
              </p>
            </div>
            <div className={`${theme}-Setting-sixDiv `}>
              {logoutClicked ? (
                <LogoutSvg color="#0CBC84" />
              ) : (
                <LogoutSvg color="#253343" />
              )}
              <p
                onClick={handleLogoutClick}
                className={`${theme}-Setting-logout ${
                  logoutClicked
                    ? `${theme}-Setting-clicked`
                    : `${theme}-Setting-unClicked`
                }`}
              >
                {/* {confirmLogout ? (
                  <p className={`${theme}-Setting-listItemSure`}>Sure? </p>
                ) : (
                  <p>Log out</p>
                )} */}
                <p>Log out</p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;

Setting.defaultProps = {
  theme: "Acord",
};
