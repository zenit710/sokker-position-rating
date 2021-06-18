import React, { useRef } from "react";
import PropTypes from "prop-types";
import Button from "@/component/Button";

const PositionAdd = ({ onAdded }) => {
    const positionNameRef = useRef(null);

    const handlePositionAdd = (event) => {
        event.preventDefault();
        const { current } = positionNameRef;

        if (current) {
            onAdded(current.value);
        }
    };

    return (
        <form className="position-add" onSubmit={handlePositionAdd}>
            <input className="position-add__name" ref={positionNameRef} />
            <Button type="submit">Add position</Button>
        </form>
    );
};

PositionAdd.propTypes = {
    onAdded: PropTypes.func.isRequired,
};

export default PositionAdd;
