// script.js

// Türkçe büyük harf dönüşümü için yardımcı fonksiyon
function toTurkishUpper(str) {
    return str.toLocaleUpperCase('tr-TR');
}

const gridContainer = document.getElementById('puzzleGrid');
const size = 12; // 12x12 Grid
const totalCells = size * size;

// Grid Verisi: index, type, text/ans, msgId
// index = (row * size) + col
const data = {
    // 1. MEYDAN (Satır 1, Sütun 1'den başlar)
    12: { type: 'q', text: 'İlk Buluşma? →' },
    13: { type: 'i', ans: 'M', msg: 10 }, // BENİMLESİN'in M'si (10. harf)
    14: { type: 'i', ans: 'E', msg: 7 },  // BENİMLESİN'in E'si (7. harf)
    15: { type: 'i', ans: 'Y', msg: 2 },  // İYİ'nin Y'si (2. harf)
    16: { type: 'i', ans: 'D', msg: null },
    17: { type: 'i', ans: 'A', msg: null },
    18: { type: 'i', ans: 'N', msg: 8 },  // BENİMLESİN'in N'si (8. harf)

    // 2. BİLEKLİK (Sütun 3, Satır 0'dan dikey)
    3:  { type: 'q', text: 'Hediye? ↓' },
    15: { type: 'i', ans: 'Y', msg: 2 }, // MEYDAN ile çakışıyor
    27: { type: 'i', ans: 'B', msg: 6 }, // BENİMLESİN'in B'si (6. harf)
    39: { type: 'i', ans: 'İ', msg: 1 }, // İYİ'nin İ'si (1. harf)
    51: { type: 'i', ans: 'L', msg: 11 },// BENİMLESİN'in L'si (11. harf)
    63: { type: 'i', ans: 'E', msg: 12 },// BENİMLESİN'in E'si (12. harf)
    75: { type: 'i', ans: 'K', msg: 4 }, // Kİ'nin K'si (4. harf)
    87: { type: 'i', ans: 'L', msg: null },
    99: { type: 'i', ans: 'İ', msg: 3 }, // İYİ'nin İ'si (3. harf)
    111:{ type: 'i', ans: 'K', msg: null },

    // 3. ERKENCİKUŞ (Satır 4, Sütun 5'ten başlar)
    53: { type: 'q', text: 'İlk Dizi? →' },
    54: { type: 'i', ans: 'E', msg: null },
    55: { type: 'i', ans: 'R', msg: null },
    56: { type: 'i', ans: 'K', msg: null },
    57: { type: 'i', ans: 'E', msg: null },
    58: { type: 'i', ans: 'N', msg: 15 }, // BENİMLESİN'in son N'si (15. harf)
    59: { type: 'i', ans: 'C', msg: null },
    60: { type: 'i', ans: 'İ', msg: 5 },  // Kİ'nin İ'si (5. harf)
    61: { type: 'i', ans: 'K', msg: null },
    62: { type: 'i', ans: 'U', msg: null },
    63: { type: 'i', ans: 'Ş', msg: null },

    // 4. GANİTA (Sütun 8, Satır 2'den dikey)
    20: { type: 'q', text: 'İlk Yer? ↓' },
    32: { type: 'i', ans: 'G', msg: null },
    44: { type: 'i', ans: 'A', msg: null },
    56: { type: 'i', ans: 'N', msg: null }, // ERKENCİKUŞ ile çakışıyor (K yerine N koyduk düzeltme için)
    68: { type: 'i', ans: 'İ', msg: 9 },  // BENİMLESİN'in İ'si (9. harf)
    80: { type: 'i', ans: 'T', msg: null },
    92: { type: 'i', ans: 'A', msg: null },

    // 5. BİM (Satır 8, Sütun 1'den başlar)
    97: { type: 'q', text: 'Ne aradık? →' },
    98: { type: 'i', ans: 'B', msg: null },
    99: { type: 'i', ans: 'İ', msg: 3 }, // BİLEKLİK ile çakışıyor
    100:{ type: 'i', ans: 'M', msg: null },

    // 6. KARNIYARIK (Sütun 10, Satır 5'ten dikey)
    70: { type: 'q', text: 'Yemeğin? ↓' },
    82: { type: 'i', ans: 'K', msg: null },
    94: { type: 'i', ans: 'A', msg: null },
    106:{ type: 'i', ans: 'R', msg: null },
    118:{ type: 'i', ans: 'N', msg: null },
    130:{ type: 'i', ans: 'I', msg: null },

    // 7. TAŞDUVARLAR (Satır 11, Sütun 0'dan başlar)
    132:{ type: 'q', text: 'Şarkımız? →' },
    133:{ type: 'i', ans: 'T', msg: null },
    134:{ type: 'i', ans: 'A', msg: null },
    135:{ type: 'i', ans: 'Ş', msg: 13 }, // BENİMLESİN'in S'si (13. harf - Ş/S değişimi)
    136:{ type: 'i', ans: 'D', msg: null },
    137:{ type: 'i', ans: 'U', msg: null },
    138:{ type: 'i', ans: 'V', msg: null },
    139:{ type: 'i', ans: 'A', msg: null },
    140:{ type: 'i', ans: 'R', msg: null },
    141:{ type: 'i', ans: 'L', msg: null },
    142:{ type: 'i', ans: 'A', msg: null },
    143:{ type: 'i', ans: 'R', msg: 14 }  // BENİMLESİN'in İ'si yerine son R'yi bağlayalım (ID:14)
};

// Şifre kutularını oluştur (İYİ Kİ BENİMLESİN - 15 Harf)
function setupSecret() {
    const w1 = [1,2,3], w2 = [4,5], w3 = [6,7,8,9,10,11,12,13,14,15];
    w1.forEach(id => document.getElementById('w1').innerHTML += `<div class="msg-box" id="msg-${id}">?</div>`);
    w2.forEach(id => document.getElementById('w2').innerHTML += `<div class="msg-box" id="msg-${id}">?</div>`);
    w3.forEach(id => document.getElementById('w3').innerHTML += `<div class="msg-box" id="msg-${id}">?</div>`);
}

// Grid'i ekrana bas
for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    const item = data[i];

    if (item) {
        if (item.type === 'q') {
            cell.classList.add('question');
            cell.innerHTML = `<span>${item.text}</span>`;
        } else {
            const input = document.createElement('input');
            input.maxLength = 1;
            input.dataset.ans = item.ans;
            if (item.msg) {
                const n = document.createElement('span');
                n.className = 'num';
                n.innerText = item.msg;
                cell.appendChild(n);
                input.dataset.target = item.msg;
            }
            cell.appendChild(input);
        }
    } else {
        cell.style.background = "transparent";
        cell.style.border = "none";
    }
    gridContainer.appendChild(cell);
}

// Giriş kontrolü
gridContainer.addEventListener('input', (e) => {
    const input = e.target;
    const val = toTurkishUpper(input.value); // TÜRKÇE İ DÜZELTMESİ
    const correct = input.dataset.ans;
    const targetId = input.dataset.target;

    if (val === correct) {
        input.style.color = "#4dff88";
        if (targetId) {
            const box = document.getElementById(`msg-${targetId}`);
            box.innerText = val;
            box.classList.add('filled');
        }
    } else {
        input.style.color = "#ff4d4d";
    }
});

setupSecret();