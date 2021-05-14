import React, { useEffect, useState } from "react";
import { POSITION, SKILLS, STORAGE_SKILL_IMPORTANCE_KEY } from "@/consts";
import { getItemFromStore, setItemInStore } from "@/service/StorageService";
import Button from "@/component/Button";
import Message, { TYPE_ERROR, TYPE_SUCCESS } from "@/component/Message";
import SkillImportance from "@/component/SkillImportance";
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
                type: TYPE_SUCCESS,
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
                <div className="skill-importance-form__message">
                    <Message type={message.type}>{message.value}</Message>
                </div>
            )}

            <Button onClick={onSubmitButtonClick} disabled={message && message.type === TYPE_ERROR}>Save</Button>
        </form>
    );
};

export default SkillImportanceForm;
