import React from "react";
import Header from "./components/Header";
import Form_fields from "./components/Form_fields";
import Form from "./components/Form";

const App = () => {
  return (
    <>
      <Header />
      <h1 className="pt-4 pl-7 text-2xl">Fields</h1>
      <div className="flex xl:flex-row lg:justify-start justify-between flex-col pt-4">
        <div className="pl-7 text-black-50 xl:h-[200px] w-full grid-cols-3 sm:grid-cols-4 xl:w-3/12 grid lg:grid-cols-5 sm:gap-y-1 gap-y-3 xl:grid-cols-2">
          <Form_fields />
        </div>
        <div className="xl:w-9/12 w-full xl:mt-0 mt-[3%]">
          <Form />
        </div>
      </div>
    </>
  );
};

export default App;
