import React from "react";

const Loader = () => {
  return (
    <div className={"flex-center w-full"}>
      <img
        src={"/assets/icons/loader.svg"}
        alt={"loader"}
        width={22}
        height={22}
      />
    </div>
  );
};

export default Loader;
