import React from 'react';

interface ProgressBarProps {
  progress: number;
  showPercentage?: boolean;
  color?: 'primary' | 'success' | 'warning' | 'danger';
}

export default function ProgressBar({
  progress,
  showPercentage = true,
  color = 'primary'
}: ProgressBarProps) {
  const colors = {
    primary: 'bg-primary-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    danger: 'bg-red-600',
  };

  return (
    <div className="w-full">
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full ${colors[color]} transition-all duration-500 rounded-full`}
          style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
        />
      </div>
      {showPercentage && (
        <p className="text-sm text-gray-600 mt-1 text-right">{Math.round(progress)}%</p>
      )}
    </div>
  );
}
