export default class StopwatchData {

    // a unique key used by react to properly update components in the array
    private readonly key: number;

    private title: string;

    private elapsed: number;

    private laps: number[];

    constructor(title: string) {
        this.title = title;
        this.elapsed = 0;
        this.laps = [];
        this.key = Math.random();
    }

    public reset() {
        this.elapsed = 0;
        this.laps = [];
    }

    public setTitle(title: string): StopwatchData {
        this.title = title;
        return this;
    }

    public getTitle(): string {
        return this.title;
    }

    public setElapsed(elapsed: number): StopwatchData {
        this.elapsed = elapsed;
        return this;
    }

    public getElapsed(): number {
        return this.elapsed;
    }

    public lap(lap: number): StopwatchData {
        this.laps.push(lap);
        return this;
    }

    public getLaps(): number[] {
        return this.laps;
    }

    public getKey(): number {
        return this.key;
    }

}
