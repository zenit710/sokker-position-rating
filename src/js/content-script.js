import React from "react";
import ReactDOM from "react-dom";
import PlayerRatings from "@/component/PlayerRatings";
import InviteAll from "@/component/InviteAll";
import TransferFilterForm from "@/component/TransferFilterForm";
import TransferReminder from "@/component/TransferReminder";
import { TYPE_PLAYER, TYPE_TRAINER } from "@/consts";
import {
    findPlayerNodes,
    getPlayerContainerNode,
    getPlayerSkills,
    getPlayerCharacteristic,
    isPlayerDetailPage,
    isTransferPage,
    isFriendliesAdsPage,
    getFriendliesInvitationsUrls,
    getFriendliesInvitationsPanel,
    isTransferCriteriaPage,
    isTrainerCriteriaType,
    isSquadPage,
    getPlayersSortSelect,
    getPlayersSortDirNode,
    sortSquad,
    revertOriginalSquadOrder,
    getTransferPanelContainer,
    getTransferPlayerName,
    getTransferBidEndDate,
    getPanelBody,
} from "@/helper/domHelper";
import SkillRatingResolver from "@/service/SkillRatingResolver";
import { getSkillsImportances, getPositions } from "@/service/SkillsImportance";

const SORT_BY_POSITION_PREFIX = "position_";
const assignPlayerRatings = async (players) => {
    const skillsImportance = await getSkillsImportances();
    const positions = await getPositions();
    const resolver = new SkillRatingResolver(skillsImportance, positions);

    players.forEach(($player) => {
        const characteristic = getPlayerCharacteristic($player);
        console.log("characteristic: ", characteristic);
        const skills = getPlayerSkills($player);
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
const handleSquadPage = async () => {
    const positions = await getPositions();
    const $sortSelect = getPlayersSortSelect();
    const $directionSwitch = getPlayersSortDirNode();
    const positionsOptGroup = document.createElement("optgroup");
    positionsOptGroup.label = "Position rating";
    $sortSelect.append(positionsOptGroup);

    positions.forEach(position => {
        const option = document.createElement("option");
        option.value = `${SORT_BY_POSITION_PREFIX}${position}`;
        option.innerHTML = position;
        positionsOptGroup.append(option);
    });

    const sortPlayers = () => {
        const field = $sortSelect.value;

        if (!field.startsWith(SORT_BY_POSITION_PREFIX)) {
            revertOriginalSquadOrder();
            return;
        }

        sortSquad(field.replace(SORT_BY_POSITION_PREFIX, ""));
    };

    $sortSelect.addEventListener("change", sortPlayers);
    $directionSwitch.addEventListener("click", sortPlayers);
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

    if (isSquadPage()) {
        handleSquadPage();
    }

    if (isFriendliesAdsPage()) {
        handleFriendliesAdsPage();
    }
};

init();
