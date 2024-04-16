export const plural = (forms: string[], n: number) => {
    let idx;
    if (n % 10 === 1 && n % 100 !== 11) {
        idx = 0; // one
    } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
        idx = 1; // few
    } else {
        idx = 2; // many
    }
    return forms[idx] || '';
}