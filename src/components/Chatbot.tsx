import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "🏋️ Hello! Ready to crush your fitness goals? I'm here to help you find the perfect equipment. What are you looking for today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Ensure scroll position is maintained when chat window is resized or reopened
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen]);

  const generateGeminiResponse = async (userMessage: string, conversationHistory: Message[]): Promise<string> => {
    try {
      // Get last 10 messages for context (excluding the current user message)
      const recentMessages = conversationHistory.slice(-10).map(msg => ({
        role: msg.isUser ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      // Set a timeout to handle API delays
      const timeoutPromise = new Promise<Response>((_, reject) => {
        setTimeout(() => reject(new Error('Request timed out')), 10000); // 10 second timeout
      });

      const systemInstructionText = `${user && user.name ? `Greet the user by their name ('${user.name}') in your first message. ` : ''}You are a fitness equipment assistant for FitFlex, an affiliate fitness store. 
              
              IMPORTANT: Remember and reference our previous conversation. You have access to the last 10 messages exchanged.
              
              Your role:
              - Help users find fitness equipment (yoga mats, dumbbells, resistance bands, treadmills, protein powder, workout apparel)
              - Provide product recommendations and information
              - Give motivational fitness quotes and encouragement
              - Be enthusiastic about fitness and health
              
              Product Information:
              - Yoga: Premium yoga mats, blocks, and straps perfect for practice
              - Dumbbells: Adjustable dumbbells ranging from 5-50lbs for home workouts
              - Resistance: Great for strength training and rehabilitation
              - Treadmill: Folding designs with advanced tracking features
              - Protein: High-quality protein powders for workout fuel and recovery
              - Apparel: Comfortable and stylish workout clothes
              
              Guidelines:
              - Keep responses concise but helpful
              - Use fitness emojis (💪, 🏋️, 🔥, ⚡, 🎯, 🌟)
              - Give motivational quotes when greeting or saying goodbye
              - Reference previous parts of our conversation when relevant
              - Prices range from $24.99 to $899.99 with free shipping options`;

      const fetchPromise = fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCHuKm1Z7-5Zj2u5JRFwe7wpIsBLMgazqA`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            ...recentMessages,
            {
              role: 'user',
              parts: [{ text: userMessage }]
            }
          ],
          systemInstruction: {
            parts: [{
              text: systemInstructionText
            }]
          },
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 800, // Reduced to prevent extremely long responses
          },
        }),
      });

      // Race between the fetch and the timeout
      const response = await Promise.race([fetchPromise, timeoutPromise]) as Response;

      if (!response.ok) {
        throw new Error(`Failed to get response from Gemini: ${response.status}`);
      }

      const data = await response.json();
      
      // Check if we have a valid response
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts) {
        console.error('Invalid response structure from Gemini API:', data);
        throw new Error('Invalid response structure');
      }
      
      const responseText = data.candidates[0].content.parts[0].text;
      
      // Ensure we have a valid text response
      if (!responseText || typeof responseText !== 'string') {
        throw new Error('No valid text in response');
      }
      
      return responseText;
    } catch (error) {
      console.error('Gemini API Error:', error);
      return "I'm having some technical difficulties, but I'm still here to help! What fitness equipment are you interested in? 🏋️";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userInput = inputValue.trim();
    const currentMessagesLength = messages.length;

    const userMessage: Message = {
      id: currentMessagesLength + 1,
      text: userInput,
      isUser: true,
      timestamp: new Date()
    };

    // Update messages with user message
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Pass the current messages including the new user message
      const currentMessages = [...messages, userMessage];
      const botResponseText = await generateGeminiResponse(userInput, currentMessages);
      
      // Create bot response with correct ID based on updated messages length
      const botResponse: Message = {
        id: currentMessagesLength + 2,
        text: botResponseText,
        isUser: false,
        timestamp: new Date()
      };

      // Update messages with bot response
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorResponse: Message = {
        id: currentMessagesLength + 2,
        text: "I'm experiencing some technical issues. Let me help you find fitness equipment the traditional way! What are you looking for? 💪",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
      // Force scroll to bottom after state updates
      setTimeout(scrollToBottom, 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-20 right-6 z-50 w-80 h-96 flex flex-col shadow-xl overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">FitFlex Assistant 🏋️</CardTitle>
            <p className="text-sm text-muted-foreground">Powered by Gemini AI</p>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 h-full">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} w-full`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm break-words ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground p-3 rounded-lg text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t flex space-x-2 mt-auto">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about fitness products..."
                className="flex-1"
                disabled={isLoading}
                maxLength={500} /* Limit input length to prevent extremely long messages */
              />
              <Button 
                size="icon" 
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Chatbot;
