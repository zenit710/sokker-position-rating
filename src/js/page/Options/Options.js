import React from "react";
import Tab from "@/component/Tabs/component/Tab/Tab";
import Tabs from "@/component/Tabs/Tabs";
import SkillImportanceForm from "@/component/SkillImportanceForm";
import "./Options.scss";

const OptionsPage = () => {
    return (
        <div className="options-page">
            <h1 className="options-page__title">Sokker Position Rating</h1>
            <Tabs>
                <Tab name="Skills importance">
                    <p>Set importance of each skill for each position - player rating will be based on this setup.</p>
                    <SkillImportanceForm />
                </Tab>
                <Tab name="drugi">
                    Siemano, drugi!
                </Tab>
                <Tab name="trzeci">
                    Siemano, trzeci!
                </Tab>
                <div>A ja się nie renderuje!</div>
            </Tabs>
        </div>
    );
};

export default OptionsPage;
