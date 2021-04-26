const getReminderAlarmName = ({ url, remindDate }) => `alarm|${encodeURI(url)}|${remindDate}`;

export {
    getReminderAlarmName,
};
