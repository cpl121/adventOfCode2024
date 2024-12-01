import { createContext, useContext, useState, type ReactNode } from 'react'

interface DayContextProps {
    selectedDay: number | null
    setSelectedDay: (day: number) => void
}

const DayContext = createContext<DayContextProps | undefined>(undefined)

export function DayProvider({ children }: { children: ReactNode }) {
    const [selectedDay, setSelectedDay] = useState<number | null>(null)

    return <DayContext.Provider value={{ selectedDay, setSelectedDay }}>{children}</DayContext.Provider>
}

export function useDay() {
    const context = useContext(DayContext)
    if (!context) {
        throw new Error('useDay must be used within a DayProvider')
    }
    return context
}
