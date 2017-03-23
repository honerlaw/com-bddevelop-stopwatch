import StopwatchData from "./stopwatch-data";

const COLORS: string[] = [ "#e74c3c", "#2ecc71", "#9b59b6", "#3498db", "#1abc9c" ];

export const PRIMARY_COLOR: string = "#95a5a6";
export const HEADER_COLOR: string = COLORS[ Math.floor(Math.random() * COLORS.length) ];

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

export function getHighestLapCount(stopwatches: StopwatchData[]): number {
    let highest: number = 0;
    stopwatches.forEach((stopwatch: StopwatchData) => {
        if (stopwatch.getLaps().length > highest) {
            highest = stopwatch.getLaps().length;
        }
    });
    return highest;
}
