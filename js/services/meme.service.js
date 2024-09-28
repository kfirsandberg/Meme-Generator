var gCurrLineIdx
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
function setSavedMeme(meme){  
    gMeme = meme.gMeme
    gCurrLineIdx = gMeme.lines.length -1
}
function setLineText(txt) {
    const line = getCrnLine()
    if (!line) {
        showModal()
        document.getElementById('text').value = ''
        return
    }
    line.txt = txt
    setBoxPos()
}

function setLineFont(font) {
    const line = getCrnLine()
    if (!line) return
    line.font = font
    setBoxPos()
}

function setAlignment(alignment) {
    const line = getCrnLine()
    if (!line) return
    const canvasWidth = gCtx.canvas.width
    const textWidth = gCtx.measureText(line.txt).width
    line.alignment = alignment
    if (alignment === 'center') {
        line.posX = canvasWidth / 2  
    } else if (alignment === 'right') {
        line.posX = canvasWidth - textWidth / 2 
    } else if (alignment === 'left') {
        line.posX = textWidth / 2 
    }
    setBoxPos()
}

function setLineColor(color) {
    const line = getCrnLine()
    if (!line) return
    line.color = color
}

function setStrokeColor(color) {
    const line = getCrnLine()
    if (!line) return
    line.stroke = color
}

function setLineFontSize(size) {
    const line = getCrnLine()
    if (!line) return
    line.size += size
    setBoxPos()
}

function addLine() {
    if (gMeme.lines.length === 0) {
        gCurrLineIdx = 0
        const newLine = _createLine()
        gMeme.lines.push(newLine)
        setBoxPos()
    } else {
        if (gCurrLineIdx >= 0) {
            const line = getCrnLine()
            line.isInBox = false
        }
        gCurrLineIdx++
        let newLine = _createLine()
        if (gCurrLineIdx === 1) newLine.posY = 400
        if (gCurrLineIdx > 1) newLine.posY = 200
        gMeme.lines.push(newLine)
        setBoxPos()
    }

}

function setMoveMeme(pos) {
    const line = getCrnLine()
    if (!line) return
    line.posX = pos.x
    line.posY = pos.y
    setBoxPos()

}

function removeLine() {
    gMeme.lines.splice(gCurrLineIdx, 1)
    gCurrLineIdx
}

function getCrnLine() {
    return gMeme.lines[gCurrLineIdx]
}

function switchLine() {
    const linesLength = gMeme.lines.length
    if (gCurrLineIdx === -1 || linesLength === 0) return
    var line = getCrnLine()
    if (line) line.isInBox = false
    if (gCurrLineIdx >= linesLength - 1) gCurrLineIdx = 0
    else gCurrLineIdx++
    var line = getCrnLine()
    line.isInBox = true
    document.getElementById('text').value = line.txt
    setBoxPos()

}

function getLines() {
    return gMeme.lines
}

function isBox(pos) {
    const line = getCrnLine()
    if (!line) return
    const { x, y, width, height } = line.boxPos
    if (pos.x >= x && pos.x <= x + width && pos.y >= y && pos.y <= y + height) {
        line.isInBox = true
        return true
    }
    else {
        line.isInBox = false
        return false
    }
}

function setBoxPos() {
    const line = getCrnLine()
    if (!line) return

    const textWidth = gCtx.measureText(line.txt).width
    const boxPadding = 10

    if (line.alignment === 'center') {
        line.boxPos = {
            x: line.posX - textWidth / 2 - boxPadding,  
            y: line.posY - boxPadding,
            width: textWidth + boxPadding * 2,
            height: line.size + boxPadding * 2
        }
    } else if (line.alignment === 'right') {
        line.boxPos = {
            x: line.posX - textWidth - boxPadding, 
            y: line.posY - boxPadding,
            width: textWidth + boxPadding * 2,
            height: line.size + boxPadding * 2
        }
    } else if (line.alignment === 'left') {
        line.boxPos = {
            x: line.posX - boxPadding, 
            y: line.posY - boxPadding,
            width: textWidth + boxPadding * 2,
            height: line.size + boxPadding * 2
        }
    }
}

function getBoxPos() {
    const line = getCrnLine()
    return line.boxPos
}

function _createLine(txt='') {
    return {
        txt,
        size: 60,
        color: 'white',
        stroke: 'black',
        font: 'impact',
        alignment: 'center',
        posY: 30,
        posX: gCtx.canvas.width / 2,
        isInBox: true,
        boxPos: {}
    }   

}

function onFlexBtn(){
    var newLine = _createLine('i like falafel!')
    newLine.isInBox= false  
    newLine.posX = 250
    gMeme.lines.push(newLine)
    gCurrLineIdx =0
}

function clearLines(){
    gMeme.lines =[]
}