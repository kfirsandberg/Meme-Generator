let boxX
let boxY
let boxWidth
let boxHeight
function onClickImg(imgId) {
    const gallery = document.querySelector('.gallery-container')
    gallery.style.display = 'none'
    const editor = document.querySelector('.meme-editor')
    editor.style.display = 'grid'
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

function onClickColor() {
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
        gCtx.strokeStyle = line.stroke
        gCtx.lineWidth = 5
        if (line.isInBox) {
            const textWidth = gCtx.measureText(line.txt).width
            const textHeight = line.size
            const boxPadding = 10
            line.boxPos = {
                x: line.posX - (textWidth / 2) - boxPadding,
                y: line.posY - boxPadding,
                width: textWidth + boxPadding * 2,
                height: line.size + boxPadding * 2
            };
            const { x, y, width, height } = line.boxPos
            gCtx.strokeRect(x, y, width, height)
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