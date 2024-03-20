import React from "react";
import PropTypes from "prop-types";
import isEqual from "lodash/isEqual";
import { useTranslation } from "react-i18next";

const RadioButtons = (props) => {
  const { t } = useTranslation();

  var selected = props.selectedOption;
  function selectOption(value) {
    props.onSelect(value);
  }

  const toSentenceCase = (str) => {
    return str.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => {
        return c.toUpperCase();
    });
};


  return (
    <div style={props?.style} className={`digit-radio-wrap ${props?.additionalWrapperClass ? props?.additionalWrapperClass : ""}`}>
      {props?.options?.map((option, ind) => {
        if (props?.optionsKey && !props?.isDependent) {
          return (
            <div className={`radio-option-container ${props?.disabled ? "disabled" : ""} ${(props?.value === option.code && props?.disabled) ? "preselected" : ""}`} key={ind}>
              <span className={`digit-radio-btn-wrap ${props?.disabled ? "disabled" : ""} ${(props?.value === option.code && props?.disabled) ? "preselected" : ""}`}>
                <input
                  className="digit-radio-btn"
                  type="radio"
                  value={option}
                  checked={(selected === option.code) || isEqual(selected, option) ? 1 : 0}
                  onChange={() => selectOption(option)}
                  disabled={props?.disabled}
                  name={props.name}
                  ref={props.inputRef}
                />
                <span className="digit-radio-btn-checkmark"></span>
              </span>
              <label style={props.inputStyle}>{t(toSentenceCase(option[props.optionsKey]))}</label>
            </div>
          );
        } else if (props?.optionsKey && props?.isDependent) {
          return (
            <div className={`radio-option-container ${props?.disabled ? "disabled" : ""} ${(props?.value === option.code && props?.disabled) ? "preselected" : ""}`} key={ind}>
              <span className={`digit-radio-btn-wrap ${props?.disabled ? "disabled" : ""} ${(props?.value === option.code && props?.disabled) ? "preselected" : ""}`}>
                <input
                  className="digit-radio-btn"
                  type="radio"
                  value={option}
                  checked={selected?.code === option.code ? 1 : 0}
                  onChange={() => selectOption(option)}
                  disabled={props?.disabled}
                  name={props.name}
                  ref={props.inputRef}
                />
                <span className="digit-radio-btn-checkmark"></span>
              </span>
              <label style={props.inputStyle}>{t(props.labelKey ? `${props.labelKey}_${option.code}` : toSentenceCase(option.code))}</label>
            </div>
          );
        } else {
          return (
            <div className={`radio-option-container ${props?.disabled ? "disabled" : ""} ${(props?.value === option.code && props?.disabled) ? "preselected" : ""}`} key={ind}>
              <span className={`digit-radio-btn-wrap ${props?.disabled ? "disabled" : ""} ${(props?.value === option.code && props?.disabled) ? "preselected" : ""}`}>
                <input
                  className="digit-radio-btn"
                  type="radio"
                  value={option}
                  checked={selected === option ? 1 : 0}
                  onChange={() => selectOption(option)}
                  disabled={props?.disabled}
                  name={props.name}
                  ref={props.inputRef}
                />
                <span className="digit-radio-btn-checkmark"></span>
              </span>
              <label style={props.inputStyle}>{t(toSentenceCase(option))}</label>
            </div>
          );
        }
      })}
    </div>
  );
};

RadioButtons.propTypes = {
  selectedOption: PropTypes.any,
  onSelect: PropTypes.func,
  options: PropTypes.any,
  optionsKey: PropTypes.string,
  innerStyles: PropTypes.any,
  style: PropTypes.any,
};

RadioButtons.defaultProps = {};

export default RadioButtons;
