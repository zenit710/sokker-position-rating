const { SKILLS_ORDER, POSITION_SKILLS_IMPORTANCE } = require("./shared/const");
import SkillRatingResolver from "./shared/SkillRatingResolver";

const resolver = new SkillRatingResolver(POSITION_SKILLS_IMPORTANCE);
const players = document.querySelectorAll(".table-skills");

if (players.length) {
    players.forEach($player => {
        const skills = {};

        $player.querySelectorAll(".skillNameNumber").forEach(($skill, index) => {
            const skillValue = /\[(\d+)\]/.exec($skill.textContent)[1];
            skills[SKILLS_ORDER[index]] = skillValue;
        });

        const div = document.createElement("div");
        div.innerHTML = JSON.stringify(resolver.getPlayerRating(skills));
        $player.parentNode.insertBefore(div, $player.nextSibling);
    });
}
