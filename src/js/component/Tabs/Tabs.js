import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Tabs.scss";

const Tabs = ({ children }) => {
    const tabs = children.filter(child => child.type.name === "Tab");
    const initialActiveTabIndex = tabs.findIndex(tab => tab.props.active);
    const [activeTab, setActiveTab] = useState(initialActiveTabIndex > -1 ? initialActiveTabIndex : 0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <div className="tabs">
            <ul className="tabs__list">
                {tabs.map((tab, index) => {
                    const { name } = tab.props;

                    return (
                        <li
                            className={`tabs__list-item ${index === activeTab && "tabs__list-item--active"}`}
                            onClick={() => handleTabClick(index)}
                            key={`tab-${name}`}
                        >{name}</li>
                    );
                })}
            </ul>
            <div className="tabs__current">
                {tabs[activeTab]}
            </div>
        </div>
    );
};

Tabs.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Tabs;
