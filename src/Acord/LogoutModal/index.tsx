import React from "react";

type LanguageModalProps = {
  theme?: string;
  showModal: boolean;
  onCloseModal: () => void;
  onConfirm: () => void;
};

const LogoutModal: React.FC<LanguageModalProps> = ({
  theme,
  showModal,
  onCloseModal,
  onConfirm,
}) => {
  return (
    <>
      {showModal && (
        <div
          className={`${theme}-LogoutModal-container`}
          // className="fixed inset-0 z-50 overflow-y-auto"
        >
          <div
            className={`${theme}-LogoutModal-secondDiv`}
            // className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
          >
            <div
              className={`${theme}-LogoutModal-thirdDiv`}
              // className="fixed inset-0 transition-opacity"
              onClick={onCloseModal}
            >
              <div
                className={`${theme}-LogoutModal-overlay`}
                // className="absolute inset-0 bg-black opacity-50"
              ></div>
            </div>
            <span
              className={`${theme}-LogoutModal-hiddenLayer`}
              // className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className={`${theme}-LogoutModal-fourthDiv`}
              // className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-fit sm:w-full"
            >
              <div
                className={`${theme}-LogoutModal-fifthDiv`}
                // className="bg-white px-4 pt-5 pb-4"
              >
                <div
                  className={`${theme}-LogoutModal-sixthDiv`}
                  // className="pt-1 pb-2 space-y-6"
                >
                  <div
                    className={`${theme}-LogoutModal-textContainer`}
                    // className="mt-3 text-center space-y-2 "
                  >
                    <h3
                      className={`${theme}-LogoutModal-firstText`}
                      // className="text-[16px] leading-[25px] font-[400] text-secondary-color"
                    >
                      Are you sure you want to exit?
                    </h3>
                    {/* <h3 className=" text-[12px] leading-[20px] font-[400] text-secondary-color">
                      This causes clear your chat history
                    </h3> */}
                  </div>
                  <div
                    className={`${theme}-LogoutModal-confirmContainer`}
                    // className="flex  space-x-[30px] text-primary-color text-[16px] leading-[24px] font-[500] justify-center"
                  >
                    <p
                      onClick={onConfirm}
                      className={`${theme}-LogoutModal-confirmText`}
                      // className="cursor-pointer"
                    >
                      Confirm
                    </p>
                    <p
                      className={`${theme}-LogoutModal-confirmText`}
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

LogoutModal.defaultProps = {
  theme: "Acord",
};

export default LogoutModal;
