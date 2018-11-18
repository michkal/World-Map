export function rand(min, max) {
    min = parseInt(min, 10);
    max = parseInt(max, 10);
    if (min > max) {
        let tmp = min;
        min = max;
        max = tmp;
    }
    let numArr = [Math.floor(Math.random() * (max - min + 1) + min), Math.floor(Math.random() * (max - min + 1) + min), Math.floor(Math.random() * (max - min + 1) + min), Math.floor(Math.random() * (max - min + 1) + min)];
    do {
        numArr[1] = Math.floor(Math.random() * (max - min + 1) + min);
    } while (numArr[1] === numArr[0]);
    do {
        numArr[2] = Math.floor(Math.random() * (max - min + 1) + min);
    } while (numArr[2] === numArr[0] || numArr[2] === numArr[1]);
    do {
        numArr[3] = Math.floor(Math.random() * (max - min + 1) + min);
    } while (numArr[3] === numArr[0] || numArr[3] === numArr[1] || numArr[3] === numArr[2]);
    return numArr;
}