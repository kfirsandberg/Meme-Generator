let boxX
let boxY
let boxWidth
let boxHeight
function onClickImg(imgId) {
    const gallery = document.querySelector('.gallery-container')
    gallery.style.display = 'none'
    const searchBox = document.querySelector('.search-box')
    searchBox.style.display = 'none'
    const editor = document.querySelector('.meme-editor')
    editor.classList.add('show')
    const content = document.querySelector('.content-container')
    content.style.display = 'none'
    const imgContainer = document.querySelector('.img-container')
    imgContainer.style.display = 'none'

    setImgId(imgId)
    renderMeme()
}
function onClickSavedMeme(id) {
    const savedGallery = getSavedMemes()
    setSavedMeme(savedGallery[id])
    const gallery = document.querySelector('.gallery-container')
    gallery.style.display = 'none'
    const searchBox = document.querySelector('.search-box')
    searchBox.style.display = 'none'
    const editor = document.querySelector('.meme-editor')
    editor.classList.add('show')
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

function onStrokeColor() {
    const strokeColor = document.getElementById('stroke-Color').value
    setStrokeColor(strokeColor)
    renderMeme()
}

function onChangeFontSize(elValue) {
    setLineFontSize(elValue)
    renderMeme()
}

function onAddLine() {
    addLine()
    document.getElementById('text').value = ''
    renderMeme()
}

function onRemoveLine() {
    removeLine()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
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

function onMoveMeme(pos) {
    setMoveMeme(pos)
    renderMeme()
}

function renderMeme() {
    const meme = getMeme()
    if (gUploadedImg) {
        gCtx.canvas.width = 500
        gCtx.canvas.height = 500
        gCtx.drawImage(gUploadedImg, 0, 0, 500, 500)
        renderLines()

    } else {
        const memeImg = getImg(meme.selectedImgId)
        let elImg = new Image()
        elImg.src = memeImg.url
        elImg.onload = () => {
            gCtx.canvas.width = elImg.naturalWidth
            gCtx.canvas.height = elImg.naturalHeight
            gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
            renderLines()
        }

    }
}

function renderLines() {
    const lines = getLines()
    lines.forEach((line) => {
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.fillStyle = line.color
        gCtx.textAlign = line.alignment
        gCtx.textBaseline = 'top'
        gCtx.strokeStyle = line.stroke
        gCtx.lineWidth = 5
        if (line.isInBox) {
            const boxPox = getBoxPos()
            gCtx.strokeRect(boxPox.x, boxPox.y, boxPox.width, boxPox.height)
        }
        else {
            gCtx.strokeRect(0, 0, 0, 0)
        }
        gCtx.strokeText(line.txt, line.posX, line.posY)
        gCtx.fillText(line.txt, line.posX, line.posY)
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

