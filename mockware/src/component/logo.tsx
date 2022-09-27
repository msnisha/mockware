import React from "react";

const Logo = ({ isSmall, isDark }: { isSmall?: boolean, isDark?: boolean }) => {
  return (
    <svg
      width={isSmall ? "50" : "190"}
      height="50"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={isSmall ? "0 0 50 50" : "0 0 190 50"}
    >
      <g>
        <text
          fill={isDark ? "#fafafa" : "hwb(201deg 21% 56%)"}
          stroke="#000"
          strokeWidth="0"
          x="0"
          y={isSmall ? "20" : "35"}
          id="svg_4"
          fontSize={isSmall ? "17" : "36"}
          fontFamily="Arial"
          textAnchor="start"
          xmlSpace="preserve"
          fontWeight="bold"
        >
          Mock
        </text>
        <text
          stroke="#000"
          fill="#1c81bc"
          strokeWidth="0"
          x={isSmall ? "10" : "95"}
          y="35"
          id="svg_5"
          fontSize={isSmall ? "17" : "36"}
          fontFamily="Arial"
          textAnchor="start"
          xmlSpace="preserve"
          fontWeight="bold"
        >
          ware
        </text>
      </g>
    </svg>
  );
};

export default Logo;
