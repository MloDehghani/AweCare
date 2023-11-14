import React, { useEffect, useState } from "react";

interface Props {
  suggestions: string[];
  hide: boolean;
  onHSelectItem: (item: string | null) => void;
  theme?: string;
}

const HorizontalSuggestions: React.FC<Props> = ({
  suggestions,
  theme,
  hide,
  onHSelectItem,
}) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  // const [showSuggestions, setShowSuggestions] = useState(false);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    onHSelectItem(item);
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
        <div>
          {/* {selectedItem && (
            <p className={`${theme}-HorizontalSuggestions-selected`}> {selectedItem}</p>
          )} */}
          {!selectedItem && (
            <div className={`${theme}-HorizontalSuggestions-list`}>
              {suggestions.map((item, index) => (
                <div
                  key={index}
                  className={`${theme}-HorizontalSuggestions-listItem`}
                >
                  <div
                    className={`${theme}-HorizontalSuggestions-listSecondLevel`}
                    onClick={() => handleItemClick(item)}
                  >
                    {item}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

HorizontalSuggestions.defaultProps = {
  theme: "Acord",
  hide: true,
};

export default HorizontalSuggestions;
