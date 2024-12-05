import { chunkArray } from '@/lib'

enum Orders {
    Up = 'Up',
    Down = 'Down',
    Right = 'Right',
    Left = 'Left',
    UpR = 'UpR',
    DownR = 'DownR',
    UpL = 'UpL',
    DownL = 'DownL',
}

const OrdersKeys = Object.keys(Orders) as (keyof typeof Orders)[];
const DATA_LENGTH = new Map<string, number>()

export function puzzle4(input: string): string[] {
    const DATA = chunkArray(input).map((data) => data.split(''))
    DATA_LENGTH.set('X', DATA.length)
    DATA_LENGTH.set('Y', DATA[0].length)
    const result1 = challenge1(DATA)
    const result2 = challenge2(DATA)
    return [String(result1), String(result2)]
}

function challenge1(data: string[][]): number {
    let result = 0
    for (let index = 0; index < data.length; index++) {
        for (let index_2 = 0; index_2 < data[index].length; index_2++) {
            const character = data[index][index_2]
            if (character !== 'X') continue
            const ordersWithM = nearCharacters('M', index, index_2, data)
            
            for (const order of ordersWithM) {
                if (!coincidence('A', index, index_2, data, order, 2)) continue
                if (!coincidence('S', index, index_2, data, order, 3)) continue
                result++
            }
        }
    }
    return result
}

function challenge2(data: string[][]): number {
    let result = 0
    for (let index = 0; index < data.length; index++) {
        for (let index_2 = 0; index_2 < data[index].length; index_2++) {
            const character = data[index][index_2]
            if (character !== 'A') continue
            const ordersWithM = crossCharacters('M', index, index_2, data)
            if (ordersWithM.length !== 2) continue
            let coincidences = 0
            for (const order of ordersWithM) {
                const orderToCompare = crossOrder(order)
                if (!coincidence('S', index, index_2, data, orderToCompare, 1)) continue
                coincidences++
            }
            if (coincidences === 2) result++
        }
    }
    return result
}

function nearCharacters(character: string, x: number, y: number, data: string[][]): Orders[] {
    let ordersFound: Orders[] = []
    for (const order of OrdersKeys) {
        switch (order) {
            case Orders.Up:
                if (hasLimit('X', x - 1, false) && character === data[x - 1][y]) ordersFound.push(Orders.Up)
                break
            case Orders.Down:
                if (hasLimit('X', x + 1, true) && character === data[x + 1][y]) ordersFound.push(Orders.Down)
                break
            case Orders.Right:
                if (hasLimit('Y', y + 1, true) && character === data[x][y + 1]) ordersFound.push(Orders.Right)
                break
            case Orders.Left:
                if (hasLimit('Y', y - 1, false) && character === data[x][y - 1]) ordersFound.push(Orders.Left)
                break
            case Orders.UpR:
                if (hasLimit('X', x - 1, false) && hasLimit('Y', y + 1, true) && character === data[x - 1][y + 1]) ordersFound.push(Orders.UpR)
                break
            case Orders.DownR:
                if (hasLimit('X', x + 1, true) && hasLimit('Y', y + 1, true) && character === data[x + 1][y + 1]) ordersFound.push(Orders.DownR)
                break
            case Orders.UpL:
                if (hasLimit('X', x - 1, false) && hasLimit('Y', y - 1, false) && character === data[x - 1][y - 1]) ordersFound.push(Orders.UpL)
                break
            case Orders.DownL:
                if (hasLimit('X', x + 1, true) && hasLimit('Y', y - 1, false) && character === data[x + 1][y - 1]) ordersFound.push(Orders.DownL)
                break

            default:
                break
        }
    }

    return ordersFound
}

function crossCharacters(character: string, x: number, y: number, data: string[][]): Orders[] {
    let ordersFound: Orders[] = []
    for (const order of OrdersKeys) {
        switch (order) {
            case Orders.UpR:
                if (hasLimit('X', x - 1, false) && hasLimit('Y', y + 1, true) && character === data[x - 1][y + 1]) ordersFound.push(Orders.UpR)
                break
            case Orders.DownR:
                if (hasLimit('X', x + 1, true) && hasLimit('Y', y + 1, true) && character === data[x + 1][y + 1]) ordersFound.push(Orders.DownR)
                break
            case Orders.UpL:
                if (hasLimit('X', x - 1, false) && hasLimit('Y', y - 1, false) && character === data[x - 1][y - 1]) ordersFound.push(Orders.UpL)
                break
            case Orders.DownL:
                if (hasLimit('X', x + 1, true) && hasLimit('Y', y - 1, false) && character === data[x + 1][y - 1]) ordersFound.push(Orders.DownL)
                break

            default:
                break
        }
    }

    return ordersFound
}

function hasLimit(position: string, value: number, isIncreasing: boolean): boolean {
    const X_LENGTH = DATA_LENGTH.get('X') ?? 0
    const Y_LENGTH = DATA_LENGTH.get('Y') ?? 0
    if (position === 'X') {
        return !(isIncreasing ? value >= X_LENGTH : value < 0)
    } else {
        return !(isIncreasing ? value >= Y_LENGTH : value < 0)
    }
}

function coincidence(character: string, x: number, y: number, data: string[][], order: Orders, level: number): boolean {
    let wordToCompare: string = ''
    switch (order) {
        case Orders.Up:
            if (hasLimit('X', x - level, false)) wordToCompare = data[x - level][y] ?? ''
            break
        case Orders.Down:
            if (hasLimit('X', x + level, true)) wordToCompare = data[x + level][y] ?? ''
            break
        case Orders.Right:
            if (hasLimit('Y', y + level, true)) wordToCompare = data[x][y + level] ?? ''
            break
        case Orders.Left:
            if (hasLimit('Y', y - level, false)) wordToCompare = data[x][y - level] ?? ''
            break
        case Orders.UpR:
            if (hasLimit('X', x - level, false) && hasLimit('Y', y + level, true)) wordToCompare = data[x - level][y + level] ?? ''
            break
        case Orders.DownR:
            if (hasLimit('X', x + level, true) && hasLimit('Y', y + level, true)) wordToCompare = data[x + level][y + level] ?? ''
            break
        case Orders.UpL:
            if (hasLimit('X', x - level, false) && hasLimit('Y', y - level, false)) wordToCompare = data[x - level][y - level] ?? ''
            break
        case Orders.DownL:
            if (hasLimit('X', x + level, true) && hasLimit('Y', y - level, false)) wordToCompare = data[x + level][y - level] ?? ''
            break

        default:
            break
    }
    return wordToCompare === character
}

function crossOrder(order: Orders): Orders {
    let result = Orders.Up
    switch (order) {
        case Orders.UpR:
            result = Orders.DownL
            break
        case Orders.DownR:
            result = Orders.UpL
            break
        case Orders.UpL:
            result = Orders.DownR
            break
        case Orders.DownL:
            result = Orders.UpR
            break

        default:
            break
    }
    return result
}