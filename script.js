const size = 26;
const gridContainer = document.getElementById('puzzleGrid');

function toTurkishUpper(str) {
    return str.toLocaleUpperCase('tr-TR');
}

// GÖRSELDEKİ BİREBİR VERİLER VE KOORDİNATLAR
const puzzleData = [
    { n: 1, r: 1, c: 5, w: "SEKİZŞUBAT", d: 1, q: "Sevgili olduğumuz tarih (gün/ay)", m: {0: 13} },
    { n: 2, r: 1, c: 15, w: "İMEJE", d: 1, q: "Bizim yarışma takımımızın adı", m: {} },
    { n: 3, r: 3, c: 2, w: "PEKTABİİ", d: 0, q: "Benim kullanmama güldüğün bir kelime", m: {6: 1} },
    { n: 4, r: 3, c: 12, w: "BETÜL", d: 1, q: "Bizi kim tanıştırdı", m: {} },
    { n: 5, r: 5, c: 12, w: "ERKENCİKUŞ", d: 0, q: "İlk başbaşa izlediğimiz dizi", m: {6: 3} },
    { n: 6, r: 6, c: 11, w: "PAPATYA", d: 1, q: "Senin ilk çiçeğin", m: {} },
    { n: 7, r: 8, c: 8, w: "SWIFT", d: 1, q: "Ehliyet aldığın araba (Suzuki...)", m: {} },
    { n: 8, r: 9, c: 8, w: "PİLAV", d: 0, q: "Benim en sevdiğim yemek", m: {} },
    { n: 9, r: 10, c: 18, w: "GANİTA", d: 1, q: "İlk başbaşa buluştuğumuz yer", m: {} },
    { n: 10, r: 12, c: 1, w: "ÖFKE", d: 1, q: "Utandırmanın en garanti yolu (ortak özellik)", m: {} },
    { n: 11, r: 12, c: 21, w: "KOÇ", d: 1, q: "Benim burcum", m: {} },
    { n: 12, r: 13, c: 8, w: "FISTIĞIM", d: 0, q: "Benim sana kullandığım tabir", m: {1: 14, 7: 10} },
    { n: 13, r: 13, c: 16, w: "MANGROV", d: 0, q: "Minecraft kırmızı kütüğün ismi", m: {} },
    { n: 14, r: 15, c: 1, w: "MEYDAN", d: 0, q: "Seni ilk gördüğüm yer", m: {1: 2} },
    { n: 15, r: 16, c: 3, w: "NETHERSTAR", d: 1, q: "Wither ne düşürür", m: {} },
    { n: 16, r: 17, c: 10, w: "ALİATAY", d: 0, q: "En sevdiğim oyuncu", m: {} },
    { n: 17, r: 18, c: 14, w: "AYNA", d: 1, q: "Yataktan senin neyin düştü", m: {} },
    { n: 18, r: 19, c: 17, w: "BAVUL", d: 0, q: "Otobüste neyim kaldı", m: {4: 12} },
    { n: 19, r: 21, c: 3, w: "DOĞUKAN", d: 0, q: "Bungalov işletmecisi", m: {} },
    { n: 20, r: 21, c: 8, w: "YAZILIM", d: 1, q: "İlgi duyduğum bir alan", m: {} },
    { n: 21, r: 21, c: 12, w: "HALBUKİ", d: 0, q: "Seni düşünürken dinlediğim şarkı", m: {5: 4} },
    { n: 22, r: 23, c: 17, w: "MANGAL", d: 0, q: "Birlikte yediğimiz ilk şey", m: {} },
    { n: 23, r: 25, c: 7, w: "ÇAY", d: 0, q: "Vazgeçemediğimiz içecek", m: {} },
    { n: 24, r: 26, c: 5, w: "BİLEKLİK", d: 1, q: "Kimin burnunu kırdın (yanlış soru düzeltildi: senin ilk çiçeğin/bileklik)", m: {1: 6} },
    { n: 25, r: 26, c: 9, w: "PİLAV", d: 1, q: "Senin en sevdiğin yemek", m: {} },
    { n: 26, r: 27, c: 14, w: "TAŞDUVARLAR", d: 0, q: "Sana aşık olurken arka fonda çalan şarkı", m: {} },
    { n: 27, r: 28, c: 15, w: "AY", d: 1, q: "İleride yazları gideceğimiz yer", m: {} },
    { n: 28, r: 29, c: 6, w: "YALASAM", d: 0, q: "Seni .... napabilirsin ki", m: {} },
    { n: 29, r: 30, c: 17, w: "TOPUZ", d: 1, q: "Seni ilk gördüğümde saçın nasıldı", m: {} },
    { n: 30, r: 31, c: 10, w: "NAZAR", d: 0, q: "Arabamın ismi (....boncuğu)", m: {4: 9} },
    { n: 31, r: 31, c: 16, w: "ZOOTOPİA", d: 0, q: "İlk birlikte izlediğimiz film", m: {6: 5} },
    { n: 32, r: 33, c: 3, w: "FIRSTKISS", d: 1, q: "Firstkiss nerede oldu", m: {1: 11} },
    { n: 33, r: 34, c: 7, w: "ELBETTE", d: 1, q: "Benim kullanmama güldüğün bir kelime", m: {6: 7} },
    { n: 34, r: 35, c: 9, w: "OYUNHAMURU", d: 0, q: "İlk aktivitemiz", m: {} },
    { n: 35, r: 36, c: 12, w: "BAHÇE", d: 1, q: "Benim sürekli gidelim dediğim yer (...bahçe)", m: {} },
    { n: 36, r: 36, c: 14, w: "YANGIN", d: 1, q: "Yanan cafe ye benim söylediğim isim", m: {} },
    { n: 37, r: 38, c: 12, w: "AŞKIM", d: 0, q: "Senin bana kullandığın tabir", m: {4: 15} }
];

