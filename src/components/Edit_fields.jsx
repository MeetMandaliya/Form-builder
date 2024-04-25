import React, { useEffect, useState } from "react";

const Edit_fields = ({
  onupdateData,
  initialElementData,
  activeBorderElement,
  displayJson,
}) => {
  activeBorderElement !== null ? activeBorderElement : "main";
  const [showData, setShowData] = useState("main");
  const [showSelected, setShowSelected] = useState("main");
  const [getvalue, setGetvalue] = useState({});
  const [required, setRequired] = useState(true);
  const [editData, setEditData] = useState(initialElementData);
  const [inputFields, setInputFields] = useState("");

  function showDetails(data) {
    setShowSelected(data);
    setShowData(data);
  }

  function Data(e, data) {
    const element = activeBorderElement;
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    console.log(value);

    if (value.trim() !== "") {
      setEditData((prevData) => {
        if (prevData[element] !== element) {
          setInputFields("");
        }
        const newData = {
          ...prevData,
          [element]: {
            ...prevData[element],
            [data]: {
              ...prevData[element]?.[data],
              [name]: value,
            },
          },
        };
        setGetvalue(newData);
        // setInputFields(value)
        onupdateData(newData, element);
        displayJson(getvalue);
        return newData;
      });
    } else {
      setEditData((prevData) => {
        const newData = { ...prevData };
        delete newData[element]?.[data]?.[name];
        setGetvalue(newData);
        onupdateData(newData, element);
        displayJson(getvalue);
        return newData;
      });
    }
  }

  const addValue = (e, data) => {
    setRequired(!required);
    if (required) {
      Data(e, data);
    }
  };

  return (
    <>
      <div>
        <div className="flex xl:w-full max-w-[320px] h-full lg:gap-y-[0px] gap-y-[30px] flex-col justify-end mr-auto -mt-16">
          <div className="flex mt-[70px] mr-[4%] lg:mr-[0px] lg:mt-[56px] lg:flex-row flex-col justify-end lg:justify-around">
            <div
              onClick={(e) => showDetails("main")}
              className={`p-2 lg:block hidden text-[14px] hover:text-blue-600 font-medium hover:border-b-blue-600 hover:border-b-4 border-2 border-transparent cursor-pointer mb-2 ${showSelected === "main" && activeBorderElement !== null && "!border-b-blue-600 !border-b-2 border-2 text-blue-600 border-transparent cursor-pointer"}`}
            >
              <div className="flex justify-center lg:justify-center">
                <i className="fa-solid fa-circle"></i>
              </div>
              <div className="flex lg:block justify-center">Main</div>
            </div>
            <div class="lg:hidden flex justify-center btn-group dropstart">
              <button
                type="button"
                class="lg:hidden"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div
                  onClick={(e) => showDetails("main")}
                  className={`p-2 text-[14px] hover:text-blue-600 font-medium hover:border-b-blue-600 hover:border-b-4 border-2 border-transparent cursor-pointer mb-2 ${showSelected === "main" && activeBorderElement !== null && "!border-b-blue-600 !border-b-2 border-2 text-blue-600 border-transparent cursor-pointer"}`}
                >
                  <div className="flex justify-center lg:justify-center">
                    <i className="fa-solid fa-circle"></i>
                  </div>
                  <div className="flex lg:block justify-center">Main</div>
                </div>
              </button>
              <ul class="dropdown-menu w-[320px] lg:hidden p-3">
                <section>
                  <div className="flex flex-col mb-3 mt-3">
                    <div className="flex justify-between">
                      <div className="flex text-[15px]">
                        <i className="text-[#8e8e93]  text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Class
                      </div>
                      <div>
                        <input
                          // value={inputField && "main"}
                          placeholder=""
                          type="text"
                          className={`border`}
                          name="class"
                          onChange={(e) => Data(e, showData)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                    <div className="flex justify-between">
                      <div className="flex text-[15px]">
                        <i className="text-[#8e8e93] text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Id
                      </div>
                      <div>
                        <input
                          // value={inputFields}
                          placeholder=""
                          type="text"
                          className={`border`}
                          name="id"
                          id=""
                          onChange={(e) => Data(e, showData)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={`flex flex-col mb-3`}>
                    <div className="flex justify-between ">
                      <div className="text-[15px]">
                        <i className="text-[#8e8e93]  text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Key
                      </div>
                      <div>
                        <input
                          placeholder=""
                          type="text"
                          className={`border`}
                          name="key"
                          id=""
                          onChange={(e) => Data(e, showData)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                    <div className="flex justify-between ">
                      <div className="text-[15px]">
                        <i className="text-[#8e8e93] text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Label
                      </div>
                      <div>
                        <input
                          placeholder=""
                          type="text"
                          className="border"
                          name="label"
                          id=""
                          onChange={(e) => Data(e, showData)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    <div className="flex justify-start">
                      <div className="text-[15px]">
                        <i className="text-[#8e8e93] text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Placeholder
                      </div>
                      <div>
                        <input
                          placeholder=""
                          type="text"
                          className="border"
                          name="placeholder"
                          id=""
                          onChange={(e) => Data(e, showData)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                    <div className="flex justify-between ">
                      <div className="text-[15px]">
                        <i className="text-[#8e8e93]  text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Value
                      </div>
                      <div>
                        <input
                          placeholder=""
                          type="text"
                          className="border"
                          name="value"
                          id=""
                          onChange={(e) => Data(e, showData)}
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </ul>
            </div>
            <div
              onClick={(e) => showDetails("style")}
              className={`p-2 hidden lg:block text-[14px] hover:text-blue-600 font-medium hover:!border-b-blue-600 hover:!border-b-2 border-2 border-transparent cursor-pointer mb-2 ${showSelected === "style" && activeBorderElement !== null && "!border-b-blue-600 !border-b-2 border-2 text-blue-600 border-transparent cursor-pointer"}`}
            >
              <div className="flex justify-center lg:justify-center">
                <i className="fas fa-paint-brush"></i>
              </div>
              <div className="flex lg:block justify-center">Style</div>
            </div>
            <div class="lg:hidden flex justify-center btn-group dropstart">
              <button
                type="button"
                class="lg:hidden"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div
                  onClick={(e) => showDetails("style")}
                  className={`p-2 text-[14px] hover:text-blue-600 font-medium hover:!border-b-blue-600 hover:!border-b-2 border-2 border-transparent cursor-pointer mb-2 ${showSelected === "style" && activeBorderElement !== null && "!border-b-blue-600 !border-b-2 border-2 text-blue-600 border-transparent cursor-pointer"}`}
                >
                  <div className="flex justify-center lg:justify-center">
                    <i className="fas fa-paint-brush"></i>
                  </div>
                  <div className="flex lg:block justify-center">Style</div>
                </div>
              </button>
              <ul class="dropdown-menu scroll-smooth p-3 h-[300px] overflow-scroll lg:hidden">
                <section>
                  <div className={`flex flex-col mb-3 pt-3`}>
                    <div className="flex justify-between ">
                      <div className="flex text-[15px]">
                        <i className="text-[#8e8e93] text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Width
                      </div>
                      <div>
                        <div className="input-group">
                          <input
                            className="border w-32 h-[25px]"
                            type="number"
                            placeholder=""
                            name="width"
                            aria-label="Recipient's username"
                            onChange={(e) => Data(e, showData)}
                            aria-describedby="basic-addon2"
                          />
                          <div className="input-group-append">
                            <span
                              className="input-group-text w-14 h-[25px]"
                              id="basic-addon2"
                            >
                              px
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                    <div className="flex justify-between ">
                      <div className="flex text-[15px]">
                        <i className="text-[#8e8e93]  text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Height
                      </div>
                      <div>
                        <div className="input-group">
                          <input
                            className="border w-32 h-[25px]"
                            type="text"
                            name="height"
                            placeholder=""
                            aria-label="Recipient's username"
                            onChange={(e) => Data(e, showData)}
                            aria-describedby="basic-addon2"
                          />
                          <div className="input-group-append">
                            <span
                              className="input-group-text w-14 h-[25px]"
                              id="basic-addon2"
                            >
                              px
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                    <div className="flex justify-between">
                      <div className="flex text-[15px]">
                        <i className="text-[#8e8e93] text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Margin- <br />
                        Top
                      </div>
                      <div>
                        <div className="input-group">
                          <input
                            className="border w-32 h-[25px]"
                            type="text"
                            name="marginTop"
                            placeholder=""
                            aria-label="Recipient's username"
                            onChange={(e) => Data(e, showData)}
                            aria-describedby="basic-addon2"
                          />
                          <div className="input-group-append">
                            <span
                              className="input-group-text w-14 h-[25px]"
                              id="basic-addon2"
                            >
                              px
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                    <div className="flex justify-between">
                      <div className="flex text-[15px]">
                        <i className="text-[#8e8e93]  text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Margin- <br />
                        Bottom
                      </div>
                      <div>
                        <div className="input-group">
                          <input
                            className="border w-32 h-[25px]"
                            type="text"
                            name="marginBottom"
                            placeholder=""
                            aria-label="Recipient's username"
                            onChange={(e) => Data(e, showData)}
                            aria-describedby="basic-addon2"
                          />
                          <div className="input-group-append">
                            <span
                              className="input-group-text w-14 h-[25px]"
                              id="basic-addon2"
                            >
                              px
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                    <div className="flex justify-between">
                      <div className="flex text-[15px]">
                        <i className="text-[#8e8e93]  text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Margin- <br />
                        Left
                      </div>
                      <div>
                        <div className="input-group">
                          <input
                            className="border w-32 h-[25px]"
                            name="marginLeft"
                            type="text"
                            placeholder=""
                            aria-label="Recipient's username"
                            onChange={(e) => Data(e, showData)}
                            aria-describedby="basic-addon2"
                          />
                          <div className="input-group-append">
                            <span
                              className="input-group-text w-14 h-[25px]"
                              id="basic-addon2"
                            >
                              px
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                    <div className="flex justify-between">
                      <div className="flex text-[15px]">
                        <i className="text-[#8e8e93]  text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Margin- <br />
                        Right
                      </div>
                      <div>
                        <div className="input-group">
                          <input
                            className="border w-32 h-[25px]"
                            name="marginRight"
                            type="text"
                            placeholder=""
                            aria-label="Recipient's username"
                            onChange={(e) => Data(e, showData)}
                            aria-describedby="basic-addon2"
                          />
                          <div className="input-group-append">
                            <span
                              className="input-group-text w-14 h-[25px]"
                              id="basic-addon2"
                            >
                              px
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                    <div className="flex justify-between">
                      <div className="flex text-[15px]">
                        <i className="text-[#8e8e93]  text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Padding- <br />
                        Top
                      </div>
                      <div>
                        <div className="input-group">
                          <input
                            className="border w-32 h-[25px]"
                            name="paddingTop"
                            type="text"
                            placeholder=""
                            aria-label="Recipient's username"
                            onChange={(e) => Data(e, showData)}
                            aria-describedby="basic-addon2"
                          />
                          <div className="input-group-append">
                            <span
                              className="input-group-text w-14 h-[25px]"
                              id="basic-addon2"
                            >
                              px
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                    <div className="flex justify-between">
                      <div className="flex text-[15px]">
                        <i className="text-[#8e8e93]  text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Padding- <br />
                        Bottom
                      </div>
                      <div>
                        <div className="input-group">
                          <input
                            className="border w-32 h-[25px]"
                            name="paddingBottom"
                            type="text"
                            placeholder=""
                            aria-label="Recipient's username"
                            onChange={(e) => Data(e, showData)}
                            aria-describedby="basic-addon2"
                          />
                          <div className="input-group-append">
                            <span
                              className="input-group-text w-14 h-[25px]"
                              id="basic-addon2"
                            >
                              px
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                    <div className="flex justify-between">
                      <div className="flex text-[15px]">
                        <i className="text-[#8e8e93]  text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Padding- <br />
                        Right
                      </div>
                      <div>
                        <div className="input-group">
                          <input
                            className="border w-32 h-[25px]"
                            name="paddingRight"
                            type="text"
                            placeholder=""
                            aria-label="Recipient's username"
                            onChange={(e) => Data(e, showData)}
                            aria-describedby="basic-addon2"
                          />
                          <div className="input-group-append">
                            <span
                              className="input-group-text w-14 h-[25px]"
                              id="basic-addon2"
                            >
                              px
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                    <div className="flex justify-between">
                      <div className="flex text-[15px]">
                        <i className="text-[#8e8e93] text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Padding- <br />
                        Left
                      </div>
                      <div>
                        <div className="input-group">
                          <input
                            className="border w-32 h-[25px]"
                            name="paddingLeft"
                            type="text"
                            placeholder=""
                            aria-label="Recipient's username"
                            onChange={(e) => Data(e, showData)}
                            aria-describedby="basic-addon2"
                          />
                          <div className="input-group-append">
                            <span
                              className="input-group-text w-14 h-[25px]"
                              id="basic-addon2"
                            >
                              px
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                    <div className="flex justify-between">
                      <div className="flex text-[15px]">
                        <i className="text-[#8e8e93]  text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Color
                      </div>
                      <div>
                        <input
                          type="color"
                          className="border w-[182px] "
                          name="color"
                          id=""
                          onChange={(e) => Data(e, showData)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                    <div className="flex justify-between">
                      <div className="flex text-[15px]">
                        <i className="text-[#8e8e93]  text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Background color
                      </div>
                      <div>
                        <input
                          type="color"
                          // className="border w-[110px]"
                          className="border w-[180px]"
                          name="background"
                          id=""
                          onChange={(e) => Data(e, showData)}
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </ul>
            </div>
           
          </div>
          <hr className="mb-[1%] lg:block hidden " />
          <div className="lg:hidden"></div>

          <div className="pr-2 lg:block hidden max-w-[312px] max-h-[370px] overflow-y-scroll">
            {showData === "main" && (
              <div className={`${activeBorderElement === null && "hidden"}`}>
                <form action="">
                  <div className="flex flex-col mb-3 mt-3">
                    <div className="flex justify-between">
                      <div className="flex text-[15px]">
                        <i className="text-[#8e8e93]  text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Class
                      </div>
                      <div>
                        <input
                          // value={inputField && "main"}
                          placeholder=""
                          type="text"
                          className={`border`}
                          name="class"
                          onChange={(e) => Data(e, showData)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                    <div className="flex justify-between">
                      <div className="flex text-[15px]">
                        <i className="text-[#8e8e93] text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Id
                      </div>
                      <div>
                        <input
                          // value={inputFields}
                          placeholder=""
                          type="text"
                          className={`border`}
                          name="id"
                          id=""
                          onChange={(e) => Data(e, showData)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={`flex flex-col mb-3`}>
                    <div className="flex justify-between ">
                      <div className="text-[15px]">
                        <i className="text-[#8e8e93]  text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Key
                      </div>
                      <div>
                        <input
                          placeholder=""
                          type="text"
                          className={`border`}
                          name="key"
                          id=""
                          onChange={(e) => Data(e, showData)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                    <div className="flex justify-between ">
                      <div className="text-[15px]">
                        <i className="text-[#8e8e93] text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Label
                      </div>
                      <div>
                        <input
                          placeholder=""
                          type="text"
                          className="border"
                          name="label"
                          id=""
                          onChange={(e) => Data(e, showData)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                    <div className="flex justify-between">
                      <div className="text-[15px]">
                        <i className="text-[#8e8e93] text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Placeholder
                      </div>
                      <div>
                        <input
                          placeholder=""
                          type="text"
                          className="border "
                          name="placeholder"
                          id=""
                          onChange={(e) => Data(e, showData)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                    <div className="flex justify-between ">
                      <div className="text-[15px]">
                        <i className="text-[#8e8e93]  text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Value
                      </div>
                      <div>
                        <input
                          placeholder=""
                          type="text"
                          className="border"
                          name="value"
                          id=""
                          onChange={(e) => Data(e, showData)}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex flex-col mb-3">
                    <div className="flex justify-start ">
                      <div className="text-[15px] pr-4">
                        <i className="text-[#8e8e93] text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Required
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input border -ml-[182px]"
                          name="required"
                          onClick={(e) => addValue(e, showData , required) }
                          // onChange={(e) => Data(e, showData)}
                          type="checkbox"
                          value="required"
                          id="flexCheckDefault"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                  <div className="flex justify-start ">
                      <div className="text-[15px] pr-4">
                        <i className="text-[#8e8e93] text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Disabled
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input border -ml-[182px]"
                          name="Disabled"
                          // onChange={(e) => Data(e, showData)}
                          onClick={(e) => addValue(e, showData , required) }
                          type="checkbox"
                          value="disabled"
                          id="flexCheckDefault"
                        />
                      </div>
                    </div>
                  </div> */}
                </form>
              </div>
            )}

            {showData === "style" && (
              <div className={`${activeBorderElement === null && "hidden"}`}>
                <section>
                  <div className={`flex flex-col mb-3 pt-3`}>
                    <div className="flex justify-between ">
                      <div className="flex text-[15px]">
                        <i className="text-[#8e8e93] text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Width
                      </div>
                      <div>
                        <div className="input-group">
                          <input
                            className="border w-32 h-[25px]"
                            type="text"
                            placeholder=""
                            name="width"
                            aria-label="Recipient's username"
                            onChange={(e) => Data(e, showData)}
                            aria-describedby="basic-addon2"
                          />
                          <div className="input-group-append">
                            <span
                              className="input-group-text w-14 h-[25px]"
                              id="basic-addon2"
                            >
                              px
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                    <div className="flex justify-between ">
                      <div className="flex text-[15px]">
                        <i className="text-[#8e8e93]  text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Height
                      </div>
                      <div>
                        <div className="input-group">
                          <input
                            className="border w-32 h-[25px]"
                            type="text"
                            name="height"
                            placeholder=""
                            aria-label="Recipient's username"
                            onChange={(e) => Data(e, showData)}
                            aria-describedby="basic-addon2"
                          />
                          <div className="input-group-append">
                            <span
                              className="input-group-text w-14 h-[25px]"
                              id="basic-addon2"
                            >
                              px
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                    <div className="flex justify-between">
                      <div className="flex text-[15px]">
                        <i className="text-[#8e8e93] text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Margin- <br />
                        Top
                      </div>
                      <div>
                        <div className="input-group">
                          <input
                            className="border w-32 h-[25px]"
                            type="text"
                            name="marginTop"
                            placeholder=""
                            aria-label="Recipient's username"
                            onChange={(e) => Data(e, showData)}
                            aria-describedby="basic-addon2"
                          />
                          <div className="input-group-append">
                            <span
                              className="input-group-text w-14 h-[25px]"
                              id="basic-addon2"
                            >
                              px
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                    <div className="flex justify-between">
                      <div className="flex text-[15px]">
                        <i className="text-[#8e8e93]  text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Margin- <br />
                        Bottom
                      </div>
                      <div>
                        <div className="input-group">
                          <input
                            className="border w-32 h-[25px]"
                            type="text"
                            name="marginBottom"
                            placeholder=""
                            aria-label="Recipient's username"
                            onChange={(e) => Data(e, showData)}
                            aria-describedby="basic-addon2"
                          />
                          <div className="input-group-append">
                            <span
                              className="input-group-text w-14 h-[25px]"
                              id="basic-addon2"
                            >
                              px
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                    <div className="flex justify-between">
                      <div className="flex text-[15px]">
                        <i className="text-[#8e8e93]  text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Margin- <br />
                        Left
                      </div>
                      <div>
                        <div className="input-group">
                          <input
                            className="border w-32 h-[25px]"
                            name="marginLeft"
                            type="text"
                            placeholder=""
                            aria-label="Recipient's username"
                            onChange={(e) => Data(e, showData)}
                            aria-describedby="basic-addon2"
                          />
                          <div className="input-group-append">
                            <span
                              className="input-group-text w-14 h-[25px]"
                              id="basic-addon2"
                            >
                              px
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                    <div className="flex justify-between">
                      <div className="flex text-[15px]">
                        <i className="text-[#8e8e93]  text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Margin- <br />
                        Right
                      </div>
                      <div>
                        <div className="input-group">
                          <input
                            className="border w-32 h-[25px]"
                            name="marginRight"
                            type="text"
                            placeholder=""
                            aria-label="Recipient's username"
                            onChange={(e) => Data(e, showData)}
                            aria-describedby="basic-addon2"
                          />
                          <div className="input-group-append">
                            <span
                              className="input-group-text w-14 h-[25px]"
                              id="basic-addon2"
                            >
                              px
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                    <div className="flex justify-between">
                      <div className="flex text-[15px]">
                        <i className="text-[#8e8e93]  text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Padding- <br />
                        Top
                      </div>
                      <div>
                        <div className="input-group">
                          <input
                            className="border w-32 h-[25px]"
                            name="paddingTop"
                            type="text"
                            placeholder=""
                            aria-label="Recipient's username"
                            onChange={(e) => Data(e, showData)}
                            aria-describedby="basic-addon2"
                          />
                          <div className="input-group-append">
                            <span
                              className="input-group-text w-14 h-[25px]"
                              id="basic-addon2"
                            >
                              px
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                    <div className="flex justify-between">
                      <div className="flex text-[15px]">
                        <i className="text-[#8e8e93]  text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Padding- <br />
                        Bottom
                      </div>
                      <div>
                        <div className="input-group">
                          <input
                            className="border w-32 h-[25px]"
                            name="paddingBottom"
                            type="text"
                            placeholder=""
                            aria-label="Recipient's username"
                            onChange={(e) => Data(e, showData)}
                            aria-describedby="basic-addon2"
                          />
                          <div className="input-group-append">
                            <span
                              className="input-group-text w-14 h-[25px]"
                              id="basic-addon2"
                            >
                              px
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                    <div className="flex justify-between">
                      <div className="flex text-[15px]">
                        <i className="text-[#8e8e93]  text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Padding- <br />
                        Right
                      </div>
                      <div>
                        <div className="input-group">
                          <input
                            className="border w-32 h-[25px]"
                            name="paddingRight"
                            type="text"
                            placeholder=""
                            aria-label="Recipient's username"
                            onChange={(e) => Data(e, showData)}
                            aria-describedby="basic-addon2"
                          />
                          <div className="input-group-append">
                            <span
                              className="input-group-text w-14 h-[25px]"
                              id="basic-addon2"
                            >
                              px
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                    <div className="flex justify-between">
                      <div className="flex text-[15px]">
                        <i className="text-[#8e8e93] text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Padding- <br />
                        Left
                      </div>
                      <div>
                        <div className="input-group">
                          <input
                            className="border w-32 h-[25px]"
                            name="paddingLeft"
                            type="text"
                            placeholder=""
                            aria-label="Recipient's username"
                            onChange={(e) => Data(e, showData)}
                            aria-describedby="basic-addon2"
                          />
                          <div className="input-group-append">
                            <span
                              className="input-group-text w-14 h-[25px]"
                              id="basic-addon2"
                            >
                              px
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                    <div className="flex justify-between">
                      <div className="flex text-[15px]">
                        <i className="text-[#8e8e93]  text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Color
                      </div>
                      <div>
                        <input
                          type="color"
                          className="border w-[182px] "
                          name="color"
                          id=""
                          onChange={(e) => Data(e, showData)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-3">
                    <div className="flex justify-between">
                      <div className="flex text-[15px]">
                        <i className="text-[#8e8e93]  text-[12px] mr-2 text-lg fas fa-pen"></i>
                        Background color
                      </div>
                      <div>
                        <input
                          type="color"
                          // className="border w-[110px]"
                          className="border w-[180px]"
                          name="background"
                          id=""
                          onChange={(e) => Data(e, showData)}
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default Edit_fields;

