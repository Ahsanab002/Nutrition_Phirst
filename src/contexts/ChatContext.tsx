import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'quick-reply' | 'system';
  metadata?: {
    orderId?: string;
    productId?: string;
    category?: string;
  };
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  isActive: boolean;
  createdAt: Date;
  lastActivity: Date;
}

interface ChatContextType {
  // Widget state
  isOpen: boolean;
  isMinimized: boolean;
  isTyping: boolean;
  
  // Messages
  messages: ChatMessage[];
  currentSession: ChatSession | null;
  
  // Actions
  openChat: () => void;
  closeChat: () => void;
  toggleMinimized: () => void;
  sendMessage: (text: string, metadata?: ChatMessage['metadata']) => void;
  sendQuickReply: (text: string, action: string) => void;
  clearChat: () => void;
  
  // Session management
  startNewSession: () => void;
  endCurrentSession: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const CHAT_STORAGE_KEY = 'nutrition-phirst-chat';
const SESSION_STORAGE_KEY = 'nutrition-phirst-chat-session';

// Enhanced bot responses with more variety
const BOT_RESPONSES: Record<string, string[]> = {
  products: [
    "Our premium wellness supplements are designed to support your cognitive function, gut health, and overall wellness. We have three main products: Memory & Focus Booster, Beauty Glow Bundle, and Daily Essentials Stack. Would you like to know more about any specific product?",
    "I'd love to tell you about our wellness products! We offer targeted supplements for focus, beauty, and daily wellness. Our Memory & Focus Booster is perfect for cognitive support, while our Beauty Glow Bundle helps with skin and hair health. Which interests you most?",
    "Great question about our products! We specialize in scientifically-backed wellness supplements. Our Daily Essentials Stack is our most popular bundle, combining energy, sleep, and calm support. Would you like details on any specific product?"
  ],
  order: [
    "I can help you track your order! Please provide your order number, or you can check your order status in your account dashboard. You can also contact our support team at support@nutritionphirst.com for immediate assistance.",
    "For order tracking, you can log into your account or provide me with your order number. Our support team is also available at support@nutritionphirst.com if you need immediate help!",
    "I'm here to help with your order! You can track it through your account dashboard or share your order number with me. For urgent matters, our support team responds quickly at support@nutritionphirst.com."
  ],
  shipping: [
    "We offer free shipping on orders over $75! Standard shipping takes 3-5 business days, and express shipping takes 1-2 business days. All orders are processed within 24 hours of placement.",
    "Great news - free shipping on orders over $75! Standard delivery is 3-5 business days, with express options available for 1-2 day delivery. We process all orders within 24 hours.",
    "Shipping is free on orders over $75! We offer standard (3-5 days) and express (1-2 days) options. All orders are processed and shipped within 24 hours of placement."
  ],
  returns: [
    "We offer a 30-day money-back guarantee on all our products. If you're not completely satisfied, you can return your items for a full refund. Please contact us at returns@nutritionphirst.com to initiate a return.",
    "We stand behind our products with a 30-day money-back guarantee! If you're not satisfied, contact us at returns@nutritionphirst.com and we'll process your return quickly.",
    "Your satisfaction is our priority! We offer a 30-day money-back guarantee. Simply contact returns@nutritionphirst.com to start your return process."
  ],
  human: [
    "I'd be happy to connect you with one of our wellness specialists! You can reach us at support@nutritionphirst.com or call us at 1-800-NUTRITION. Our team is available Monday-Friday, 9 AM - 6 PM EST.",
    "Our wellness specialists are here to help! Contact us at support@nutritionphirst.com or call 1-800-NUTRITION. We're available Monday-Friday, 9 AM - 6 PM EST.",
    "I can connect you with our expert team! Reach out at support@nutritionphirst.com or call 1-800-NUTRITION. Our specialists are available Monday-Friday, 9 AM - 6 PM EST."
  ],
  wellness: [
    "Our wellness philosophy focuses on holistic health through scientifically-backed supplements. We believe in supporting your body's natural processes for optimal cognitive function, gut health, and overall vitality.",
    "We're passionate about holistic wellness! Our approach combines cutting-edge science with natural ingredients to support your body's innate healing processes. Every product is designed to work with your body, not against it.",
    "Wellness is at our core! We create supplements that support your body's natural systems - from cognitive function to gut health. Our philosophy is simple: science-backed ingredients for real results."
  ],
  ingredients: [
    "All our supplements are made with premium, clinically-tested ingredients. We use natural compounds like probiotics, adaptogens, and nootropics that are backed by scientific research for their efficacy and safety.",
    "Quality ingredients are our foundation! We use only clinically-tested, natural compounds including probiotics, adaptogens, and nootropics. Every ingredient is chosen for its proven safety and effectiveness.",
    "We're committed to premium ingredients! Our supplements feature clinically-tested natural compounds like probiotics, adaptogens, and nootropics - all backed by scientific research for safety and efficacy."
  ],
  dosage: [
    "Each product comes with detailed dosage instructions. Generally, we recommend taking supplements with meals for better absorption. Please consult with your healthcare provider before starting any new supplement regimen.",
    "Dosage instructions are included with every product! We generally recommend taking supplements with meals for optimal absorption. Always consult your healthcare provider before starting new supplements.",
    "Clear dosage instructions come with each product! For best results, take supplements with meals. We always recommend consulting your healthcare provider before beginning any new supplement routine."
  ],
  price: [
    "Our products range from $49.99 to $89.99, with bundle options available for better value. We also offer free shipping on orders over $75!",
    "Pricing varies by product - our individual supplements start at $49.99, with bundles offering great value. Plus, free shipping on orders over $75!",
    "Great question! Our supplements range from $49.99 to $89.99. We have bundle deals for better value and free shipping on orders over $75."
  ],
  discount: [
    "We offer discounts on bundles and seasonal promotions! Sign up for our newsletter to get exclusive deals and early access to sales.",
    "Yes! We have bundle discounts and seasonal promotions. Join our newsletter for exclusive offers and early access to sales.",
    "Absolutely! Bundle deals and seasonal promotions are available. Subscribe to our newsletter for exclusive discounts and sale notifications."
  ],
  default: [
    "Thank you for your message! I'm here to help with any questions about our wellness supplements, orders, or general inquiries. How else can I assist you today?",
    "I'm here to help! Feel free to ask me about our products, orders, shipping, or anything else related to your wellness journey. What would you like to know?",
    "Thanks for reaching out! I can help with product information, order tracking, shipping details, or any other questions you might have. What can I assist you with?",
    "Hello! I'm your wellness support assistant. I can help with product questions, order information, shipping details, and more. What would you like to know?",
    "Hi there! I'm here to help with anything related to our wellness supplements and your experience with us. What questions do you have?"
  ]
};

// Quick reply options
export const QUICK_REPLIES = [
  { id: '1', text: 'Product Information', action: 'products' },
  { id: '2', text: 'Order Status', action: 'order' },
  { id: '3', text: 'Shipping Info', action: 'shipping' },
  { id: '4', text: 'Returns & Exchanges', action: 'returns' },
  { id: '5', text: 'Wellness Advice', action: 'wellness' },
  { id: '6', text: 'Ingredients & Safety', action: 'ingredients' },
  { id: '7', text: 'Dosage Instructions', action: 'dosage' },
  { id: '8', text: 'Speak to Human', action: 'human' },
];

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);

  // Load chat history from localStorage
  React.useEffect(() => {
    try {
      const savedMessages = localStorage.getItem(CHAT_STORAGE_KEY);
      const savedSession = localStorage.getItem(SESSION_STORAGE_KEY);
      
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(parsedMessages);
      }
      
      if (savedSession) {
        const parsedSession = JSON.parse(savedSession);
        setCurrentSession({
          ...parsedSession,
          createdAt: new Date(parsedSession.createdAt),
          lastActivity: new Date(parsedSession.lastActivity)
        });
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  }, []);

  // Save messages to localStorage
  React.useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Save session to localStorage
  React.useEffect(() => {
    if (currentSession) {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(currentSession));
    }
  }, [currentSession]);

  const openChat = useCallback(() => {
    setIsOpen(true);
    setIsMinimized(false);
    
    // Start new session if none exists
    if (!currentSession) {
      startNewSession();
    }
  }, [currentSession]);

  const closeChat = useCallback(() => {
    setIsOpen(false);
    setIsMinimized(false);
  }, []);

  const toggleMinimized = useCallback(() => {
    setIsMinimized(prev => !prev);
  }, []);

  const startNewSession = useCallback(() => {
    const sessionId = `session_${Date.now()}`;
    const now = new Date();
    
    const newSession: ChatSession = {
      id: sessionId,
      messages: [],
      isActive: true,
      createdAt: now,
      lastActivity: now
    };
    
    setCurrentSession(newSession);
    
    // Add welcome message
    const welcomeMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      text: "Hi! I'm here to help you with any questions about our wellness supplements. How can I assist you today?",
      sender: 'bot',
      timestamp: now,
      type: 'system'
    };
    
    setMessages([welcomeMessage]);
  }, []);

  const endCurrentSession = useCallback(() => {
    if (currentSession) {
      setCurrentSession(prev => prev ? { ...prev, isActive: false } : null);
    }
  }, [currentSession]);

  // Function to determine user intent from message
  const getMessageIntent = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    // Product-related keywords
    if (lowerMessage.includes('product') || lowerMessage.includes('supplement') || 
        lowerMessage.includes('what do you sell') || lowerMessage.includes('what products')) {
      return 'products';
    }
    
    // Order-related keywords
    if (lowerMessage.includes('order') || lowerMessage.includes('track') || 
        lowerMessage.includes('where is my') || lowerMessage.includes('shipped')) {
      return 'order';
    }
    
    // Shipping-related keywords
    if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery') || 
        lowerMessage.includes('how long') || lowerMessage.includes('when will')) {
      return 'shipping';
    }
    
    // Returns-related keywords
    if (lowerMessage.includes('return') || lowerMessage.includes('refund') || 
        lowerMessage.includes('exchange') || lowerMessage.includes('guarantee')) {
      return 'returns';
    }
    
    // Human support keywords
    if (lowerMessage.includes('human') || lowerMessage.includes('speak to') || 
        lowerMessage.includes('agent') || lowerMessage.includes('representative')) {
      return 'human';
    }
    
    // Wellness-related keywords
    if (lowerMessage.includes('wellness') || lowerMessage.includes('health') || 
        lowerMessage.includes('benefits') || lowerMessage.includes('how does')) {
      return 'wellness';
    }
    
    // Ingredients-related keywords
    if (lowerMessage.includes('ingredient') || lowerMessage.includes('what\'s in') || 
        lowerMessage.includes('made with') || lowerMessage.includes('contains')) {
      return 'ingredients';
    }
    
    // Dosage-related keywords
    if (lowerMessage.includes('dosage') || lowerMessage.includes('how much') || 
        lowerMessage.includes('how to take') || lowerMessage.includes('when to take')) {
      return 'dosage';
    }
    
    // Price-related keywords
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || 
        lowerMessage.includes('how much') || lowerMessage.includes('expensive')) {
      return 'price';
    }
    
    // Discount-related keywords
    if (lowerMessage.includes('discount') || lowerMessage.includes('sale') || 
        lowerMessage.includes('promo') || lowerMessage.includes('coupon')) {
      return 'discount';
    }
    
    return 'default';
  };

  // Function to get random response from array
  const getRandomResponse = (responses: string[]): string => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const sendMessage = useCallback((text: string, metadata?: ChatMessage['metadata']) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
      metadata
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Update session activity
    if (currentSession) {
      setCurrentSession(prev => prev ? {
        ...prev,
        lastActivity: new Date(),
        messages: [...prev.messages, userMessage]
      } : null);
    }

    // Determine intent and get appropriate response
    const intent = getMessageIntent(text);
    const responseArray = BOT_RESPONSES[intent] || BOT_RESPONSES.default;
    const responseText = getRandomResponse(responseArray);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
        metadata: { category: intent }
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // Update session with bot message
      if (currentSession) {
        setCurrentSession(prev => prev ? {
          ...prev,
          lastActivity: new Date(),
          messages: [...prev.messages, userMessage, botMessage]
        } : null);
      }
    }, 1000 + Math.random() * 1000);
  }, [currentSession]);

  const sendQuickReply = useCallback((text: string, action: string) => {
    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
      type: 'quick-reply',
      metadata: { category: action }
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Update session activity
    if (currentSession) {
      setCurrentSession(prev => prev ? {
        ...prev,
        lastActivity: new Date(),
        messages: [...prev.messages, userMessage]
      } : null);
    }

    // Get random response for the specific action
    const responseArray = BOT_RESPONSES[action] || BOT_RESPONSES.default;
    const responseText = getRandomResponse(responseArray);

    // Simulate bot response with specific action
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
        metadata: { category: action }
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // Update session with bot message
      if (currentSession) {
        setCurrentSession(prev => prev ? {
          ...prev,
          lastActivity: new Date(),
          messages: [...prev.messages, userMessage, botMessage]
        } : null);
      }
    }, 1000 + Math.random() * 1000);
  }, [currentSession]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setCurrentSession(null);
    localStorage.removeItem(CHAT_STORAGE_KEY);
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }, []);

  const value: ChatContextType = {
    isOpen,
    isMinimized,
    isTyping,
    messages,
    currentSession,
    openChat,
    closeChat,
    toggleMinimized,
    sendMessage,
    sendQuickReply,
    clearChat,
    startNewSession,
    endCurrentSession,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
