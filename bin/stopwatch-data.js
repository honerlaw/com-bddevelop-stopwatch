export default class StopwatchData {
    constructor(title) {
        this.title = title;
        this.elapsed = 0;
        this.laps = [];
        this.key = Math.random();
    }
    reset() {
        this.elapsed = 0;
        this.laps = [];
    }
    setTitle(title) {
        this.title = title;
        return this;
    }
    getTitle() {
        return this.title;
    }
    setElapsed(elapsed) {
        this.elapsed = elapsed;
        return this;
    }
    getElapsed() {
        return this.elapsed;
    }
    lap(lap) {
        this.laps.push(lap);
        return this;
    }
    getLaps() {
        return this.laps;
    }
    getKey() {
        return this.key;
    }
}
//# sourceMappingURL=stopwatch-data.js.map