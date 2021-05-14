import React from "react";
import PropTypes from "prop-types";
import "./Message.scss";

const TYPE_SUCCESS = "success";
const TYPE_ERROR = "error";

const Message = ({ type, children }) => <div className={`message message--${type}`}>{children}</div>;

Message.propTypes = {
    type: PropTypes.oneOf([TYPE_SUCCESS, TYPE_ERROR]).isRequired,
    children: PropTypes.node.isRequired,
};

export default Message;

export {
    TYPE_ERROR,
    TYPE_SUCCESS,
};
