const PLAYER_PRICE_ELEMENT_ID = "player-bid-place-group";

const findPlayerNodes = () => document.querySelectorAll(".table-skills");

const getPlayerContainerNode = ($player) => $player.parentNode;

const getPlayerSkillNodes = ($player) => $player.querySelectorAll(".skillNameNumber");

const isPlayerDetailPage = () => window.location.pathname.startsWith("/player/PID/");

const isTransferPage = () => !!document.getElementById(PLAYER_PRICE_ELEMENT_ID);

const isTransferCriteriaPage = () => window.location.pathname === "/transfers"
    || window.location.pathname.startsWith("/transfers/");

const isTrainerCriteriaType = () => window.location.pathname.includes("/trainer/1");

const isSquadPage = () => !!getPlayersSortSelect();

const getPlayersSortSelect = () => document.getElementById("playersSortSelect");

const getPlayersSortDirNode = () => document.getElementById("playersSortChangeDir");

const getPlayersSortDirection = () => getPlayersSortDirNode()?.innerHTML === "\u21D3" ? "asc" : "desc";

const sortSquad = (position, direction) => {
    const playerCells = [...document.querySelectorAll("div[id^=playerCell]")].map(cell => {
        const positions = [...cell.querySelectorAll(".player-ratings__position")];
        const scores = [...cell.querySelectorAll(".player-ratings__score")];
        const ratings = {};

        for (let i = 0; i < positions.length; i++) {
            ratings[positions[i].innerText.replace(": ", "")] = +scores[i].innerText.replace("%", "");
        }

        return { node: cell, ratings };
    });

    playerCells.sort((a, b) => {
        return a.ratings[position] - b.ratings[position];
    });

    if (direction === "desc") {
        playerCells.reverse();
    }

    for (let i = 1; i < playerCells.length; i++) {
        const nodeToMove = playerCells[i].node.parentNode;
        const nodeBefore = playerCells[i - 1].node.parentNode;

        nodeToMove.parentNode.insertBefore(nodeToMove, nodeBefore.nextSibling); // insert after
    }
};

const revertOriginalSquadOrder = () => {
    const playerCellsLength = [...document.querySelectorAll("div[id^=playerCell]")].length;

    for (let i = playerCellsLength - 1; i > 0; i--) {
        const nodeToMove = document.getElementById(`playerCell${i - 1}`).parentNode;
        const nodeAfter = document.getElementById(`playerCell${i}`).parentNode;

        nodeToMove.parentNode.insertBefore(nodeToMove, nodeAfter);
    }
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

const getPanelBody = () => document.querySelector(".panel-body");

export {
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
    revertOriginalSquadOrder,
    getTransferPlayerName,
    getTransferBidEndDate,
    getTransferPanelContainer,
    getAllFormFieldValues,
    fillFormValues,
    getPanelBody,
};
