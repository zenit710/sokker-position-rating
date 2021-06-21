import { SKILLS_MAX_VALUE } from "@/consts";

class SkillRatingResolver {
    constructor(skillsImportance, positions) {
        this.skillsImportance = skillsImportance;
        this.positions = positions;
        this.maxPositionScores = {};
    }

    generateScores(skills) {
        const scores = {};

        this.positions.forEach(position => {
            scores[position] = this.resolvePositionScore(position, skills);
        });

        return scores;
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
        if (this.maxPositionScores[position] === 0) {
            return 0;
        }

        return Math.round(score / this.maxPositionScores[position] * 1000) / 10; // allow one decimal place
    }

    getPlayerRating(playerSkills) {
        this.maxPositionScores = this.generateScores(SKILLS_MAX_VALUE);
        const scores = this.generateScores(playerSkills);
        const ratings = {};

        this.positions.forEach(position => {
            ratings[position] = this.getPositionPercentageScore(position, scores[position]);
        });

        return ratings;
    }
}

export default SkillRatingResolver;
