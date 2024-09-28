'use strict'
function renderGallery() {
    var imgs = getImgs()
    let elGallery = document.querySelector('.gallery')
    const uploadInputHtml = `<button class="file-input-btn">
    <input type="file" class="file-input btn" name="img" onchange="onImgInput(event)" /></button>`
    let strHtmls = imgs.map((img) => {
        return `<img src="${img.url}" alt=""onclick="onClickImg(${img.id})">`
    })
    elGallery.innerHTML = uploadInputHtml + strHtmls.join('')
    keyWordsSize()
}

function keyWordsSize() {
    const keys = getKeyWords()
    const keysButtons = document.querySelectorAll('.filter-btn')
    keysButtons.forEach((btn) => {
        if (btn.innerHTML === 'all' || btn.innerHTML === 'more...') return
        const changingKey = document.querySelectorAll(`.${btn.innerHTML}`)
        changingKey.forEach((keyElement) => {
            keyElement.style.fontSize = `${keys[btn.innerHTML]}px`
        })
    })
}