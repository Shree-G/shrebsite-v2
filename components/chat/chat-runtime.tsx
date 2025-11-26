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
                            text: "Hi! I'm Shree's AI assistant. Ask me about Shree's experience, projects, or background. What would you like to know?",
                        },
                    ],
                },
            ],
        }
    );
};
