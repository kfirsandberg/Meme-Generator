'use strict'
let gCtx
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }] 
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: {
            txt: 'I sometimes eat Falafel', size: 20,
            color: 'red'
        }
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function onInit() {
    const canvas = document.getElementById('canvas')
    gCtx = canvas.getContext('2d')
    renderMeme()
}

function renderMeme(img){
    const elImg = new Image()
    elImg.src = '/img/meme-imgs (square)/1.jpg'
    // elImg.src = img.url
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
        addingTextLine()
    }
}

function addingTextLine(){
    gCtx.font = '40px Arial'
    gCtx.fillStyle = '#000000'
    gCtx.textAlign = 'center'         
    gCtx.textBaseline = 'top'
    gCtx.fillText('Hello Canvas!', canvas.width / 2, canvas.height / 2)
}