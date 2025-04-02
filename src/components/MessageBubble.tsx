
import React from 'react';
import { Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  content: string;
  isUser: boolean;
  isThinking?: boolean;
  isCode?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  content, 
  isUser, 
  isThinking = false,
  isCode = false
}) => {
  if (isThinking) {
    return (
      <div className="flex items-start gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
          <span className="text-white text-xs">✨</span>
        </div>
        <div>
          <div className="text-gray-300">Thinking...</div>
        </div>
      </div>
    );
  }
  
  const isPoem = content.includes("In the quiet of the night") && content.includes("Guiding us with a spark");
  
  if (isUser) {
    return (
      <div className="mb-4">
        <div className="inline-block bg-white text-black py-2 px-4 rounded-full max-w-fit ml-auto">
          {content}
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-start gap-2 mb-4">
      <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
        <span className="text-white text-xs">✨</span>
      </div>
      <div className="w-full max-w-[80%]">
        {!isCode && !isPoem && <div className="text-white">{content}</div>}
        
        {isPoem && (
          <div>
            <div className="mb-2">Here's a short poem for you:</div>
            <div className="bg-gray-900 rounded-lg p-4 mb-4 font-mono text-white text-sm whitespace-pre">
              {content}
            </div>
            <div className="text-white mb-4">
              Would you like me to create a document with this poem, or do you have any other requests?
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-md bg-gray-900">
                <Copy size={16} className="text-gray-400" />
              </button>
              <button className="p-2 rounded-md bg-gray-900">
                <ThumbsUp size={16} className="text-gray-400" />
              </button>
              <button className="p-2 rounded-md bg-gray-900">
                <ThumbsDown size={16} className="text-gray-400" />
              </button>
            </div>
          </div>
        )}
        
        {isCode && (
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-white text-sm whitespace-pre">
            {content}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
