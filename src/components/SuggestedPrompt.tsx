
import React from 'react';
import { cn } from '@/lib/utils';

interface SuggestedPromptProps {
  title: string;
  subtitle: string;
  onClick: (prompt: string) => void;
  className?: string;
}

const SuggestedPrompt: React.FC<SuggestedPromptProps> = ({
  title,
  subtitle,
  onClick,
  className,
}) => {
  return (
    <button
      className={cn(
        'text-left w-full p-4 rounded-lg border border-gray-800 bg-black/40 hover:bg-gray-900 transition-colors',
        className
      )}
      onClick={() => onClick(`${title} ${subtitle}`)}
    >
      <p className="text-white text-sm font-medium">{title}</p>
      <p className="text-gray-400 text-sm">{subtitle}</p>
    </button>
  );
};

export default SuggestedPrompt;
