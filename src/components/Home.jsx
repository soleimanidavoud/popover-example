import React, { useContext, useState } from "react";
import Popover from "./Popover";
import { ThemeContext } from "../utils/theme-context";
import clsx from "clsx";

export default function Home() {
  const [position, setPosition] = useState("top");
  const [align, setAlign] = useState("start");
  const [trigger, setTrigger] = useState("click");
  const { toggleTheme } = useContext(ThemeContext);

  const handleOpen = (_) => console.log("open");
  const handleClose = (_) => console.log("close");

  const handleFormChange = (event) => {
    if (event.target.name === "position") setPosition(event.target.value);
    if (event.target.name === "align") setAlign(event.target.value);
    if (event.target.name === "trigger") setTrigger(event.target.value);
  };

  return (
    <div className="container">
      <div className="item6">
        <button onClick={toggleTheme}>Toggle Theme</button>
        <form onChange={handleFormChange} className="homeForm">
          <p>Please select popover trigger mode:</p>
          <input
            type="radio"
            id="click"
            name="trigger"
            value="click"
            defaultChecked
          />
          <label htmlFor="click">click</label>
          <input type="radio" id="hover" name="trigger" value="hover" />
          <label htmlFor="hover">hover</label>

          <p>Please select popover position:</p>
          <input
            type="radio"
            id="top"
            name="position"
            value="top"
            defaultChecked
          />
          <label htmlFor="top">top</label>
          <input type="radio" id="bottom" name="position" value="bottom" />
          <label htmlFor="bottom">bottom</label>
          <input type="radio" id="left" name="position" value="left" />
          <label htmlFor="left">left</label>
          <input type="radio" id="right" name="position" value="right" />
          <label htmlFor="right">right</label>

          <p>Please select popover align:</p>
          <input
            type="radio"
            id="start"
            name="align"
            value="start"
            defaultChecked
          />
          <label htmlFor="start">start</label>
          <input type="radio" id="center" name="align" value="center" />
          <label htmlFor="center">center</label>
          <input type="radio" id="end" name="align" value="end" />
          <label htmlFor="end">end</label>
        </form>
        <Popover
          trigger={trigger}
          onOpen={handleOpen}
          onClose={handleClose}
          position={position}
          align={align}
          content={
            <div className={clsx("item", "dirColumn")}>
              <div>this is the content of popover</div>
              <div>lorem ipsum</div>
              <div>lorem ipsum</div>
            </div>
          }
          className="homePopover"
        >
          <button>Button</button>
        </Popover>
      </div>
    </div>
  );
}
