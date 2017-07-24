// https://www.h5jun.com/post/luckey-draw-in-5-minutes.html

import { shuffle } from './random'

export default class LotteryUtil {
  constructor(min, max) {
    this.pool = new Array(max - min + 1).fill().map((_, i) => min + i)
  }

  shuffle() {
    return shuffle(this.pool)
  }

  remove(list) {
    list.forEach((item) => {
      const index = this.pool.indexOf(item)
      if (index > -1) {
        this.pool.splice(index, 1)
      }
    })
  }
}