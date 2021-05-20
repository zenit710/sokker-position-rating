import React from "react";
import PropTypes from "prop-types";
import "./SkillImportanceField";

const SkillImportanceField = ({ name, value, onChange }) => {
    return (
        <div className="skill-importance-field">
            <label className="skill-importance-field__label">{name}</label>
            <input
                type="number"
                value={value}
                min="0"
                max="100"
                className="skill-importance-field__input"
                onChange={onChange}
            />
        </div>
    );
};

SkillImportanceField.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number,
    onChange: PropTypes.func,
};

SkillImportanceField.defaultProps = {
    value: 0,
    onChange: () => {},
};

export default SkillImportanceField;
