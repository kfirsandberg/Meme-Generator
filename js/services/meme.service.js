var gCurrLineIdx = -1
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: []
}
function getMeme() {
    return gMeme
}

function setImgId(id) {
    gMeme.selectedImgId = id
}

function setLineText(txt) {
    const line = getCrnLine()
    line.txt = txt
}

function setLineFont(font) {
    const line = getCrnLine()
    line.font = font
}

function setAlignment(alignment) {
    const line = getCrnLine()
    line.alignment = alignment
}
function setLineColor(color) {
    const line = getCrnLine()
    line.color = color
}

function setStrokeColor(color) {
    const line = getCrnLine()
    line.stroke = color
}

function setLineFontSize(size) {
    const line = getCrnLine()
    line.size += size
}

function addLine() {
    gCurrLineIdx++
    const newLine = _createLine()
    if (gCurrLineIdx === 1) newLine.posY = 400
    if (gCurrLineIdx > 1) newLine.posY = 200
    gMeme.lines.push(newLine)
}
function setMoveMeme(pos) {
    const line = getCrnLine()
    line.posX = pos.x
    line.posY = pos.y
}

function removeLine() {
    gCurrLineIdx--
    gMeme.lines.pop()
}

function getCrnLine() {
    return gMeme.lines[gCurrLineIdx]
}

function getLines() {
    return gMeme.lines
}

function switchLine() {
    if (gCurrLineIdx === 0) return
    if (gCurrLineIdx < gMeme.lines.length) gCurrLineIdx++
    else gCurrLineIdx === 0
}

function _createLine() {
    return {
        txt: '',
        size: 60,
        color: 'white',
        stroke: 'black',
        font: 'impact',
        alignment: 'center',
        posY: 30,
        posX: gCtx.canvas.width / 2
    }
}

// function moveText(posY) {
//     const line = getCrnLine()
//     line.posY += posY
// }