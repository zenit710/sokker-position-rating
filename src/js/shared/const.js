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
    keeper: "GK",
    defender: "DEF",
    midfielder: "MID",
    striker: "ATT",
};

const STORAGE_SKILL_IMPORTANCE_KEY = "skillsImportance";
const STORAGE_REMINDERS_KEY = "reminders";

const MESSAGE_TRANSFER_REMINDER_SET_TYPE = "transferReminderSet";
const MESSAGE_TRANSFER_REMINDER_REMOVE_TYPE = "transferReminderRemove";

export {
    POSITION,
    SKILLS,
    SKILLS_ORDER,
    SKILLS_MAX_VALUE,
    STORAGE_SKILL_IMPORTANCE_KEY,
    STORAGE_REMINDERS_KEY,
    MESSAGE_TRANSFER_REMINDER_SET_TYPE,
    MESSAGE_TRANSFER_REMINDER_REMOVE_TYPE,
};
