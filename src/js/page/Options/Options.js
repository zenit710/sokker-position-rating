import React from "react";
import SkillImportanceForm from "../../component/SkillImportanceForm/SkillImportanceForm";
import "./Options.scss";

const OptionsPage = () => {
    return (
        <div className="options-page">
            <h1 className="options-page__title">Sokker Position Rating</h1>
            <p className="options-page__lead">
                Set importance of each skill for each position - player rating will be based on this setup.
            </p>
            <div className="options-page__skill-importance">
                <SkillImportanceForm />
            </div>
        </div>
    );
};

export default OptionsPage;
