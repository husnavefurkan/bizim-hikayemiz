const size = 26; // 26x26 Geniş Izgara
const gridContainer = document.getElementById('puzzleGrid');
const clueList = document.getElementById('clueList');

// Türkçe büyük harf uyumu (i -> İ)
function toUpperTR(str) { return str.toLocaleUpperCase('tr-TR'); }

// TAM EKSİKSİZ 37 SORU LİSTESİ VE KOORDİNATLARI (HAZAN VE MEŞK GÜNCELLENDİ)
const words = [
    { n: 1, r: 0, c: 5, w: "SEKİZŞUBAT", d: 1, q: "Sevgili olduğumuz tarih (gün/ay)", m: {0: 13} },
    { n: 2, r: 0, c: 15, w: "İMEJE", d: 1, q: "Bizim yarışma takımımızın adı", m: {} },
    { n: 3, r: 1, c: 2, w: "PEKTABİİ", d: 0, q: "Benim kullanmama güldüğün bir kelime", m: {6: 3} },
    { n: 4, r: 1, c: 11, w: "BETÜL", d: 1, q: "Bizi kim tanıştırdı", m: {} },
    { n: 5, r: 2, c: 11, w: "ERKENCİKUŞ", d: 0, q: "İlk başbaşa izlediğimiz dizi", m: {6: 3} },
    { n: 6, r: 3, c: 9, w: "PAPATYA", d: 1, q: "Senin ilk çiçeğin", m: {} },
    { n: 7, r: 4, c: 7, w: "SWIFT", d: 1, q: "Ehliyet aldığın araba (suzuki ...)", m: {} },
    { n: 8, r: 5, c: 9, w: "PİLAV", d: 0, q: "Benim en sevdiğim yemek", m: {} },
    { n: 9, r: 6, c: 17, w: "GANİTA", d: 1, q: "İlk başbaşa buluştuğumuz yer", m: {} },
    { n: 10, r: 6, c: 1, w: "ÖVMEK", d: 1, q: "Utandırmanın en garanti yolu (ortak özellik)", m: {} },
    { n: 11, r: 6, c: 21, w: "KOÇ", d: 1, q: "Benim burcum", m: {} },
    { n: 12, r: 7, c: 7, w: "FISTIĞIM", d: 0, q: "Benim sana kullandığım tabir", m: {4: 14, 7: 10} },
    { n: 13, r: 7, c: 16, w: "MANGROV", d: 0, q: "Minecraft kırmızı kütüğün ismi", m: {} },
    { n: 14, r: 8, c: 1, w: "MEYDAN", d: 0, q: "Seni ilk gördüğüm yer", m: {2: 2} },
    { n: 15, r: 8, c: 3, w: "YILDIZI", d: 1, q: "Wither ne düşürür (nether...)", m: {} },
    { n: 16, r: 9, c: 10, w: "ALİATAY", d: 0, q: "En sevdiğim oyuncu", m: {} },
    { n: 17, r: 9, c: 14, w: "TABLET", d: 1, q: "Yataktan senin neyin düştü", m: {} },
    { n: 18, r: 10, c: 16, w: "BAVUL", d: 0, q: "Otobüste neyim kaldı", m: {4: 11} },
    { n: 19, r: 11, c: 3, w: "DOĞUKAN", d: 0, q: "Bungalov işletmecisi", m: {} },
    { n: 20, r: 11, c: 8, w: "ARABALAR", d: 1, q: "İlgi duyduğum bir alan", m: {3: 6} },
    { n: 21, r: 11, c: 11, w: "HALBUKİ", d: 0, q: "Seni düşünürken dinlediğim şarkı", m: {5: 4} },
    { n: 22, r: 12, c: 16, w: "MANGAL", d: 0, q: "Birlikte yediğimiz ilk şey", m: {} },
    { n: 23, r: 13, c: 6, w: "ÇAY", d: 0, q: "Vazgeçemediğimiz içecek", m: {} },
    { n: 24, r: 14, c: 5, w: "SİMGE", d: 1, q: "Kimin burnunu kırdın", m: {} },
    { n: 25, r: 14, c: 10, w: "KARNIYARIK", d: 1, q: "Senin en sevdiğin yemek", m: {8: 1} },
    { n: 26, r: 14, c: 14, w: "TAŞDUVARLAR", d: 0, q: "Sana aşık olurken arka fonda çalan şarkı", m: {} },
    { n: 27, r: 14, c: 15, w: "AY", d: 1, q: "İleride yazları gideceğimiz yer", m: {} },
    { n: 28, r: 15, c: 6, w: "YALASAM", d: 0, q: "Seni .... napabilirsin ki", m: {} },
    { n: 29, r: 16, c: 18, w: "TOPUZ", d: 1, q: "Seni ilk gördüğümde saçın nasıldı", m: {} },
    { n: 30, r: 17, c: 10, w: "NAZAR", d: 0, q: "Arabamın ismi (....boncuğu)", m: {} },
    { n: 31, r: 17, c: 16, w: "ZOOTOPİA", d: 0, q: "İlk birlikte izlediğimiz film", m: {6: 5} },
    { n: 32, r: 18, c: 4, w: "FENER", d: 0, q: "Beşirli sahilin sonunda nereye yürüdük", m: {1: 12} },
    { n: 33, r: 18, c: 7, w: "ELBETTE", d: 1, q: "Benim kullanmama güldüğün bir kelime", m: {6: 7} },
    { n: 34, r: 19, c: 9, w: "OYUNHAMURU", d: 0, q: "İlk aktivitemiz", m: {} },
    { n: 35, r: 19, c: 13, w: "HAZAN", d: 1, q: "Benim sürekli gidelim dediğim yer (...bahçe)", m: {} },
    { n: 36, r: 19, c: 15, w: "MEŞK", d: 1, q: "Yanan cafe ye benim söylediğim isim", m: {} },
    { n: 37, r: 22, c: 13, w: "AŞKIM", d: 0, q: "Senin bana kullandığın tabir", m: {0: 8} }
];

