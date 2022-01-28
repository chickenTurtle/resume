import React, { useEffect } from "react";

const Welcome = (props) => {
  const welcomeMessageRef = React.useRef(null);
  useEffect(() => {
    let index = 0;
    const typeText = setInterval(() => {
      welcomeMessageRef.current.insertAdjacentText(
        "beforeend",
        props.text[index]
      );
      index++;
      if (index === props.text.length) clearInterval(typeText);
    }, 30);
  }, [welcomeMessageRef, props.text]);
  return (
    <div ref={welcomeMessageRef} className="banner-welcome noselect"></div>
  );
};

export default Welcome;
