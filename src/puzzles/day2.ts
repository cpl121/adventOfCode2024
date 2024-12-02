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
    for (let index = 0; index < data.length; index++) {
        const isSafeRow = isSafe(data[index])
        if (isSafeRow) result++
    }
    return result
}

function challenge2(data: string[]): number {
    let result = 0
    for (let index = 0; index < data.length; index++) {
        const isSafeRow = isSafeLevel2(data[index])
        if (isSafeRow) result++
    }
    return result
}

function isSafe(data: string): boolean {
    const levels = data.split(' ').map((number) => Number(number))
    let order: Order = levels[0] < levels[1] ? 'Asc' : 'Des'
    for (let index = 0; index < levels.length; index++) {
        if (index === 0) continue
        const element = levels[index]
        const previous = levels[index - 1]

        if (order === 'Asc') {
            if (previous >= element || Math.abs(element - previous) > 3) {
                return false
            }
        } else {
            if (previous <= element || Math.abs(element - previous) > 3) {
                return false
            }
        }
    }
    return true
}

function isSafeLevel2(data: string, hasBullet: boolean = true): boolean {
    const levels = data.split(' ').map((number) => Number(number))
    let order: Order = levels[0] < levels[1] ? 'Asc' : 'Des'
    for (let index = 0; index < levels.length; index++) {
        if (index === 0) continue
        const element = levels[index]
        const previous = levels[index - 1]
        let probablyUnsafe = false

        if (order === 'Asc' && (previous >= element || Math.abs(element - previous) > 3)) {
            probablyUnsafe = true
        }

        if ((order === 'Des' && previous <= element) || Math.abs(element - previous) > 3) {
            probablyUnsafe = true
        }

        if (probablyUnsafe) {
            if (hasBullet) {
                const newData = [...levels.slice(0, index - 1), ...levels.slice(index)]
                return isSafeLevel2(newData.join(' '), false)
            } else {
                return false
            }
        }
    }
    return true
}
