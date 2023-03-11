function Loading() {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "54px" }}
    >
      {/* <svg classNameName="pl" width="240" height="240" viewBox="0 0 240 240">
      <circle
        classNameName="pl__ring pl__ring--a"
        cx="120"
        cy="120"
        r="105"
        fill="none"
        stroke="#000"
        stroke-width="20"
        stroke-dasharray="0 660"
        stroke-dashoffset="-330"
        stroke-linecap="round"
      ></circle>
      <circle
        classNameName="pl__ring pl__ring--b"
        cx="120"
        cy="120"
        r="35"
        fill="none"
        stroke="#000"
        stroke-width="20"
        stroke-dasharray="0 220"
        stroke-dashoffset="-110"
        stroke-linecap="round"
      ></circle>
      <circle
        classNameName="pl__ring pl__ring--c"
        cx="85"
        cy="120"
        r="70"
        fill="none"
        stroke="#000"
        stroke-width="20"
        stroke-dasharray="0 440"
        stroke-linecap="round"
      ></circle>
      <circle
        classNameName="pl__ring pl__ring--d"
        cx="155"
        cy="120"
        r="70"
        fill="none"
        stroke="#000"
        stroke-width="20"
        stroke-dasharray="0 440"
        stroke-linecap="round"
      ></circle>
    </svg> */}
      <div
        aria-label="Orange and tan hamster running in a metal wheel"
        role="img"
        className="wheel-and-hamster"
      >
        <div className="wheel"></div>
        <div className="hamster">
          <div className="hamster__body">
            <div className="hamster__head">
              <div className="hamster__ear"></div>
              <div className="hamster__eye"></div>
              <div className="hamster__nose"></div>
            </div>
            <div className="hamster__limb hamster__limb--fr"></div>
            <div className="hamster__limb hamster__limb--fl"></div>
            <div className="hamster__limb hamster__limb--br"></div>
            <div className="hamster__limb hamster__limb--bl"></div>
            <div className="hamster__tail"></div>
          </div>
        </div>
        <div className="spoke"></div>
      </div>
    </div>
  );
}

export default Loading;
