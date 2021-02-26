const { SKILLS_ORDER, POSITION_SKILLS_IMPORTANCE } = require("./shared/const");
import SkillRatingResolver from "./shared/SkillRatingResolver";
import "../scss/content.scss";

const findPlayers = () => document.querySelectorAll(".table-skills");

const getPlayerRating = (resolver, $player) => {
    const skills = {};

    $player.querySelectorAll(".skillNameNumber").forEach(($skill, index) => {
        const skillValue = /\[(\d+)\]/.exec($skill.textContent)[1];
        skills[SKILLS_ORDER[index]] = skillValue;
    });

    return resolver.getPlayerRating(skills);
};

const createRatingsNode = (ratings) => {
    const div = document.createElement("div");
    div.className = "player-ratings";
    div.append(...createRatingNodes(ratings));

    return div;
};

const createRatingNodes = (ratings) => {
    const bestPositionScore = Math.max(...Object.values(ratings));
    const positionNodes = Object.entries(ratings).map(rating => {
        const [position, score] = rating;

        const div = document.createElement("div");
        div.className = "player-ratings__skill";

        if (score === bestPositionScore) {
            div.classList.add("player-ratings__skill--best");
        }

        const positionSpan = document.createElement("span");
        positionSpan.className = "player-ratings__position";
        positionSpan.innerText = `${position}: `;

        const scoreSpan = document.createElement("span");
        scoreSpan.className = "player-ratings__score";
        scoreSpan.innerText = `${score}%`;

        div.appendChild(positionSpan);
        div.appendChild(scoreSpan);

        return div;
    });

    return positionNodes;
};

const appendRatingsToTheDom = ($container, ratingsNode) => {
    return $container.append(ratingsNode);
};

const init = () => {
    const resolver = new SkillRatingResolver(POSITION_SKILLS_IMPORTANCE);
    const players = findPlayers();

    if (players.length) {
        players.forEach($player => {
            const ratings = getPlayerRating(resolver, $player);
            const $container = $player.closest(".well, .panel");
            const node = createRatingsNode(ratings);
            appendRatingsToTheDom($container, node);
            $container.style.position = "relative";
        });
    }
};

init();
