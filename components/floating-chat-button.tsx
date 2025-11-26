'use client'
import { MessageSquare } from 'lucide-react'
import { useChatStore } from '@/lib/chat-store'
import { motion, AnimatePresence } from 'framer-motion'

export default function FloatingChatButton() {
    const { isOpen, open } = useChatStore()

    return (
        <AnimatePresence>
            {!isOpen && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={open}
                    className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-[#8ccca0] text-[#f4f3ef] shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-shadow"
                    aria-label="Open Chat"
                >
                    <MessageSquare size={24} />
                </motion.button>
            )}
        </AnimatePresence>
    )
}
