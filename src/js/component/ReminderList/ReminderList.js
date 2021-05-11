import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import { removeReminder, groupByPlayer } from "../../service/ReminderService";
import "./ReminderList.scss";

const ReminderList = ({ reminders, onRemove, showLabel, showPlayerNames }) => {
    if (!reminders.length) {
        return null;
    }

    const groupedReminders = groupByPlayer(reminders);

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
                        {showPlayerNames && (
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
                                        <Button
                                            title="Remove reminder"
                                            onClick={() => handleRemoveClick(reminder)}
                                        >X</Button>
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
    showPlayerNames: PropTypes.bool,
};

ReminderList.defaultProps = {
    onRemove: () => {},
    showLabel: true,
    showPlayerNames: false,
};

export default ReminderList;
