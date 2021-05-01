import React, { useEffect, useState } from "react";
import Button from "../../component/Button";
import ReminderList from "../../component/ReminderList";
import { getAllReminders } from "../../service/ReminderService";
import "./Popup.scss";

const handleSkillsButtonClick = () => chrome.runtime.openOptionsPage();

const handleSokkerButtonClick = () => chrome.tabs.create({ url: "https://sokker.org" });

const PopupPage = () => {
    const [reminders, setReminders] = useState([]);

    useEffect(async () => setReminders(await getAllReminders()), []);

    const handleReminderRemove = (reminder) => {
        const index = reminders.findIndex(r => r.player === reminder.player && r.remindDate === reminder.remindDate);

        if (index > -1) {
            const newReminders = reminders.slice();
            newReminders.splice(index, 1);
            setReminders(newReminders);
        }
    };

    return (
        <div className="popup-page">
            <h1>Sokker Position Rating</h1>

            <div className="popup-page__controls">
                <Button text="Set skills importance" onClick={handleSkillsButtonClick} />
                <Button text="Go to sokker.org" onClick={handleSokkerButtonClick} />
            </div>

            {reminders.length > 0 && (
                <div className="popup-page__reminders">
                    <h3 className="popup-page__reminders-header">Active reminders:</h3>
                    <ReminderList reminders={reminders} showLabel={false} onRemove={handleReminderRemove} />
                </div>
            )}
        </div>
    );
};

export default PopupPage;
