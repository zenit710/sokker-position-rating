import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@/component/Button";
import "./inviteAll.scss";

const STATUS = {
    initial: "initial",
    process: "process",
    failure: "failure",
    completed: "completed",
};

const BUTTON_DISABLED_STATUS = [STATUS.process, STATUS.completed];

const STATUS_MESSAGE = {
    [STATUS.initial]: "Invite all",
    [STATUS.process]: "Inviting...",
    [STATUS.failure]: "Invite failed",
    [STATUS.completed]: "All invited!",
};

const InviteAll = ({ invitationUrls }) => {
    const [urls, setUrls] = useState(invitationUrls);
    const [status, setStatus] = useState(STATUS.initial);

    const handleInviteAllClick = () => {
        setStatus(STATUS.process);

        Promise.all([
            ...urls.map(url => fetch(url)
                .catch(() => ({ status: "error" }))
                .then(response => ({
                    status: response.status,
                    url,
                })),
            ),
        ]).then(responses => {
            const newUrls = [...urls];

            responses.forEach(response => {
                if (response.status === 200 && response.url) {
                    const urlIndex = newUrls.findIndex(url => url === response.url);

                    if (urlIndex > -1) {
                        newUrls.splice(urlIndex, 1);
                    }
                }
            });

            if (newUrls.length < urls.length) {
                setUrls(newUrls);
            }

            setStatus(newUrls.length === 0 ? STATUS.completed : STATUS.failure);
        });
    };

    if (!invitationUrls.length) {
        return null;
    }

    return (
        <div className="invite-all">
            <Button onClick={handleInviteAllClick} disabled={BUTTON_DISABLED_STATUS.includes(status)}>
                {STATUS_MESSAGE[status]}
            </Button>
        </div>
    );
};

InviteAll.propTypes = {
    invitationUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default InviteAll;
