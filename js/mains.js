'use strict'
let gCtx
let memeImg
let gLastPos
let gIsBox

const canvas = document.getElementById('canvas')
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
// var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function onInit() {
    gCtx = canvas.getContext('2d')
    renderGallery()
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
    document.body.style.cursor = 'grabbing'
    gIsBox = isBox(pos)
    if (!gIsBox) {
        console.log('k')
        renderMeme()
    }
}

function onMove(ev) {
    const pos = getEvPos(ev)
    if (gIsBox) onMoveMeme(pos)
    else return
}

function onUp() {
    gIsBox = false
    document.body.style.cursor = ''
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    return pos
}

function onGalleryCLick() {
    const gallery = document.querySelector('.gallery')
    gallery.style.display = 'grid'
    const editor = document.querySelector('.meme-editor')
    editor.style.display = 'none'
    const searchbox = document.querySelector('.search-box')
    searchbox.style.display = 'flex'
    
}

function showModal() {
    const elModal = document.querySelector('.action-dialog')
    elModal.showModal()
    setTimeout(() => { elModal.close() }, 1000);
}