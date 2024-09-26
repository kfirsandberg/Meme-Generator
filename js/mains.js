'use strict'
let gCtx
let memeImg
let gLastPos
let gIsMove

const canvas = document.getElementById('canvas')
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
// var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function onInit() {
    gCtx = canvas.getContext('2d')
    renderGallery()
    renderMeme()
    addListeners()
}
function addListeners() {
    addMouseListeners()
    addTouchListeners()
}
function addMouseListeners() {
    canvas.addEventListener('mousedown', onDown)
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    canvas.addEventListener('touchstart', onDown)
    canvas.addEventListener('touchmove', onMove)
    canvas.addEventListener('touchend', onUp)
}
function onDown(ev) {
    const pos = getEvPos(ev)
    const boxPos = canvas.getBoundingClientRect()
    document.body.style.cursor = 'grabbing'
    gIsMove = isBox(pos, boxPos)
}

function isBox(pos,boxPos){
    if (pos.x >= boxPos.x && pos.x <= boxPos.x + boxPos.width && pos.y >= boxPos.y && pos.y <= boxPos.y + boxPos.height) {
        return true
    }
    else return false
}

function onMove(ev) {
    const pos = getEvPos(ev)
    if (gIsMove)onMoveMeme(pos)
    else return
}

function onUp() {
    gIsMove = false
    document.body.style.cursor = ''
}


function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.clientX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.clientY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

