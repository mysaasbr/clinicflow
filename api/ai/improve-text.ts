
import type { IncomingMessage, ServerResponse } from 'http';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    console.log('[AI API] Incoming request:', req.method);

    if (req.method !== 'POST') {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
    }

    try {
        // More robust body parsing
        const getBody = () => new Promise<string>((resolve, reject) => {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => resolve(body));
            req.on('error', err => reject(err));
        });

        const bodyRaw = await getBody();
        console.log('[AI API] Body received (raw length):', bodyRaw.length);

        if (!bodyRaw) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Empty body from client' }));
            return;
        }

        const body = JSON.parse(bodyRaw);
        const { text } = body;

        if (!text) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Text is required' }));
            return;
        }

        console.log('[AI API] Calling OpenRouter for text:', text.substring(0, 50) + '...');

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 30000); // 30s timeout

        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                signal: controller.signal,
                headers: {
                    "Authorization": "Bearer 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",
                    "Content-Type": "application/json",
                    "HTTP-Referer": "http://localhost:3000",
                    "X-Title": "ClinicFlow Studio"
                },
                body: JSON.stringify({
                    "model": "openrouter/free",
                    "messages": [
                        {
                            "role": "system",
                            "content": "Você é um especialista em UX e Copywriting para sites de clínicas médicas. Sua tarefa é reescrever a solicitação do usuário para ser mais profissional, clara e detalhada, mantendo a intenção original. Aprimore o texto para que a equipe de desenvolvimento entenda perfeitamente o que fazer. Responda APENAS com o texto melhorado, sem introduções ou explicações extras. Responda em Português do Brasil."
                        },
                        {
                            "role": "user",
                            "content": text
                        }
                    ]
                })
            });

            clearTimeout(timeout);
            const rawRes = await response.text();
            console.log('[AI API] OpenRouter raw response:', rawRes.substring(0, 200));

            if (!response.ok) {
                throw new Error(`OpenRouter error (${response.status}): ${rawRes}`);
            }

            const data = JSON.parse(rawRes);

            if (data.choices && data.choices.length > 0) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ improvedText: data.choices[0].message.content }));
            } else {
                console.error('[AI API] Data without choices:', data);
                throw new Error(data.error?.message || 'No content returned from AI choices');
            }
        } catch (fetchErr: any) {
            clearTimeout(timeout);
            if (fetchErr.name === 'AbortError') {
                throw new Error('A IA demorou muito para responder (Timeout). Tente novamente.');
            }
            throw fetchErr;
        }

    } catch (error: any) {
        console.error('[AI API] Internal Error:', error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        // Ensure we send a valid JSON even on error
        res.end(JSON.stringify({
            error: error.message || 'Failed to improve text',
            details: error.stack?.split('\n').slice(0, 2).join(' ')
        }));
    }
}
