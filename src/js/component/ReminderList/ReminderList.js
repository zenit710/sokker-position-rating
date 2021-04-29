import React from "react";
import PropTypes from "prop-types";
import { removeReminder, groupByPlayer } from "../../service/ReminderService";
import "./ReminderList.scss";

const ReminderList = ({ reminders, onRemove, showLabel }) => {
    if (!reminders.length) {
        return null;
    }

    const groupedReminders = groupByPlayer(reminders);
    const hasManyPlayers = Object.keys(groupedReminders).length > 1;

    const handleRemoveClick = (reminder) => {
        removeReminder(reminder);
        onRemove(reminder);
    };

    return (
        <div className="reminder-list">
            {showLabel && <label>Active reminders:</label>}
            <ul className="reminder-list__player-list">
                {Object.entries(groupedReminders).map(([player, playerReminders]) => (
                    <li className="reminder-list__player-list-item" key={player}>
                        {hasManyPlayers && (
                            <a
                                href={playerReminders[0].url}
                                target="_blank"
                                rel="noreferrer"
                                title={player}
                            >{player}</a>
                        )}
                        <ul className="reminder-list__player-reminders">
                            {playerReminders.map(reminder => {
                                const date = (new Date(reminder.remindDate)).toLocaleString();

                                return (
                                    <li
                                        className="reminder-list__reminder"
                                        key={`${reminder.player}|${reminder.remindDate}`}
                                    >
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
                    </li>
                ))}
            </ul>
        </div>
    );
};

ReminderList.propTypes = {
    reminders: PropTypes.arrayOf(PropTypes.shape({
        remindDate: PropTypes.number,
    })).isRequired,
    onRemove: PropTypes.func,
    showLabel: PropTypes.bool,
};

ReminderList.defaultProps = {
    onRemove: () => {},
    showLabel: true,
};

export default ReminderList;
