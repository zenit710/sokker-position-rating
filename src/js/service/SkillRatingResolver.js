import { POSITION, SKILLS_MAX_VALUE } from "@/consts";

class SkillRatingResolver {
    constructor(skillsImportance) {
        this.skillsImportance = skillsImportance;
        this.maxPositionScore = {
            [POSITION.keeper]: this.resolvePositionScore(POSITION.keeper, SKILLS_MAX_VALUE),
            [POSITION.defender]: this.resolvePositionScore(POSITION.defender, SKILLS_MAX_VALUE),
            [POSITION.midfielder]: this.resolvePositionScore(POSITION.midfielder, SKILLS_MAX_VALUE),
            [POSITION.striker]: this.resolvePositionScore(POSITION.striker, SKILLS_MAX_VALUE),
        };
    }

    resolvePositionScore(position, skills) {
        let score = 0;

        if (this.skillsImportance?.[position]) {
            for (const [skill, importance] of Object.entries(this.skillsImportance[position])) {
                score += importance * skills[skill];
            }
        }

        return score;
    }

    getPositionPercentageScore(position, score) {
        if (this.maxPositionScore === 0) {
            return 0;
        }

        return Math.round(score / this.maxPositionScore[position] * 1000) / 10; // allow one decimal place
    }

    getPlayerRating(playerSkills) {
        const scores = {
            [POSITION.keeper]: this.resolvePositionScore(POSITION.keeper, playerSkills),
            [POSITION.defender]: this.resolvePositionScore(POSITION.defender, playerSkills),
            [POSITION.midfielder]: this.resolvePositionScore(POSITION.midfielder, playerSkills),
            [POSITION.striker]: this.resolvePositionScore(POSITION.striker, playerSkills),
        };

        return {
            [POSITION.keeper]: this.getPositionPercentageScore(POSITION.keeper, scores[POSITION.keeper]),
            [POSITION.defender]: this.getPositionPercentageScore(POSITION.defender, scores[POSITION.defender]),
            [POSITION.midfielder]: this.getPositionPercentageScore(POSITION.midfielder, scores[POSITION.midfielder]),
            [POSITION.striker]: this.getPositionPercentageScore(POSITION.striker, scores[POSITION.striker]),
        };
    }
}

export default SkillRatingResolver;
