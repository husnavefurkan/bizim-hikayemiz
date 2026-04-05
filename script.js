// script.js

// Türkçe büyük harf dönüşümü
function toTurkishUpper(str) {
    return str.toLocaleUpperCase('tr-TR');
}

const gridContainer = document.getElementById('puzzleGrid');
const size = 21; // 21x21 Matris
const totalCells = size * size;

// GRID VERİSİ: [Kelime, BaşlangıçRow, BaşlangıçCol, Yön (0:Yatay, 1:Dikey), msgTarget]
const words = [
    // Yatay Kelimeler
    { word: "PEKTABİİ", r: 3, c: 3, d: 0, msg: [null, null, null, null, null, null, 1, null] },
    { word: "ERKENCİKUŞ", r: 5, c: 8, d: 0, msg: [null, null, null, null, null, null, 13, null, null, null] },
    { word: "PİLAV", r: 8, c: 8, d: 0, msg: [null, null, null, null, null] },
    { word: "FISTIĞIM", r: 12, c: 7, d: 0, msg: [null, 2, null, null, null, null, null, 10] },
    { word: "MANGROV", r: 12, c: 14, d: 0, msg: [null, null, null, null, null, null, null] },
    { word: "MEYDAN", r: 14, c: 0, d: 0, msg: [null, null, 14, null, null, null] },
    { word: "ALİATAY", r: 16, c: 9, d: 0, msg: [null, null, null, null, null, null, null] },
    { word: "BAVUL", r: 18, c: 16, d: 0, msg: [null, null, null, null, 12] },
    { word: "DOĞUKAN", r: 19, c: 2, d: 0, msg: [null, null, null, null, null, null, null] },
    { word: "HALBUKİ", r: 21, c: 7, d: 0, msg: [null, null, null, null, null, 11, null] },
    { word: "MANGAL", r: 22, c: 14, d: 0, msg: [null, null, null, null, null, null] },
    { word: "ÇAY", r: 23, c: 10, d: 0, msg: [null, null, null] },
    { word: "TAŞDUVARLAR", r: 26, c: 12, d: 0, msg: [null, null, null, null, null, null, null, null, null, null, null] },
    { word: "YALASAM", r: 28, c: 11, d: 0, msg: [null, null, null, null, null, null, null] },
    { word: "NAZAR", r: 30, c: 13, d: 0, msg: [null, null, null, null, null] },
    { word: "ZOOTOPİA", r: 31, c: 12, d: 0, msg: [null, null, null, null, null, null, null, 15] },
    { word: "FENER", r: 32, c: 4, d: 0, msg: [null, null, 9, null, null] },
    { word: "OYUNHAMURU", r: 34, c: 11, d: 0, msg: [null, null, null, null, null, null, null, null, null, null] },
    { word: "AŞKIM", r: 37, c: 12, d: 0, msg: [null, null, null, null, null] },

    // Dikey Kelimeler
    { word: "SEKİZŞUBAT", r: 1, c: 4, d: 1, msg: [3, null, null, null, null, null, null, null, null, null] },
    { word: "İMEJE", r: 2, c: 13, d: 1, msg: [null, null, null, null, null] },
    { word: "BETÜL", r: 4, c: 11, d: 1, msg: [null, null, null, null, null] },
    { word: "PAPATYA", r: 6, c: 10, d: 1, msg: [null, null, null, null, null, null, null] },
    { word: "SWIFT", r: 7, c: 8, d: 1, msg: [null, null, null, null, null] },
    { word: "GANİTA", r: 9, c: 15, d: 1, msg: [null, null, null, null, null, null] },
    { word: "ÖFKE", r: 10, c: 0, d: 1, msg: [null, null, null, null] },
    { word: "KOÇ", r: 11, c: 18, d: 1, msg: [null, null, null] },
    { word: "YILDIZ", r: 15, c: 2, d: 1, msg: [null, null, null, null, null, null] },
    { word: "AYNA", r: 17, c: 12, d: 1, msg: [null, null, null, null] },
    { word: "BİM", r: 18, c: 16, d: 1, msg: [null, null, null] }, // Bavul ile çakışıyor
    { word: "ANİME", r: 19, c: 7, d: 1, msg: [null, null, null, null, null] },
    { word: "ÜLKESİ", r: 21, c: 7, d: 1, msg: [null, null, null, null, 5, null] }, // HalbuKi ile çakışıyor
    { word: "BALARISI", r: 23, c: 10, d: 1, msg: [8, null, null, null, null, null, null, null] }, // Çay ile çakışıyor
    { word: "KREMSANTİ", r: 25, c: 12, d: 1, msg: [null, null, null, null, null, null, null, null, null] }, // TaşDuvarlar ile çakışıyor
    { word: "TEŞEKKÜR", r: 26, c: 12, d: 1, msg: [null, null, null, null, null, null, null, null] }, // TaşDuvarlar ile çakışıyor
    { word: "TAZEBAHÇE", r: 29, c: 15, d: 1, msg: [null, null, null, null, null, null, null, null, null] }, // Nazar ile çakışıyor
    { word: "ELBETTE", r: 32, c: 6, d: 1, msg: [null, null, null, null, null, null, 4] }, // Fener ile çakışıyor
    { word: "NAZ", r: 37, c: 12, d: 1, msg: [null, null, 7] } // Aşkım ile çakışıyor
];

