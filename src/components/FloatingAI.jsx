import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './FloatingAI.css';

const FloatingAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hi! I am your BizSync AI assistant. Ask me about inventory, sales, approvals, or recommendations.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  const { inventory, sales, purchaseRequests } = useAppContext();

  const suggestions = [
    "What is running low?",
    "Show total sales",
    "Any pending approvals?",
    "What should I reorder?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      let aiResponse = "I'm sorry, I couldn't quite understand that. Could you ask about 'low stock', 'sales', 'approvals', or specific products?";
      const q = userMsg.toLowerCase();

      // Inventory & Low Stock Intent
      if (q.includes('low') || q.includes('inventory') || q.includes('stock')) {
        const lowItems = inventory.filter(i => i.stock <= i.reorderLevel);
        if (lowItems.length > 0) {
          aiResponse = `You have ${lowItems.length} items that are at or below reorder levels: ${lowItems.map(i => i.name).join(', ')}.`;
        } else {
          aiResponse = "Your inventory is perfectly healthy right now! No items are below their reorder levels.";
        }
      } 
      // Sales & Revenue Intent
      else if (q.includes('sale') || q.includes('revenue') || q.includes('money')) {
        const total = sales.reduce((acc, s) => acc + s.amount, 0);
        aiResponse = `You have recorded ${sales.length} sales so far, totaling ₹${(total / 100000).toFixed(2)} Lakhs.`;
      } 
      // Recommendations Intent
      else if (q.includes('reorder') || q.includes('recommend')) {
        const critical = inventory.filter(i => i.status === 'Critical' || i.status === 'Reorder Recommended');
        if (critical.length > 0) {
          aiResponse = `Based on current metrics, I highly recommend creating purchase requests for: ${critical.map(i => i.name).join(' and ')}.`;
        } else {
          aiResponse = "There are no urgent reorder recommendations at this moment.";
        }
      }
      // Approvals & Purchasing Intent
      else if (q.includes('approve') || q.includes('pending') || q.includes('purchase')) {
        const pending = purchaseRequests.filter(pr => pr.status === 'Pending Approval');
        if (pending.length > 0) {
          aiResponse = `You have ${pending.length} purchase request(s) waiting for approval. Total value: ₹${pending.reduce((acc, pr) => acc + pr.total, 0).toLocaleString()}.`;
        } else {
          aiResponse = "All caught up! There are no purchase requests waiting for your approval.";
        }
      }
      // Specific Item lookup (e.g. "chair", "macbook")
      else {
        const foundItem = inventory.find(i => q.includes(i.name.toLowerCase().split(' ')[0]));
        if (foundItem) {
          aiResponse = `${foundItem.name} currently has ${foundItem.stock} units in stock. It is supplied by ${foundItem.supplier}.`;
        }
      }

      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    }, 1000 + Math.random() * 1000); // 1-2 second delay for realism
  };

  return (
    <>
      <button 
        className={`floating-ai-btn ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare size={24} />
      </button>

      <div className={`ai-chat-panel ${isOpen ? 'open' : ''}`}>
        <div className="ai-chat-header">
          <div className="ai-chat-title">
            <Sparkles size={18} color="var(--accent-color)" />
            <span>BizSync AI Assistant</span>
          </div>
          <button className="ai-close-btn" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="ai-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`ai-msg-wrapper ${msg.role}`}>
              <div className="ai-msg-bubble">{msg.text}</div>
            </div>
          ))}
          {isTyping && (
            <div className="ai-msg-wrapper ai">
              <div className="ai-msg-bubble typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="ai-suggestions">
          {suggestions.map((s, idx) => (
            <button key={idx} className="suggestion-chip" onClick={() => handleSuggestionClick(s)}>
              {s}
            </button>
          ))}
        </div>

        <form className="ai-chat-input" onSubmit={handleSend}>
          <input 
            type="text" 
            placeholder="Ask anything..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" disabled={!input.trim() || isTyping}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </>
  );
};

export default FloatingAI;
