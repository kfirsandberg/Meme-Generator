'use strict'
const MEMES_KEY = 'MEMES'
let gSavedMemes =[]
var gKeywordSearchCountMap = { 'funny': 19, 'politics': 26, 'animals': 14, 'celebrities': 10 }
const gImgs = [
    { id: 1, url: 'img/meme-imgs (square)/1.jpg', keywords: ['politics', 'celebrities', 'people'] },
    { id: 2, url: 'img/meme-imgs (square)/2.jpg', keywords: ['animals', 'cute', 'kissing'] },
    { id: 3, url: 'img/meme-imgs (square)/3.jpg', keywords: ['kids', 'animals',] },
    { id: 4, url: 'img/meme-imgs (square)/4.jpg', keywords: ['sleeping', 'animals'] },
    { id: 5, url: 'img/meme-imgs (square)/5.jpg', keywords: ['kids', 'funny'] },
    { id: 6, url: 'img/meme-imgs (square)/6.jpg', keywords: ['funny', 'people'] },
    { id: 7, url: 'img/meme-imgs (square)/7.jpg', keywords: ['funny', 'kids'] },
    { id: 8, url: 'img/meme-imgs (square)/8.jpg', keywords: ['funny', 'kids', 'celebrities'] },
    { id: 9, url: 'img/meme-imgs (square)/9.jpg', keywords: ['funny', 'kids'] },
    { id: 10, url: 'img/meme-imgs (square)/10.jpg', keywords: ['celebrities', 'politics', 'people'] },
    { id: 11, url: 'img/meme-imgs (square)/11.jpg', keywords: ['kissing', 'funny', 'people'] },
    { id: 12, url: 'img/meme-imgs (square)/12.jpg', keywords: ['celebrities', 'funny'] },
    { id: 13, url: 'img/meme-imgs (square)/13.jpg', keywords: ['celebrities', 'people', 'movies'] },
    { id: 14, url: 'img/meme-imgs (square)/14.jpg', keywords: ['celebrities', 'movies'] },
    { id: 15, url: 'img/meme-imgs (square)/15.jpg', keywords: ['celebrities', 'people'] },
    { id: 16, url: 'img/meme-imgs (square)/16.jpg', keywords: ['movies', 'people'] },
    { id: 17, url: 'img/meme-imgs (square)/17.jpg', keywords: ['politics', 'people'] },
    { id: 18, url: 'img/meme-imgs (square)/18.jpg', keywords: ['movies', 'kids'] }]
let gFilterImgs = gImgs
function getImgs() {
    return gFilterImgs
}

function getImg(id) {
     return gImgs[id - 1]
}


function filterImgs(keyWord) {
    gKeywordSearchCountMap[keyWord] += 1
    if (keyWord === 'all') gFilterImgs = gImgs
    else {
        gFilterImgs = gImgs.filter(img => {
            return img.keywords.includes(keyWord)
        })
    }
}

function getKeyWords() {
    return gKeywordSearchCountMap
}

function getSavedMemes(){
    gSavedMemes = loadFromStorage(MEMES_KEY)
    if (gSavedMemes && gSavedMemes.length !== 0) return gSavedMemes
    else {
        gSavedMemes = [
            {id:0,
                url: 'img/saved- memes/canvas-image (5).png',
                gMeme: {
                    selectedImgId: 13,
                    selectedLineIdx: 0,
                    lines: [
                        {
                            "txt": "i like falafel!",
                            "size": 60,
                            "color": "white",
                            "stroke": "black",
                            "font": "impact",
                            "alignment": "center",
                            "posY": 30,
                            "posX": 250,
                            "isInBox": false,
                            "boxPos": {}
                        }
                    ]
                }
            },
            {id:1,
                url: 'img/saved- memes/canvas-image (6).png',
                gMeme: {
                    selectedImgId: 9,
                    selectedLineIdx: 0,
                    lines: [
                        {
                            "txt": "i like falafel!",
                            "size": 60,
                            "color": "white",
                            "stroke": "black",
                            "font": "impact",
                            "alignment": "center",
                            "posY": 30,
                            "posX": 250,
                            "isInBox": false,
                            "boxPos": {}
                        }
                    ]
                }
            }
        ]
        
    }
    return gSavedMemes  
}

function addNewMeme(newMeme) {
    newMeme.id = (gSavedMemes.length)
    gSavedMemes.push(newMeme)
    saveToStorage(MEMES_KEY,gSavedMemes)
}