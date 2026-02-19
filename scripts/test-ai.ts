import fs from 'fs';

const key = "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";

async function testAI() {
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${key}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "openrouter/free",
                "messages": [{ "role": "user", "content": "olá" }]
            })
        });

        const data = await response.json();
        fs.writeFileSync('ai-diag.json', JSON.stringify(data, null, 2));
        console.log("Saved to ai-diag.json");
    } catch (err) {
        console.error("Test Error:", err);
    }
}

testAI();
