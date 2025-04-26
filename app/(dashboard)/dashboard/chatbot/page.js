'use client';

import { useState } from 'react';
import ChatWidget from '@/app/components/ChatWidget';
import { fetchSmartReply } from '@/app/lib/fetchSmartReply';
import '@/app/styles/chat.css';

export default function ChatbotPage() {
    const [chatCache, setChatCache] = useState([
        { role: 'system', content: 'Sei un assistente virtuale di Evolve, esperto di stampa 3D e tecnologia.' }
    ]);

    const handleReply = async (currentCache) => {
        const reply = await fetchSmartReply(currentCache);
        setChatCache([...currentCache, { role: 'assistant', content: reply }]);
        return reply;
    };

    return (
        <section className="dashboard-chat-page">
            <h1>🤖 Chatbot Intelligente Evolve</h1>
            <ChatWidget onReply={handleReply} />
        </section>
    );
}
