'use strict'
function renderGallery(){
    var imgs = getImgs()
    let elGallery = document.querySelector('.gallery-container')
    let strHtmls = gImgs.map((img) => {
        return `<img src="${img.url}" alt=""onclick="onClickImg(${img.id})">`
    })
    elGallery.innerHTML = strHtmls.join('')
}