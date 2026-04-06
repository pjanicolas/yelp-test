"use client";

import React, { ReactNode } from "react";

interface InputProps {
    value: string;
    children: ReactNode;
    className?: string;
    appName: string;
    onChange: (value: string) => () => void;
}

export const Input = ({ value, children, className, appName, onChange }: InputProps) => {
    return (
        <input
            type="text"
            value={value}
            placeholder="Type here..."
            className={className}
            onChange={onChange}
        />
    );
};
