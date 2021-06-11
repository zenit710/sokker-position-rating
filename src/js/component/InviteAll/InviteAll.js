import React from "react";
import PropTypes from "prop-types";
import Button from "@/component/Button";
import "./inviteAll.scss";

const InviteAll = ({ invitationUrls }) => {
    return (
        <div className="invite-all">
            <Button>
                Invite all ({ invitationUrls.length })
            </Button>
        </div>
    );
};

InviteAll.propTypes = {
    invitationUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default InviteAll;
