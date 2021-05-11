import React, { useState } from "react";
import PropTypes from "prop-types";
import SkillImportanceField from "./component/SkillImportanceField";
import { SKILLS } from "../../shared/const";
import "./SkillImportance.scss";

const getImportancesShape = () => {
    const shape = {};

    Object.values(SKILLS).forEach(skill => {
        shape[skill] = PropTypes.string;
    });

    return shape;
};

const getImportancesSum = (importances) => {
    return Object.values(importances).reduce((previous, current) => +previous + +current);
};

const isValidImportancesSum = (importances) => 100 === getImportancesSum(importances);

const SkillImportance = ({ position, importances, onChange }) => {
    const [skillsImportances, setSkillsImportances] = useState(importances);
    const [message, setMessage] = useState("");

    const onImportanceChange = (skill, importance) => {
        const newImportances = {
            ...skillsImportances,
            [skill]: importance,
        };
        const valid = isValidImportancesSum(newImportances);

        setMessage(valid ? "" : `Importances must sum up to 100! (current: ${getImportancesSum(newImportances)})`);
        setSkillsImportances(newImportances);
        onChange(valid, newImportances);
    };

    return (
        <div className="skill-importance">
            <p className="skill-importance__position">{position}</p>
            <div className="skill-importance__fields">
                {Object.values(SKILLS).map(skill => (
                    <SkillImportanceField
                        name={skill}
                        value={+skillsImportances[skill]}
                        onChange={(event) => onImportanceChange(skill, event.target.value)}
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
