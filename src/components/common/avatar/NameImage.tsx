import React from "react";
import {DEFAULT_AVATAR} from "../../../util/Constants"

const NameImage = ({ name }: { name: string }) => {
  return (
    <div>
      <img src={DEFAULT_AVATAR} alt={name}/>
    </div>
  );
};

export default NameImage;
