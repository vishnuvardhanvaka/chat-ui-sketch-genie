
import React, { useState } from 'react';
import { PaperclipIcon, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  className?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  className,
}) => {
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn('w-full', className)}>
      <div className="relative flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send a message..."
          className="w-full bg-gray-900/70 text-white rounded-md py-3 px-4 pr-12 border border-gray-800 focus:outline-none focus:ring-0 focus:border-gray-700"
        />
        <div className="absolute right-0 flex space-x-1 mr-2">
          <button
            type="button"
            className="text-gray-400 hover:text-gray-300 p-1"
            aria-label="Attach file"
          >
            <PaperclipIcon className="h-5 w-5" />
          </button>
          <button
            type="submit"
            className="text-gray-400 hover:text-white p-1 rounded-full bg-gray-800 hover:bg-gray-700"
            aria-label="Send message"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default MessageInput;
