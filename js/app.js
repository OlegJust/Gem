// ------------------------------------------------------------------------- Cart

const cart  = [
    ["6","7","8","9","10","V","D","K","T"],
    ["6","7","8","9","10","V","D","K","T"],
    ["6","7","8","9","10","V","D","K","T"],
    ["6","7","8","9","10","V","D","K","T"]
]
let partyСards = cart.map((el) => {
    let rand = []
    for (let i = rand.length ; i < el.length;i++){
        let randomNumber =  Math.random().toString().slice(2,3) -64
        if (randomNumber === -1) {
            randomNumber += 1
        }
        let check = true
        for (let number of rand) {
            if (number === randomNumber) {
                check = false
            }
        }
        if (check) {
            rand[rand.length] = randomNumber
        } else {
            i -= 1
        }

    }
    return rand
    // console.log(Math.random().toString().slice(2,3))
})
let plaerCat = []
function plaerCatF() {
    for (let namy of cart[0]) {
        plaerCat[plaerCat.length] = namy + " ♠"
    }
    for (let namy of cart[1]) {
        plaerCat[plaerCat.length] = namy + " ♣"
    }
    for (let namy of cart[2]) {
        plaerCat[plaerCat.length] = namy + " ♥"
    }
    for (let namy of cart[3]) {
        plaerCat[plaerCat.length] = namy + " ♦"
    }
}
plaerCatF()
//--------------------------------------------------------------

let NAce = "1"
let plaerCatRun = shuffle(plaerCat)
let discardedCards = []
let goldenPoint = false
let underDeck = []
let bankerPoints = 0
let Banker = []
let playerPoints = 0
let Player = []  // ------------------------------------------ Сдесь храняться карты, которые в руке

// ---------------------------------------------------------- setting


let setting_butoon = document.querySelector('.setting_butoon')
let setting = document.querySelector('.setting')
setting_butoon.onclick = function(event) {
    // setting.style.display = "none"
    if ( setting.style.display === "none") {
        setting.style.display = "flex"
    } else {
        setting.style.display = "none"
    }

};

let t1 = document.getElementById('BankerBank')
let t2 = document.getElementById('PlayerBalans') // ------------------------------ Баланс
let settingBu = document.querySelector('.settingBu')

//-------------------------------------- кнопка сохранить
settingBu.onclick = function () {
    document.querySelector('.BankerName_Ru').textContent = `Банк: ${t1.value} --- Name: Vitya`
    document.querySelector('.playerName_Ru').textContent = `Баланс: ${t2.value} --- Name: Oleg`
    let Ace1 = document.getElementById('r1').checked // -------------- первый туз
    let Ace2 = document.getElementById('r2').checked // ------------------- второй туз
    let Ace3 = document.getElementById('r3').checked
    if (Ace1 === true){
        NAce = "1/11"
    } else if (Ace2 === true) {
        NAce = "1"
    }else if (Ace3 === true){
        NAce = "11"
    }
    newGame()
    setting.style.display = "none"
}

// -------------------------------------------------------------------------
// ------------------------------------------------------------------- Новая игра
function newGame() {
    console.log(NAce)
    discardCards(Player)
    discardCards(Banker)
    discardCards(underDeck)
    plaerCat = []
    plaerCatF()
    plaerCatRun = shuffle(plaerCat)
    game(Player)
    game(Banker)
    game(underDeck)
    addingCards()
}
// ------------------------------ перемешывает массив
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
// --------------------------------------



//------------------------------------------------------------------------ Слежка за колодой
function TrackingDeck() {
    document.querySelector('.remainingВeck').textContent = `В колоде ${plaerCatRun.length}`
    if (plaerCatRun.length < 11) {
        newGame()
    }
}
//------------------------------------------------------------------------

function game(player) { // ---------------------------------------- Взять карту
    player[player.length] = plaerCatRun.pop()
    TrackingDeck()
}
console.log(Player,Banker)
// ------------------------------------------ Росздача карт 
function addingCards() {
    for (let i = 0; i < Banker.length;++i) {
        document.querySelector('.BankerCart').insertAdjacentHTML('beforeend',`<div class="Cart">${Banker[i]}</div>`)
    }
    for (let i = 0; i < Player.length;++i) {
        document.querySelector('.playerCart').insertAdjacentHTML('beforeend',`<div class="Cart">${Player[i]}</div>`)
    }
    scoring(Banker)
    scoring(Player)
    takeCard(underDeck)
}
// ------------------------------------------- 


