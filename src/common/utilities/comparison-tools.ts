
export function arraysAreEqual(subject1: Array<any> | ReadonlyArray<any>, subject2: Array<any> | ReadonlyArray<any>) {
    return JSON.stringify(subject1) === JSON.stringify(subject2);
}