const grid = Array(size * size).fill(null);
const clueList = document.getElementById('clueList');

puzzleData.forEach(d => {
    // Liste doldurma
    clueList.innerHTML += `<div class="clue-item"><b>${d.n}.</b> ${d.q}</div>`;
    // Grid doldurma
    for (let i = 0; i < d.w.length; i++) {
        const row = d.d === 0 ? d.r : d.r + i;
        const col = d.d === 0 ? d.c + i : d.c;
        const idx = row * size + col;
        const mId = d.m[i] || null;
        if (!grid[idx]) grid[idx] = { char: d.w[i], num: (i === 0 ? d.n : null), msgId: mId };
        else if (mId) grid[idx].msgId = mId;
    }
});

function init() {
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        const item = grid[i];
        if (item) {
            if (item.num) cell.innerHTML += `<span class="num">${item.num}</span>`;
            if (item.msgId) {
                cell.classList.add('pink');
                cell.innerHTML += `<span class="num" style="left:auto;right:1px;">${item.msgId}</span>`;
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
    // Şifre kutuları
    const w1 = [1,2,3], w2 = [4,5], w3 = [6,7,8,9,10,11,12,13,14,15];
    w1.forEach(id => document.getElementById('w1').innerHTML += `<div class="msg-box" id="msg-${id}">?</div>`);
    w2.forEach(id => document.getElementById('w2').innerHTML += `<div class="msg-box" id="msg-${id}">?</div>`);
    w3.forEach(id => document.getElementById('w3').innerHTML += `<div class="msg-box" id="msg-${id}">?</div>`);
}

gridContainer.addEventListener('input', (e) => {
    const val = toTurkishUpper(e.target.value);
    const ans = e.target.dataset.ans;
    const mid = e.target.dataset.msg;
    if (val === ans) {
        e.target.style.color = "#4dff88";
        if (mid) {
            const b = document.getElementById(`msg-${mid}`);
            b.innerText = val; b.classList.add('filled');
        }
    } else { e.target.style.color = "#ff4d4d"; }
});

init();