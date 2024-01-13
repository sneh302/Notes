import React from "react";
import "./popUp.css";

const PopUp = (props) => {
  return props.trigger ? (
    <div className="pop-up">
      <div className="pop-up-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          X
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};

export default PopUp;
