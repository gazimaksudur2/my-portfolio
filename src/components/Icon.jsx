import React from 'react';
import * as FIcons from "react-icons/fi";

const Icon = ({ name, ...props }) => {
    const IconComponent = FIcons[name];
    if (!IconComponent) {
        return null;
    }
    return <IconComponent {...props} />;
};

export default Icon;
