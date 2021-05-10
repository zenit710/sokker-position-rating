// import { STORAGE_SKILL_IMPORTANCE_KEY } from "../shared/const";
// import { getItemFromStore, setItemInStore } from "../shared/storage";
// import { getForm, getFormFields, setFieldValue } from "./utils/dom";
// import { showFailureStatus, showSuccessStatus } from "./utils/status";
// import "../../scss/options-page.scss";

// const init = async () => {
//     const $form = getForm();
//     const storedSkillsImportance = await getItemFromStore(STORAGE_SKILL_IMPORTANCE_KEY);

//     fillFormWithSkillsImportance(storedSkillsImportance);

//     $form.addEventListener("submit", (event) => {
//         event.preventDefault();
//         handleFormSubmit($form);
//     });
// };

// const handleFormSubmit = () => {
//     const skillsImportance = getSkillsImportanceFromForm();
//     const invalid = getInvalidImportances(skillsImportance);

//     if (invalid.length) {
//         handleInvalidImportances(invalid);
//     } else {
//         storeSkillsImportance(skillsImportance);
//     }
// };

// const getSkillsImportanceFromForm = () => {
//     const skillsImportance = {};

//     getFormFields().forEach($field => {
//         const [position, skill] = $field.name.split("-");

//         if (skillsImportance[position] !== undefined) {
//             skillsImportance[position][skill] = +$field.value;
//         } else {
//             skillsImportance[position] = {
//                 [skill]: +$field.value,
//             };
//         }
//     });

//     return skillsImportance;
// };

// const handleInvalidImportances = (invalid) => {
//     let message = "Position skills importances has to sum up to 100! ";
//     invalid.forEach(item => message += `(${item.position}: ${item.importanceSum}) `);
//     showFailureStatus(message.trim());
// };

// const storeSkillsImportance = async (skillsImportance) => {
//     const stored = await setItemInStore(STORAGE_SKILL_IMPORTANCE_KEY, skillsImportance);

//     if (stored) {
//         showSuccessStatus("Settings saved!");
//     }
// };

// const getInvalidImportances = (skillsImportance) => {
//     return Object.entries(skillsImportance).map(positionSkillsImportance => {
//         const [position, skills] = positionSkillsImportance;
//         let sum = 0;

//         Object.values(skills).forEach(value => sum+= value);

//         return {
//             position,
//             importanceSum: sum,
//         };
//     }).filter(positionImportance => positionImportance.importanceSum !== 100);
// };

// const fillFormWithSkillsImportance = (skillsImportance) => {
//     if (!skillsImportance) {
//         return;
//     }

//     Object.entries(skillsImportance).forEach(positionSkillsImportance => {
//         const [position, skillImportances] = positionSkillsImportance;

//         Object.entries(skillImportances).forEach(skillImportance => {
//             const [skill, importance] = skillImportance;
//             const fieldId = `${position.toLowerCase()}-${skill}`;
//             setFieldValue(fieldId, importance);
//         });
//     });
// };

// init();

import React from "react";
import ReactDOM from "react-dom";
import OptionsPage from "../page/Options";

ReactDOM.render(
    <OptionsPage />,
    document.querySelector("body"),
);
