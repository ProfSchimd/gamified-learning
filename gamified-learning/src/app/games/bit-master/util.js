export function secondsPerGame(game, precision = 2) {
    return (game.time / (1000 * game.game.length)).toFixed(precision);
}
