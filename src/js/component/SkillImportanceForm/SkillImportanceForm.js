import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { SKILLS } from "@/consts";
import { getSkillsImportances, setSkillsImportances } from "@/service/SkillsImportance";
import Button from "@/component/Button";
import Message, { TYPE_ERROR, TYPE_SUCCESS } from "@/component/Message";
import SkillImportance from "@/component/SkillImportance";
import "./SkillImportanceForm.scss";

const getDefaultImportances = (positions) => {
    const positionSkillImportances = {};
    const skillImportances = {};

    Object.values(SKILLS).forEach(skill => {
        skillImportances[skill] = "0";
    });

    positions.forEach(pos => {
        positionSkillImportances[pos] = skillImportances;
    });

    return positionSkillImportances;
};

const SkillImportanceForm = ({ positions }) => {
    const [ importances, setImportances ] = useState(getDefaultImportances(positions));
    const [ message, setMessage ] = useState(null);

    useEffect(async () => {
        const storedImportances = await getSkillsImportances();

        if (storedImportances) {
            setImportances(storedImportances);
        }
    }, []);

    useEffect(() => {
        const defaultImportances = getDefaultImportances(positions);
        setImportances({...defaultImportances, ...importances });
    }, [positions]);

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

        const stored = setSkillsImportances(importances);

        if (stored) {
            setMessage({
                type: TYPE_SUCCESS,
                value: "Settings saved!",
            });
            setTimeout(() => setMessage(null), 3000);
        }
    };

    return (
        <form className="skill-importance-form">
            <div className="skill-importance-form__positions">
                {positions.map(pos => (
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

SkillImportanceForm.propTypes = {
    positions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SkillImportanceForm;
