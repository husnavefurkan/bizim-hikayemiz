const size = 25; // 25x25 Izgara
const gridContainer = document.getElementById('puzzleGrid');

// TÜRKÇE İ DÜZELTMESİ
function toTurkishUpper(str) {
    return str.toLocaleUpperCase('tr-TR');
}

// GÖRSELDEKİ VERİLER (X, Y koordinatları ve Soru Metinleri)
const words = [
    // Yatay
    { n: 3, r: 2, c: 1, w: "PEKTABİİ", d: 0, q: "Benim kullanmama güldüğün bir kelime", m: [null,null,null,null,null,null,1,null] },
    { n: 5, r: 4, c: 8, w: "ERKENCİKUŞ", d: 0, q: "İlk başbaşa izlediğimiz dizi", m: [null,null,null,null,null,null,13,null,null,null] },
    { n: 8, r: 7, c: 8, w: "PİLAV", d: 0, q: "Benim en sevdiğim yemek", m: [] },
    { n: 12, r: 10, c: 6, w: "FISTIĞIM", d: 0, q: "Benim sana kullandığım tabir", m: [null,2,null,null,null,null,null,10] },
    { n: 13, r: 10, c: 15, w: "MANGROV", d: 0, q: "Minecraft kırmızı kütüğün ismi", m: [] },
    { n: 14, r: 12, c: 1, w: "MEYDAN", d: 0, q: "Seni ilk gördüğüm yer", m: [null,null,14,null,null,null] },
    { n: 16, r: 14, c: 8, w: "ALİATAY", d: 0, q: "En sevdiğim oyuncu", m: [] },
    { n: 18, r: 16, c: 13, w: "BAVUL", d: 0, q: "Otobüste neyim kaldı", m: [null,null,null,null,12] },
    { n: 19, r: 18, c: 3, w: "DOĞUKAN", d: 0, q: "Bungalov işletmecisi", m: [] },
    { n: 21, r: 18, c: 11, w: "HALBUKİ", d: 0, q: "Seni düşünürken dinlediğim şarkı", m: [null,null,null,null,null,11,null] },
    { n: 22, r: 20, c: 13, w: "MANGAL", d: 0, q: "Birlikte yediğimiz ilk şey", m: [] },
    { n: 23, r: 22, c: 6, w: "ÇAY", d: 0, q: "Vazgeçemediğimiz içecek", m: [] },
    { n: 26, r: 23, c: 11, w: "TAŞDUVARLAR", d: 0, q: "Aşık olurken arka fonda çalan şarkı", m: [null,null,null,null,null,null,null,null,null,null,null] },
    { n: 28, r: 25, c: 5, w: "YALASAM", d: 0, q: "Seni .... napabilirsin ki", m: [] },
    { n: 30, r: 27, c: 7, w: "NAZAR", d: 0, q: "Arabamın ismi (...boncuğu)", m: [] },
    { n: 31, r: 27, c: 14, w: "ZOOTOPİA", d: 0, q: "İlk birlikte izlediğimiz film", m: [null,null,null,null,null,null,null,15] },
    { n: 32, r: 29, c: 2, w: "FENER", d: 0, q: "Beşirli sahilin sonunda nereye yürüdük", m: [null,null,9,null,null] },
    { n: 34, r: 31, c: 8, w: "OYUNHAMURU", d: 0, q: "İlk aktivitemiz", m: [] },
    { n: 37, r: 34, c: 10, w: "AŞKIM", d: 0, q: "Senin bana kullandığın tabir", m: [] },

    // Dikey
    { n: 1, r: 1, c: 3, w: "SEKİZŞUBAT", d: 1, q: "Sevgili olduğumuz tarih (gün/ay)", m: [3,null,null,null,null,null,null,null,null,null] },
    { n: 2, r: 1, c: 12, w: "İMEJE", d: 1, q: "Bizim yarışma takımımızın adı", m: [] },
    { n: 4, r: 3, c: 10, w: "BETÜL", d: 1, q: "Bizi kim tanıştırdı", m: [] },
    { n: 6, r: 5, c: 9, w: "PAPATYA", d: 1, q: "Senin ilk çiçeğin", m: [] },
    { n: 7, r: 7, c: 6, w: "SWIFT", d: 1, q: "Ehliyet aldığın araba", m: [] },
    { n: 9, r: 8, c: 14, w: "GANİTA", d: 1, q: "İlk başbaşa buluştuğumuz yer", m: [] },
    { n: 10, r: 10, c: 0, w: "UTANDIRMANIN", d: 1, q: "Utandırmanın en garanti yolu", m: [] },
    { n: 11, r: 11, c: 17, w: "KOÇ", d: 1, q: "Benim burcum", m: [] },
    { n: 15, r: 13, c: 3, w: "NETHERSTAR", d: 1, q: "Wither ne düşürür", m: [] },
    { n: 17, r: 14, c: 11, w: "AYNA", d: 1, q: "Yataktan senin neyin düştü", m: [] },
    { n: 18, r: 16, c: 13, w: "BİM", d: 1, q: "Birlikte yürüyerek ne aramıştık", m: [] },
    { n: 20, r: 18, c: 7, w: "YAZILIM", d: 1, q: "İlgi duyduğum bir alan", m: [] },
    { n: 25, r: 22, c: 10, w: "PİLAV", d: 1, q: "Senin en sevdiğin yemek", m: [] },
    { n: 27, r: 24, c: 12, w: "AY", d: 1, q: "İleride yazları gideceğimiz yer", m: [] },
    { n: 29, r: 26, c: 14, w: "TOPUZ", d: 1, q: "Seni ilk gördüğümde saçın nasıldı", m: [] },
    { n: 32, r: 29, c: 2, w: "FIRSTKISS", d: 1, q: "First kiss nerede oldu", m: [] },
    { n: 36, r: 31, c: 13, w: "YANGIN", d: 1, q: "Yanan cafe ye benim söylediğim isim", m: [] }
];

