import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

const Button = ({ children, onClick, title, disabled }) => (
    <button className="button" onClick={onClick} title={title} disabled={disabled}>{children}</button>
);

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    title: PropTypes.string,
    disabled: PropTypes.bool,
};

Button.defaultProps = {
    onClick: () => {},
    title: "",
    disabled: false,
};

export default Button;
