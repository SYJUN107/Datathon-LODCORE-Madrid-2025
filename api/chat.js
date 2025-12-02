// api/chat.js - Vercel serverless function
export default async function handler(req, res) {
    // Solo permitir POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        // Recibir mensajes del frontend
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ message: 'Messages array required' });
        }

        // Hacer la llamada a OpenRouter desde el servidor (seguro)
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`, // API key segura en env var
                "Content-Type": "application/json",
                "HTTP-Referer": req.headers.referer || "https://tu-dominio.vercel.app"
            },
            body: JSON.stringify({
                model: "deepseek/deepseek-chat-v3.1", // Usar el modelo correcto
                messages: messages
            })
        });

        if (!response.ok) {
            throw new Error(`OpenRouter error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;

        if (!content) {
            throw new Error('Invalid response from OpenRouter');
        }

        // Devolver respuesta limpia al frontend
        return res.status(200).json({
            content: content
        });

    } catch (error) {
        console.error('Backend error:', error);

        // Devolver respuesta genérica en caso de error
        return res.status(200).json({
            content: "Lo siento, hubo un error al procesar tu consulta. Por favor, inténtalo de nuevo."
        });
    }
}
