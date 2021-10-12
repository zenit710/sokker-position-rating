import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { SKILLS } from "@/consts/engine";
import "./SkillsSumCriteria.scss";

const getStoredSkillsSumCriteria = () => {
    const criteria = sessionStorage.getItem("skillsSumCriteria");

    if (criteria) {
        try {
            return JSON.parse(criteria);
        } catch (e) {
            console.error(e);
        }
    }

    return {
        min: undefined,
        max: undefined,
        skillsToSum: [],
    };
};

const SkillsSumCriteria = ({ submitButton }) => {
    const skillsMinRef = useRef(null);
    const skillsMaxRef = useRef(null);
    const skillsSummedRef = useRef(null);

    const { min, max, skillsToSum } = getStoredSkillsSumCriteria();

    const handleFormSubmit = () => {
        const { current: $min } = skillsMinRef;
        const { current: $max } = skillsMaxRef;
        const { current: $skills } = skillsSummedRef;

        if ($min && $max && $skills) {
            const min = $min.value;
            const max = $max.value;
            const skillsToSum = [...$skills.querySelectorAll("input[name^=skills_sum]")]
                .filter(input => input.checked)
                .map(input => input.getAttribute("name").replace("skills_sum_", ""));

            sessionStorage.setItem("skillsSumCriteria", JSON.stringify({
                min,
                max,
                skillsToSum,
            }));
        }
    };

    useEffect(() => {
        submitButton.addEventListener("click", handleFormSubmit);

        return () => {
            submitButton.removeEventListener("click", handleFormSubmit);
        };
    }, []);

    return (
        <>
            <div className="form-horizontal col-sm-6 col-xs-6">
                <div className="form-group">
                    <label className="col-sm-6 control-label">Skills sum</label>
                    <div className="col-sm-6">
                        <input
                            type="number"
                            min="1"
                            max="130"
                            name="skills_sum_min"
                            className="form-control input-sm"
                            placeholder="min: 1"
                            ref={skillsMinRef}
                            defaultValue={min}
                        />
                        <input
                            type="number"
                            min="1"
                            max="130"
                            name="skills_sum_max"
                            className="form-control input-sm"
                            placeholder="max: 130"
                            ref={skillsMaxRef}
                            defaultValue={max}
                        />
                    </div>
                </div>
            </div>
            <div className="form-horizontal col-sm-6 col-xs-6">
                <div className="form-group">
                    <label className="col-sm-6 control-label">Skills to sum</label>
                    <div className="col-sm-6" ref={skillsSummedRef}>
                        {Object.values(SKILLS).map(skill => (
                            <div className="form-group" key={`skills_sum_${skill}`}>
                                <label className="col-sm-6" htmlFor={`skills_sum_${skill}`}>{skill}</label>
                                <input
                                    type="checkbox"
                                    name={`skills_sum_${skill}`}
                                    id={`skills_sum_${skill}`}
                                    defaultChecked={skillsToSum.includes(skill)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

SkillsSumCriteria.propTypes = {
    submitButton: PropTypes.node.isRequired,
};

export default SkillsSumCriteria;
