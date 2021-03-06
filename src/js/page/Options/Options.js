import React, { useEffect, useState } from "react";
import Tab from "@/component/Tabs/component/Tab";
import Tabs from "@/component/Tabs";
import SkillImportanceForm from "@/component/SkillImportanceForm";
import PositionAdd from "@/component/PositionAdd/PositionAdd";
import ReminderList from "@/component/ReminderList";
import TransferFilters from "@/component/TransferFilters";
import { getAllReminders, clearAllReminders } from "@/service/ReminderService";
import { getPositions } from "@/service/SkillsImportance";
import {
    OPTIONS_TAB_HASH_SKILLS_IMPORTANCE,
    OPTIONS_TAB_HASH_REMINDERS,
    OPTIONS_TAB_HASH_TRANSFER_FILTERS,
} from "@/consts";
import "./Options.scss";

const OptionsPage = () => {
    const [reminders, setReminders] = useState([]);
    const [positions, setPositions] = useState([]);
    const { hash } = window.location;

    useEffect(async () => setReminders(await getAllReminders()), []);

    useEffect(async () => setPositions(await getPositions()), []);

    const handleReminderRemove = (reminder) => {
        const index = reminders.findIndex(r => r.player === reminder.player && r.remindDate === reminder.remindDate);

        if (index > -1) {
            const newReminders = reminders.slice();
            newReminders.splice(index, 1);
            setReminders(newReminders);
        }
    };

    const handleRemindersClear = async () => {
        const cleared = clearAllReminders();

        if (cleared) {
            setReminders([]);
        }
    };

    const handlePositionAdded = (positionName) => {
        if (!positions.includes(positionName)) {
            setPositions([...positions, positionName]);
        }
    };

    const handlePositionRemoved = (positionName) => {
        const index = positions.findIndex(position => position === positionName);

        if (index > -1) {
            const newPositions = [...positions];
            newPositions.splice(index, 1);
            setPositions(newPositions);
        }
    };

    return (
        <div className="options-page">
            <h1 className="options-page__title">Sokker Position Rating</h1>
            <Tabs>
                <Tab name="Skills importance" active={hash === OPTIONS_TAB_HASH_SKILLS_IMPORTANCE}>
                    <p>Set importance of each skill for each position - player rating will be based on this setup.</p>
                    <SkillImportanceForm positions={positions} onPositionRemove={handlePositionRemoved} />
                    <PositionAdd onAdded={handlePositionAdded} />
                </Tab>
                <Tab name="Reminders" active={hash === OPTIONS_TAB_HASH_REMINDERS}>
                    <ReminderList
                        reminders={reminders}
                        showLabel={false}
                        showPlayerNames
                        onRemove={handleReminderRemove}
                        onClear={handleRemindersClear}
                    />
                </Tab>
                <Tab name="Transfer filters" active={hash === OPTIONS_TAB_HASH_TRANSFER_FILTERS}>
                    <TransferFilters />
                </Tab>
            </Tabs>
        </div>
    );
};

export default OptionsPage;
