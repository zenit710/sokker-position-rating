import { getItemFromStore, setItemInStore, removeItemFromStore } from "@/service/StorageService";
import { STORAGE_TRANSFER_FILTERS_KEY } from "@/consts";

const getFilters = async () => (await getItemFromStore(STORAGE_TRANSFER_FILTERS_KEY)) || [];

const getFiltersByType = async (type) => (await getFilters()).filter(filter => filter.type === type);

const saveFilter = async (name, formValues, type) => {
    const filters = await getFilters();
    const filterIndex = filters.findIndex(filter => filter.name === name && filter.type === type);
    const filterToSave = {
        name,
        formValues,
        type,
    };

    if (filterIndex > -1) {
        filters[filterIndex] = filterToSave;
    } else {
        filters.push(filterToSave);
    }

    return await setItemInStore(STORAGE_TRANSFER_FILTERS_KEY, filters);
};

const clearFilters = () => removeItemFromStore(STORAGE_TRANSFER_FILTERS_KEY);

const removeFilter = async (name, type) => {
    const filters = await getFilters();
    const index = filters.findIndex(filter => filter.name === name && filter.type === type);

    if (index > -1) {
        filters.splice(index, 1);
    }

    return await setItemInStore(STORAGE_TRANSFER_FILTERS_KEY, filters);
};

const sortByName = (filters) => filters.sort((a, b) => {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
});

export {
    getFilters,
    getFiltersByType,
    saveFilter,
    clearFilters,
    sortByName,
    removeFilter,
};
