import React, { useState, useRef, useEffect } from "react";
// import Edit_fields from "./Edit_fields";
import Edit_fields from "./Edit_fields";
import Json from "./json";

import { Reorder } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Form = () => {
  const [elements, setElements] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [activeBorderElement, setActiveBorderElement] = useState(null);
  const [displayHtmlCode, setDisplayHtmlCode] = useState("");
  const [sendData, setSendData] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dragStyle, setDragStyle] = useState(false);
  const [initialElementData, setInitialElementData] = useState({});
  const [ElementForData, setElementForData] = useState("");
  const [eleStyle, setEleStyle] = useState("");
  const [currentElement, setCurrentElement] = useState("");
  const [count, setCount] = useState(1);

  const [autoClicked, setAutoClicked] = useState(false);
  const [JsonData, setJsonData] = useState("");

  const AddStyle = (data, element) => {
    setCurrentElement(element);
    if (data[element].style) {
      let value = data[element].style;
      setEleStyle(value);
    } else {
      setEleStyle(data[element] == "100%");
    }
  };

  function onupdateData(data, element) {
    setInitialElementData(data);
    setElementForData(element);
    AddStyle(data, element);

  }
  function handleDragOver(e) {
    e.preventDefault();
  }
  function handleInputChange(widget, value) {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [widget]: value,
    }));
  }

  const allowedItemTypes = ["Input","Number","Checkbox","Select-Option","Label","Text-area","Radio","Datepicker","Time-Picker","Uploader"]

  function handleOnDrop(e, index) {
    e.preventDefault();
    setCount(count + 1);
    const widgetsType = e.dataTransfer.getData("widthtype");
    if (allowedItemTypes.includes(widgetsType)) {
    setElements((prevWidgets) => [
      ...prevWidgets,
      { type: widgetsType, key: index },
    ]);
    }
  }

  function getHtml(e, index) {
    const target = e.currentTarget;
    if (activeBorderElement === index) {
      setActiveBorderElement(null);
    } else {
      setActiveBorderElement(index);
    }
  }

  function removeElement(indexToRemove) {
    setElements((prevWidgets) =>
      prevWidgets.filter((widget, index) => index !== indexToRemove)
    );
  }

  function getData(e) {
    setSendData(e.currentTarget);
  }

  const copyHtmlToClipboard = () => {
    setActiveBorderElement(null);
    if (sendData) {
      const htmlContent = sendData.innerHTML;
      setDisplayHtmlCode(htmlContent);
      setCopied(true);
      if (!autoClicked) {
        setTimeout(() => {
          document.getElementById("copy_button").click();
          setAutoClicked(true);
        }, 1000);
      }
    }
  };

  const hideBorder = (e) =>{
    setActiveBorderElement(null)
  }
  setTimeout(() => {
    setCopied(false);
  }, 4000);

  function onReorder(newElement) {
    setElements(newElement);
  }

  function addPxToStyle(styleObj) {
    const updatedStyle = {};
    if (styleObj) {
      for (const key in styleObj) {
        if (styleObj.hasOwnProperty(key)) {
          if (styleObj.color || styleObj.background) {
            updatedStyle[key] = `${styleObj[key]}`;
          } else {
            updatedStyle[key] = `${styleObj[key]}px`;
          }
        }
      }
    }
    return updatedStyle;
  }

  function displayJson(data) {
    setJsonData(data);
  }
  function handleDragEnter() {
    setDragStyle(true);
  }
  function handleDragExit() {
    setDragStyle(false);
  }

  return (
    <>
      <div className="flex ml-[3%] flex-col xl:gap-y-[0px]  gap-y-[30px]">
        <div className="flex gap-2"></div>
        <Reorder.Group axis="y" values={elements} onReorder={onReorder}>
          <div className="flex justify-start">
            <div
              onDrop={(e) => handleOnDrop(e, count)}
              onDragOver={(e) => handleDragOver(e)}
              className="w-10/12 lg:w-8/12 h-full border rounded shadow-2xl border-black pt-0 p-2"
            >
              <div>
                <div className="flex justify-end">
                  <div className="flex pt-[10px] gap-x-[10px]">
                    <Json
                      activeBorderElement={activeBorderElement}
                      jsonData={JsonData}
                      widgets={elements}
                    />
                    <CopyToClipboard
                      text={`<div style="width: 50%; margin: auto;">${displayHtmlCode}</div>`}
                      onCopy={copyHtmlToClipboard}
                    >
                      <button
                        type="button"
                        onClick={(e)=>hideBorder(e)}
                        id="copy_button"
                        className="border h-[32px] text-[10px] sm:text-[12px] right-0  bg-black text-white pl-1 pr-1 rounded"
                      >
                        {copied ? (
                          <div className="text-[12px]"> COPIED... </div>
                        ) : (
                          <>
                            <i className="fa fa-solid fa-code"></i>
                            <span> HTML </span>
                          </>
                        )}
                      </button>
                    </CopyToClipboard>
                  </div>
                </div>
                <div
                  onDropCapture={(e) => {
                    getData(e);
                  }}
                >
                  <div className="-mt-[30px]">
                  <h1 className="font-bold text-2xl flex justify-center">
                    Form
                  </h1>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <form className="border rounded p-2 mt-2 max-w-full">
                      {elements.length === 0 && (
                        <div className="w-full mt-3 mb-5 flex justify-center pt-2 h-11 border">
                          <i className="fa pt-[7px] mb-1 border bg-green-500 cursor-pointer rounded-full mr-2 p-2  pb-1 fa-solid fa-plus"></i>
                          Add Form fields here
                        </div>
                      )}
                      {elements.map((widget, index) => (
                        <AnimatePresence
                          animate={{ opacity: 0 }}
                          key={index}
                          transition={{ type: "bounceStiffness", delay: 1 }}
                        >
                          <Reorder.Item
                            style={{ listStyle: "none" }}
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 1 }}
                            value={widget}
                            key={index}
                            dragTransition={{
                              type: "tween",
                              duration: 1,
                              bounceStiffness: 0.9,
                              ease: "easeInOut",
                              bounceDamping: 10,
                            }}
                          >
                            <div className="relative" key={index}>
                              {widget.type === `Checkbox` && (
                                <>
                                  <div
                                    onDragEnter={(e) => handleDragEnter(e)}
                                    onDragExit={(e) => handleDragExit(e)}
                                    className={
                                      initialElementData[
                                        `checkbox${widget.key}`
                                      ]?.main?.class &&
                                      initialElementData[
                                        `checkbox${widget.key}`
                                      ]?.main?.class.trim() !== ""
                                        ? initialElementData[
                                            `checkbox${widget.key}`
                                          ]?.main?.class
                                        : "EnterClass"
                                    }
                                    id={
                                      initialElementData[
                                        `checkbox${widget.key}`
                                      ]?.main?.id &&
                                      initialElementData[
                                        `checkbox${widget.key}`
                                      ]?.main?.id.trim() !== ""
                                        ? initialElementData[
                                            `checkbox${widget.key}`
                                          ]?.main?.id
                                        : "EnterId"
                                    }
                                    key={widget.key}
                                    onClick={(e) =>
                                      getHtml(e, `checkbox${widget.key}`)
                                    }
                                  >
                                    <div
                                      className={`border border-white ${dragStyle && `!pt-80`}  ${
                                        activeBorderElement ===
                                        `checkbox${widget.key}`
                                          ? "border !border-blue-600  mt-3"
                                          : "hover:!border hover:!border-dashed hover:!border-blue-700 mt-3"
                                      }`}
                                    >
                                      <div className="input-group-text">
                                        <input
                                          style={{
                                            ...(currentElement ===
                                            `checkbox${widget.key}`
                                              ? addPxToStyle(eleStyle)
                                              : {}),
                                          }}
                                          placeholder={
                                            initialElementData[
                                              `checkbox${widget.key}`
                                            ]?.main?.placeholder &&
                                            initialElementData[
                                              `checkbox${widget.key}`
                                            ]?.main?.placeholder.trim() !== ""
                                              ? initialElementData[
                                                  `checkbox${widget.key}`
                                                ]?.main?.placeholder
                                              : ""
                                          }
                                          name={`checkbox${widget.key}`}
                                          {...(initialElementData[
                                            `checkbox${widget.key}`
                                          ]?.main?.required === "required"
                                            ? initialElementData[
                                                `checkbox${widget.key}`
                                              ]?.main?.required
                                            : {})}
                                          className="mr-2"
                                          type="checkbox"
                                          id={`exampleInputName_${widget.key}`}
                                          aria-label="Checkbox for following text input"
                                          onChange={(e) =>
                                            handleInputChange(
                                              `Checkbox${widget.key}`,
                                              e.target.value
                                            )
                                          }
                                        />
                                        {initialElementData[
                                          `checkbox${widget.key}`
                                        ]?.main?.placeholder &&
                                        initialElementData[
                                          `checkbox${widget.key}`
                                        ]?.main?.placeholder.trim() !== ""
                                          ? initialElementData[
                                              `checkbox${widget.key}`
                                            ]?.main?.placeholder
                                          : "CheckBox"}
                                      </div>
                                    </div>
                                  </div>
                                  {activeBorderElement ===
                                    `checkbox${widget.key}` && (
                                    <div className="absolute flex -top-3 bg-white z-20 right-5 text-blue-600 ">
                                      CheckBox-&nbsp;
                                      <div onClick={() => removeElement(index)}>
                                        <i className="fa fa-trash cursor-pointer"></i>
                                      </div>
                                    </div>
                                  )}
                                </>
                              )}

                              {widget.type === "Input" && (
                                <div
                                  key={widget.key}
                                  onClick={(e) =>
                                    getHtml(e, `Input${widget.key}`)
                                  }
                                  className={
                                    initialElementData[`Input${widget.key}`]
                                      ?.main?.class &&
                                    initialElementData[
                                      `Input${widget.key}`
                                    ]?.main?.class.trim() !== ""
                                      ? initialElementData[`Input${widget.key}`]
                                          ?.main?.class
                                      : ""
                                  }
                                  id={
                                    initialElementData[`Input${widget.key}`]
                                      ?.main?.id &&
                                    initialElementData[
                                      `Input${widget.key}`
                                    ]?.main?.id.trim() !== ""
                                      ? initialElementData[`Input${widget.key}`]
                                          ?.main?.id
                                      : ""
                                  }
                                >
                                  <div
                                    className={`border border-white  ${
                                      activeBorderElement ===
                                      `Input${widget.key}`
                                        ? "border !border-blue-600  mt-3"
                                        : "hover:!border hover:!border-dashed hover:!border-blue-700 mt-3"
                                    }`}
                                  >
                                    <label
                                      htmlFor={`exampleInputName_${widget.key}`}
                                      className="form-label"
                                    >
                                      {initialElementData[`Input${widget.key}`]
                                        ?.main?.label &&
                                      initialElementData[
                                        `Input${widget.key}`
                                      ]?.main?.label.trim() !== ""
                                        ? initialElementData[
                                            `Input${widget.key}`
                                          ]?.main?.label
                                        : "Input"}
                                    </label>
                                    <input
                                      style={{
                                        ...(currentElement ===
                                        `Input${widget.key}`
                                          ? addPxToStyle(eleStyle)
                                          : {}),
                                      }}
                                      key={
                                        initialElementData[`Input${widget.key}`]
                                          ?.main?.key &&
                                        initialElementData[
                                          `Input${widget.key}`
                                        ]?.main?.key.trim() !== ""
                                          ? initialElementData[
                                              `Input${widget.key}`
                                            ]?.main?.key
                                          : ""
                                        }
                                      placeholder={
                                        initialElementData[`Input${widget.key}`]
                                          ?.main?.placeholder &&
                                        initialElementData[
                                          `Input${widget.key}`
                                        ]?.main?.placeholder.trim() !== ""
                                          ? initialElementData[
                                              `Input${widget.key}`
                                            ]?.main?.placeholder
                                          : ""
                                      }
                                      type="text"
                                      className="form-control border w-full border-black"
                                      id={`exampleInputName_${widget.key}`}
                                      aria-describedby="nameHelp"
                                      onChange={(e) =>
                                        handleInputChange(
                                          `NameField${widget.key}`,
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                  {activeBorderElement ===
                                    `Input${widget.key}` && (
                                    <div className="absolute flex -top-3 bg-white z-20 right-5 text-blue-600 ">
                                      Input-&nbsp;
                                      <div onClick={() => removeElement(index)}>
                                        <i className="fa fa-trash cursor-pointer"></i>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                              {widget.type === `Number` && (
                                <div
                                  key={widget.key}
                                  onClick={(e) =>
                                    getHtml(e, `Number${widget.key}`)
                                  }
                                  className={
                                    initialElementData[`Number${widget.key}`]
                                      ?.main?.class &&
                                    initialElementData[
                                      `Number${widget.key}`
                                    ]?.main?.class.trim() !== ""
                                      ? initialElementData[
                                          `Number${widget.key}`
                                        ]?.main?.class
                                      : ""
                                  }
                                  id={
                                    initialElementData[`Number${widget.key}`]
                                      ?.main?.id &&
                                    initialElementData[
                                      `Number${widget.key}`
                                    ]?.main?.id.trim() !== ""
                                      ? initialElementData[
                                          `Number${widget.key}`
                                        ]?.main.id
                                      : ""
                                  }
                                >
                                  <div
                                    className={`border border-white ${
                                      activeBorderElement ===
                                      `Number${widget.key}`
                                        ? "border !border-blue-600  mt-3"
                                        : "hover:!border hover:!border-dashed hover:!border-blue-700 mt-3"
                                    }`}
                                  >
                                    <label
                                      htmlFor={`exampleInputName_${widget.key}`}
                                      className="form-label"
                                    >
                                      {initialElementData[`Number${widget.key}`]
                                        ?.main?.label &&
                                      initialElementData[
                                        `Number${widget.key}`
                                      ]?.main?.label.trim() !== ""
                                        ? initialElementData[
                                            `Number${widget.key}`
                                          ]?.main.label
                                        : "Number"}
                                    </label>
                                    <input
                                      style={{
                                        ...(currentElement ===
                                        `Number${widget.key}`
                                          ? addPxToStyle(eleStyle)
                                          : {}),
                                      }}
                                      placeholder={
                                        initialElementData[
                                          `Number${widget.key}`
                                        ]?.main?.placeholder &&
                                        initialElementData[
                                          `Number${widget.key}`
                                        ]?.main?.placeholder.trim() !== ""
                                          ? initialElementData[
                                              `Number${widget.key}`
                                            ]?.main.placeholder
                                          : ""
                                      }
                                      value={
                                        initialElementData[
                                          `Number${widget.key}`
                                        ]?.main?.value &&
                                        initialElementData[
                                          `Number${widget.key}`
                                        ]?.main?.value.trim() !== ""
                                          ? initialElementData[
                                              `Number${widget.key}`
                                            ]?.main.value
                                          : ""
                                      }
                                      key={
                                        initialElementData[
                                          `Number${widget.key}`
                                        ]?.main?.key &&
                                        initialElementData[
                                          `Number${widget.key}`
                                        ]?.main?.key.trim() !== ""
                                          ? initialElementData[
                                              `Number${widget.key}`
                                            ]?.main?.key
                                          : ""
                                      }
                                      type="number"
                                      className="form-control w-full border border-black"
                                      id={`EnterId_${widget.key}`}
                                      aria-describedby="nameHelp"
                                      onChange={(e) =>
                                        handleInputChange(
                                          `NumberField`,
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                  {activeBorderElement ===
                                    `Number${widget.key}` &&
                                    activeBorderElement !== null && (
                                      <div className="absolute flex -top-3 bg-white z-20 right-5 text-blue-600 ">
                                        Number-&nbsp;
                                        <div
                                          onClick={() => removeElement(index)}
                                        >
                                          <i className="fa fa-trash cursor-pointer"></i>
                                        </div>
                                      </div>
                                    )}
                                </div>
                              )}
                              {widget.type === "Select-Option" && (
                                <div
                                  key={widget.key}
                                  onClick={(e) =>
                                    getHtml(e, `Select-Option${widget.key}`)
                                  }
                                  className={
                                    initialElementData[
                                      `Select-Option${widget.key}`
                                    ]?.main?.class &&
                                    initialElementData[
                                      `Select-Option${widget.key}`
                                    ]?.main?.class.trim() !== ""
                                      ? initialElementData[
                                          `Select-Option${widget.key}`
                                        ]?.main.class
                                      : ""
                                  }
                                  id={
                                    initialElementData[
                                      `Select-Option${widget.key}`
                                    ]?.main?.id &&
                                    initialElementData[
                                      `Select-Option${widget.key}`
                                    ]?.main?.id.trim() !== ""
                                      ? initialElementData[
                                          `Select-Option${widget.key}`
                                        ]?.main.id
                                      : ""
                                  }
                                >
                                  <div
                                    className={`border border-white  ${
                                      activeBorderElement ===
                                      `Select-Option${widget.key}`
                                        ? "border !border-blue-600  mt-3"
                                        : "hover:!border hover:!border-dashed hover:!border-blue-700 mt-3"
                                    }`}
                                  >
                                    <select
                                      style={{
                                        ...(currentElement ===
                                        `Select-Option${widget.key}`
                                          ? addPxToStyle(eleStyle)
                                          : {}),
                                      }}
                                      className="form-select form-select-lg text-xl pb-3 p-2 rounded border w-full "
                                      onChange={(e) =>
                                        handleInputChange(
                                          `Select-Option${widget.key}`,
                                          e.target.value
                                        )
                                      }
                                    >
                                      <option disabled value="null">
                                        Open this select menu
                                      </option>
                                      <option value="1">One</option>
                                      <option value="2">Two</option>
                                      <option value="3">Three</option>
                                    </select>
                                  </div>
                                  {activeBorderElement ===
                                    `Select-Option${widget.key}` && (
                                    <div
                                      className="absolute flex -top-3 bg-white z-20 right-5 text-blue-600 "
                                      id={`E_${widget.key}`}
                                    >
                                      Select-Option-&nbsp;
                                      <div onClick={() => removeElement(index)}>
                                        <i className="fa fa-trash cursor-pointer"></i>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                              {widget.type === "Label" && (
                                <div
                                  key={widget.key}
                                  className={
                                    initialElementData[`Label${widget.key}`]
                                      ?.main?.class &&
                                    initialElementData[
                                      `Label${widget.key}`
                                    ]?.main?.class.trim() !== ""
                                      ? initialElementData[`Label${widget.key}`]
                                          ?.main.class
                                      : ""
                                  }
                                  id={
                                    initialElementData[`Label${widget.key}`]
                                      ?.main?.id &&
                                    initialElementData[
                                      `Label${widget.key}`
                                    ]?.main?.id.trim() !== ""
                                      ? initialElementData[`Label${widget.key}`]
                                          ?.main.id
                                      : ""
                                  }
                                  onClick={(e) =>
                                    getHtml(e, `Label${widget.key}`)
                                  }
                                >
                                  <div
                                    className={`border border-white ${
                                      activeBorderElement ===
                                      `Label${widget.key}`
                                        ? "border !border-blue-600  mt-3"
                                        : "hover:!border hover:!border-dashed hover:!border-blue-700 mt-3"
                                    }`}
                                  >
                                    <label
                                      style={{
                                        ...(currentElement ===
                                        `Label${widget.key}`
                                          ? addPxToStyle(eleStyle)
                                          : {}),
                                      }}
                                      htmlFor={`exampleInputName_${widget.key}`}
                                      className="form-label"
                                      id=""
                                    >
                                      {initialElementData[`Label${widget.key}`]
                                        ?.main?.placeholder &&
                                      initialElementData[
                                        `Label${widget.key}`
                                      ]?.main?.placeholder.trim() !== ""
                                        ? initialElementData[
                                            `Label${widget.key}`
                                          ]?.main.placeholder
                                        : "Enter Label here"}
                                    </label>
                                    {activeBorderElement ===
                                      `Label${widget.key}` && (
                                      <div className="absolute flex -top-3 bg-white z-20 right-5 text-blue-600 ">
                                        Label-&nbsp;
                                        <div
                                          onClick={() => removeElement(index)}
                                        >
                                          <i className="fa fa-trash cursor-pointer"></i>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                              {widget.type === "Text-area" && (
                                <div
                                  key={widget.key}
                                  onClick={(e) =>
                                    getHtml(e, `Text-area${widget.key}`)
                                  }
                                  className={
                                    initialElementData[`Text-area${widget.key}`]
                                      ?.main?.class &&
                                    initialElementData[
                                      `Text-area${widget.key}`
                                    ]?.main?.class.trim() !== ""
                                      ? initialElementData[
                                          `Text-area${widget.key}`
                                        ]?.main.class
                                      : ""
                                  }
                                  id={
                                    initialElementData[`Text-area${widget.key}`]
                                      ?.main?.id &&
                                    initialElementData[
                                      `Text-area${widget.key}`
                                    ]?.main?.id.trim() !== ""
                                      ? initialElementData[
                                          `Text-area${widget.key}`
                                        ]?.main.id
                                      : ""
                                  }
                                >
                                  <div
                                    className={`border border-white  ${
                                      activeBorderElement ===
                                      `Text-area${widget.key}`
                                        ? "border !border-blue-600  mt-3"
                                        : "hover:!border hover:!border-dashed hover:!border-blue-700 mt-3"
                                    }`}
                                  >
                                    <label htmlFor="exampleFormControlTextarea1">
                                      {initialElementData[
                                        `Text-area${widget.key}`
                                      ]?.main?.label &&
                                      initialElementData[
                                        `Text-area${widget.key}`
                                      ]?.main?.label.trim() !== ""
                                        ? initialElementData[
                                            `Text-area${widget.key}`
                                          ]?.main.label
                                        : "Text-area"}
                                    </label>

                                    <textarea
                                      style={{
                                        ...(currentElement ===
                                        `Text-area${widget.key}`
                                          ? addPxToStyle(eleStyle)
                                          : {}),
                                      }}
                                      key={
                                        initialElementData[
                                          `Text-area${widget.key}`
                                        ]?.main?.key &&
                                        initialElementData[
                                          `Text-area${widget.key}`
                                        ]?.main?.key.trim() !== ""
                                          ? initialElementData[
                                              `Text-area${widget.key}`
                                            ]?.main.key
                                          : ""
                                      }
                                      placeholder={
                                        initialElementData[
                                          `Text-area${widget.key}`
                                        ]?.main?.placeholder &&
                                        initialElementData[
                                          `Text-area${widget.key}`
                                        ]?.main?.placeholder.trim() !== ""
                                          ? initialElementData[
                                              `Text-area${widget.key}`
                                            ]?.main.placeholder
                                          : ""
                                      }
                                      className="form-control mt-2  border w-full "
                                      // onChange={(e) =>
                                      //   // handleInputChange(
                                      //   //   `Text-area${widget.key}`,
                                      //   //   e.target.value
                                      //   // )
                                      // }
                                      id="exampleFormControlTextarea1"
                                      rows="3"
                                    ></textarea>
                                  </div>
                                  {activeBorderElement ===
                                    `Text-area${widget.key}` && (
                                    <div className="absolute flex -top-3 bg-white z-20 right-5 text-blue-600 ">
                                      Text-area-&nbsp;
                                      <div onClick={() => removeElement(index)}>
                                        <i className="fa fa-trash cursor-pointer"></i>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                              {widget.type === "Radio" && (
                                <div
                                  key={widget.key}
                                  onClick={(e) =>
                                    getHtml(e, `Radio${widget.key}`)
                                  }
                                  className={
                                    initialElementData[`Radio${widget.key}`]
                                      ?.main?.class &&
                                    initialElementData[
                                      `Radio${widget.key}`
                                    ]?.main?.class.trim() !== ""
                                      ? initialElementData[`Radio${widget.key}`]
                                          ?.main.class
                                      : ""
                                  }
                                  id={
                                    initialElementData[`Radio${widget.key}`]
                                      ?.main?.id &&
                                    initialElementData[
                                      `Radio${widget.key}`
                                    ]?.main?.id.trim() !== ""
                                      ? initialElementData[`Radio${widget.key}`]
                                          ?.main.id
                                      : ""
                                  }
                                >
                                  <div
                                    className={`border border-white ${
                                      activeBorderElement ===
                                      `Radio${widget.key}`
                                        ? "border !border-blue-600  mt-3"
                                        : "hover:!border hover:!border-dashed hover:!border-blue-700 mt-3"
                                    }`}
                                  >
                                    <div className="input-group-text">
                                      <input
                                        style={{
                                          ...(currentElement ===
                                          `Radio${widget.key}`
                                            ? addPxToStyle(eleStyle)
                                            : {}),
                                        }}
                                        className="mr-2"
                                        type="radio"
                                        id={`exampleInputName_${widget.key}`}
                                        aria-label="Checkbox for following text input"
                                        onChange={(e) =>
                                          handleInputChange(
                                            `Radio${widget.key}`,
                                            e.target.value
                                          )
                                        }
                                      />
                                      {initialElementData[`Radio${widget.key}`]
                                        ?.main?.placeholder &&
                                      initialElementData[
                                        `Radio${widget.key}`
                                      ]?.main?.placeholder.trim() !== ""
                                        ? initialElementData[
                                            `Radio${widget.key}`
                                          ]?.main.placeholder
                                        : "Enter placeholder"}
                                    </div>
                                  </div>
                                  {activeBorderElement ===
                                    `Radio${widget.key}` && (
                                    <div className="absolute flex -top-3 bg-white z-20 right-5 text-blue-600 ">
                                      Radio-&nbsp;
                                      <div onClick={() => removeElement(index)}>
                                        <i className="fa fa-trash cursor-pointer"></i>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                              {widget.type === "Datepicker" && (
                                <div
                                  key={widget.key}
                                  onClick={(e) =>
                                    getHtml(e, `Datepicker${widget.key}`)
                                  }
                                  className={
                                    initialElementData[
                                      `Datepicker${widget.key}`
                                    ]?.main?.class &&
                                    initialElementData[
                                      `Datepicker${widget.key}`
                                    ]?.main?.class.trim() !== ""
                                      ? initialElementData[
                                          `Datepicker${widget.key}`
                                        ]?.main.class
                                      : ""
                                  }
                                  id={
                                    initialElementData[
                                      `Datepicker${widget.key}`
                                    ]?.main?.id &&
                                    initialElementData[
                                      `Datepicker${widget.key}`
                                    ]?.main?.id.trim() !== ""
                                      ? initialElementData[
                                          `Datepicker${widget.key}`
                                        ]?.main.id
                                      : ""
                                  }
                                >
                                  <div
                                    className={`border border-white ${
                                      activeBorderElement ===
                                      `Datepicker${widget.key}`
                                        ? "border !border-blue-600  mt-3"
                                        : "hover:!border hover:!border-dashed hover:!border-blue-700 mt-3"
                                    }`}
                                  >
                                    <label htmlFor="exampleInputEmail1">
                                      {initialElementData[
                                        `Datepicker${widget.key}`
                                      ]?.main?.label &&
                                      initialElementData[
                                        `Datepicker${widget.key}`
                                      ]?.main?.label.trim() !== ""
                                        ? initialElementData[
                                            `Datepicker${widget.key}`
                                          ]?.main.label
                                        : "Date-Picker :"}
                                    </label>{" "}
                                    <br />
                                    <input
                                      style={{
                                        ...(currentElement ===
                                        `Datepicker${widget.key}`
                                          ? addPxToStyle(eleStyle)
                                          : {}),
                                      }}
                                      // placeholder="Select Date"
                                      key={
                                        initialElementData[
                                          `Datepicker${widget.key}`
                                        ]?.main?.key &&
                                        initialElementData[
                                          `Datepicker${widget.key}`
                                        ]?.main?.key.trim() !== ""
                                          ? initialElementData[
                                              `Datepicker${widget.key}`
                                            ]?.main.key
                                          : ""
                                      }
                                      type="date"
                                      className="form-control "
                                      id="exampleInputEmail1e"
                                      onChange={(e) =>
                                        handleInputChange(
                                          `Datepicker${widget.key}`,
                                          e.target.value
                                        )
                                      }
                                      aria-describedby="datehelp"
                                    />
                                  </div>
                                  {activeBorderElement ===
                                    `Datepicker${widget.key}` && (
                                    <div className="absolute flex -top-3 bg-white z-20 right-5 text-blue-600 ">
                                      Datepicker-&nbsp;
                                      <div onClick={() => removeElement(index)}>
                                        <i className="fa fa-trash cursor-pointer"></i>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                              {widget.type === "Time-Picker" && (
                                <div
                                  key={widget.key}
                                  onClick={(e) =>
                                    getHtml(e, `Time-Picker${widget.key}`)
                                  }
                                  className={
                                    initialElementData[
                                      `Time-Picker${widget.key}`
                                    ]?.main?.class &&
                                    initialElementData[
                                      `Time-Picker${widget.key}`
                                    ]?.main?.class.trim() !== ""
                                      ? initialElementData[
                                          `Time-Picker${widget.key}`
                                        ]?.main.class
                                      : ""
                                  }
                                  id={
                                    initialElementData[
                                      `Time-Picker${widget.key}`
                                    ]?.main?.id &&
                                    initialElementData[
                                      `Time-Picker${widget.key}`
                                    ]?.main?.id.trim() !== ""
                                      ? initialElementData[
                                          `Time-Picker${widget.key}`
                                        ]?.main.id
                                      : ""
                                  }
                                >
                                  <div
                                    className={`border border-white ${
                                      activeBorderElement ===
                                      `Time-Picker${widget.key}`
                                        ? "border !border-blue-600  mt-3"
                                        : "hover:!border hover:!border-dashed hover:!border-blue-700 mt-3"
                                    }`}
                                  >
                                    <label htmlFor="exampleInputEmail1">
                                      {initialElementData[
                                        `Time-Picker${widget.key}`
                                      ]?.main?.label &&
                                      initialElementData[
                                        `Time-Picker${widget.key}`
                                      ]?.main?.label.trim() !== ""
                                        ? initialElementData[
                                            `Time-Picker${widget.key}`
                                          ]?.main.label
                                        : "Time-Picker :"}
                                    </label>
                                    <br />
                                    <input
                                      style={{
                                        ...(currentElement ===
                                        `Time-Picker${widget.key}`
                                          ? addPxToStyle(eleStyle)
                                          : {}),
                                      }}
                                      // placeholder="Select Time"
                                      key={
                                        initialElementData[
                                          `Time-Picker${widget.key}`
                                        ]?.main?.key &&
                                        initialElementData[
                                          `Time-Picker${widget.key}`
                                        ]?.main?.key.trim() !== ""
                                          ? initialElementData[
                                              `Time-Picker${widget.key}`
                                            ]?.main.key
                                          : ""
                                      }
                                      type="time"
                                      className="form-control "
                                      id="exampleInputEmail4"
                                      onChange={(e) =>
                                        handleInputChange(
                                          `Time-Picker${widget.key}`,
                                          e.target.value
                                        )
                                      }
                                      aria-describedby="datehelp"
                                    />
                                  </div>
                                  {activeBorderElement ===
                                    `Time-Picker${widget.key}` && (
                                    <div className="absolute flex -top-3 bg-white z-20 right-5 text-blue-600 ">
                                      Time-Picker-&nbsp;
                                      <div onClick={() => removeElement(index)}>
                                        <i className="fa fa-trash cursor-pointer"></i>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                              {widget.type === "Uploader" && (
                                <div
                                  key={widget.key}
                                  onClick={(e) =>
                                    getHtml(e, `Uploader${widget.key}`)
                                  }
                                  className={
                                    initialElementData[`Uploader${widget.key}`]
                                      ?.main?.class &&
                                    initialElementData[
                                      `Uploader${widget.key}`
                                    ]?.main?.class.trim() !== ""
                                      ? initialElementData[
                                          `Uploader${widget.key}`
                                        ]?.main.class
                                      : ""
                                  }
                                  id={
                                    initialElementData[`Uploader${widget.key}`]
                                      ?.main?.id &&
                                    initialElementData[
                                      `Uploader${widget.key}`
                                    ]?.main?.id.trim() !== ""
                                      ? initialElementData[
                                          `Uploader${widget.key}`
                                        ]?.main.id
                                      : ""
                                  }
                                >
                                  <div
                                    className={`border border-white ${
                                      activeBorderElement ===
                                      `Uploader${widget.key}`
                                        ? "border !border-blue-600  mt-3"
                                        : "hover:!border hover:!border-dashed hover:!border-blue-700 mt-3"
                                    }`}
                                  >
                                    <label htmlFor="exampleInputEmail1">
                                      {initialElementData[
                                        `Uploader${widget.key}`
                                      ]?.main?.label &&
                                      initialElementData[
                                        `Uploader${widget.key}`
                                      ]?.main?.label.trim() !== ""
                                        ? initialElementData[
                                            `Uploader${widget.key}`
                                          ]?.main.label
                                        : "Uploader :"}
                                    </label>
                                    <br />
                                    <input
                                      style={{
                                        ...(currentElement ===
                                        `Uploader${widget.key}`
                                          ? addPxToStyle(eleStyle)
                                          : {}),
                                      }}
                                      // placeholder="Upload File"
                                      key={
                                        initialElementData[
                                          `Uploader${widget.key}`
                                        ]?.main?.key &&
                                        initialElementData[
                                          `Uploader${widget.key}`
                                        ]?.main?.key.trim() !== ""
                                          ? initialElementData[
                                              `Uploader${widget.key}`
                                            ]?.main.key
                                          : ""
                                      }
                                      type="file"
                                      className="form-control mt-2 "
                                      id="exampleInputEmail3"
                                      onChange={(e) =>
                                        handleInputChange(
                                          `Uploader${widget.key}`,
                                          e.target.value
                                        )
                                      }
                                      aria-describedby="datehelp"
                                    />
                                  </div>
                                  {activeBorderElement ===
                                    `Uploader${widget.key}` && (
                                    <div className="absolute flex -top-3 bg-white z-20 right-5 text-blue-600 ">
                                      Uploader-&nbsp;
                                      <div onClick={() => removeElement(index)}>
                                        <i className="fa fa-trash cursor-pointer"></i>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </Reorder.Item>
                        </AnimatePresence>
                      ))}
                      {/* ))} */}
                      <div className="flex justify-center">
                        <button
                          type="submit"
                          className="border rounded-full border-black text-white h-10 w-40 mt-4 bg-orange-600"
                          // onClick={showValue}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}

            <div className="w-2/12 lg:w-4/12 mr-[20px] ml-[20px]">
              <Edit_fields
                inputValues={inputValues}
                activeBorderElement={activeBorderElement}
                widgets={elements}
                initialElementData={initialElementData}
                onupdateData={onupdateData}
                displayJson={displayJson}
              />
            </div>
            {/* <div className="w-3/12">
        <h2>Input Values:</h2>
        <pre>{JSON.stringify(inputValues, null, 2)}</pre>
        </div> */}
          </div>
        </Reorder.Group>
      </div>
    </>
  );
};

export default Form;
