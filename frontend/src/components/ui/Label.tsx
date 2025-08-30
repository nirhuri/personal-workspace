import React from "react";

export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({
    className,
    ...props
}) => (
    <label {...props} className={`block mb-1 font-medium text-gray-700 ${className}`} />
);