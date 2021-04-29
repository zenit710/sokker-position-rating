import React from "react";
import PropTypes from "prop-types";
import { removeReminder } from "../../service/ReminderService";
import "./ReminderList.scss";

const ReminderList = ({ reminders, onRemove }) => {
    if (!reminders.length) {
        return null;
    }

    const handleRemoveClick = (reminder) => {
        removeReminder(reminder);
        onRemove(reminder);
    };

    return (
        <div className="reminder-list">
            <label>Active reminders: </label>
            <ul>
                {reminders.map(reminder => {
                    const date = (new Date(reminder.remindDate)).toLocaleString();

                    return (
                        <li className="reminder-list__item" key={reminder.remindDate}>
                            <span className="reminder-list__date">{date}</span>
                            <button
                                className="reminder-list__remove"
                                title="Remove reminder"
                                onClick={() => handleRemoveClick(reminder)}
                            >X</button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

ReminderList.propTypes = {
    reminders: PropTypes.arrayOf(PropTypes.shape({
        remindDate: PropTypes.number,
    })).isRequired,
    onRemove: PropTypes.func,
};

ReminderList.defaultProps = {
    onRemove: () => {},
};

export default ReminderList;
