import { getItemFromStore, setItemInStore } from "./shared/storage";
import "../scss/options-page.scss";

const init = async () => {
    const $form = document.querySelector(".form");
    const storedSkillsImportance = await getItemFromStore("skillsImportance");

    fillFormWithSkillsImportance(storedSkillsImportance);

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

const storeSkillsImportance = async (skillsImportance) => {
    await setItemInStore("skillsImportance", skillsImportance);
    showSuccessStatus("Settings saved!");
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

const fillFormWithSkillsImportance = (skillsImportance) => {
    if (!skillsImportance) {
        return;
    }

    Object.entries(skillsImportance).forEach(positionSkillsImportance => {
        const [position, skillImportances] = positionSkillsImportance;

        Object.entries(skillImportances).forEach(skillImportance => {
            const [skill, importance] = skillImportance;
            const fieldId = `${position.toLowerCase()}-${skill}`;
            document.getElementById(fieldId).value = importance;
        });
    });
};

init();
