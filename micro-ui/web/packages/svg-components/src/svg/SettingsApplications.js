import React from "react";
import PropTypes from "prop-types";
import { COLOR_FILL } from "./constants";

export const SettingsApplications = ({ className, height = "24", width = "24", style = {}, fill = COLOR_FILL, onClick = null }) => {
  return (
    <svg width={width} height={height} className={className} onClick={onClick} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_105_906)">
        <path
          d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.1 21 19V5C21 3.9 20.11 3 19 3ZM17.25 12C17.25 12.23 17.23 12.46 17.2 12.68L18.68 13.84C18.81 13.95 18.85 14.14 18.76 14.29L17.36 16.71C17.27 16.86 17.09 16.92 16.93 16.86L15.19 16.16C14.83 16.44 14.43 16.67 14.01 16.85L13.75 18.7C13.72 18.87 13.57 19 13.4 19H10.6C10.43 19 10.28 18.87 10.25 18.71L9.99 16.86C9.56 16.68 9.17 16.45 8.81 16.17L7.07 16.87C6.91 16.93 6.73 16.87 6.64 16.72L5.24 14.3C5.15 14.15 5.19 13.96 5.32 13.85L6.8 12.69C6.77 12.46 6.75 12.23 6.75 12C6.75 11.77 6.77 11.54 6.8 11.32L5.32 10.16C5.19 10.05 5.15 9.86 5.24 9.71L6.64 7.29C6.73 7.14 6.91 7.08 7.07 7.14L8.81 7.84C9.17 7.56 9.57 7.33 9.99 7.15L10.25 5.3C10.28 5.13 10.43 5 10.6 5H13.4C13.57 5 13.72 5.13 13.75 5.29L14.01 7.14C14.44 7.32 14.83 7.55 15.19 7.83L16.93 7.13C17.09 7.07 17.27 7.13 17.36 7.28L18.76 9.7C18.85 9.85 18.81 10.04 18.68 10.15L17.2 11.31C17.23 11.54 17.25 11.77 17.25 12V12Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_105_906">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};



SettingsApplications.propTypes = {
  /** custom width of the svg icon */
  width: PropTypes.string,
  /** custom height of the svg icon */
  height: PropTypes.string,
  /** custom colour of the svg icon */
  fill: PropTypes.string,
  /** custom class of the svg icon */
  className: PropTypes.string,
  /** custom style of the svg icon */
  style: PropTypes.object,
  /** Click Event handler when icon is clicked */
  onClick: PropTypes.func,
};
