import React from "react";
import PropTypes from "prop-types";
import Button from "@/component/Button";
import Message, { TYPE_INFO } from "@/component/Message";
import { removeReminder, groupByPlayer } from "@/service/ReminderService";
import "./ReminderList.scss";

const ReminderList = ({ reminders, onRemove, onClear, showLabel, showPlayerNames }) => {
    if (!reminders.length) {
        return (
            <div className="reminder-list reminder-list--empty">
                <Message type={TYPE_INFO}>No reminders added yet!</Message>
            </div>
        );
    }

    const groupedReminders = groupByPlayer(reminders);

    const handleRemoveClick = (reminder) => {
        removeReminder(reminder);
        onRemove(reminder);
    };

    const handleClearButtonClick = () => onClear();

    return (
        <div className="reminder-list">
            <div className="reminder-list__header">
                {showLabel && <label className="reminder-list__label">Active reminders:</label>}
                <div className="reminder-list__clear">
                    <Button onClick={handleClearButtonClick}>Clear all</Button>
                </div>
            </div>
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
    onClear: PropTypes.func,
    showLabel: PropTypes.bool,
    showPlayerNames: PropTypes.bool,
};

ReminderList.defaultProps = {
    onRemove: () => {},
    onClear: () => {},
    showLabel: true,
    showPlayerNames: false,
};

export default ReminderList;
