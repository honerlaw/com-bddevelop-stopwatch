const COLORS = ["#e74c3c", "#2ecc71", "#9b59b6", "#3498db", "#1abc9c"];
export const PRIMARY_COLOR = "#95a5a6";
export const HEADER_COLOR = COLORS[Math.floor(Math.random() * COLORS.length)];
export function getFormattedTime(ms) {
    const minutes = Math.floor((ms / (60 * 1000)) % (60 * 60));
    const seconds = Math.floor((ms / 1000) % 60);
    const millis = Math.floor((ms % 1000) / 10);
    return getAsTwoDigit(minutes) + ":" + getAsTwoDigit(seconds) + ":" + getAsTwoDigit(millis);
}
function getAsTwoDigit(value) {
    const val = value.toFixed();
    if (val.length === 1) {
        return "0" + val;
    }
    return val;
}
export function getHighestLapCount(stopwatches) {
    let highest = 0;
    stopwatches.forEach((stopwatch) => {
        if (stopwatch.getLaps().length > highest) {
            highest = stopwatch.getLaps().length;
        }
    });
    return highest;
}
//# sourceMappingURL=util.js.map