import { getItemFromStore, setItemInStore } from "@/service/StorageService";
import { STORAGE_TRANSFER_FILTERS_KEY } from "@/consts";

const getFilters = async () => (await getItemFromStore(STORAGE_TRANSFER_FILTERS_KEY)) || [];

const saveFilter = async (name, formValues) => {
    const filters = await getFilters();
    const filterIndex = filters.findIndex(filter => filter.name === name);
    const filterToSave = {
        name,
        formValues,
    };

    if (filterIndex > -1) {
        filters[filterIndex] = filterToSave;
    } else {
        filters.push(filterToSave);
    }

    return await setItemInStore(STORAGE_TRANSFER_FILTERS_KEY, filters);
};

export {
    getFilters,
    saveFilter,
};
