import RatingComponent from "./component/RatingComponent";
import { SKILLS_ORDER, POSITION_SKILLS_IMPORTANCE } from "./shared/const";
import { findPlayerNodes, getPlayerContainerNode, getPlayerSkillNodes } from "./shared/domHelper";
import SkillRatingResolver from "./shared/SkillRatingResolver";
import "../scss/content.scss";

const transfromSkills = (skillNodes) => {
    const skills = {};

    skillNodes.forEach(($skill, index) => {
        const skillValue = /\[(\d+)\]/.exec($skill.textContent)[1];
        skills[SKILLS_ORDER[index]] = skillValue;
    });

    return skills;
};

const init = () => {
    const resolver = new SkillRatingResolver(POSITION_SKILLS_IMPORTANCE);
    const players = findPlayerNodes();

    if (players.length) {
        players.forEach($player => {
            const skills = transfromSkills(getPlayerSkillNodes($player));
            const ratings = resolver.getPlayerRating(skills);
            const $container = getPlayerContainerNode($player);
            const ratingComponent = new RatingComponent(ratings);
            $container.append(ratingComponent.render());
        });
    }
};

init();
