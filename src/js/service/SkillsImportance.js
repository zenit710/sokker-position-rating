import { setItemInStore, getItemFromStore } from "@/service/StorageService";
import { STORAGE_SKILL_IMPORTANCE_KEY } from "@/consts";

const getSkillsImportances = async () => (await getItemFromStore(STORAGE_SKILL_IMPORTANCE_KEY)) || {};

const setSkillsImportances = async (importances) => await setItemInStore(STORAGE_SKILL_IMPORTANCE_KEY, importances);

const getPositions = async () => {
    let positions = Object.keys(await getSkillsImportances());

    if (!positions.length) {
        positions = ["GK", "DEF", "MID", "ATT"];
    }

    return positions;
};

export {
    getSkillsImportances,
    setSkillsImportances,
    getPositions,
};