// ------------------------------ OOOOOOOOOOOOOOOOOOщибки
// app.js:124 Uncaught TypeError: Cannot read property 'charAt' of undefined
// at gamePoints (app.js:124)
// at scoring (app.js:188)
// at HTMLButtonElement.document.getElementById.onclick (app.js:204)
// gamePoints @ app.js:124
// scoring @ app.js:188
// document.getElementById.onclick @ app.js:204
// console.log(Player,Banker)
// VM798:1 (4) ["T ♥", "V ♠", "T ♣", undefined]0: "T ♥"1: "V ♠"2: "T ♣"3: undefinedlength: 4__proto__: Array(0) ["10 ♠"]
// undefined

// Поставить блокироку на кнопку сктнуть

// ------------------------------------------- подщет очков

function gamePoints(Player, aceN = NAce) {
    let gamePointsBanker = 0
    let ace = aceN


    for (let i = 0;i < Player.length; ++i) {
        let sign = Player[i].charAt(0)
        if (sign === "6") {
            gamePointsBanker += 6
        } else if (sign === "7") {
            gamePointsBanker += 7
        }else if (sign === "8") {
            gamePointsBanker += 8
        }else if (sign === "9") {
            gamePointsBanker += 9
        }else if (sign === "1") {
            gamePointsBanker += 10
        }else if (sign === "V") {
            gamePointsBanker += 2
        }else if (sign === "D") {
            gamePointsBanker += 3
        }else if (sign === "K") {
            gamePointsBanker += 4
        }
    }
    if (ace === "1/11" ){
        for (let i = 0;i < Player.length; ++i) {
            let sign = Player[i].charAt(0)
            if (sign === "T") {
                if (gamePointsBanker >= 11) {
                    gamePointsBanker += 1
                } else {
                    gamePointsBanker += 11
                }
            }
        }
    } else if (ace === "11") {
        for (let i = 0;i < Player.length; ++i) {
            let sign = Player[i].charAt(0)
            if (sign === "T") {
                gamePointsBanker += 11
            }
        }
    }else if (ace === "1"){
        for (let i = 0;i < Player.length; ++i) {
            let sign = Player[i].charAt(0)
            if (sign === "T") {
                gamePointsBanker += 1
            }
        }
    }
    return gamePointsBanker

}
//--------------------------------------------------------------------------------
// =-------------------------------------------------------------------------Ставка
let rate = 0
document.getElementById('rateButton').onclick = function () {
    document.querySelector('.rate').style.display = "none"
    rate = document.getElementById('rateInput').value
    t2.value -= rate
    if (t2.value >= 0) {
        document.querySelector('.playerName_Ru').textContent = `Баланс: ${t2.value} --- Name: Oleg`
        document.querySelector('.take_or_leave').style.display = "block"
    } else if (t2.value < 0) {
        alert("Вы проиграли, начните заного ")
    }

}
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------Взять ище карту
function takeCard(player) {
    if (Player === player) {
        let i = player.length
        Player[Player.length] = plaerCatRun.pop()
        document.querySelector('.playerCart').insertAdjacentHTML('beforeend',`<div class="Cart">${Player[Player.length - 1]}</div>`)
        TrackingDeck()
    } else if (Banker === player){
        let i = player.length
        Banker[Banker.length] = plaerCatRun.pop()
        document.querySelector('.BankerCart').insertAdjacentHTML('beforeend',`<div class="Cart">${Banker[Banker.length - 1]}</div>`)
        TrackingDeck()
    }else if (underDeck === player) {
        document.querySelector('.underDeck').insertAdjacentHTML('beforeend',`<div class="CartUnderDeck">${underDeck[0]}</div>`)
        TrackingDeck()
    }


}
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------Посчет очков
function scoring(player) {
    let i = gamePoints(player,NAce)
    if (Player === player) {
        playerPoints = i
        document.querySelector('.playerName_Name').textContent = `Player Очков: ${i}`
    } else if (Banker === player) {
        bankerPoints = i
        document.querySelector('.BankerName_Name').textContent = `Banker Очков: ${i}`

    }

}
//-----------------------------------------------------------------------
//----------------------------------------------------------------------- Кнопка ище
let buttonLock = true
let buttonLock2 = true
document.getElementById('leave').onclick = function () {
    if (buttonLock) {
        if (playerPoints < 21){
            takeCard(Player)
            scoring(Player)
        }
        let check = true
        // if (twoAces(Player) && check) {
        //     losing(true,Player )
        //     balance(true)
        //     buttonLock = false
        //     check = false
        // }else
        if (playerPoints === 21 && check) {
            losing(true,Player )
            balance(true)
            buttonLock = false
            buttonLock2 = false
            check = false
        } else if (playerPoints > 21 && check) {
            losing(false,Player )
            balance(false)
            buttonLock = false
            buttonLock2 = false
            check = false
        }
    }


}

