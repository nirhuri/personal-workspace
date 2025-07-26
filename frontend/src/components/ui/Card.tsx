import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
    children,
    className = '',
    onClick,
    hoverable = false
}) => {
    const baseClasses = 'bg-white rounded-2xl shadow-lg border border-gray-100';
    const hoverClasses = hoverable ? 'hover:shadow-xl transition-all duration-200 cursor-pointer' : '';
    const clickClasses = onClick ? 'cursor-pointer' : '';

    return (
        <div
            className={`${baseClasses} ${hoverClasses} ${clickClasses} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Card; 