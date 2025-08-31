import { removeEmailDomain } from "@/services/email.service";
import React, { useState, useRef, useEffect } from "react";

interface InlineChipsInputProps {
    value: string[];
    onChange: (values: string[]) => void;
    placeholder?: string;
}

export const InlineChipsInput: React.FC<InlineChipsInputProps> = ({
    value,
    onChange,
    placeholder,
}) => {
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const addChip = (val: string) => {
        const trimmed = val.trim();
        if (trimmed && !value.includes(trimmed)) {
            onChange([...value, trimmed]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addChip(inputValue);
            setInputValue("");
        } else if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
            // מחיקה של הצ'יפ האחרון
            onChange(value.slice(0, value.length - 1));
        }
    };

    const handleBlur = () => {
        addChip(inputValue);
        setInputValue("");
    };

    return (
        <div
            className="flex flex-wrap gap-2 items-center border rounded-lg px-2 py-1 min-h-[40px] cursor-text"
            onClick={() => inputRef.current?.focus()}
        >
            {value.map((val, idx) => (
                <div
                    key={idx}
                    className="flex items-center bg-blue-100 text-blue-800 font-medium px-2 py-1 rounded-full text-sm"
                >
                    {removeEmailDomain(val)}
                    <button
                        type="button"
                        onClick={() => onChange(value.filter((_, i) => i !== idx))}
                        className="ml-1 font-bold text-xs focus:outline-none"
                    >
                        ×
                    </button>
                </div>
            ))}

            <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                placeholder={value.length === 0 ? placeholder : ""}
                className="flex-1 min-w-[120px] outline-none py-1"
            />
        </div>
    );
};