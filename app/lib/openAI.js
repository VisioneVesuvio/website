// lib/chatOpenAI.js
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"]
});

/**
 * 🎯 Funzione base: chat con modello GPT
 * @param {string} userMessage - Il messaggio dell’utente
 * @param {string} model - Modello da usare (es. gpt-3.5-turbo, gpt-4, ecc.)
 * @param {Array} systemMessages - Array opzionale di messaggi di sistema
 * @returns {Promise<string>} - Risposta testuale
 */
export async function generateChatResponse(userMessage, model = "gpt-3.5-turbo", systemMessages = []) {
    try {
        const chatCompletion = await openai.chat.completions.create({
            model,
            messages: [
                ...systemMessages,
                { role: "user", content: userMessage }
            ],
            temperature: 0.7,
            max_tokens: 512
        });

        return chatCompletion.choices[0]?.message?.content || "Nessuna risposta.";
    } catch (err) {
        console.error("❌ Errore Chat Completion:", err);
        return "Errore durante la chiamata a OpenAI (chat).";
    }
}

/**
 * 🤖 Funzione avanzata: invoca un Assistant configurato su OpenAI
 * @param {string} assistantId - ID dell’assistente
 * @param {string} userMessage - Messaggio utente
 * @returns {Promise<string>} - Risposta testuale dal thread
 */
export async function generateAssistantResponse(assistantId, userMessage) {
    try {
        const thread = await openai.beta.threads.create();

        await openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content: userMessage
        });

        const run = await openai.beta.threads.runs.create(thread.id, {
            assistant_id: assistantId
        });

        let runStatus;
        do {
            await new Promise(res => setTimeout(res, 1500));
            runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
        } while (runStatus.status !== 'completed' && runStatus.status !== 'failed');

        if (runStatus.status === 'completed') {
            const messages = await openai.beta.threads.messages.list(thread.id);
            const lastMessage = messages.data.find(m => m.role === 'assistant');
            return lastMessage?.content?.[0]?.text?.value || "Risposta vuota.";
        }

        return "Errore: esecuzione non completata.";
    } catch (err) {
        console.error("❌ Errore Assistant API:", err);
        return "Errore durante la chiamata a OpenAI (assistant).";
    }
}

/**
 * 🧠 Funzione wrapper universale per qualsiasi tipo di richiesta
 * @param {Object} options
 * @param {string} options.type - "chat" | "assistant"
 * @param {string} options.message - Messaggio utente
 * @param {string} [options.model] - Nome del modello (solo per chat)
 * @param {Array} [options.system] - Messaggi di sistema (solo per chat)
 * @param {string} [options.assistantId] - ID assistente (solo per assistant)
 * @returns {Promise<string>} - Risposta dal modello/assistente
 */
export async function handleOpenAIRequest({
                                              type = "chat",
                                              message,
                                              model = "gpt-3.5-turbo",
                                              system = [],
                                              assistantId = null
                                          }) {
    if (!message || typeof message !== "string") {
        return "Messaggio non valido.";
    }

    if (type === "assistant" && assistantId) {
        return await generateAssistantResponse(assistantId, message);
    }

    // fallback alla chat se nulla specificato
    return await generateChatResponse(message, model, system);
}
