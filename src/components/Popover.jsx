import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

function Popover(props) {
  const {
    trigger,
    content,
    children,
    align,
    position,
    onOpen,
    onClose,
  } = props;

  const [open, setOpen] = useState(false);
  const contentRef = useRef();
  const childrenRef = useRef();

  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    if (contentRef.current && childrenRef.current) getCordinates();
  }, [childrenRef, contentRef]);

  useEffect(() => {
    if (open) {
      if (onOpen) onOpen();
      getCordinates();
    } else {
      if (onClose) onClose();
    }
  }, [open]);

  const handleClick = (_) => setOpen(!open);
  const handleMouseEnter = (_) => setOpen(true);
  const handleMouseLeave = (_) => setOpen(false);

  const extraProps =
    trigger === "click"
      ? { onClick: handleClick }
      : { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave };

  const getCordinates = () => {
    if (!childrenRef.current) return;
    if (!contentRef.current) return;

    var childBound = childrenRef.current.getBoundingClientRect();
    var contBound = contentRef.current.getBoundingClientRect();

    if (position === "top" || position === "bottom") {
      setLeft(
        align === "start"
          ? childBound.left
          : align === "center"
          ? childBound.left + childBound.width / 2 - contBound.width / 2
          : childBound.right - contBound.width
      );
      setTop(
        position === "top"
          ? childBound.top - contBound.height
          : childBound.bottom
      );
    }

    if (position === "left" || position === "right") {
      setLeft(
        position === "left"
          ? childBound.left - contBound.width
          : childBound.right
      );
      setTop(
        align === "start"
          ? childBound.top
          : align === "center"
          ? childBound.top + childBound.height / 2 - contBound.height / 2
          : childBound.bottom - contBound.height
      );
    }
  };

  return (
    <div className="item">
      <div
        ref={contentRef}
        style={{
          visibility: !open && "hidden",
          top,
          left,
        }}
        className={clsx("item", "popover")}
        {...extraProps}
      >
        {content}
      </div>
      <div className="item" ref={childrenRef} {...extraProps}>
        {children}
      </div>
    </div>
  );
}

Popover.propTypes = {
  trigger: PropTypes.oneOf(["click", "hover"]),
  content: PropTypes.node,
  children: PropTypes.node,
  align: PropTypes.oneOf(["start", "end", "center"]),
  position: PropTypes.oneOf(["bottom", "top", "left", "right"]),
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};

Popover.defaultProps = {
  trigger: "click",
  align: "start",
  position: "bottom",
};

export default Popover;
