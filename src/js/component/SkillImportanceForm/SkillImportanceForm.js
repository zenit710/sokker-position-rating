import React, { useState } from "react";
import { POSITION, SKILLS } from "../../shared/const";
import Button from "../Button";
import SkillImportance from "../SkillImportance/SkillImportance";
import "./SkillImportanceForm.scss";

const getDefaultImportances = () => {
    const positionSkillImportances = {};
    const skillImportances = {};

    Object.values(SKILLS).forEach(skill => {
        skillImportances[skill] = "0";
    });

    Object.values(POSITION).forEach(pos => {
        positionSkillImportances[pos] = skillImportances;
    });

    return positionSkillImportances;
};

const SkillImportanceForm = () => {
    const [ importances, setImportances ] = useState(getDefaultImportances());
    const [ message, setMessage ] = useState(null);

    const onImportancesChange = (position, valid, importances) => {
        if (!valid) {
            return;
        }

        setImportances({
            ...importances,
            [position]: importances,
        });
    };

    const onSubmitButtonClick = () => {
        console.log("store importances", importances);
        setMessage({
            type: "success",
            value: "Settings saved!",
        });
    };

    return (
        <form className="skill-importance-form">
            <div className="skill-importance-form__positions">
                {Object.values(POSITION).map(pos => (
                    <SkillImportance
                        position={pos}
                        importances={importances}
                        onChange={(valid, value) => onImportancesChange(pos, valid, value)}
                        key={`skill-improve-form-${pos}`}
                    />
                ))}
            </div>

            {message && (
                <p className={`skill-importance-form__message skill-importance-form__message--${message.type}`}>
                    {message.value}
                </p>
            )}

            <Button onClick={onSubmitButtonClick} text="Save" disabled={message && message.type === "error"} />
        </form>
    );
};

export default SkillImportanceForm;