import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@/component/Button";
import "./inviteAll.scss";

const InviteAll = ({ invitationUrls }) => {
    const [urls, setUrls] = useState(invitationUrls);
    const allInvited = urls.length === 0;

    const handleInviteAllClick = () => {
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
        });
    };

    if (!invitationUrls.length) {
        return null;
    }

    return (
        <div className="invite-all">
            <Button onClick={handleInviteAllClick} disabled={allInvited}>
                {allInvited ? "All invited!" : `Invite all (${ urls.length })`}
            </Button>
        </div>
    );
};

InviteAll.propTypes = {
    invitationUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default InviteAll;
