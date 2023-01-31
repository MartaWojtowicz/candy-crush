document.addEventListener('DOMContentLoaded', ()=>{

const grid = document.querySelector('.grid')
const width = 8
const squares =[]
let score = 0
const scoreDisplay = document.getElementById('score')
const timeDisplay = document.getElementById('time')

const candyColors = [

    'url(src/IMAGES/candy_1.png)',
    'url(src/IMAGES/candy_2.png)',
    'url(src/IMAGES/candy_3.png)',
    'url(src/IMAGES/candy_4.png)',
    'url(src/IMAGES/candy_5.png)',
    'url(src/IMAGES/candy_6.png)'

]


function createBoard(){
    for (let i=0; i< width*width; i++) {
        const square = document.createElement('div')
        square.setAttribute('draggable',true)
        square.setAttribute('id',i)
        let randomColor = Math.floor(Math.random() * candyColors.length)
        square.style.backgroundImage = candyColors[randomColor]
        grid.appendChild(square)
        squares.push(square)
    }
}

createBoard()

//Drag the candies

let colorBeingDragged
let colorBeingReplaced
let squareIdBeingDragged
let squareIdBeingReplaced

squares.forEach(square => square.addEventListener('dragstart', dragStart))
squares.forEach(square => square.addEventListener('dragend', dragEnd))
squares.forEach(square => square.addEventListener('dragover', dragOver))
squares.forEach(square => square.addEventListener('dragenter', dragEnter))
squares.forEach(square => square.addEventListener('dragleave', dragLeave))
squares.forEach(square => square.addEventListener('drop', dragDrop))

function dragStart () {

    console.log (this.id, 'dragstart')

    colorBeingDragged=this.style.backgroundImage
    squareIdBeingDragged = parseInt(this.id) //parseInt - to be sure that this is a number
    console.log(colorBeingDragged)

}

function dragEnd () {

    console.log (this.id, 'dragend')

    // what is a valid move?

    let validMoves = [
        squareIdBeingDragged -1, 
        squareIdBeingDragged - width, 
        squareIdBeingDragged +1, 
        squareIdBeingDragged + width   
    ]

    let validMove = validMoves.includes(squareIdBeingReplaced) //we store it as a boolean of true

    if (squareIdBeingReplaced && validMove) {
        squareIdBeingReplaced = null
    } else if (squareIdBeingReplaced && !validMove) {
        squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
    } else squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged

}

function dragOver (e) {

    e.preventDefault()
    console.log (this.id, 'dragover')
    
}

function dragEnter (e) {

    e.preventDefault()
    console.log (this.id, 'dragenter')
    
}

function dragLeave () {

    console.log (this.id, 'dragleave')
    
}

function dragDrop () {

    console.log (this.id, 'dragdrop')

    colorBeingReplaced = this.style.backgroundImage
    squareIdBeingReplaced = parseInt(this.id)
    this.style.backgroundImage = colorBeingDragged
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced   
    
}

//drop candies once some have been cleared

function moveDown() {
    for (i=0; i<=55; i++) {
        if (squares[i+width].style.backgroundImage === '') {
            squares[i+width].style.backgroundImage = squares[i].style.backgroundImage
            squares[i].style.backgroundImage = '' 
        }
            const firstRow =[0,1,2,3,4,5,6,7]
            const isFirstRow = firstRow.includes(i)
        if (isFirstRow && squares[i].style.backgroundImage==='') {
                let randomColor = Math.floor(Math.random() * candyColors.length)
                squares[i].style.backgroundImage = candyColors[randomColor]
            }
        
    }
}


//checking for matches
//check for crossing for L Left Down

function checkForCrossingLeftDown () {
    for (i=0; i<=45; i++) {
        let L = [i, i+1,i+2,i+2+width,i+2+width+width]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''

        const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55]

        if(notValid.includes(i)) continue

        if (L.every(index=> squares[index].style.backgroundImage===decidedColor)&&!isBlank) {
            score+=9
            scoreDisplay.innerHTML=score
            L.forEach(index=> {
                squares[index].style.backgroundImage =''
            })
        }
    }

}

checkForCrossingLeftDown()

//check for crossing for L Left Up

function checkForCrossingLeftUp () {
    for (i=0; i<=47; i++) {
        let L = [i,i+width,i+width+width, i+width+width-1,i+width+width-2]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''

        const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55]

        if(notValid.includes(i)) continue

        if (L.every(index=> squares[index].style.backgroundImage===decidedColor)&&!isBlank) {
            score+=9
            scoreDisplay.innerHTML=score
            L.forEach(index=> {
                squares[index].style.backgroundImage =''
            })
        }
    }

}

checkForCrossingLeftUp()


//check for crossing for L Right Up

