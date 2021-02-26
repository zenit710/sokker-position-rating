const findPlayerNodes = () => document.querySelectorAll(".table-skills");

const getPlayerContainerNode = ($player) => $player.closest(".well, .panel");

const getPlayerSkillNodes = ($player) => $player.querySelectorAll(".skillNameNumber");

export {
    findPlayerNodes,
    getPlayerContainerNode,
    getPlayerSkillNodes,
};
