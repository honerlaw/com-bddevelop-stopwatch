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
//# sourceMappingURL=util.js.map