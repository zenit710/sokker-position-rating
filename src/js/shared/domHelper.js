const findPlayerNodes = () => document.querySelectorAll(".table-skills");

const getPlayerContainerNode = ($player) => $player.parentNode;

const getPlayerSkillNodes = ($player) => $player.querySelectorAll(".skillNameNumber");

export {
    findPlayerNodes,
    getPlayerContainerNode,
    getPlayerSkillNodes,
};
