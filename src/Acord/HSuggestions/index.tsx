import React, { useEffect, useState } from "react";

interface Props {
  suggestions: string[];
  hide: boolean;
  theme?: string;
}

const HSuggestions: React.FC<Props> = ({ suggestions, theme, hide }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  // const [showSuggestions, setShowSuggestions] = useState(false);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };
  // const handleClick = () => {
  //   setShowSuggestions((prevState) => !prevState);
  //   setSelectedItem("");
  // };
  useEffect(
    function () {
      if (hide === false) setSelectedItem("");
    },
    [hide]
  );
  return (
    <>
      {!hide && (
        <div className={`${theme}-HSuggestions-container `}>
          {selectedItem && (
            <p className={`${theme}-HSuggestions-selected`}> {selectedItem}</p>
          )}
          {!selectedItem && (
            <div className={`${theme}-HSuggestions-list`}>
              {suggestions.map((item, index) => (
                <div key={index} className={`${theme}-HSuggestions-listItem`}>
                  <div
                    className={`${theme}-HSuggestions-listSecondLevel`}
                    onClick={() => handleItemClick(item)}
                  >
                    {item}
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* <button className={`${theme}-HSuggestions-button`} onClick={handleClick}>
        <img src="./Acord/hSugg.svg" alt="" />
      </button> */}
        </div>
      )}
    </>
  );
};

HSuggestions.defaultProps = {
  theme: "Acord",
  hide: true,
};

export default HSuggestions;
