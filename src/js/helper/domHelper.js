const PLAYER_PRICE_ELEMENT_ID = "player-bid-place-group";
const FRIENDLY_INVITATION_LINK_SELECTOR = "a[href^='friendlies/action/public_invitation_take/ID/']";

const findPlayerNodes = () => document.querySelectorAll(".table-skills");

const getPlayerContainerNode = ($player) => $player.parentNode;

const getPlayerSkillNodes = ($player) => $player.querySelectorAll(".skillNameNumber");

const isPlayerDetailPage = () => window.location.pathname.startsWith("/player/PID/");

const isTransferPage = () => !!document.getElementById(PLAYER_PRICE_ELEMENT_ID);

const isFriendliesAdsPage = () => window.location.pathname.startsWith("/friendlies/action/public_invitations");

const getFriendliesInvitationsUrls = () => [
    ...document.querySelectorAll(FRIENDLY_INVITATION_LINK_SELECTOR),
].map(link => `${window.location.origin}/${link.getAttribute("href")}`);

const getFriendliesInvitationsPanel = () => document
    .querySelector(FRIENDLY_INVITATION_LINK_SELECTOR)
    .closest(".panel-body");

const isTransferCriteriaPage = () => window.location.pathname === "/transfers"
    || window.location.pathname.startsWith("/transfers/");

const isTrainerCriteriaType = () => window.location.pathname.includes("/trainer/1");

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
    isFriendliesAdsPage,
    getFriendliesInvitationsUrls,
    getFriendliesInvitationsPanel,
    isTransferCriteriaPage,
    isTrainerCriteriaType,
    getTransferPlayerName,
    getTransferBidEndDate,
    getTransferPanelContainer,
    getAllFormFieldValues,
    fillFormValues,
    getPanelBody,
};
