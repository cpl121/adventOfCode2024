'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { CalendarWindow } from '@/components/calendar-window'
import { useDay } from '@/context'

const daysInDecember = Array.from({ length: 24 }, (_, i) => i + 1)

export function AdventCalendar() {
    const [currentDate, setCurrentDate] = useState<Date | null>(null)
    const { setSelectedDay } = useDay()

    useEffect(() => {
        setCurrentDate(new Date())
    }, [])

    const isWindowOpen = (day: number) => {
        if (!currentDate) return false
        return currentDate.getDate() >= day
    }

    const handleWindowClick = (day: number) => {
        if (isWindowOpen(day)) {
            setSelectedDay(day)
        } else {
            alert(`Wait until December ${day}!`)
        }
    }

    return (
        <Card className="bg-white/10 backdrop-blur-lg w-80">
            <CardContent className="py-4 sm:py-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                    {daysInDecember.map((day) => (
                        <CalendarWindow
                            key={day}
                            day={day}
                            isOpen={isWindowOpen(day)}
                            onClick={() => handleWindowClick(day)}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
