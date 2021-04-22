import "./PlayerRatings.scss";

const CLASS_NAME_BASE = "player-ratings";
const CLASS_NAME_SKILL = `${CLASS_NAME_BASE}__skill`;
const SUBNODE_TYPE = {
    position: "position",
    score: "score",
};

export default class PlayerRatings {
    constructor(ratings) {
        this.ratings = ratings;
    }

    render() {
        const div = document.createElement("div");
        div.className = CLASS_NAME_BASE;
        div.append(...this.__getRatingNodes());

        return div;
    }

    __getRatingNodes() {
        const bestPositionScore = Math.max(...Object.values(this.ratings));
        const positionNodes = Object.entries(this.ratings).map(rating => {
            const [position, score] = rating;

            const div = document.createElement("div");
            div.className = CLASS_NAME_SKILL;

            if (score === bestPositionScore) {
                div.classList.add(`${CLASS_NAME_SKILL}--best`);
            }

            const positionSpan = this.__createPositionNode(position);
            const scoreSpan = this.__createScoreNode(score);

            div.append(positionSpan, scoreSpan);

            return div;
        });

        return positionNodes;
    }

    __createPositionNode(position) {
        return this.__createSkillSubNode(SUBNODE_TYPE.position, `${position}: `);
    }

    __createScoreNode(score) {
        return this.__createSkillSubNode(SUBNODE_TYPE.score, `${score}%`);
    }

    __createSkillSubNode(type, value) {
        const span = document.createElement("span");
        span.className = `${CLASS_NAME_BASE}__${type}`;
        span.innerText = value;

        return span;
    }
}