const grid = Array(size * size).fill(null);

words.forEach(d => {
    // Soruları ekrana bas
    const dirTxt = d.d === 0 ? "Yatay" : "Aşağı";
    clueList.innerHTML += `<div class="clue-item"><b>${d.n}.</b> [${dirTxt}] ${d.q}</div>`;
    
    // Izgarayı hesapla
    for (let i = 0; i < d.w.length; i++) {
        const row = d.d === 0 ? d.r : d.r + i;
        const col = d.d === 0 ? d.c + i : d.c;
        if (row >= size || col >= size) continue;
        const idx = row * size + col;
        const mId = d.m[i] || null;
        
        if (!grid[idx]) {
            grid[idx] = { char: d.w[i], num: (i === 0 ? d.n : null), msgId: mId };
        } else {
            if (i === 0 && d.n) grid[idx].num = d.n; // Çakışan başlangıç numarası varsa ekle
            if (mId) grid[idx].msgId = mId; // Çakışan pembe kutu varsa ekle
        }
    }
});

function init() {
    // Grid'i Doldur
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        const item = grid[i];
        
        if (item) {
            if (item.num) cell.innerHTML += `<span class="num">${item.num}</span>`;
            const input = document.createElement('input');
            input.maxLength = 1;
            input.dataset.ans = item.char;
            
            if (item.msgId) {
                cell.classList.add('pink');
                cell.innerHTML += `<span class="num" style="left:auto; right:1px; color:#ff4d4d">${item.msgId}</span>`;
                input.dataset.msg = item.msgId;
            }
            cell.appendChild(input);
        } else {
            cell.style.background = "transparent";
            cell.style.border = "none";
        }
        gridContainer.appendChild(cell);
    }

    // Şifre Kutularını Ayarla (İYİ Kİ BENİMLESİN - 15 Harf)
    const w1 = [1, 2, 3], w2 = [4, 5], w3 = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    w1.forEach(id => document.getElementById('w1').innerHTML += `<div class="msg-box" id="msg-${id}">?</div>`);
    w2.forEach(id => document.getElementById('w2').innerHTML += `<div class="msg-box" id="msg-${id}">?</div>`);
    w3.forEach(id => document.getElementById('w3').innerHTML += `<div class="msg-box" id="msg-${id}">?</div>`);
}

// Harf Girişi Kontrolü
gridContainer.addEventListener('input', (e) => {
    const input = e.target;
    const val = toUpperTR(input.value);
    const ans = input.dataset.ans;
    const mid = input.dataset.msg;
    
    if (val === ans) {
        input.style.color = "#4dff88"; // Doğruysa yeşil
        if (mid) {
            const b = document.getElementById(`msg-${mid}`);
            b.innerText = val; 
            b.classList.add('filled');
        }
    } else { 
        input.style.color = "#ff4d4d"; // Yanlışsa kırmızı
    }
});

init();