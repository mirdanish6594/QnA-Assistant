import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { Chat } from './components/Chat';
import { FileText } from 'lucide-react';
import type { Message, FileContent } from './types';
import axios from 'axios'; // Import Axios for API calls

function App() {
  const [file, setFile] = useState<FileContent | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (uploadedFile: FileContent) => {
    setFile(uploadedFile);
    setMessages([
      {
        role: 'assistant',
        content: `I've loaded "${uploadedFile.name}". What would you like to know about it?`,
      },
    ]);
  };

  const handleSendMessage = async (content: string) => {
    if (!file) return;

    const newMessage: Message = { role: 'user', content };
    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    try {
      // Call the Gemini API
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`, // Gemini API endpoint
        {
          contents: [
            {
              parts: [
                {
                  text: `You are a helpful assistant that answers questions about the file: ${file.name}. The file content is: ${file.content}. User question: ${content}`,
                },
              ],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Extract the assistant's response
      const assistantResponse = response.data.candidates[0].content.parts[0].text;

      // Add the assistant's response to the messages
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: assistantResponse },
      ]);
    } catch (error) {
      console.error('Error processing message:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, there was an error processing your request.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 bg-blue-500 text-white">
            <div className="flex items-center gap-2">
              <FileText className="w-8 h-8" />
              <h1 className="text-2xl font-bold">File Q&A Assistant</h1>
            </div>
            <p className="mt-2 text-blue-100">
              Upload a file and ask questions about its contents
            </p>
          </div>

          <div className="p-6">
            {!file ? (
              <FileUpload onFileUpload={handleFileUpload} />
            ) : (
              <div className="h-[600px] flex flex-col">
                <div className="mb-4 p-3 bg-gray-50 rounded-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <span className="font-medium text-gray-700">
                    {file.name}
                  </span>
                  <button
                    onClick={() => {
                      setFile(null);
                      setMessages([]);
                    }}
                    className="ml-auto text-sm text-gray-500 hover:text-gray-700"
                  >
                    Change File
                  </button>
                </div>
                <Chat
                  messages={messages}
                  onSendMessage={handleSendMessage}
                  isLoading={isLoading}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;