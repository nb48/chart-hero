
export function* beatTimeGenerator(offset: number, start: number, end: number, increment: number) {
    let time = offset;
    while (time < end) {
        time += increment;
        if (time < start) {
            continue;
        }
        yield time;
    }
    return time;
}