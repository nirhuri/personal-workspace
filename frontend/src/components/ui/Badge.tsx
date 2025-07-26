import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'primary',
    size = 'sm',
    className = ''
}) => {
    const baseClasses = 'rounded-full font-medium';

    const variantClasses = {
        primary: 'text-blue-600 bg-blue-50',
        secondary: 'text-gray-600 bg-gray-50',
        success: 'text-green-600 bg-green-50',
        danger: 'text-red-600 bg-red-50',
        warning: 'text-yellow-600 bg-yellow-50',
        info: 'text-purple-600 bg-purple-50'
    };

    const sizeClasses = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-2 text-base'
    };

    return (
        <span className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
            {children}
        </span>
    );
};

export default Badge; 