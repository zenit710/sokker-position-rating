import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { SKILLS } from "@/consts/engine";
import { getStoredSkillsSumCriteria, storeSkillsSumCriteria } from "@/service/SkillsSumService";
import "./SkillsSumCriteria.scss";

const SkillsSumCriteria = ({ submitButton, clearButton }) => {
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

            storeSkillsSumCriteria(min, max, skillsToSum);
        }
    };

    const handleFormClean = () => {
        sessionStorage.removeItem("skillsSumCriteria");
    };

    useEffect(() => {
        submitButton.addEventListener("click", handleFormSubmit);
        clearButton.addEventListener("click", handleFormClean);

        return () => {
            submitButton.removeEventListener("click", handleFormSubmit);
            clearButton.removeEventListener("click", handleFormClean);
        };
    }, []);

    return (
        <>
            <div className="form-horizontal col-sm-6 col-xs-6 skills-sum-criteria">
                <div className="form-group">
                    <label className="col-sm-6 control-label">Skills sum</label>
                    <div className="col-sm-6">
                        <input
                            type="number"
                            min="0"
                            max="130"
                            name="skills_sum_min"
                            className="form-control input-sm skills-sum-criteria__range"
                            placeholder="min: 0"
                            ref={skillsMinRef}
                            defaultValue={min}
                        />
                        <input
                            type="number"
                            min="0"
                            max="130"
                            name="skills_sum_max"
                            className="form-control input-sm skills-sum-criteria__range"
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
                                    className="form-control skills-sum-criteria__skill"
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
    clearButton: PropTypes.node.isRequired,
};

export default SkillsSumCriteria;
