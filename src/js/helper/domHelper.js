const PLAYER_PRICE_ELEMENT_ID = "player-bid-place-group";
const FRIENDLY_INVITATION_LINK_SELECTOR = "a[href^='friendlies/action/public_invitation_take/ID/']";
const PANEL_BODY_CLASS = ".panel-body";
const PLAYER_CELL_ID_PREFIX = "playerCell";
const SORT = {
    DESC: "desc",
    ASC: "asc",
};

const findPlayerNodes = () => document.querySelectorAll(".table-skills");

const getPlayerContainerNode = ($player) => $player.parentNode;

const getPlayerSkillNodes = ($player) => $player.querySelectorAll(".skillNameNumber");

const isPlayerDetailPage = () => window.location.pathname.startsWith("/player/PID/");

const isTransferPage = () => !!document.getElementById(PLAYER_PRICE_ELEMENT_ID);

const isFriendliesAdsPage = () => window.location.pathname.startsWith("/friendlies/action/public_invitations");

const getFriendliesInvitationsUrls = () => [
    ...document.querySelectorAll(FRIENDLY_INVITATION_LINK_SELECTOR),
].map(link => link.getAttribute("href"));

const getFriendliesInvitationsPanel = () => document
    .querySelector(FRIENDLY_INVITATION_LINK_SELECTOR)
    ?.closest(PANEL_BODY_CLASS);

const isTransferCriteriaPage = () => window.location.pathname === "/transfers"
    || window.location.pathname.startsWith("/transfers/");

const isTrainerCriteriaType = () => window.location.pathname.includes("/trainer/1");

const isSquadPage = () => !!getPlayersSortSelect();

const getPlayersSortSelect = () => document.getElementById("playersSortSelect");

const getPlayersSortDirNode = () => document.getElementById("playersSortChangeDir");

const getPlayersSortDirection = () => getPlayersSortDirNode()?.innerHTML === "\u21D3" ? SORT.ASC : SORT.DESC;

const organizeSquadWells = (wells) => {
    for (let i = wells.length - 1; i > 0; i--) {
        const nodeToMove = wells[i - 1];

        nodeToMove.parentNode.insertBefore(nodeToMove, wells[i]);
    }
};

const sortSquad = (position) => {
    const playerWells = [...document.querySelectorAll(`div[id^=${PLAYER_CELL_ID_PREFIX}]`)].map(cell => {
        const positions = [...cell.querySelectorAll(".player-ratings__position")];
        const scores = [...cell.querySelectorAll(".player-ratings__score")];
        const ratings = {};

        for (let i = 0; i < positions.length; i++) {
            ratings[positions[i].innerText.replace(": ", "")] = +scores[i].innerText.replace("%", "");
        }

        return { node: cell, ratings };
    }).sort((a, b) => a.ratings[position] - b.ratings[position]).map(cell => cell.node.parentNode);

    if (getPlayersSortDirection() === SORT.DESC) {
        playerWells.reverse();
    }

    organizeSquadWells(playerWells);
};

const revertOriginalSquadOrder = () => {
    const playerWells = [...document.querySelectorAll(`div[id^=${PLAYER_CELL_ID_PREFIX}]`)].sort((a, b) => {
        const aNumber = +a.id.replace(PLAYER_CELL_ID_PREFIX, "");
        const bNumber = +b.id.replace(PLAYER_CELL_ID_PREFIX, "");

        return aNumber - bNumber;
    }).map(cell => cell.parentNode);

    organizeSquadWells(playerWells);
};

const getTransferPlayerName = () => document.querySelector(".navbar-brand")?.textContent?.trim();

const getTransferBidEndDate = () => {
    const endDateText = document.getElementById("player-bid-deadline")?.textContent;

    return endDateText && new Date(endDateText);
};

const getTransferPanelContainer = () => document.getElementById(PLAYER_PRICE_ELEMENT_ID)?.closest(".panel")?.parentNode;

const getAllFormFieldValues = () => {
    const fields = document.querySelectorAll(".form-control");
    const values = {};

    fields.forEach(field => values[field.name] = field.value);

    return values;
};

const fillFormValues = (values) => {
    Object.entries(values).forEach(([name, value]) => {
        const node = document.querySelector(`input[name="${name}"], select[name="${name}"]`);
        const tag = node?.tagName;

        if (node) {
            node.value = value;
        }

        if (tag === "SELECT") {
            const optionNode = node.querySelector(`option[value="${value}"]`);

            if (optionNode) {
                node.querySelectorAll("option").forEach(option => option.removeAttribute("selected"));
                optionNode.setAttribute("selected", true);
            }
        }
    });
};

const getPanelBody = () => document.querySelector(PANEL_BODY_CLASS);

export {
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
    isSquadPage,
    getPlayersSortSelect,
    getPlayersSortDirNode,
    sortSquad,
    revertOriginalSquadOrder,
    getTransferPlayerName,
    getTransferBidEndDate,
    getTransferPanelContainer,
    getAllFormFieldValues,
    fillFormValues,
    getPanelBody,
};
