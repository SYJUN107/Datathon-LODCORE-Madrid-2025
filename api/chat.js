// api/chat.js - Vercel serverless function
export default async function handler(req, res) {
    // DEBUGGING: Removidos try/catch para mejor debugging de errores
    console.log('Handler called with method:', req.method);

    // Solo permitir POST
    if (req.method !== 'POST') {
        console.log('Invalid method:', req.method);
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    console.log('Request body:', JSON.stringify(req.body, null, 2));

    // Recibir mensajes del frontend
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
        console.log('Invalid messages:', messages);
        return res.status(400).json({ message: 'Messages array required' });
    }

    console.log('Messages received:', messages.length);

    // API KEY DEMO HARD-CODEADA: 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
    // API key con funcionalidades restringidas solo para demos
    const apiKey = "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";
    console.log('Using API key (first 10 chars):', apiKey.substring(0, 10) + '...');

    // Hacer la llamada a OpenRouter desde el servidor
    console.log('Making fetch call to OpenRouter...');
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`, // API key hard-coded para demo
            "Content-Type": "application/json",
            "HTTP-Referer": req.headers.referer || "https://datathon-lodcore-madrid-2025.vercel.app"
        },
        body: JSON.stringify({
            model: "deepseek/deepseek-v3.2", // Usar el modelo correcto
            messages: messages
        })
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
        const errorText = await response.text();
        console.error('OpenRouter error text:', errorText);
        throw new Error(`OpenRouter error: ${response.status} ${response.statusText}: ${errorText}`);
    }

    const data = await response.json();
    console.log('Response data:', JSON.stringify(data, null, 2));

    const content = data.choices?.[0]?.message?.content;

    if (!content) {
        console.log('No content in response, choices:', data.choices);
        throw new Error('Invalid response from OpenRouter - no content');
    }

    console.log('Content length:', content.length);

    // Devolver respuesta limpia al frontend
    return res.status(200).json({
        content: content
    });
}
