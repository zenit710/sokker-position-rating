import React from "react";
import PropTypes from "prop-types";
import Button, { BUTTON_SIZE } from "@/component/Button";

const NTDB_URL = "https://ntdb.sokker.cz";

const openNTDB = ({ meta, skills }) => {
    const searchParams = new URLSearchParams();
    searchParams.append("club", meta.club);
    searchParams.append("country", meta.country);
    searchParams.append("discipline", meta.discipline);
    searchParams.append("form", meta.form);
    searchParams.append("height", meta.height);
    searchParams.append("value", meta.value);
    searchParams.append("wage", meta.wage);
    searchParams.append("defender", skills.defender);
    searchParams.append("keeper", skills.keeper);
    searchParams.append("pace", skills.pace);
    searchParams.append("passing", skills.passing);
    searchParams.append("playmaker", skills.playmaker);
    searchParams.append("stamina", skills.stamina);
    searchParams.append("striker", skills.striker);
    searchParams.append("technique", skills.technique);

    const url = `${NTDB_URL}?${searchParams.toString()}`;

    window.open(url, "_blank");
};

const NTDBButton = ({ playerCharacteristic }) => (
    <Button size={BUTTON_SIZE.small} onClick={() => openNTDB(playerCharacteristic)}>Add to NTDB</Button>
);

NTDBButton.propTypes = {
    playerCharacteristic: PropTypes.shape({
        meta: PropTypes.shape({
            club: PropTypes.string,
            country: PropTypes.string,
            discipline: PropTypes.string,
            form: PropTypes.string,
            height: PropTypes.string,
            value: PropTypes.string,
            wage: PropTypes.string,
        }),
        skills: PropTypes.shape({
            defender: PropTypes.string,
            keeper: PropTypes.string,
            pace: PropTypes.string,
            passing: PropTypes.string,
            playmaker: PropTypes.string,
            stamina: PropTypes.string,
            striker: PropTypes.string,
            technique: PropTypes.string,
        }),
    }).isRequired,
};

export default NTDBButton;
