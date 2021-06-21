import PropTypes from "prop-types";
import { SKILLS } from "@/consts";

const getImportancesShape = () => {
    const shape = {};

    Object.values(SKILLS).forEach(skill => {
        shape[skill] = PropTypes.string;
    });

    return shape;
};

const getDefaultImportances = () => {
    const importances = {};

    Object.values(SKILLS).forEach(skill => {
        importances[skill] = "0";
    });

    return importances;
};

const SkillImportancePropTypes = {
    position: PropTypes.string.isRequired,
    importances: PropTypes.shape(getImportancesShape()),
    onChange: PropTypes.func,
};

const SkillImportanceDefaultProps = {
    importances: getDefaultImportances(),
    onChange: () => {},
};

export {
    SkillImportancePropTypes,
    SkillImportanceDefaultProps,
};
