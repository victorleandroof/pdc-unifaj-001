const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/assets'));
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

function getCard(cards,number){
    const cardsFinal = [];
    let total = 0;
    for(let i = cards.length; i >= 0; i-- ){
        const card = cards[i];
        while(total + card <= number ){
            cardsFinal.push(card);
            total += card;
        }
    }
    return cardsFinal;
}
app.get('/', (req, res) => {
    const cardsArrayRoot = [1,2,4,8,16,32];
    var cards = {
        "card1":[],
        "card2":[],
        "card4":[],
        "card8":[],
        "card16":[],
        "card32":[],
    }
    let card1Response = [
        {"card0":[]},
        {"card1":[]},
        {"card2":[]},
    ]
    let card2Response = [
        {"card0":[]},
        {"card1":[]},
        {"card2":[]},
    ]
    for(let i = 1; i <= 63; i++){
        let cardsFound = getCard(cardsArrayRoot,i);
        cardsFound.forEach(card=>{
            cards[`card${card}`].push(i);
        });
    }
    for(let i = 0; i <= 28; i = i + 4){
        let rowCard1 = cards.card1.slice(i,i+4);
        card1Response[0].card0.push({row:rowCard1});
        let rowCard2 = cards.card2.slice(i,i+4);
        card1Response[1].card1.push({row:rowCard2});
        let rowCard4 = cards.card4.slice(i,i+4);
        card1Response[2].card2.push({row:rowCard4});
        let rowCard8 = cards.card8.slice(i,i+4);
        card2Response[0].card0.push({row:rowCard8});
        let rowCard16 = cards.card16.slice(i,i+4);
        card2Response[1].card1.push({row:rowCard16});
        let rowCard32 = cards.card32.slice(i,i+4);
        card2Response[2].card2.push({row:rowCard32});
    }
    return res.render('index',{card1Response,card2Response});
});

app.listen(port, () => {
    console.log(`ouvindo em porta ${port}`);
});

