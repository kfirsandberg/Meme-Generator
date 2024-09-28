'use strict'
let gCtx
let memeImg
let gLastPos
let gIsBox

const canvas = document.getElementById('canvas')
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

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
    const gallery = document.querySelector('.gallery-container')
    gallery.style.display = 'grid'
    const editor = document.querySelector('.meme-editor')
    editor.classList.remove('show')
    clearLines()
    document.querySelector('.text-input').value =''
    const searchbox = document.querySelector('.search-box')
    searchbox.style.display = 'flex'

}

function showModal() {
    const elModal = document.querySelector('.action-dialog')
    elModal.showModal()
    setTimeout(() => { elModal.close() }, 1000);
}

function onShareFacebook(url) {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
}


function onShare() {
    const canvasData = canvas.toDataURL('image/jpeg')
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <button class="share-btn" onclick="window.location.href='${uploadedImgUrl}'">API</button>
        <button class="share-btn facebook" onclick="onShareFacebook('${encodedUploadedImgUrl}')">Share</button>`
    }
    uploadImg(canvasData, onSuccess)
}

function onFilterImgs(value) {
    filterImgs(value)
    renderGallery()

}
function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    const reader = new FileReader()

    reader.onload = (event) => {
        const img = new Image()
        img.src = event.target.result

        img.onload = () => {
            onImageReady(img)
        }
    }

    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function onFlexible(){
    const gallery = document.querySelector('.gallery-container')
    gallery.style.display = 'none'
    const searchBox = document.querySelector('.search-box')
    searchBox.style.display = 'none'
    const editor = document.querySelector('.meme-editor')
    editor.classList.add('show')
    setImgId(getRandomInt(1,18))
    onFlexBtn()
    renderMeme()
}

function onMemesCLick(){

}