function checkForCrossingRightUp () {
    for (i=0; i<=45; i++) {
        let L = [i,i+width,i+width+width, i+width+width+1,i+width+width+2]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''

        const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55]

        if(notValid.includes(i)) continue

        if (L.every(index=> squares[index].style.backgroundImage===decidedColor)&&!isBlank) {
            score+=9
            scoreDisplay.innerHTML=score
            L.forEach(index=> {
                squares[index].style.backgroundImage =''
            })
        }
    }

}

checkForCrossingRightUp()

//check for crossing for L Right Down

function checkForCrossingRightDown () {
    for (i=0; i<=45; i++) {
        let L = [i,i+1,i+2,i+width,i+width+width]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''

        const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55]

        if(notValid.includes(i)) continue

        if (L.every(index=> squares[index].style.backgroundImage===decidedColor)&&!isBlank) {
            score+=9
            scoreDisplay.innerHTML=score
            L.forEach(index=> {
                squares[index].style.backgroundImage =''
            })
        }
    }

}

checkForCrossingRightDown()



//check for row of five

function checkRowForFive () {
    for ( i=0; i<= 59; i++) {
        let rowOfFive = [i, i+1,i+2, i+3,i+4]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''

        const notValid = [4,5,6,7,12,13,14,15,20,21,22,23,28,29,30,31,36,37,38,39,44,45,46,47,52,53,54,55]
        if  (notValid.includes(i)) continue

        if ( rowOfFive.every(index => squares[index].style.backgroundImage === decidedColor) && !isBlank) {
            score+=5
            scoreDisplay.innerHTML=score
            rowOfFive.forEach(index => {
            squares[index].style.backgroundImage = ''
            })
         }
    }
}

checkRowForFive()



//check for row of four

function checkRowForFour () {
    for ( i=0; i<= 60; i++) {
        let rowOfFour = [i, i+1,i+2, i+3]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''

        const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55]
        if  (notValid.includes(i)) continue

        if ( rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor) && !isBlank) {
            score+=4
            scoreDisplay.innerHTML=score
            rowOfFour.forEach(index => {
            squares[index].style.backgroundImage = ''
            })
         }
    }
}

checkRowForFour()

//check for row of three

function checkRowForThree () {
    for ( i=0; i<= 61; i++) {
        let rowOfThree = [i, i+1,i+2]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''

        const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55]
        if  (notValid.includes(i)) continue

        if ( rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor) && !isBlank) {
            score+=3
            scoreDisplay.innerHTML=score
            rowOfThree.forEach(index => {
            squares[index].style.backgroundImage = ''
            })
         }
    }
}

checkRowForThree()

//check for column of five

function checkColumnForFive () {
    for ( i=8; i<= 39; i++) {
        let columnOfFive = [i-width, i, i+width, i+width+width, i+width+width+width]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''

    if ( columnOfFive.every(index => squares[index].style.backgroundImage === decidedColor) && !isBlank) {
        score+=5
        scoreDisplay.innerHTML=score
        columnOfFive.forEach(index => {
            squares[index].style.backgroundImage = ''
         })
        }
    }
}

checkColumnForFive()

//check for column of four

function checkColumnForFour () {
    for ( i=8; i<= 47; i++) {
        let columnOfFour = [i-width, i, i+width, i+width+width]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''

    if ( columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor) && !isBlank) {
        score+=4
        scoreDisplay.innerHTML=score
        columnOfFour.forEach(index => {
            squares[index].style.backgroundImage = ''
         })
        }
    }
}

checkColumnForFour()




//check for column of three

function checkColumnForThree () {
    for ( i=0; i<= 47; i++) {
        let columnOfThree =  [i, i+width, i+width+width]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''

    if ( columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor) && !isBlank) {
        score+=3
        scoreDisplay.innerHTML=score
        columnOfThree.forEach(index => {
            squares[index].style.backgroundImage = ''
         })
        }
    }
}

checkColumnForThree()

//time counting

const startingMinutes = 0.5
let time = startingMinutes*60

const timer = setInterval(updateCountDown,1000)

function updateCountDown() {
    const minutes = Math.floor(time/60)
    let seconds = time%60
    timeDisplay.innerHTML = minutes+':'+seconds
    time--
    if (time < 0) {
        clearInterval(timer);
        clearInterval(makeMove);
        timeDisplay.innerHTML = "TIME OUT!"
    }
}









const makeMove = window.setInterval(function(){
    moveDown(),
    checkForCrossingLeftDown(),
    checkForCrossingLeftUp(),
    checkForCrossingRightDown(),
    checkForCrossingRightUp(),
    checkRowForFive(),
    checkColumnForFive(),
    checkColumnForFour(),
    checkRowForFour(),
    checkColumnForThree(),
    checkRowForThree()
},100)



})