//---------------------------------------------------------------------
//---------------------------------------------------------------------Баланс
function balance(condition) {
    if (condition === true) {
        t1.value = +t1.value - +rate
        t2.value = +t2.value + +rate * 2
        document.querySelector('.BankerName_Ru').textContent = `Банк: ${t1.value} --- Name: Vitya`
        document.querySelector('.playerName_Ru').textContent = `Баланс: ${t2.value} --- Name: Oleg`
    }else if (condition === false) {
        t1.value = +t1.value + +rate
        document.querySelector('.BankerName_Ru').textContent = `Банк: ${t1.value} --- Name: Vitya`
        document.querySelector('.playerName_Ru').textContent = `Баланс: ${t2.value} --- Name: Oleg`
    }
}

//---------------------------------------------------------------------
//--------------------------------------------------------------------- Проигрышь выйгрышь
function losing(outcome, player) {
    setTimeout(() => {
        if (outcome === false) {
            alert("Проиграл")
            discardCards(player)
            buttonLock = true
        } else if(outcome === true) {
            alert("Победа")
            discardCards(player)
            buttonLock = true
        }
    }, 3000)


}
// ------------------------------------------------------- скидуються карты 
function discardCards(player) {
    player.map((el) => { discardedCards[discardedCards.length] = el })
    const t = player.length
    for (let i = 0; i < t; ++i) {
        player.shift()
    }
    scoring(player)
    if (player === Banker) {
        document.querySelector('.BankerCart').innerHTML = ""
    } else if(underDeck === player) {
        document.querySelector('.underDeck').innerHTML = ""
    }
    document.querySelector('.playerCart').innerHTML = ""
    document.querySelector('.take_or_leave').style.display = "none"
    document.querySelector('.rate').style.display = "block"
}
// -------------------------------------------------------- Скинуть 
document.getElementById('take').onclick = function () {
    if (buttonLock2 === true) {
        bot(playerPoints)
    }


}
// --------------------- Бот
function bot(it) {
    let proverc = undefined
    for (let i = true; i === true;  ){
        if (bankerPoints > 21) {

        }

        if (bankerPoints === 21) {
            proverc = false
            discardCards(Player)
            i = false
        } else if (bankerPoints > 22) {
            proverc = true
            discardCards(Player)
            i = false
        } else if (bankerPoints === 22 && goldenPoint) {
            proverc = false
            discardCards(Player)
            i = false
        } else if (bankerPoints === 22 && !goldenPoint){
            proverc = true
            discardCards(Player)
            i = false
        } else if(bankerPoints < 21 && bankerPoints > 16) {
            if (bankerPoints >= it ){
                proverc = false
                discardCards(Player)
                i = false
            } else  {
                proverc = true
                discardCards(Player)
                i = false
            }
        } else {
            takeCard(Banker)
            scoring(Banker)

        }

    }
    setTimeout(() => {

        let alertTT = function() {
            if (proverc === true) {

                alert("Победил игрок")
            }else if (proverc === false){
                alert("Победил банкир")
            }
            balance(proverc)
        }()


    } ,2000)

    setTimeout(() => {
        discardCards(Banker)
        discardCards(Player)
        takeCard(Banker)
        takeCard(Player)
        scoring(Banker)
        scoring(Player)
    }, 7000)
    
}
// --------------------------- 2 туза в разработке
// function twoAces(player) {
//     let gamePointsBanker = false
//     if (player.length === 1) {
//         for (let i = 0;i < player.length; ++i) {
//             let sign = player[i].charAt(0)
//             if (sign === "T") {
//                 gamePointsBanker += true
//             } else {
//                 gamePointsBanker = false
//             }
//         }
//     }
//     return gamePointsBanker
// }
// --------------------------- Проверка тузаов