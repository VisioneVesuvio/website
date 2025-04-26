'use client';

import { useState, useRef, useEffect } from 'react';
import '@/app/styles/chat.css';

export default function ChatWidget({ onReply }) {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef(null);

    const toggleChat = () => setIsOpen(prev => !prev);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        const response = await onReply([...messages, userMessage]); // funzione esterna
        const aiMessage = { role: 'assistant', content: response };

        setMessages(prev => [...prev, aiMessage]);
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <>
            <button className="chat-fab" onClick={toggleChat}>
                💬
            </button>

            {isOpen && (
                <div className="chat-box">
                    <div className="chat-header">
                        <span>Chat Schulz</span>
                        <button onClick={toggleChat}>✖</button>
                    </div>

                    <div className="chat-body" ref={scrollRef}>
                        {messages.map((msg, i) => (
                            <div key={i} className={`chat-message ${msg.role}`}>
                                {msg.content}
                            </div>
                        ))}
                    </div>

                    <div className="chat-input">
                        <input
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Scrivi un messaggio..."
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button onClick={handleSend}>➤</button>
                    </div>
                </div>
            )}
        </>
    );
}
