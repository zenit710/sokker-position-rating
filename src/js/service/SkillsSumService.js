export const getStoredSkillsSumCriteria = () => {
    const criteria = sessionStorage.getItem("skillsSumCriteria");

    if (criteria) {
        try {
            return JSON.parse(criteria);
        } catch (e) {
            console.error(e);
        }
    }

    return {
        min: 0,
        max: 130,
        skillsToSum: [],
    };
};

export const storeSkillsSumCriteria = (min, max, skillsToSum) =>
    sessionStorage.setItem("skillsSumCriteria", JSON.stringify({
        min,
        max,
        skillsToSum,
    }));

export const getSkillsSum = (skills) => {
    const { skillsToSum } = getStoredSkillsSumCriteria();

    return skillsToSum.reduce((acc, current) => acc += parseInt(skills[current]), 0);
};
