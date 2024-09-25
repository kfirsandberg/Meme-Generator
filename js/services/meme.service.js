var gCurrLineIdx = 0
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [{
        txt: '',
        size: 20,
        color: 'white',
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
    gMeme.lines.pop()
}

function getCrnLine() {
    return gMeme.lines[gCurrLineIdx]
}

function getLines(){
    return gMeme.lines
}
function switchLine(){
    console.log(gCurrLineIdx)
    if (gCurrLineIdx< gMeme.lines.length) gCurrLineIdx++
    else gCurrLineIdx ===0
}
function _createLine(){
    return {
        txt: '',
        size: 20,
        color: 'white',
        posY : 20
    }
}