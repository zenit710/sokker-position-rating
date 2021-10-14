import React, { useState } from "react";
import PropTypes from "prop-types";
import { getStoredSkillsSumCriteria } from "@/service/SkillsSumService";
import "./SkillsSum.scss";

const SkillsSum = ({ sum, playerContainer }) => {
    const { min, max } = getStoredSkillsSumCriteria();
    const inRange = sum >= min && sum <= max;
    const [expanded, setExpanded] = useState(!inRange);

    if (min === undefined && max === undefined) {
        return null;
    }

    return (
        <span className="skills-sum">
            <span className={`skills-sum__value skills-sum__value--${inRange ? "in-range" : "out-of-range"}`}>
                (Skills sum: {sum})
            </span>
            {!inRange && (
                <span
                    className="skills-sum__expand-switch"
                >
                    {expanded ? "collapse" : "expand"}
                </span>
            )}
        </span>
    );
};

SkillsSum.propTypes = {
    sum: PropTypes.number.isRequired,
    playerContainer: PropTypes.node.isRequired,
};

export default SkillsSum;