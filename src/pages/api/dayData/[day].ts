import { getPuzzlesData, resolvePuzzle } from '@/lib'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { day } = req.query
    try {
        if (!day) {
            return res.status(500).json({
                day,
                puzzleData: null,
                solution: 'Error to get Params',
            })
        }
        const puzzleDataPaths = await getPuzzlesData(day as string)
        const pathToSolvePuzzle = puzzleDataPaths[1] ?? puzzleDataPaths[0]
        const solutions = resolvePuzzle(Number(day), pathToSolvePuzzle.input)
        res.status(200).json({
            day,
            puzzleDataPaths,
            solutions,
        })
    } catch (error) {
        const messageError = error instanceof Error ? error.message : String(error)
        res.status(500).json({
            day,
            puzzleData: null,
            solution: `Error: ${messageError}`,
        })
    }
}
