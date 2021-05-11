import React from "react";
import PropTypes from "prop-types";
import "./PlayerRatings.scss";

const PlayerRatings = ({ ratings }) => {
    const bestPositionScore = Math.max(...Object.values(ratings));

    return (
        <div className="player-ratings">
            {Object.entries(ratings).map(rating => {
                const [position, score] = rating;
                const additionalClassName = score === bestPositionScore ? "player-ratings__skill--best" : "";

                return (
                    <div className={`player-ratings__skill ${additionalClassName}`} key={position}>
                        <span className="player-ratings__position">{position}: </span>
                        <span className="player-ratings__score">{`${score}%`}</span>
                    </div>
                );
            })}
        </div>
    );
};

PlayerRatings.propTypes = {
    ratings: PropTypes.object.isRequired,
};

export default PlayerRatings;
