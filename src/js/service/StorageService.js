const setItemInStore = (name, value) => {
    return new Promise(resolve => {
        chrome.storage.sync.set({[name]: value}, () => {
            resolve(true);
        });
    });
};

const getItemFromStore = (name) => {
    return new Promise(resolve => {
        chrome.storage.sync.get(name, items => {
            resolve(items[name]);
        });
    });
};

const removeItemFromStore = (name) => {
    return new Promise(resolve => {
        chrome.storage.sync.remove(name, () => {
            resolve(true);
        });
    });
};

export {
    setItemInStore,
    getItemFromStore,
    removeItemFromStore,
};
