import React, { useState } from "react";
import PropTypes from "prop-types";
import SkillImportanceField from "./component/SkillImportanceField";
import { SKILLS } from "../../shared/const";
import "./SkillImportance.scss";

const getImportancesShape = () => {
    const shape = {};

    Object.values(SKILLS).forEach(skill => {
        shape[skill] = PropTypes.number;
    });

    return shape;
};

const isValidImportancesSum = (importances) => {
    const sum = Object.values(importances).reduce((previous, current) => previous + current);

    return sum === 100;
};

const SkillImportance = ({ position, importances, onChange }) => {
    const [message, setMessage] = useState("");

    const onImportanceChange = (skill, importance) => {
        const newImportances = {
            ...importances,
            [skill]: importance,
        };
        const valid = isValidImportancesSum(newImportances);

        setMessage(valid ? "" : "Importances must sum up to 100!");

        onChange(valid, newImportances);
    };

    return (
        <div className="skill-importance">
            <p className="skill-importance__position">{position}</p>
            <div className="skill-importance__fields">
                {Object.values(SKILLS).map(skill => (
                    <SkillImportanceField
                        name={skill}
                        value={importances[skill]}
                        onChange={(importance) => onImportanceChange(skill, importance)}
                        key={`skill-importance-${position}-${skill}`}
                    />

                ))}
            </div>
            {message && <p className="skill-importance__message">{message}</p>}
        </div>
    );
};

SkillImportance.propTypes = {
    position: PropTypes.string.isRequired,
    importances: PropTypes.shape(getImportancesShape()).isRequired,
    onChange: PropTypes.func,
};

SkillImportance.defaultProps = {
    onChange: () => {},
};

export default SkillImportance;
