'use client';

import {
    AssistantRuntimeProvider,
    ThreadPrimitive,
    ComposerPrimitive,
    MessagePrimitive,
} from '@assistant-ui/react';
import { useChatRuntime } from './chat-runtime';
import { MarkdownTextPrimitive } from '@assistant-ui/react-markdown';
import { Send, Loader, User, Bot } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

export function AssistantUiChat() {
    const runtime = useChatRuntime();

    return (
        <AssistantRuntimeProvider runtime={runtime}>
            <div className="h-full w-full flex flex-col overflow-hidden">
                <ThreadPrimitive.Root className="flex-1 flex flex-col h-full overflow-hidden">
                    <ThreadPrimitive.Viewport className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                        <ThreadPrimitive.Messages
                            components={{
                                Message: MyMessage,
                            }}
                        />
                    </ThreadPrimitive.Viewport>

                    <div className="p-4">
                        <ComposerPrimitive.Root className="flex gap-2 w-full">
                            <ComposerPrimitive.Input
                                placeholder="Ask me anything..."
                                className="flex-1 bg-input border border-border rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 text-foreground placeholder-muted-foreground transition-all resize-none h-12 max-h-32"
                            />
                            <ComposerPrimitive.Send className="bg-accent text-accent-foreground p-3 rounded hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center h-12 w-12">
                                <Send size={20} />
                            </ComposerPrimitive.Send>
                        </ComposerPrimitive.Root>
                    </div>
                </ThreadPrimitive.Root>
            </div>
        </AssistantRuntimeProvider>
    );
}

const MyMessage = () => {
    return (
        <MessagePrimitive.Root className="flex w-full mb-4">
            <MessagePrimitive.If user>
                <div className="flex w-full justify-end">
                    <div className="max-w-[85%] lg:max-w-[75%] px-4 py-3 rounded-2xl rounded-tr-none bg-accent text-accent-foreground text-sm shadow-sm">
                        <MessagePrimitive.Content />
                    </div>
                </div>
            </MessagePrimitive.If>
            <MessagePrimitive.If assistant>
                <div className="flex w-full justify-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                        <Bot size={16} className="text-primary" />
                    </div>
                    <div className="max-w-[85%] lg:max-w-[75%] px-4 py-3 rounded-2xl rounded-tl-none bg-muted/50 text-foreground text-sm border border-border/50 shadow-sm">
                        <MessagePrimitive.Content components={{ Text: MarkdownText }} />
                    </div>
                </div>
            </MessagePrimitive.If>
        </MessagePrimitive.Root>
    );
};

const MarkdownText = () => {
    return (
        <MarkdownTextPrimitive
            className="prose prose-sm dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
        />
    );
};
