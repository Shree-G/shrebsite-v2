'use client';

import { useLocalRuntime } from '@assistant-ui/react';

export const useChatRuntime = () => {
    return useLocalRuntime(
        {
            run: async function* ({ messages, abortSignal }) {
                const lastMessage = messages[messages.length - 1];
                if (lastMessage.role !== 'user') return;

                // Extract text from the last message
                const textContent = lastMessage.content.find(c => c.type === 'text');
                const messageText = textContent && 'text' in textContent ? textContent.text : '';

                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: messageText,
                    }),
                    signal: abortSignal,
                });

                if (!response.body) {
                    throw new Error('No response body');
                }

                const reader = response.body.getReader();
                const decoder = new TextDecoder();

                let fullText = '';

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value, { stream: true });

                    // Simple heuristic for JSON vs Stream
                    // If the backend sends a single JSON object, we parse it.
                    // If it sends a stream of text, we append it.
                    // Since we are building the string, we can try to parse it if it looks like JSON at the end?
                    // Actually, for streaming, we usually just yield the chunk.
                    // But if the backend returns JSON { answer: "..." }, we need to handle that.

                    // Let's try to detect if the accumulated text is valid JSON ONLY if it's the first chunk(s) and we haven't yielded yet?
                    // Or just assume the backend is updated to stream text as per my plan.
                    // My plan updated the backend to pipe `resp.body` if it's from another backend, 
                    // OR return a stream.
                    // If the upstream backend returns JSON, my proxy pipes it.
                    // So we might receive `{"answer": "..."}` as a stream.

                    fullText += chunk;

                    // Check if we have a JSON object
                    try {
                        const json = JSON.parse(fullText);
                        if (json.answer) {
                            yield {
                                content: [{ type: 'text', text: json.answer }],
                            };
                            return;
                        }
                    } catch {
                        // Not valid JSON yet, or it's just text.
                        // If we are streaming text, we should yield the delta.
                        // But `assistant-ui` expects the FULL content or delta?
                        // `ChatModelRunResult` has `content`.
                        // If I yield `{ content: ... }`, it probably updates the message.
                    }

                    // If it's not JSON, assume it's raw text streaming
                    yield {
                        content: [{ type: 'text', text: fullText }],
                    };
                }
            },
        },
        {
            initialMessages: [
                {
                    role: 'assistant',
                    content: [
                        {
                            type: 'text',
                            text: "Hi! I'm Shree's AI assistant. Ask me about my experience, projects, or background. What would you like to know?",
                        },
                    ],
                },
            ],
        }
    );
};
