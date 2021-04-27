import React from "react";
import PropTypes from "prop-types";
import "./ReminderList.scss";

const ReminderList = ({ reminders }) => {
    if (!reminders.length) {
        return null;
    }

    return (
        <div className="reminder-list">
            <label>Active reminders: </label>
            <ul>
                {reminders.map(reminder => {
                    const date = (new Date(reminder.remindDate)).toLocaleString();

                    return <li key={reminder.remindDate}>{date}</li>;
                })}
            </ul>
        </div>
    );
};

ReminderList.propTypes = {
    reminders: PropTypes.arrayOf(PropTypes.shape({
        remindDate: PropTypes.number,
    })).isRequired,
};

export default ReminderList;
