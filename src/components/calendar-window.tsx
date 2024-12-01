'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface CalendarWindowProps {
    day: number
    isOpen: boolean
    onClick: () => void
}

const christmasEmojis = ['🎄', '🎅', '🦌', '⛄', '🎁', '🔔', '🕯️', '❄️', '🍪', '🥛', '🧦', '🎶', '🍬']

export function CalendarWindow({ day, isOpen, onClick }: CalendarWindowProps) {
    return (
        <Button
            variant="outline"
            className={`aspect-square text-xl sm:text-2xl font-bold ${
                isOpen ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
            } text-white transition-colors duration-300 w-16 h-16`}
            onClick={onClick}
        >
            {isOpen ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {christmasEmojis[Math.floor(Math.random() * christmasEmojis.length)]}
                </motion.div>
            ) : (
                day
            )}
        </Button>
    )
}
