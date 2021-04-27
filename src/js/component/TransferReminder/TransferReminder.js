import React, { useEffect, useState } from "react";
import { getPlayerReminders } from "../../service/ReminderService";
import ReminderList from "../ReminderList";
import Form from "./components/Form";

const TransferReminder = () => {
    const [reminders, setReminders] = useState([]);

    useEffect(async () => {
        setReminders(await getPlayerReminders());
    }, []);

    const handleReminderAdded = (reminder) => {
        setReminders([...reminders, reminder]);
    };

    return (
        <div className="transfer-reminder panel panel-default">
            <div className="panel-heading">
                <div className="h5">Transfer Reminder (Sokker.org Position Rating)</div>
            </div>
            <div className="panel-body">
                <Form onReminderAdded={handleReminderAdded} />
                <ReminderList reminders={reminders} />
            </div>
        </div>
    );
};

export default TransferReminder;
