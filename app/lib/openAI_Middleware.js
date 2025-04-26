import { handleOpenAIRequest } from '@/app/lib/openAI';

/**
 * 📊 Valuta quanto contesto serve per comprendere la risposta dell'utente
 * Restituisce un numero da 1 a 10 nel formato: "CONTEXT: X"
 */
export async function evaluateContext(lastUserReply) {
    if (!lastUserReply || typeof lastUserReply !== 'string') {
        return "CONTEXT: 0";
    }

    const systemPrompt = `
Sei un assistente che valuta quanto contesto è necessario per comprendere una risposta o frase dell'utente.
Il tuo compito è dare un punteggio da 1 (poco contesto necessario) a 10 (molto contesto necessario),
basandoti solo sulla frase fornita.

Rispondi SOLO nel formato: CONTEXT: [numero]
Non aggiungere altro.
`;

    const response = await handleOpenAIRequest({
        type: "chat",
        message: lastUserReply,
        model: "gpt-3.5-turbo",
        system: [{ role: "system", content: systemPrompt }]
    });

    return response.trim();
}

/**
 * 🧠 Genera una risposta intelligente basandosi solo sul contesto necessario
 * @param {Array} cache - Array di messaggi [{ role: 'user'|'assistant'|'system', content: string }]
 * @param {string} [model] - Modello OpenAI da usare (default: gpt-3.5-turbo)
 * @returns {Promise<string>} - Risposta del modello
 */
export async function generateSmartReply(cache = [], model = "gpt-3.5-turbo") {
    if (!Array.isArray(cache) || cache.length === 0) {
        return "Conversazione vuota.";
    }

    // Trova l’ultimo messaggio dell’utente
    const reversed = [...cache].reverse();
    const lastUserMsg = reversed.find(m => m.role === "user");

    if (!lastUserMsg) return "Nessun messaggio utente recente.";

    const contextResult = await evaluateContext(lastUserMsg.content);
    const match = contextResult.match(/CONTEXT:\s*(\d+)/i);
    const contextScore = match ? parseInt(match[1], 10) : 1;

    // Determina quante interazioni mantenere in base al punteggio (min 1, max 10)
    const messageCount = Math.min(Math.max(Math.ceil(contextScore / 2), 1), 10);

    // Prendi solo le ultime X entry rilevanti dal cache
    const reducedMessages = cache.slice(-messageCount * 2); // *2 per coprire user + assistant

    const response = await handleOpenAIRequest({
        type: "chat",
        message: lastUserMsg.content,
        model,
        system: reducedMessages.filter(m => m.role === "system")
    });

    return response;
}
