import React from "react";
import PropTypes from "prop-types";
import Button, { BUTTON_SIZE } from "@/component/Button";
import {
    NTDB_PARAM_CLUB,
    NTDB_PARAM_COUNTRY,
    NTDB_PARAM_DISCIPLINE,
    NTDB_PARAM_FORM,
    NTDB_PARAM_HEIGHT,
    NTDB_PARAM_VALUE,
    NTDB_PARAM_WAGE,
    NTDB_PARAM_DEFENDER,
    NTDB_PARAM_KEEPER,
    NTDB_PARAM_PACE,
    NTDB_PARAM_PASSING,
    NTDB_PARAM_PLAYMAKER,
    NTDB_PARAM_STAMINA,
    NTDB_PARAM_STRIKER,
    NTDB_PARAM_TECHNIQUE,
    NTDB_PARAM_PLAYER_ID,
    NTDB_PARAM_PLAYER_NAME,
    NTDB_PARAM_AGE,
} from "@/consts";

const NTDB_URL = "https://ntdb.sokker.cz";

const openNTDB = ({ meta, skills }) => {
    const searchParams = new URLSearchParams();
    searchParams.append(NTDB_PARAM_CLUB, meta.club);
    searchParams.append(NTDB_PARAM_COUNTRY, meta.country);
    searchParams.append(NTDB_PARAM_DISCIPLINE, meta.discipline);
    searchParams.append(NTDB_PARAM_FORM, meta.form);
    searchParams.append(NTDB_PARAM_HEIGHT, meta.height);
    searchParams.append(NTDB_PARAM_VALUE, meta.value);
    searchParams.append(NTDB_PARAM_WAGE, meta.wage);
    searchParams.append(NTDB_PARAM_PLAYER_ID, meta.pid);
    searchParams.append(NTDB_PARAM_PLAYER_NAME, meta.name);
    searchParams.append(NTDB_PARAM_AGE, meta.age);
    searchParams.append(NTDB_PARAM_DEFENDER, skills.defender);
    searchParams.append(NTDB_PARAM_KEEPER, skills.keeper);
    searchParams.append(NTDB_PARAM_PACE, skills.pace);
    searchParams.append(NTDB_PARAM_PASSING, skills.passing);
    searchParams.append(NTDB_PARAM_PLAYMAKER, skills.playmaker);
    searchParams.append(NTDB_PARAM_STAMINA, skills.stamina);
    searchParams.append(NTDB_PARAM_STRIKER, skills.striker);
    searchParams.append(NTDB_PARAM_TECHNIQUE, skills.technique);

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
