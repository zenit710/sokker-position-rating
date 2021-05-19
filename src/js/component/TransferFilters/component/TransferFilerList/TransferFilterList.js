import React from "react";
import PropTypes from "prop-types";
import "./TransferFilterList.scss";

const TransferFilterList = ({ items }) => {
    return (
        <div className="transfer-filter-list">
            {items.map(item => {
                return (
                    <li className="transfer-filter-list__item" key={item.name}>
                        {item.name}
                    </li>
                );
            })}
        </div>
    );
};

TransferFilterList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
    })).isRequired,
};

export default TransferFilterList;
