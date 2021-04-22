import RatingComponent from "../component/RatingComponent";
import TransferReminderComponent from "../component/TransferReminder";
import { SKILLS_ORDER, STORAGE_SKILL_IMPORTANCE_KEY } from "../shared/const";
import {
    findPlayerNodes,
    getPlayerContainerNode,
    getPlayerSkillNodes,
    isTransferPage,
    getTransferPlayerName,
    getTransferBidEndDate,
    getTransferPanelContainer,
} from "../shared/domHelper";
import SkillRatingResolver from "../shared/SkillRatingResolver";
import { getItemFromStore } from "../shared/storage";
import "../../scss/content.scss";

const transfromSkills = (skillNodes) => {
    const skills = {};

    skillNodes.forEach(($skill, index) => {
        const skillValue = /\[(\d+)\]/.exec($skill.textContent)[1];
        skills[SKILLS_ORDER[index]] = skillValue;
    });

    return skills;
};

const init = async () => {
    const skillsImportance = await getItemFromStore(STORAGE_SKILL_IMPORTANCE_KEY);
    const resolver = new SkillRatingResolver(skillsImportance);
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

    if (isTransferPage()) {
        const $transferPanelContainer = getTransferPanelContainer();
        const reminderComponent = new TransferReminderComponent();

        $transferPanelContainer.append(reminderComponent.render());
    }
};

init();
