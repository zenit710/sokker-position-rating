import React from "react";
import ReactDOM from "react-dom";
import PlayerRatings from "@/component/PlayerRatings";
import TransferFilterForm from "@/component/TransferFilterForm";
import TransferReminder from "@/component/TransferReminder";
import { SKILLS_ORDER, STORAGE_SKILL_IMPORTANCE_KEY, TYPE_PLAYER, TYPE_TRAINER, POSITION } from "@/consts";
import {
    findPlayerNodes,
    getPlayerContainerNode,
    getPlayerSkillNodes,
    isPlayerDetailPage,
    isTransferPage,
    isTransferCriteriaPage,
    isTrainerCriteriaType,
    isSquadPage,
    getPlayersSortSelect,
    getPlayersSortDirNode,
    getPlayersSortDirection,
    sortSquad,
    getTransferPanelContainer,
    getTransferPlayerName,
    getTransferBidEndDate,
    getPanelBody,
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

const assignPlayerRatings = async (players) => {
    const skillsImportance = await getItemFromStore(STORAGE_SKILL_IMPORTANCE_KEY);
    const resolver = new SkillRatingResolver(skillsImportance);

    players.forEach($player => {
        const skills = transfromSkills(getPlayerSkillNodes($player));
        const ratings = resolver.getPlayerRating(skills);
        const $container = getPlayerContainerNode($player);
        const $ratingComponentContainer = document.createElement("div");
        $container.append($ratingComponentContainer);

        ReactDOM.render(<PlayerRatings ratings={ratings} />, $ratingComponentContainer);
    });
};

const handlePlayerTransferPage = () => {
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
};

const tryPlayerTransferPage = (tryNumber = 1) => {
    if (isTransferPage()) {
        handlePlayerTransferPage();
    } else {
        if (tryNumber <= 3) {
            setTimeout(() => {
                tryPlayerTransferPage(tryNumber + 1);
            }, 1000);
        }
    }
};

const handlePlayerDetailPage = () => {
    tryPlayerTransferPage();
};

const handleTransferCriteriaPage = () => {
    const $panelBody = getPanelBody();
    const $transferFilterContainer = document.createElement("div");
    const criteriaType = isTrainerCriteriaType() ? TYPE_TRAINER : TYPE_PLAYER;
    $panelBody.append($transferFilterContainer);

    ReactDOM.render(
        <TransferFilterForm type={criteriaType} />,
        $transferFilterContainer,
    );
};

const handleSquadPage = () => {
    const $sortSelect = getPlayersSortSelect();
    const $directionSwitch = getPlayersSortDirNode();
    const positionsOptGroup = document.createElement("optgroup");
    positionsOptGroup.label = "Position rating";
    $sortSelect.append(positionsOptGroup);

    Object.values(POSITION).forEach(position => {
        const option = document.createElement("option");
        option.value = `position_${position}`;
        option.innerHTML = position;
        positionsOptGroup.append(option);
    });

    const sortPlayers = () => {
        const field = $sortSelect.value;

        if (!field.startsWith("position_")) {
            return;
        }

        const sortDirection = getPlayersSortDirection();

        sortSquad(field.replace("position_", ""), sortDirection);
    };

    $sortSelect.addEventListener("change", sortPlayers);
    $directionSwitch.addEventListener("click", sortPlayers);
};

const init = () => {
    const players = findPlayerNodes();

    if (players.length) {
        assignPlayerRatings(players);
    }

    if (isPlayerDetailPage()) {
        handlePlayerDetailPage();
    }

    if (isTransferCriteriaPage()) {
        handleTransferCriteriaPage();
    }

    if (isSquadPage()) {
        handleSquadPage();
    }
};

init();
