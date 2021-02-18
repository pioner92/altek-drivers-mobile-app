export const itemGenerate = (min: number, max: number) => {
    const items = []
    for (let i = min * 100; i <= max * 100; i++) {
        if (i < 0.25) {
            continue
        } else if (i >= 25 && i <= 100 && i % 5 === 0) {
            items.push({id: i, value: (i / 100).toFixed(2)})
        } else if (i > 100 && i % 10 === 0) {
            items.push({id: i, value: (i / 100).toFixed(2)})
        }
    }
    return items
}

