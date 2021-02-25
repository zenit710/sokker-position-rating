const SKILLS = {
    stamina: "stamina",
    pace: "pace",
    technique: "technique",
    passing: "passing",
    keeper: "keeper",
    defender: "defender",
    playmaker: "playmaker",
    striker: "striker",
};

const SKILLS_ORDER = [
    SKILLS.stamina,
    SKILLS.keeper,
    SKILLS.pace,
    SKILLS.defender,
    SKILLS.technique,
    SKILLS.playmaker,
    SKILLS.passing,
    SKILLS.striker,
];

const SKILLS_MAX_VALUE = {
    [SKILLS.stamina]: 11,
    [SKILLS.pace]: 18,
    [SKILLS.technique]: 18,
    [SKILLS.passing]: 18,
    [SKILLS.keeper]: 18,
    [SKILLS.defender]: 18,
    [SKILLS.playmaker]: 18,
    [SKILLS.striker]: 18,
};

const POSITION = {
    keeper: "keeper",
    defender: "defender",
    midfielder: "midfielder",
    striker: "striker",
};

const POSITION_SKILLS_IMPORTANCE = {
    [POSITION.keeper]: {
        [SKILLS.keeper]: 55,
        [SKILLS.pace]: 30,
        [SKILLS.passing]: 15,
    },
    [POSITION.defender]: {
        [SKILLS.defender]: 55,
        [SKILLS.pace]: 30,
        [SKILLS.passing]: 15,
    },
    [POSITION.midfielder]: {
        [SKILLS.defender]: 15,
        [SKILLS.playmaker]: 30,
        [SKILLS.pace]: 15,
        [SKILLS.technique]: 10,
        [SKILLS.passing]: 30,
    },
    [POSITION.striker]: {
        [SKILLS.striker]: 35,
        [SKILLS.pace]: 30,
        [SKILLS.technique]: 25,
        [SKILLS.passing]: 10,
    },
};

export {
    POSITION,
    SKILLS_ORDER,
    SKILLS_MAX_VALUE,
    POSITION_SKILLS_IMPORTANCE,
};
