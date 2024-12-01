import { solvePuzzle } from '.'
import type { Path } from '../interfaces'

export async function getPuzzlesData(day: number): Promise<Path[]> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/puzzles/day${day}.txt`)
        if (!response.ok) {
            throw new Error(`Failed to fetch puzzle for day ${day}`)
        }
        const response2 = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/puzzles/day${day}-example.txt`)
        if (!response.ok) {
            throw new Error(`Failed to fetch puzzle for day ${day}`)
        }

        const puzzleData = await response.text()
        const puzzleData2 = await response2.text()

        const examplePath: Path = {
            key: 'Example',
            path: `/puzzles/day${day}-example.txt`,
            input: puzzleData2,
        }
        const challengePath: Path = {
            key: 'Challenge',
            path: `/puzzles/day${day}.txt`,
            input: puzzleData,
        }
        return [examplePath, challengePath]
    } catch (error) {
        const messageError = error instanceof Error ? error.message : String(error)
        throw new Error(`Could not load puzzle for day ${day}: ${messageError}`)
    }
}

export function resolvePuzzle(day: number, data: string): string[] | string {
    try {
        return solvePuzzle(day, data)
    } catch (error) {
        const messageError = error instanceof Error ? error.message : String(error)
        throw new Error(`Solver for day ${day} not implemented or failed: ${messageError}`)
    }
}
