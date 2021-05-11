import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { getRemindDate, setReminderAlarm, storeReminder } from "@/service/ReminderService";
import Button from "@/component/Button";
import "./Form.scss";

const Form = ({ onReminderAdded, player, bidEndDate }) => {
    const minutuesInputRef = useRef(null);
    const [message, setMessage] = useState(null);

    const submitHandler = async (event) => {
        event.preventDefault();
        const { current } = minutuesInputRef;

        if (current) {
            const now = new Date();
            const remindDate = getRemindDate(current.value, bidEndDate);

            if (remindDate > now) {
                const reminder = await storeReminder(player, remindDate, bidEndDate);
                setReminderAlarm(remindDate);
                setMessage({
                    type: "success",
                    value: "Reminder was added!",
                });
                onReminderAdded(reminder);
            } else {
                setMessage({
                    type: "error",
                    value: "Can't set reminder in the past!",
                });
            }
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <label>How many minutes before?</label>
            <div className="form-group">
                <div className="input-group">
                    <input type="number" className="form-control" min="0" defaultValue="10" ref={minutuesInputRef} />
                    <span className="input-group-addon">min.</span>
                </div>
            </div>
            <Button>Remind me</Button>
            {message && <div className={`form__message form__message--${message.type}`}>{message.value}</div>}
        </form>
    );
};

Form.propTypes = {
    player: PropTypes.string.isRequired,
    bidEndDate: PropTypes.instanceOf(Date).isRequired,
    onReminderAdded: PropTypes.func,
};

Form.defaultProps = {
    onReminderAdded: () => {},
};

export default Form;
