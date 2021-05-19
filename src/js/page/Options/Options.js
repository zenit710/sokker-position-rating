import React, { useEffect, useState } from "react";
import Tab from "@/component/Tabs/component/Tab/Tab";
import Tabs from "@/component/Tabs/Tabs";
import SkillImportanceForm from "@/component/SkillImportanceForm";
import ReminderList from "@/component/ReminderList";
import { getAllReminders } from "@/service/ReminderService";
import { OPTIONS_TAB_HASH_SKILLS_IMPORTANCE, OPTIONS_TAB_HASH_REMINDERS } from "@/consts";
import "./Options.scss";

const OptionsPage = () => {
    const [reminders, setReminders] = useState([]);
    const { hash } = window.location;

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
        <div className="options-page">
            <h1 className="options-page__title">Sokker Position Rating</h1>
            <Tabs>
                <Tab name="Skills importance" active={hash === OPTIONS_TAB_HASH_SKILLS_IMPORTANCE}>
                    <p>Set importance of each skill for each position - player rating will be based on this setup.</p>
                    <SkillImportanceForm />
                </Tab>
                <Tab name="Reminders" active={hash === OPTIONS_TAB_HASH_REMINDERS}>
                    <ReminderList
                        reminders={reminders}
                        showLabel={false}
                        showPlayerNames
                        onRemove={handleReminderRemove}
                    />
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
