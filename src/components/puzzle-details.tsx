'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useDay } from '@/context'
import { ADVENT_OF_CODE_URL, type PuzzleProps } from '@/lib'
import { useEffect, useState } from 'react'
import Spinner from './spinner'

export function PuzzleDetails() {
    const { selectedDay } = useDay()
    const [puzzleDetails, setPuzzleDetails] = useState<PuzzleProps | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!selectedDay) return
        setLoading(true)
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/dayData/${selectedDay}`)
                const data: PuzzleProps = await res.json()
                setPuzzleDetails(data)
            } catch (error) {
                console.error('Error fetching day data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [selectedDay])

    return (
        <Card className="bg-white/10 backdrop-blur-lg w-80">
            <CardContent className="py-4 sm:py-6 h-full">
                {loading && <Spinner />}
                <div className="flex flex-col justify-around items-center h-full">
                    {!puzzleDetails ? (
                        <span className="text-lg">Select a day to view the results</span>
                    ) : (
                        <>
                            <h1 className="gold text-4xl">Puzzle {puzzleDetails.day}</h1>
                            <div className="flex flex-col space-y-4">
                                {puzzleDetails?.solutions?.map((solution, index) => (
                                    <span className="text-2xl" key={`Solution-${index}`}>
                                        Solution {index + 1}: {solution}
                                    </span>
                                ))}
                            </div>
                            <div className="flex flex-col space-y-2 items-center">
                                <a
                                    className="text-lg"
                                    href={`${ADVENT_OF_CODE_URL}${selectedDay}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Challenge Link
                                </a>
                                <a
                                    className="text-lg"
                                    href={puzzleDetails?.puzzleDataPaths?.[1]?.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Input Link
                                </a>
                            </div>
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
