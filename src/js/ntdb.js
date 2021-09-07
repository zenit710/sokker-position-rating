import {
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

const PARAM_SELECTOR_MAP = {
    [NTDB_PARAM_COUNTRY]: "select[name='countryid']",
    [NTDB_PARAM_DISCIPLINE]: "select[name='tac']",
    [NTDB_PARAM_FORM]: "select[name='frm']",
    [NTDB_PARAM_HEIGHT]: "select[name='hei']",
    [NTDB_PARAM_VALUE]: "input[name='val']",
    [NTDB_PARAM_WAGE]: "input[name='wag']",
    [NTDB_PARAM_DEFENDER]: "select[name='def']",
    [NTDB_PARAM_KEEPER]: "select[name='kee']",
    [NTDB_PARAM_PACE]: "select[name='pac']",
    [NTDB_PARAM_PASSING]: "select[name='pas']",
    [NTDB_PARAM_PLAYMAKER]: "select[name='pla']",
    [NTDB_PARAM_STAMINA]: "select[name='sta']",
    [NTDB_PARAM_STRIKER]: "select[name='str']",
    [NTDB_PARAM_TECHNIQUE]: "select[name='tec']",
    [NTDB_PARAM_PLAYER_ID]: "input[name='pid']",
    [NTDB_PARAM_PLAYER_NAME]: "input[name='name']",
    [NTDB_PARAM_AGE]: "select[name='age']",
};

const fillForm = () => {
    const queryParams = new URLSearchParams(window.location.search);

    for (const [param, selector] of Object.entries(PARAM_SELECTOR_MAP)) {
        if (queryParams.has(param)) {
            document.querySelector(selector).value = queryParams.get(param);
        }
    }
};

fillForm();
