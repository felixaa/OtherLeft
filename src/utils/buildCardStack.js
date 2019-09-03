const DIRECTIONS = [
    'LEFT',
    'RIGHT'
];

export const buildCardStack = () => {
    let stack = [];
    for (let i = 0; i < 30; i++) {
        stack.push(DIRECTIONS[Math.round(Math.random())])
    }
    return stack
}
