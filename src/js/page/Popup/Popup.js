import React from "react";
import Button from "@/component/Button";
import { OPTIONS_TAB_HASH_SKILLS_IMPORTANCE, OPTIONS_TAB_HASH_REMINDERS } from "@/consts";
import "./Popup.scss";

const handleOptionsClick = (section) => window.open(
    `${chrome.runtime.getURL("options-page.html")}${section}`,
);

const handleSokkerButtonClick = () => chrome.tabs.create({ url: "https://sokker.org" });

const PopupPage = () => (
    <div className="popup-page">
        <h1>Sokker Position Rating</h1>

        <div className="popup-page__controls">
            <Button
                onClick={() => handleOptionsClick(OPTIONS_TAB_HASH_SKILLS_IMPORTANCE)}
            >
                Set skills importance
            </Button>

            <Button onClick={() => handleOptionsClick(OPTIONS_TAB_HASH_REMINDERS)}>Show active reminders</Button>

            <Button onClick={handleSokkerButtonClick}>Go to sokker.org</Button>
        </div>
    </div>
);

export default PopupPage;
