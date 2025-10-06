import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Minimize2,
  Maximize2,
  Phone,
  Mail,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useChat } from '@/contexts/ChatContext';
import { QUICK_REPLIES } from '@/contexts/ChatContext';

const ChatWidget: React.FC = () => {
  const {
    isOpen,
    isMinimized,
    isTyping,
    messages,
    openChat,
    closeChat,
    toggleMinimized,
    sendMessage,
    sendQuickReply
  } = useChat();
  
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleQuickReply = (reply: typeof QUICK_REPLIES[0]) => {
    sendQuickReply(reply.text, reply.action);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
    setInputValue('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          onClick={openChat}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 z-50 group"
          size="icon"
        >
          <MessageCircle className="h-6 w-6 text-primary-foreground group-hover:scale-110 transition-transform" />
        </Button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <Card className={cn(
          "fixed bottom-6 right-6 w-80 h-96 z-50 shadow-2xl border-0 bg-gradient-product",
          isMinimized ? "h-16" : "h-96"
        )}>
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-semibold text-foreground">
                    Wellness Support
                  </h3>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                    Online now
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={toggleMinimized}
                >
                  {isMinimized ? (
                    <Maximize2 className="h-3 w-3" />
                  ) : (
                    <Minimize2 className="h-3 w-3" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={closeChat}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {!isMinimized && (
            <CardContent className="p-0 flex flex-col h-full">
              {/* Messages Area */}
              <ScrollArea className="flex-1 px-4">
                <div className="space-y-4 py-2">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex",
                        message.sender === 'user' ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                          message.sender === 'user'
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        )}
                      >
                        <div className="flex items-start space-x-2">
                          {message.sender === 'bot' && (
                            <Bot className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          )}
                          {message.sender === 'user' && (
                            <User className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          )}
                          <div>
                            <p className="text-xs leading-relaxed">{message.text}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted text-foreground rounded-lg px-3 py-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Bot className="h-3 w-3" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Quick Replies */}
              {messages.length <= 1 && (
                <div className="px-4 py-2 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">Quick replies:</p>
                  <div className="flex flex-wrap gap-1">
                    {QUICK_REPLIES.slice(0, 3).map((reply) => (
                      <Button
                        key={reply.id}
                        variant="outline"
                        size="sm"
                        className="text-xs h-6 px-2"
                        onClick={() => handleQuickReply(reply)}
                      >
                        {reply.text}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 border-t border-border">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 text-sm"
                    disabled={isTyping}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="h-8 w-8"
                    disabled={!inputValue.trim() || isTyping}
                  >
                    <Send className="h-3 w-3" />
                  </Button>
                </form>
                
                {/* Contact Options */}
                <div className="flex items-center justify-center space-x-4 mt-2 pt-2 border-t border-border">
                  <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                    <Phone className="h-3 w-3 mr-1" />
                    Call
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                    <Mail className="h-3 w-3 mr-1" />
                    Email
                  </Button>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    Mon-Fri 9AM-6PM
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      )}
    </>
  );
};

export default ChatWidget;
