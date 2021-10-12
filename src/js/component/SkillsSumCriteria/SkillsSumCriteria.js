import React from "react";
import "./SkillsSumCriteria.scss";

const SkillsSumCriteria = () => (
    <div className="form-horizontal col-sm-6 col-xs-6">
        <div className="form-group">
            <label className="col-sm-6 control-label">Skills Sum</label>
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
);

export default SkillsSumCriteria;
