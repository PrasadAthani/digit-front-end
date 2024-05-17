import React from "react";
import PropTypes from "prop-types";
import { COLOR_FILL } from "./constants";

export const Settings = ({ className, height = "24", width = "24", style = {}, fill = COLOR_FILL, onClick = null }) => {
  return (
    <svg width={width} height={height} className={className} onClick={onClick} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_105_902)">
        <path
          d="M19.1401 12.9399C19.1801 12.6399 19.2001 12.3299 19.2001 11.9999C19.2001 11.6799 19.1801 11.3599 19.1301 11.0599L21.1601 9.4799C21.3401 9.3399 21.3901 9.0699 21.2801 8.8699L19.3601 5.5499C19.2401 5.3299 18.9901 5.2599 18.7701 5.3299L16.3801 6.2899C15.8801 5.9099 15.3501 5.5899 14.7601 5.3499L14.4001 2.8099C14.3601 2.5699 14.1601 2.3999 13.9201 2.3999H10.0801C9.84011 2.3999 9.65011 2.5699 9.61011 2.8099L9.25011 5.3499C8.66011 5.5899 8.12011 5.9199 7.63011 6.2899L5.24011 5.3299C5.02011 5.2499 4.77011 5.3299 4.65011 5.5499L2.74011 8.8699C2.62011 9.0799 2.66011 9.3399 2.86011 9.4799L4.89011 11.0599C4.84011 11.3599 4.80011 11.6899 4.80011 11.9999C4.80011 12.3099 4.82011 12.6399 4.87011 12.9399L2.84011 14.5199C2.66011 14.6599 2.61011 14.9299 2.72011 15.1299L4.64011 18.4499C4.76011 18.6699 5.01011 18.7399 5.23011 18.6699L7.62011 17.7099C8.12011 18.0899 8.65011 18.4099 9.24011 18.6499L9.60011 21.1899C9.65011 21.4299 9.84011 21.5999 10.0801 21.5999H13.9201C14.1601 21.5999 14.3601 21.4299 14.3901 21.1899L14.7501 18.6499C15.3401 18.4099 15.8801 18.0899 16.3701 17.7099L18.7601 18.6699C18.9801 18.7499 19.2301 18.6699 19.3501 18.4499L21.2701 15.1299C21.3901 14.9099 21.3401 14.6599 21.1501 14.5199L19.1401 12.9399ZM12.0001 15.5999C10.0201 15.5999 8.40011 13.9799 8.40011 11.9999C8.40011 10.0199 10.0201 8.3999 12.0001 8.3999C13.9801 8.3999 15.6001 10.0199 15.6001 11.9999C15.6001 13.9799 13.9801 15.5999 12.0001 15.5999Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_105_902">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};



Settings.propTypes = {
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
