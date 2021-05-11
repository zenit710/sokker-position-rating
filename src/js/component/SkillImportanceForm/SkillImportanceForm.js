import React, { useEffect, useState } from "react";
import { POSITION, SKILLS, STORAGE_SKILL_IMPORTANCE_KEY } from "../../shared/const";
import { getItemFromStore, setItemInStore } from "../../shared/storage";
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

    useEffect(async () => {
        const storedImportances = await getItemFromStore(STORAGE_SKILL_IMPORTANCE_KEY);

        if (storedImportances) {
            setImportances(storedImportances);
        }
    }, []);

    const onImportancesChange = (position, valid, positionImportances) => {
        if (!valid) {
            return;
        }

        setImportances({
            ...importances,
            [position]: positionImportances,
        });
    };

    const onSubmitButtonClick = async (event) => {
        event.preventDefault();

        const stored = await setItemInStore(STORAGE_SKILL_IMPORTANCE_KEY, importances);

        if (stored) {
            setMessage({
                type: "success",
                value: "Settings saved!",
            });
        }
    };

    return (
        <form className="skill-importance-form">
            <div className="skill-importance-form__positions">
                {Object.values(POSITION).map(pos => (
                    <SkillImportance
                        position={pos}
                        importances={importances[pos]}
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
