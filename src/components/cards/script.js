export function cardsDrugTracking() {
    let cards = document.querySelectorAll('.cards__item');

    Array.prototype.forEach.call(cards, function(card, i){
        console.log(card)
    });
}

