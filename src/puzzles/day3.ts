import { chunkArray } from '@/lib'

const regexToFindMul = RegExp(/mul\([0-9]*\,[0-9]*\)/g)
const regexToFindDont = RegExp(/(don\'t\(\))+/g)
const regexToFindDo = RegExp(/(do\(\))+/g)

export function puzzle3(input: string): string[] {
    const DATA = chunkArray(input)
    const result1 = challenge1(DATA)
    const result2 = challenge2(DATA)
    return [String(result1), String(result2)]
}

function challenge1(data: string[]): number {
    let result = 0
    for (const element of data) {
        const correctMuls = [...element.matchAll(regexToFindMul)]
        for (const correctMul of correctMuls) {
            const mul = correctMul[0]
            const numbers = mul.replace('mul(', '').replace(')', '').split(',').map((number) => Number(number))
            const multiplication = numbers.reduce((prev, acc) => prev * acc, 1)
            
            result += multiplication
        }
    }

    return result
}

function challenge2(data: string[]): number {
    let result = 0
    for (const element of data) {
        const correctMuls = [...element.matchAll(regexToFindMul)].map((mul) => {
            return {
                key: mul[0],
                index: mul.index
            }
        })
        const correctDonts = [...element.matchAll(regexToFindDont)].map((mul) => {
            return {
                key: 'STOP',
                index: mul.index
            }
        })
        const correctDo = [...element.matchAll(regexToFindDo)].map((mul) => {
            return {
                key: 'GO',
                index: mul.index
            }
        })
        const arraysOrdered = [...correctMuls, ...correctDonts, ...correctDo].sort((a, b) => a.index - b.index)
        let canContinue = true

        for (const array of arraysOrdered) {
            if (array.key.includes('STOP')) {
                canContinue = false
            } 
            if (array.key.includes('GO')) {
                canContinue = true
            }
            
            if (canContinue && array.key.includes('mul')) {
                const numbers = array.key.replace('mul(', '').replace(')', '').split(',').map((number) => Number(number))
                console.log("numbers", numbers);
                const multiplication = numbers.reduce((prev, acc) => prev * acc, 1)
                result += multiplication
            }
        }
    }
    console.log("result", result);

    return result
}


