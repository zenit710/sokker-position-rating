import React, { useEffect, useState } from "react";
import { SKILLS } from "@/consts";
import Button from "@/component/Button";
import SkillImportanceField from "./component/SkillImportanceField";
import { SkillImportanceDefaultProps, SkillImportancePropTypes } from "./SkillImportance.types";
import "./SkillImportance.scss";

const getImportancesSum = (importances) => {
    return Object.values(importances).reduce((previous, current) => +previous + +current);
};

const isValidImportancesSum = (importances) => 100 === getImportancesSum(importances);

const SkillImportance = ({ position, importances, onChange, onRemove }) => {
    const [skillsImportances, setSkillsImportances] = useState(importances);
    const [message, setMessage] = useState("");

    useEffect(() => {
        setSkillsImportances(importances);
    }, [importances]);

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

    const onPositionRemove = () => onRemove(position);

    return (
        <div className="skill-importance">
            <div className="skill-importance__header">
                <div className="skill-importance-form__remove">
                    <Button size="small" onClick={onPositionRemove}>X</Button>
                </div>
                <p className="skill-importance__position">{position}</p>
            </div>
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

SkillImportance.propTypes = SkillImportancePropTypes;

SkillImportance.defaultProps = SkillImportanceDefaultProps;

export default SkillImportance;
