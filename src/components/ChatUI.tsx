
import React, { useState, useRef, useEffect } from 'react';
import ChatLogo from './ChatLogo';
import MessageInput from './MessageInput';
import SuggestedPrompt from './SuggestedPrompt';
import MessageBubble from './MessageBubble';
import Header from './Header';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  isCode?: boolean;
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

const poem = `In the quiet of the night,
Stars whisper tales of light.
Dreams weave through the dark,
Guiding us with a spark.`;

const ChatUI: React.FC<ChatUIProps> = ({ className }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

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
      let responseMessage: Message;
      
      if (text.toLowerCase().includes('poem')) {
        responseMessage = {
          id: (Date.now() + 1).toString(),
          text: poem,
          isUser: false
        };
      } else if (text.toLowerCase().includes('code') || text.toLowerCase().includes('algorithm')) {
        responseMessage = {
          id: (Date.now() + 1).toString(),
          text: `function dijkstra(graph, start) {\n  const distances = {};\n  const visited = {};\n  const previous = {};\n  const queue = [];\n\n  // Initialize\n  for (let vertex in graph) {\n    distances[vertex] = Infinity;\n    previous[vertex] = null;\n    queue.push(vertex);\n  }\n  distances[start] = 0;\n\n  while (queue.length) {\n    // Find minimum distance vertex\n    queue.sort((a, b) => distances[a] - distances[b]);\n    const current = queue.shift();\n    visited[current] = true;\n\n    // Update neighbors\n    for (let neighbor in graph[current]) {\n      if (visited[neighbor]) continue;\n      const distance = distances[current] + graph[current][neighbor];\n      if (distance < distances[neighbor]) {\n        distances[neighbor] = distance;\n        previous[neighbor] = current;\n      }\n    }\n  }\n\n  return { distances, previous };\n}`,
          isUser: false,
          isCode: true
        };
      } else {
        responseMessage = {
          id: (Date.now() + 1).toString(),
          text: `This is a simulated response to: "${text}"`,
          isUser: false
        };
      }
      
      setMessages((prev) => [...prev, responseMessage]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className={cn('flex flex-col h-screen bg-black', className)}>
      <Header />
      
      <div className="flex-1 overflow-auto p-4 pb-20 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center space-y-6 px-4">
            <ChatLogo />
            
            <div className="max-w-xl text-center space-y-4">
              <p className="text-white text-sm">This is an <span className="text-white font-semibold underline">open source</span> chatbot template built with Next.js and the AI SDK by Vercel. It uses the <code className="bg-gray-800 px-1 py-0.5 rounded text-sm">streamText</code> function in the server and the <code className="bg-gray-800 px-1 py-0.5 rounded text-sm">useChat</code> hook on the client to create a seamless chat experience.</p>
              <p className="text-white text-sm">You can learn more about the AI SDK by visiting the <a href="#" className="underline">docs</a>.</p>
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
          <div className="space-y-4 max-w-3xl mx-auto">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                content={message.text}
                isUser={message.isUser}
                isCode={message.isCode}
              />
            ))}
            
            {loading && (
              <MessageBubble 
                content=""
                isUser={false}
                isThinking={true}
              />
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black">
        <div className="max-w-3xl mx-auto">
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
