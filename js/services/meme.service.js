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
}

function setAlignment(alignment) {
    const line = getCrnLine()
    console.log(line.boxPos.x)

    if (!line) return
    const textWidth = gCtx.measureText(line.txt)
    console.log(textWidth)
    if (alignment === 'center'){
        line.alignment = alignment
        setBoxPos()
    } 
    else if (alignment === 'right') {
        line.boxPos.x -= 40
        line.alignment = alignment
    } else if (alignment === 'left') {
        line.boxPos.x += 40
        line.alignment = alignment
    }
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
    const textWidth = gCtx.measureText(line.txt).width
    const boxPadding = 10
    line.boxPos = {
        x: line.posX - (textWidth / 2) - boxPadding,
        y: line.posY - boxPadding,
        width: textWidth + boxPadding * 2,
        height: line.size + boxPadding * 2
    };
}

function getBoxPos() {
    const line = getCrnLine()
    return line.boxPos
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
        posX: gCtx.canvas.width / 2,
        isInBox: true,
        boxPos: {}
    }
}
