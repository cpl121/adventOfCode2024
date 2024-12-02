import { chunkArray } from '@/lib'

type Order = 'Asc' | 'Des'

export function puzzle2(input: string): string[] {
    const DATA = chunkArray(input)
    const result1 = challenge1(DATA)
    const result2 = challenge2(DATA)
    return [String(result1), String(result2)]
}

function challenge1(data: string[]): number {
    let result = 0
    for (const row of data) {
        if (isSafe(row)) result++
    }
    return result
}

function challenge2(data: string[]): number {
    let result = 0
    for (const row of data) {
        if (isSafeLevel2(row)) result++
    }
    return result
}

function isSafe(data: string): boolean {
    const levels = data.split(' ').map((number) => Number(number))
    const order: Order = levels[0] < levels[1] ? 'Asc' : 'Des'
    for (let index = 0; index < levels.length; index++) {
        if (index === 0) continue
        const element = levels[index]
        const previous = levels[index - 1]
        const difference = Math.abs(element - previous)
        const ascendentUnsafe = order === 'Asc' && previous > element
        const descendentUnsafe = order === 'Des' && previous < element
        const isNotInRange = difference === 0 || difference > 3

        if (ascendentUnsafe || descendentUnsafe || isNotInRange) {
            return false
        }
    }
    return true
}

function isSafeLevel2(data: string): boolean {
    const levels = data.split(' ').map((number) => Number(number))
    const order: Order = levels[0] < levels[1] ? 'Asc' : 'Des'
    for (let index = 0; index < levels.length; index++) {
        if (index === 0) continue
        const element = levels[index]
        const previous = levels[index - 1]
        const difference = Math.abs(element - previous)
        const ascendentUnsafe = order === 'Asc' && previous > element
        const descendentUnsafe = order === 'Des' && previous < element
        const isNotInRange = difference === 0 || difference > 3

        if (ascendentUnsafe || descendentUnsafe || isNotInRange) {
            return tryWithAllPossibilities(levels)
        }
    }
    return true
}

function tryWithAllPossibilities(data: number[]): boolean {
    for (let index = 0; index < data.length; index++) {
        const arrayWithoutIndex = [...data.slice(0, index), ...data.slice(index + 1)]
        if (isSafe(arrayWithoutIndex.join(' '))) {
            return true
        }
    }
    return false
}
