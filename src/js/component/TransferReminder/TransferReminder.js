import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getPlayerReminders, removeReminders } from "@/service/ReminderService";
import ReminderList from "@/component/ReminderList";
import Form from "./components/Form";

const TransferReminder = ({ player, bidEndDate }) => {
    const [reminders, setReminders] = useState([]);

    useEffect(async () => {
        setReminders(await getPlayerReminders(player));
    }, []);

    const handleReminderAdded = (reminder) => {
        setReminders([...reminders, reminder]);
    };

    const handleReminderRemove = (reminder) => {
        const index = reminders.findIndex(r => r.player === reminder.player && r.remindDate === reminder.remindDate);

        if (index > -1) {
            const newReminders = reminders.slice();
            newReminders.splice(index, 1);
            setReminders(newReminders);
        }
    };

    const handleRemindersClear = async () => {
        const removed = removeReminders(reminders);

        if (removed) {
            setReminders([]);
        }
    };

    return (
        <div className="transfer-reminder panel panel-default">
            <div className="panel-heading">
                <div className="h5">Transfer Reminder (Sokker.org Position Rating)</div>
            </div>
            <div className="panel-body">
                <Form onReminderAdded={handleReminderAdded} player={player} bidEndDate={bidEndDate} />
                <ReminderList reminders={reminders} onRemove={handleReminderRemove} onClear={handleRemindersClear} />
            </div>
        </div>
    );
};

TransferReminder.propTypes = {
    player: PropTypes.string.isRequired,
    bidEndDate: PropTypes.instanceOf(Date).isRequired,
};

export default TransferReminder;
