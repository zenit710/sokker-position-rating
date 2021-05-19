import React from "react";
import PropTypes from "prop-types";

const Tab = ({ children, name, active }) => {
    return (
        <div className="tab" data-name={name} data-active={active}>
            {children}
        </div>
    );
};

Tab.propTypes = {
    children: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
    active: PropTypes.bool,
};

Tab.defaultProps = {
    active: false,
};

export default Tab;
