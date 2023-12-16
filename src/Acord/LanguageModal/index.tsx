import React from "react";

type LanguageModalProps = {
  theme?: string;
  showModal: boolean;
  onCloseModal: () => void;
  onConfirm: () => void;
};

const LanguageModal: React.FC<LanguageModalProps> = ({
  theme,
  showModal,
  onCloseModal,
  onConfirm,
}) => {
  return (
    <>
      {showModal && (
        <div className={`${theme}-LanguageModal-container`}>
          <div className={`${theme}-LanguageModal-secondDiv`}>
            <div
              className={`${theme}-LanguageModal-thirdDiv`}
              onClick={onCloseModal}
            >
              <div className={`${theme}-LanguageModal-overlay`}></div>
            </div>
            <span
              className={`${theme}-LanguageModal-hiddenLayer`}
              // className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className={`${theme}-LanguageModal-fourthDiv`}
              // className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-fit sm:w-full"
            >
              <div
                className={`${theme}-LanguageModal-fifthDiv`}
                // className="bg-white px-4 pt-5 pb-4"
              >
                <div
                  className={`${theme}-LanguageModal-sixthDiv`}
                  // className="py-6 space-y-3"
                >
                  <div
                    className={`${theme}-LanguageModal-textContainer`}
                    // className="mt-3 text-center space-y-2 "
                  >
                    <h3
                      className={`${theme}-LanguageModal-firstText`}
                      // className="text-[16px] leading-[25px] font-[400] text-secondary-color"
                    >
                      Are you sure you want to change language ?
                    </h3>
                    <h3
                      className={`${theme}-LanguageModal-secondText`}
                      // className=" text-[12px] leading-[20px] font-[400] text-secondary-color"
                    >
                      This causes clear your chat history
                    </h3>
                  </div>
                  <div
                    className={`${theme}-LanguageModal-confirmContainer `}
                    // className="flex  space-x-[30px] text-primary-color text-[16px] leading-[24px] font-[500] justify-center"
                  >
                    <p
                      onClick={onConfirm}
                      className={`${theme}-LanguageModal-confirmText`}
                      // className="cursor-pointer"
                    >
                      Confirm
                    </p>
                    <p
                      className={`${theme}-LanguageModal-confirmText`}
                      // className="cursor-pointer"
                      onClick={onCloseModal}
                    >
                      Cancel
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

LanguageModal.defaultProps = {
  theme: "Acord",
};

export default LanguageModal;