const gridMap = Array(size * size).fill(null);

function setupPuzzle() {
    const yatayList = document.getElementById('yatayClues');
    const dikeyList = document.getElementById('dikeyClues');

    words.forEach(obj => {
        // Listeye Soruyu Ekle
        const clueEl = document.createElement('div');
        clueEl.className = 'clue-item';
        clueEl.innerHTML = `<b>${obj.n}.</b> ${obj.q}`;
        if(obj.d === 0) yatayList.appendChild(clueEl);
        else dikeyList.appendChild(clueEl);

        // Grid'e Yerleştir
        for (let i = 0; i < obj.w.length; i++) {
            let row = obj.d === 0 ? obj.r : obj.r + i;
            let col = obj.d === 0 ? obj.c + i : obj.c;
            if(row >= size || col >= size) continue;
            let idx = row * size + col;
            
            if(!gridMap[idx]) gridMap[idx] = { char: obj.w[i], num: (i===0 ? obj.n : null), msgId: (obj.m[i] || null) };
            else if(obj.m[i]) gridMap[idx].msgId = obj.m[i]; // Çakışan hücrede şifre numarası varsa ekle
        }
    });
}

function initGrid() {
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        const item = gridMap[i];

        if (item) {
            if (item.num) cell.innerHTML += `<span class="num">${item.num}</span>`;
            if (item.msgId) {
                cell.classList.add('pink');
                cell.innerHTML += `<span class="num" style="left:auto; right:1px; color:#ff4d4d">${item.msgId}</span>`;
            }
            const input = document.createElement('input');
            input.maxLength = 1;
            input.dataset.ans = item.char;
            input.dataset.msg = item.msgId || "";
            cell.appendChild(input);
        } else {
            cell.style.background = "transparent";
            cell.style.border = "none";
        }
        gridContainer.appendChild(cell);
    }
}

function setupSecret() {
    const w1 = [1,2,3], w2 = [4,5], w3 = [6,7,8,9,10,11,12,13,14,15];
    w1.forEach(id => document.getElementById('w1').innerHTML += `<div class="msg-box" id="msg-${id}">?</div>`);
    w2.forEach(id => document.getElementById('w2').innerHTML += `<div class="msg-box" id="msg-${id}">?</div>`);
    w3.forEach(id => document.getElementById('w3').innerHTML += `<div class="msg-box" id="msg-${id}">?</div>`);
}

gridContainer.addEventListener('input', (e) => {
    const input = e.target;
    const val = toTurkishUpper(input.value);
    const ans = input.dataset.ans;
    const msgId = input.dataset.msg;

    if (val === ans) {
        input.style.color = "#4dff88";
        if (msgId) {
            const box = document.getElementById(`msg-${msgId}`);
            box.innerText = val;
            box.classList.add('filled');
        }
    } else {
        input.style.color = "#ff4d4d";
    }
});

setupPuzzle();
initGrid();
setupSecret();