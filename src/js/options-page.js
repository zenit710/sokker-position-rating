import "../scss/options-page.scss";

const init = () => {
    const $form = document.querySelector(".form");

    chrome.storage.sync.get("skillsImportance", items => {
        console.log(items);
    });

    $form.addEventListener("submit", (event) => {
        event.preventDefault();
        const skillsImportance = getSkillsImportanceFromForm($form);
        const invalid = getInvalidImportances(skillsImportance);

        if (invalid.length) {
            handleInvalidImportances(invalid);
        } else {
            storeSkillsImportance(skillsImportance);
        }
    });
};

const getSkillsImportanceFromForm = ($form) => {
    const skillsImportance = {};

    $form.querySelectorAll(".form__field").forEach($field => {
        const [position, skill] = $field.name.split("-");

        if (skillsImportance[position] !== undefined) {
            skillsImportance[position][skill] = +$field.value;
        } else {
            skillsImportance[position] = {
                [skill]: +$field.value,
            };
        }
    });

    return skillsImportance;
};

const handleInvalidImportances = (invalid) => {
    let message = "Position skills importances has to sum up to 100! ";
    invalid.forEach(item => message += `(${item.position}: ${item.importanceSum}) `);
    showFailureStatus(message.trim());
};

const storeSkillsImportance = (skillsImportance) => {
    chrome.storage.sync.set({skillsImportance}, () => {
        showSuccessStatus("Settings saved!");
    });
};

const showStatus = (message, type) => {
    const $status = document.querySelector(".status");
    $status.innerHTML = message;
    $status.className = `status status--show status--${type}`;
};

const showFailureStatus = (message) => {
    showStatus(message, "failure");
};

const showSuccessStatus = (message) => {
    showStatus(message, "success");
};

const getInvalidImportances = (skillsImportance) => {
    return Object.entries(skillsImportance).map(positionSkillsImportance => {
        const [position, skills] = positionSkillsImportance;
        let sum = 0;

        Object.values(skills).forEach(value => sum+= value);

        return {
            position,
            importanceSum: sum,
        };
    }).filter(positionImportance => positionImportance.importanceSum !== 100);
};

init();
