import React from "react";
import PropTypes from "prop-types";
import Button from "@/component/Button";
import Message, { TYPE_INFO } from "@/component/Message";
import { sortByName } from "@/service/TransferFilterService";
import "./TransferFilterList.scss";

const TransferFilterList = ({ items, onRemove }) => {
    if (items.length === 0) {
        return (
            <div className="transfer-filter-list transfer-filter-list--empty">
                <Message type={TYPE_INFO}>No filters added yet!</Message>
            </div>
        );
    }

    const handleRemoveButtonClick = (name) => {
        onRemove(name);
    };

    return (
        <ul className="transfer-filter-list">
            {sortByName(items).map(item => {
                return (
                    <li className="transfer-filter-list__item" key={item.name}>
                        <Button onClick={() => handleRemoveButtonClick(item.name)}>X</Button>
                        <span className="transfer-filter-list__item-name">{item.name}</span>
                    </li>
                );
            })}
        </ul>
    );
};

TransferFilterList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
    })).isRequired,
    onRemove: PropTypes.func,
};

TransferFilterList.defaultProps = {
    onRemove: () => {},
};

export default TransferFilterList;
