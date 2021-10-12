import React from "react";
import { SKILLS } from "@/consts/engine";
import "./SkillsSumCriteria.scss";

const SkillsSumCriteria = () => (
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
                    />
                    <input
                        type="number"
                        min="1"
                        max="130"
                        name="skills_sum_max"
                        className="form-control input-sm"
                        placeholder="max: 130"
                    />
                </div>
            </div>
        </div>
        <div className="form-horizontal col-sm-6 col-xs-6">
            <div className="form-group">
                <label className="col-sm-6 control-label">Skills to sum</label>
                <div className="col-sm-6">
                    {Object.values(SKILLS).map(skill => (
                        <div className="form-group" key={`skills_sum_${skill}`}>
                            <label className="col-sm-6" htmlFor={`skills_sum_${skill}`}>{skill}</label>
                            <input type="checkbox" name={`skills_sum_${skill}`} id={`skills_sum_${skill}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
);

export default SkillsSumCriteria;
