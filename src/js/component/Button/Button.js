import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

const Button = ({ text, onClick, title }) => (
    <button className="button" onClick={onClick} title={title}>{text}</button>
);

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string,
};

Button.defaultProps = {
    title: "",
};

export default Button;
