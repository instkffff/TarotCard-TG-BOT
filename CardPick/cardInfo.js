function cardInfo(pool, meaning, rotation, id) {
    let index = id - 1;
    let card_name_ZH = pool.card_name_ZH[index];
    let card_meaning = meaning.meanings_ZH[index][rotation];

    return { id, card_name_ZH, card_meaning, rotation };
}

/* import { card_pool } from '../deck/cardpool.js'
import { card_mean } from '../deck/cardmean.js'

let { id, card_name_ZH, card_meaning } = cardInfo(card_pool, card_mean, 0, 23);

console.log(id, card_name_ZH, card_meaning);
 */

export { cardInfo };