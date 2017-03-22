export function getFormattedTime(ms: number): string {
    const minutes: number = Math.floor((ms / (60 * 1000)) % (60 * 60));
    const seconds: number = Math.floor((ms / 1000) % 60);
    const millis: number = Math.floor((ms % 1000) / 10);
    return getAsTwoDigit(minutes) + ":" + getAsTwoDigit(seconds) + ":" + getAsTwoDigit(millis);
}

function getAsTwoDigit(value: number): string {
    const val: string = value.toFixed();
    if (val.length === 1) {
        return "0" + val;
    }
    return val;
}