// Matrisi boş oluştur
const gridMap = Array(totalCells).fill(null);

// Kelimeleri matrise işle
words.forEach(w => {
    for (let i = 0; i < w.word.length; i++) {
        const row = w.d === 0 ? w.r : w.r + i;
        const col = w.d === 0 ? w.c + i : w.c;
        if (row < size && col < size) {
            const index = row * size + col;
            const targetMsgId = (w.msg && w.msg[i]) ? w.msg[i] : null;
            
            // Eğer hücre doluysa msgTarget'ı güncelle (çakışmalar için)
            if (gridMap[index]) {
                if (targetMsgId) gridMap[index].msgTarget = targetMsgId;
            } else {
                gridMap[index] = { char: w.word[i], msgTarget: targetMsgId };
            }
        }
    }
});

// Şifre kutularını oluştur (İYİ Kİ BENİMLESİN - 15 Harf)
function setupSecret() {
    const w1 = [1, 2, 3], w2 = [4, 5], w3 = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    w1.forEach(id => document.getElementById('w1').innerHTML += `<div class="msg-box" id="msg-${id}">?</div>`);
    w2.forEach(id => document.getElementById('w2').innerHTML += `<div class="msg-box" id="msg-${id}">?</div>`);
    w3.forEach(id => document.getElementById('w3').innerHTML += `<div class="msg-box" id="msg-${id}">?</div>`);
}

// Grid'i ekrana bas
function initGrid() {
    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        const item = gridMap[i];

        if (item) {
            const input = document.createElement('input');
            input.maxLength = 1;
            input.dataset.ans = item.char;

            if (item.msgTarget) {
                cell.classList.add('pink');
                const numSpan = document.createElement('span');
                numSpan.className = 'num';
                numSpan.innerText = item.msgTarget;
                cell.appendChild(numSpan);
                input.dataset.target = item.msgTarget;
            }
            cell.appendChild(input);
        } else {
            cell.style.background = "transparent";
        }
        gridContainer.appendChild(cell);
    }
}

// Giriş dinleyici
gridContainer.addEventListener('input', (e) => {
    const input = e.target;
    const val = toTurkishUpper(input.value);
    const correctAns = input.dataset.ans;
    const targetId = input.dataset.target;

    if (val === correctAns) {
        input.style.color = "#4dff88";
        if (targetId) {
            const msgBox = document.getElementById(`msg-${targetId}`);
            if (msgBox) {
                msgBox.innerText = val;
                msgBox.classList.add('filled');
            }
        }
    } else {
        input.style.color = "#ff4d4d";
    }
});

setupSecret();
initGrid();