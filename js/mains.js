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
        gCtx.font = `${line.size}px Arial`
        gCtx.fillStyle = line.color
        gCtx.textAlign = 'center'
        gCtx.textBaseline = 'top'
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