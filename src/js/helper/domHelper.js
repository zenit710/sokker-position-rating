const PLAYER_PRICE_ELEMENT_ID = "player-bid-price";

const findPlayerNodes = () => document.querySelectorAll(".table-skills");

const getPlayerContainerNode = ($player) => $player.parentNode;

const getPlayerSkillNodes = ($player) => $player.querySelectorAll(".skillNameNumber");

const isTransferPage = () => !!document.getElementById(PLAYER_PRICE_ELEMENT_ID);

const getTransferPlayerName = () => document.querySelector(".navbar-brand")?.textContent?.trim();

const getTransferBidEndDate = () => {
    const endDateText = document.getElementById("player-bid-deadline")?.textContent;

    return endDateText && new Date(endDateText);
};

const getTransferPanelContainer = () => document.getElementById(PLAYER_PRICE_ELEMENT_ID)?.closest(".panel")?.parentNode;

export {
    findPlayerNodes,
    getPlayerContainerNode,
    getPlayerSkillNodes,
    isTransferPage,
    getTransferPlayerName,
    getTransferBidEndDate,
    getTransferPanelContainer,
};
