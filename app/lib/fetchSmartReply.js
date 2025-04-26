/**
 * Chiama la smart-reply API per ottenere una risposta contestuale
 * @param {Array} messages - Array completo della conversazione [{ role, content }]
 * @returns {Promise<string>}
 */
export async function fetchSmartReply(messages) {
    const res = await fetch('/api/smart-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages })
    });

    const data = await res.json();
    return data.response || 'Nessuna risposta.';
}
