import React,{useEffect, useState} from "react";

const Json = ({ jsonData, widgets , activeBorderElement }) => {
  const [copiedJson, setCopiedJson] = useState(false);
  const [displayJson, setDisplayJson] = useState({});

    // Update displayJson when widgets changes
    
    useEffect(() => {
      const newDisplayJson = {};
      widgets.forEach((element) => {
        const key = element.type + element.key;
  
        // Check if the key exists in jsonData
        if (jsonData[key]) {
          newDisplayJson[key] = jsonData[key];
        } else {
          newDisplayJson[key] = {};
        }
      });
 
      setDisplayJson(newDisplayJson);
    }, [widgets, jsonData]);

    setTimeout(() => {
      setCopiedJson(false)
    }, 2000);
  
    function copyJson(){
      setCopiedJson(true)
    const jsonString = JSON.stringify(displayJson, null, 2);
    navigator.clipboard
      .writeText(jsonString)
      .then(() => {
        "Copied to clipboard";
      })
      .catch((error) => {
        console.error("Failed to copy JSON data: ", error);
      });
      setCopiedJson(true)
      setTimeout(() => {
        setCopiedJson(false)
      }, 2000);
  };

  return (
    <div>
      <button
        type="button"
        data-toggle="modal"
        data-target="#exampleModal"
        className="border text-[12px] h-[32px] pr-1 pl-1 rounded border-black  bg-black text-white"
      >
        <span className="">&#123; &#125;</span> JSON
      </button>
      <div
        className="modal fade tetx-black"
        id="exampleModal"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                FORM
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            <pre>{JSON.stringify(displayJson, null, 2)}</pre>
              <button
                className="border rounded border-black p-1 bg-black text-white mt-4"
                onClick={copyJson}
              >
              {copiedJson?<div> Copied... </div> : <>Copy Json Data</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Json;