import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Bot } from 'lucide-react';
interface Expense {
  _id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  paymentMethod: string;//This is the chatbot work on sample manual data and users stored data..
  tags: string[];
}
interface Stats {
  totalExpenses: number;
  monthlyExpenses: number;
  categoryBreakdown: Array<{
    _id: string;
    total: number;
    count: number;
  }>;
  monthlyTrend: Array<{
    _id: { year: number; month: number };
    total: number;
    count: number;
  }>;
}
interface ChatbotProps {
  expenses: Expense[];
  stats: Stats | null;
}
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}
export default function Chatbot({ expenses, stats }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your expense assistant. I can help you analyze your spending patterns and answer questions about your expenses. Try asking me something like 'What's my biggest expense category?' or 'How much did I spend this month?'",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase(); 
    if (!stats) {
      return "I'm still loading your expense data. Please try again in a moment.";
    }

    // Total expenses
    if (message.includes('total') && (message.includes('expense') || message.includes('spent'))) {
      return `Your total expenses are $${stats.totalExpenses.toLocaleString()}. That's across all your recorded expenses.`;
    }

    // Monthly expenses
    if (message.includes('month') && (message.includes('expense') || message.includes('spent'))) {
      return `This month you've spent $${stats.monthlyExpenses.toLocaleString()}. ${stats.monthlyExpenses > 0 ? "Keep tracking to stay on budget!" : "No expenses recorded for this month yet."}`;
    }

    // Top category
    if (message.includes('biggest') || message.includes('most') || message.includes('top')) {
      const topCategory = stats.categoryBreakdown[0];
      if (topCategory) {
        return `Your biggest expense category is "${topCategory._id}" with $${topCategory.total.toLocaleString()} spent across ${topCategory.count} transactions.`;
      }
      return "You haven't recorded any expenses yet. Start by adding your first expense!";
    }

    // Category breakdown
    if (message.includes('category') || message.includes('categories')) {
      if (stats.categoryBreakdown.length === 0) {
        return "You haven't recorded any expenses yet. Start by adding your first expense to see category breakdowns!";
      }
      
      const topThree = stats.categoryBreakdown.slice(0, 3);
      const breakdown = topThree.map((cat, index) => 
        `${index + 1}. ${cat._id}: $${cat.total.toLocaleString()}`
      ).join('\n');
      
      return `Here are your top expense categories:\n\n${breakdown}`;
    }

    // Recent expenses
    if (message.includes('recent') || message.includes('latest')) {
      if (expenses.length === 0) {
        return "You haven't recorded any expenses yet. Add your first expense to get started!";
      }
      
      const recent = expenses.slice(0, 3);
      const list = recent.map((exp, index) => 
        `${index + 1}. $${exp.amount} - ${exp.description} (${exp.category})`
      ).join('\n');
      
      return `Here are your most recent expenses:\n\n${list}`;
    }

    // Monthly trends
    if (message.includes('trend') || message.includes('pattern')) {
      if (stats.monthlyTrend.length < 2) {
        return "I need more data to show trends. Keep recording expenses for a few months to see patterns!";
      }
      
      const current = stats.monthlyTrend[stats.monthlyTrend.length - 1];
      const previous = stats.monthlyTrend[stats.monthlyTrend.length - 2];
      const change = ((current.total - previous.total) / previous.total) * 100;
      
      return `Your spending trend: ${change >= 0 ? 'increased' : 'decreased'} by ${Math.abs(change).toFixed(1)}% compared to last month. ${change >= 0 ? 'Consider reviewing your budget.' : 'Great job keeping expenses down!'}`;
    }

    // Budget advice
    if (message.includes('budget') || message.includes('save') || message.includes('advice')) {
      const topCategory = stats.categoryBreakdown[0];
      if (topCategory) {
        return `Based on your spending, you spend the most on "${topCategory._id}". Consider setting a monthly limit for this category. Also, try the 50/30/20 rule: 50% needs, 30% wants, 20% savings.`;
      }
      return "Start by setting monthly limits for each expense category. Track your progress weekly to stay on budget!";
    }

    // Help
    if (message.includes('help') || message.includes('what can you do')) {
      return `I can help you with:
      
• Total expenses and monthly spending
• Top expense categories
• Recent transactions
• Spending trends and patterns
• Budget advice and tips
• Expense insights

Just ask me naturally, like "How much did I spend on food?" or "What are my recent expenses?"`;
    }

    // Default responses
    const defaultResponses = [
      "I'm here to help you understand your expenses better! Try asking about your spending patterns, categories, or recent transactions.",
      "That's an interesting question! I can help you analyze your spending. Try asking about your total expenses, top categories, or monthly trends.",
      "I'd love to help! Ask me about your expenses, like 'What's my biggest expense category?' or 'How much did I spend this month?'",
      "Let me help you with your expense analysis! You can ask about totals, categories, trends, or get budget advice."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: generateResponse(inputValue),
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInputValue('');
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
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${isOpen ? 'hidden' : 'block'}`}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5" />
                <span className="font-medium">Expense Assistant</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about your expenses..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
