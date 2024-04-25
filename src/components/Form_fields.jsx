import React, { useState } from "react";

const Form_Fields = () => {
  const [count, setCount] = useState(1);

  function handleOnDrag(e, widgetsType, key) {
    e.dataTransfer.setData("widthtype", widgetsType);
    e.dataTransfer.setData("key", key);
    setCount(count + 1);
  }

  return (
    <>
      <div
        className="h-[32px] w-[129px] cursor-pointer border p-1 bg-[#f7f7fa] text-black rounded border-transparent"
        draggable
        onDragStart={(e) => handleOnDrag(e, "Input", count)}
      >
        Input
      </div>

      <div
        className="h-[32px] w-[129px] cursor-pointer border p-1 bg-[#f7f7fa] text-black rounded border-transparent"
        draggable
        onDragStart={(e) => handleOnDrag(e, "Number", count)}
      >
        Number
      </div>

      <div
        className="h-[32px] w-[129px] cursor-pointer border p-1 bg-[#f7f7fa] text-black rounded border-transparent"
        draggable
        onDragStart={(e) => handleOnDrag(e, "Checkbox", count)}
      >
        CheckBox
      </div>

      <div
        className="h-[32px] w-[129px] cursor-pointer border p-1 bg-[#f7f7fa] text-black rounded border-transparent"
        draggable
        onDragStart={(e) => handleOnDrag(e, "Select-Option", count)}
      >
        Select-Option
      </div>
      <div
        className="h-[32px] w-[129px] cursor-pointer border p-1 bg-[#f7f7fa] text-black rounded border-transparent"
        draggable
        onDragStart={(e) => handleOnDrag(e, "Label", count)}
      >
        Label
      </div>
      <div
        className="h-[32px] w-[129px] cursor-pointer border p-1 bg-[#f7f7fa] text-black rounded border-transparent"
        draggable
        onDragStart={(e) => handleOnDrag(e, "Text-area", count)}
      >
        Text area
      </div>
      <div
        className="h-[32px] w-[129px] cursor-pointer border p-1 bg-[#f7f7fa] text-black rounded border-transparent"
        draggable
        onDragStart={(e) => handleOnDrag(e, "Radio", count)}
      >
        Radio-group
      </div>

      <div
        className="h-[32px] w-[129px] cursor-pointer  border p-1 bg-[#f7f7fa] text-black rounded border-transparent"
        draggable
        onDragStart={(e) => handleOnDrag(e, "Datepicker", count)}
      >
        DatePicker
      </div>

      <div
        className="h-[32px] w-[129px] cursor-pointer border p-1 bg-[#f7f7fa] text-black rounded border-transparent"
        draggable
        onDragStart={(e) => handleOnDrag(e, "Time-Picker", count)}
      >
        Time-Picker
      </div>

      <div
        className="h-[32px] w-[129px] cursor-pointer border p-1 bg-[#f7f7fa] text-black rounded border-transparent"
        draggable
        onDragStart={(e) => handleOnDrag(e, "Uploader", count)}
      >
        Uploader
      </div>
    </>
  );
};

export default Form_Fields;
