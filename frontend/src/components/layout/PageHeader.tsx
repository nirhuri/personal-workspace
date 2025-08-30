import React from 'react';
import { Button } from '../ui/Button';
import Icon from '../ui/Icon';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    actionLabel?: string;
    actionVariant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
    onAction?: () => void;
    icon?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    subtitle,
    actionLabel,
    actionVariant = 'primary',
    onAction,
    icon
}) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{title}</h1>
                {subtitle && <p className="text-gray-600">{subtitle}</p>}
            </div>
            {actionLabel && onAction && (
                <Button
                    variant={actionVariant}
                    onClick={onAction}
                    icon={icon || <Icon name="plus" />}
                >
                    {actionLabel}
                </Button>
            )}
        </div>
    );
};

export default PageHeader; 