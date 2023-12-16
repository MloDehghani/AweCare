import React, { HtmlHTMLAttributes, useState } from "react";
import { Button } from "..";

type FileUploadrProps = HtmlHTMLAttributes<HTMLDivElement> & {
  theme?: string;
};
const FileUploadr: React.FC<FileUploadrProps> = ({ children, theme, ...props }) => {
  const [isLoading,setisLoading] = useState(false);
  const [files,setFiles] = useState<Array<any>>([]);
  const getBase64 = (file:any,name:string) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
          setFiles([...files,{
            url:reader.result,
            name:name
          }])
          setisLoading(false)       
      };
      reader.onerror = function (error) {
          console.log('Error: ', error);
      };
  }    
  return (
    <div className={`${theme}-FileUploader-container`} {...props}>
      <div className={`${theme}-FileUploader-title`}>Upload File</div>
          <div className="mb-[12px] ml-[24px] relative cursor-pointer mt-2 rounded-[5px] p-[32px]  w-auto max-w-[555px]  h-[445px]">
              {isLoading ?
                  <div className="w-full flex justify-center h-full items-center">
                      {/* <BeatLoader  color="#1B3896" size={12} />                  */}
                  </div>                                         
                  :
                  <div className={`w-full relative  h-full bg-[#F8F8FF] border-dashed rounded-[10px]  border-2 border-[#384EB74D] ${files.length >0 ? `${theme}-FileUploader-uploadBox-fileExist`:undefined}`}>
                      <div className={`flex justify-center items-center w-full h-full `}>
                          <div className="grid">
                            <div className={`${theme}-FileUploader-icon`}></div>
                              <div className="text-[14px] text-center text-[#0F0F0F] font-bold">
                                  Drag & drop files or <span className="text-[#00B5FB] cursor-pointer">Browse</span> 
                              </div>
                              <div className="flex justify-center items-center mt-2">
                                  <div className="text-[#7B93AF] text-center text-[12px]">Supported formates: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT</div>
                              </div>
                          </div>
                      </div>
                      <input  onChange={(res:any) => {
                          setisLoading(true)
                          getBase64(res.target.files[0],res.target.value)    
                      }}  className="opacity-0 w-full h-full absolute top-0" type="file" id="upload-button" multiple accept="*" />                        
                  </div>
            }
            {files.length > 0 ? 
              <>
                <div>
                  <div className="text-[#676767] text-sm mt-5">Uploaded files</div>
                </div>
              </>
            : undefined}
            <div className="mt-[20px]">
              <Button theme="Copilot">Continue</Button>
            </div>
          </div>      
    </div>
  );
};

FileUploadr.defaultProps = {
  theme: "Acord",
};

export default FileUploadr;
