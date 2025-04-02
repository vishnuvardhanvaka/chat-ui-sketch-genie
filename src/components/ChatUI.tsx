
import React, { useState } from 'react';
import ChatLogo from './ChatLogo';
import MessageInput from './MessageInput';
import SuggestedPrompt from './SuggestedPrompt';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

const examplePrompts = [
  {
    title: "What are the advantages",
    subtitle: "of using Next.js?"
  },
  {
    title: "Write code to",
    subtitle: "demonstrate dijkstra's algorithm"
  },
  {
    title: "Help me write an essay",
    subtitle: "about silicon valley"
  },
  {
    title: "What is the weather",
    subtitle: "in San Francisco?"
  }
];

interface ChatUIProps {
  className?: string;
}

const ChatUI: React.FC<ChatUIProps> = ({ className }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    const newMessage: Message = {
      id: Date.now().toString(),
      text: text,
      isUser: true
    };
    
    setMessages((prev) => [...prev, newMessage]);
    setLoading(true);
    
    // Simulate response (would be replaced with actual API call)
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `This is a simulated response to: "${text}"`,
        isUser: false
      };
      
      setMessages((prev) => [...prev, responseMessage]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className={cn('flex flex-col h-screen bg-black', className)}>
      <div className="flex-1 overflow-auto p-4 pb-20 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center space-y-6">
            <ChatLogo />
            <div className="max-w-xl text-center space-y-4">
              <p className="text-white">This is an <span className="text-white font-semibold">open source</span> chatbot template built with Next.js and the AI SDK by Vercel. It uses the <code className="bg-gray-800 px-1 py-0.5 rounded text-sm">streamText</code> function in the server and the <code className="bg-gray-800 px-1 py-0.5 rounded text-sm">useChat</code> hook on the client to create a seamless chat experience.</p>
              <p className="text-white">You can learn more about the AI SDK by visiting the <a href="#" className="underline">docs</a>.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-2xl">
              {examplePrompts.map((prompt, index) => (
                <SuggestedPrompt
                  key={index}
                  title={prompt.title}
                  subtitle={prompt.subtitle}
                  onClick={handleSendMessage}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "p-4 rounded-lg max-w-[80%]",
                  message.isUser
                    ? "bg-gray-800 ml-auto"
                    : "bg-gray-900 mr-auto"
                )}
              >
                <p className="text-white">{message.text}</p>
              </div>
            ))}
            {loading && (
              <div className="bg-gray-900 p-4 rounded-lg max-w-[80%] mr-auto">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black">
        <div className="max-w-2xl mx-auto">
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
