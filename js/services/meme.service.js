var gCurrLineIdx = 0
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [{
        txt: '',
        size: 50,
        color: 'white',
        font : 'impact',
        alignment : 'center',
        posY : 20
    }]
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
function moveText(posY) {
    const line = getCrnLine()
    line.posY += posY
}
function setAlignment(alignment) {
    const line = getCrnLine()
    line.alignment = alignment
}
function setLineColor(color) {
    const line = getCrnLine()
    line.color = color
}
function setLineFontSize(size) {
    const line = getCrnLine()
    line.size += size
}
function addLine(){
    gCurrLineIdx++
    const newLine = _createLine()
    if (gCurrLineIdx===1) newLine.posY = 400
    if (gCurrLineIdx>1) newLine.posY = 200
    gMeme.lines.push(newLine)
}
function removeLine(){
    gCurrLineIdx--
    gMeme.lines.pop()
}

function getCrnLine() {
    return gMeme.lines[gCurrLineIdx]
}

function getLines(){
    return gMeme.lines
}
function switchLine(){
    if (gCurrLineIdx===0) return
    if (gCurrLineIdx< gMeme.lines.length) gCurrLineIdx++
    else gCurrLineIdx ===0
}
function _createLine(){
    return {
        txt: '',
        size: 60    ,
        color: 'white',
        font : 'impact',
        alignment : 'center',
        posY : 20
    }
}