export function timeConverter(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp * 1000);
    let hour = a.getHours();
    let min = a.getMinutes();
    if (min < 10) {
        min = '0' + min;
    }
    let time = hour + ':' + min;
    return time;
}