import { setItemInStore, getItemFromStore } from "@/service/StorageService";
import { STORAGE_SKILL_IMPORTANCE_KEY } from "@/consts";

const getSkillsImportances = async () => (await getItemFromStore(STORAGE_SKILL_IMPORTANCE_KEY)) || {};

const setSkillsImportances = async (importances) => await setItemInStore(STORAGE_SKILL_IMPORTANCE_KEY, importances);

const getPositions = async () => Object.keys(await getSkillsImportances());

export {
    getSkillsImportances,
    setSkillsImportances,
    getPositions,
};
