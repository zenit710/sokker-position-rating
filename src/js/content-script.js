import React from "react";
import ReactDOM from "react-dom";
import PlayerRatings from "@/component/PlayerRatings";
import InviteAll from "@/component/InviteAll";
import TransferFilterForm from "@/component/TransferFilterForm";
import TransferReminder from "@/component/TransferReminder";
import { SKILLS_ORDER, STORAGE_SKILL_IMPORTANCE_KEY, TYPE_PLAYER, TYPE_TRAINER } from "@/consts";
import {
    findPlayerNodes,
    getPlayerContainerNode,
    getPlayerSkillNodes,
    isPlayerDetailPage,
    isTransferPage,
    isFriendliesAdsPage,
    getFriendliesInvitationsUrls,
    getFriendliesInvitationsPanel,
    isTransferCriteriaPage,
    isTrainerCriteriaType,
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

const handleFriendliesAdsPage = () => {
    const invitationUrls = getFriendliesInvitationsUrls();

    if (invitationUrls.length) {
        const $invitationsPanel = getFriendliesInvitationsPanel();
        const $inviteAllContainer = document.createElement("div");
        $invitationsPanel.append($inviteAllContainer);

        ReactDOM.render(
            <InviteAll invitationUrls={invitationUrls} />,
            $inviteAllContainer,
        );
    }
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

    if (isFriendliesAdsPage()) {
        handleFriendliesAdsPage();
    }
};

init();
