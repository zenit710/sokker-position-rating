import React from "react";
import ReactDOM from "react-dom";
import PlayerRatings from "@/component/PlayerRatings";
import TransferReminder from "@/component/TransferReminder";
import { SKILLS_ORDER, STORAGE_SKILL_IMPORTANCE_KEY } from "@/consts";
import {
    findPlayerNodes,
    getPlayerContainerNode,
    getPlayerSkillNodes,
    isTransferPage,
    getTransferPanelContainer,
    getTransferPlayerName,
    getTransferBidEndDate,
} from "@/helper/domHelper";
import SkillRatingResolver from "@/service/SkillRatingResolver";
import { getItemFromStore } from "@/service/StorageService";

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
            const $ratingComponentContainer = document.createElement("div");
            $container.append($ratingComponentContainer);

            ReactDOM.render(<PlayerRatings ratings={ratings} />, $ratingComponentContainer);
        });
    }

    if (isTransferPage()) {
        const $transferPanelContainer = getTransferPanelContainer();
        const $reminderComponentContainer = document.createElement("div");
        $transferPanelContainer.append($reminderComponentContainer);

        ReactDOM.render(
            <TransferReminder
                player={getTransferPlayerName()}
                bidEndDate={getTransferBidEndDate()}
            />,
            $reminderComponentContainer,
        );
    }
};

init();
