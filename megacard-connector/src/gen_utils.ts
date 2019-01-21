import moment from 'moment';

export function shuffleArray(arr:any) {
    return arr
        .map(a => [Math.random(), a])
        .sort((a, b) => a[0] - b[0])
        .map(a => a[1]);
}

export function take_random(arr) {
    return arr[Math.floor(Math.random()*arr.length)]
}

export function session_id_gen() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

export function gen_cc_num() {
    var text = "";
    var possible = "0123456789";

    for (var i = 0; i < 16; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
/*
 * Takes an Array of the form [ [k, weight] ] and returns a random k
 */
export function take_weighted(weights) {
    var weights_sum = weights.reduce((acc, w) => acc + w[1], 0);
    var choice = Math.floor(Math.random() * weights_sum) + 1;
    var idx = weights.length -1;
    while((choice -= weights[idx][1]) > 0) {
        idx -= 1;
    }
    return weights[idx][0];
}

export function random_boolean() {
    return Math.random() >= 0.5;
}

export function random_between(min,max) {
    return Math.random() * (max - min) + min;
}

export function random_int_between(min,max) {
    return Math.floor(random_between(min,max));
}

/**
 * Generates a random moment.js object
 *
 * @param {any} end - END date [Anything a moment constructor accepts]
 * @param {any} start - START date [Anything a moment constructor accepts]
 * @returns
 */
export function random_date_between(start, end = moment()) {
  const endTime = +moment(end);
  const randomNumber = (to, from = 0) =>
    Math.floor(Math.random() * (to - from) + from);

  if (start) {
    const startTime = +moment(start);
    if (startTime > endTime) {
      throw new Error('End date is before start date!');
    }
    return moment(randomNumber(endTime, startTime));
  }
  return moment(randomNumber(endTime));
}

export default {shuffleArray, take_random, session_id_gen, take_weighted, random_between, random_int_between, random_date_between, gen_cc_num, random_boolean}
