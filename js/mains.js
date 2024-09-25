'use strict'
let gCtx
let memeImg
// var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
function onInit() {
    const canvas = document.getElementById('canvas')
    gCtx = canvas.getContext('2d')
}
function onClickImg(imgId) {
    setImgId(imgId)
    renderMeme()
}
function onChangeText() {
    const txt = document.getElementById('text').value
    setLineText(txt)
    renderMeme()
}
function onChangeFont(font) {
    setLineFont(font)
    renderMeme()

}
function onChangeColor() {
    const color = document.getElementById('color').value
    setLineColor(color)
    renderMeme()
}
function onChangeFontSize(value) {
    setLineFontSize(value)
    renderMeme()
}
function onAddLine() {
    addLine()
    renderMeme()
}
function onRemoveLine() {
    removeLine()
    renderMeme()
}
function onSwitchLine() {
    switchLine()
}
function onRightAlignment() {
    setAlignment('right')
    renderMeme()
}
function onLeftAlignment() {
    setAlignment('left')
    renderMeme()
}
function onCenterAlignment() {
    setAlignment('center')
    renderMeme()
}
function onUp(){
    moveText(-10)
    renderMeme()
}

function onDown(){
    moveText(10)
    renderMeme()
}
function renderMeme() {
    const meme = getMeme()
    const memeImg = getImg(meme.selectedImgId)
    let elImg = new Image()
    elImg.src = memeImg.url
    const line = getCrnLine()
    elImg.onload = () => {
        gCtx.canvas.width = elImg.naturalWidth
        gCtx.canvas.height = elImg.naturalHeight
        gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
        renderLines()
    }
}

function renderLines() {
    const lines = getLines()
    lines.forEach((line) => {
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.fillStyle = line.color
        gCtx.textAlign = line.alignment
        gCtx.textBaseline = 'top'
        gCtx.strokeStyle = '#000000'
        gCtx.fillText(line.txt, (gCtx.canvas.width / 2), line.posY)
    })
}

function onDownload() {
    const canvas = document.getElementById('canvas')
    const image = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = image
    link.download = 'canvas-image.png'
    link.click()
}