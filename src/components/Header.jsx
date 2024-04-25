import React from "react";
import Form_fields from "./Form_fields";
import logo from "../assets/logo.png"

const Header = () => {
  return (
    <>
      <div className="bg-black h-20 text-white">
        <div>
          <img
            src={logo}
            width={"200px"}
            height={"64px"}
            className="pt-4 ml-16"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Header;