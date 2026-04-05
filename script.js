const size = 27; 
const gridContainer = document.getElementById('puzzleGrid');
const clueList = document.getElementById('clueList');

function toUpperTR(str) { return str.toLocaleUpperCase('tr-TR'); }

// 37 SORU, CEVAP VE RESME GÖRE HESAPLANMIŞ KESİN KOORDİNATLAR
const words = [
    { n: 1, r: 1, c: 5, w: "SEKİZŞUBAT", d: 1, q: "Sevgili olduğumuz tarih (gün/ay)" },
    { n: 2, r: 1, c: 16, w: "İMEJE", d: 1, q: "Bizim yarışma takımımızın adı" },
    { n: 3, r: 2, c: 4, w: "PEKTABİİ", d: 0, q: "Benim kullanmama güldüğün bir kelime" }, 
    { n: 4, r: 2, c: 13, w: "BETÜL", d: 1, q: "Bizi kim tanıştırdı" },
    { n: 5, r: 3, c: 13, w: "ERKENCİKUŞ", d: 0, q: "İlk başbaşa izlediğimiz dizi" },
    { n: 6, r: 4, c: 11, w: "PAPATYA", d: 1, q: "Senin ilk çiçeğin" },
    { n: 7, r: 5, c: 8, w: "SWIFT", d: 1, q: "Ehliyet aldığın araba (suzuki ...)" },
    { n: 8, r: 6, c: 11, w: "PİLAV", d: 0, q: "Benim en sevdiğim yemek" }, 
    { n: 9, r: 6, c: 19, w: "GANİTA", d: 1, q: "İlk başbaşa buluştuğumuz yer" },
    { n: 10, r: 7, c: 1, w: "ÖVMEK", d: 1, q: "Utandırmanın en garanti yolu (ortak özellik)" },
    { n: 11, r: 7, c: 22, w: "KOÇ", d: 1, q: "Benim burcum" },
    { n: 12, r: 8, c: 8, w: "FISTIĞIM", d: 0, q: "Benim sana kullandığım tabir" },
    { n: 13, r: 8, c: 17, w: "MANGROV", d: 0, q: "Minecraft kırmızı kütüğün ismi" },
    { n: 14, r: 9, c: 1, w: "MEYDAN", d: 0, q: "Seni ilk gördüğüm yer" },
    { n: 15, r: 9, c: 3, w: "YILDIZI", d: 1, q: "Wither ne düşürür (nether...)" },
    { n: 16, r: 10, c: 11, w: "ALİATAY", d: 0, q: "En sevdiğim oyuncu" },
    { n: 17, r: 10, c: 15, w: "TABLET", d: 1, q: "Yataktan senin neyin düştü" },
    { n: 18, r: 11, c: 18, w: "BAVUL", d: 0, q: "Otobüste neyim kaldı" },
    { n: 19, r: 12, c: 3, w: "DOĞUKAN", d: 0, q: "Bungalov işletmecisi" },
    { n: 20, r: 12, c: 8, w: "ARABALAR", d: 1, q: "İlgi duyduğum bir alan" },
    { n: 21, r: 12, c: 12, w: "HALBUKİ", d: 0, q: "Seni düşünürken dinlediğim şarkı" },
    { n: 22, r: 17, c: 13, w: "MANGAL", d: 0, q: "Birlikte yediğimiz ilk şey" },
    { n: 23, r: 14, c: 7, w: "ÇAY", d: 0, q: "Vazgeçemediğimiz içecek" },
    { n: 24, r: 12, c: 5, w: "SİMGE", d: 1, q: "Kimin burnunu kırdın" },
    { n: 25, r: 14, c: 11, w: "KARNIYARIK", d: 1, q: "Senin en sevdiğin yemek" },
    { n: 26, r: 21, c: 16, w: "TAŞDUVARLAR", d: 0, q: "Sana aşık olurken arka fonda çalan şarkı" },
    { n: 27, r: 21, c: 22, w: "AY", d: 1, q: "İleride yazları gideceğimiz yer" },
    { n: 28, r: 15, c: 6, w: "YALASAM", d: 0, q: "Seni .... napabilirsin ki" },
    { n: 29, r: 17, c: 20, w: "TOPUZ", d: 1, q: "Seni ilk gördüğümde saçın nasıldı" },
    { n: 30, r: 16, c: 7, w: "NAZAR", d: 0, q: "Arabamın ismi (....boncuğu)" },
    { n: 31, r: 19, c: 15, w: "ZOOTOPİA", d: 0, q: "İlk birlikte izlediğimiz film" },
    { n: 32, r: 18, c: 4, w: "FENER", d: 1, q: "Beşirli sahilin sonunda nereye yürüdük" },
    { n: 33, r: 18, c: 6, w: "ELBETTE", d: 1, q: "Benim kullanmama güldüğün bir kelime" },
    { n: 34, r: 20, c: 10, w: "OYUNHAMURU", d: 0, q: "İlk aktivitemiz" },
    { n: 35, r: 20, c: 14, w: "HAZAN", d: 1, q: "Benim sürekli gidelim dediğim yer (...bahçe)" }, 
    { n: 36, r: 20, c: 16, w: "MEŞK", d: 1, q: "Yanan cafe ye benim söylediğim isim" }, 
    { n: 37, r: 23, c: 15, w: "AŞKIM", d: 0, q: "Senin bana kullandığın tabir" }
];

// İYİ Kİ BENİMLESİN (15 Harf) ŞİFRESİ TANIMLAMALARI
// Harflerin kelime içindeki indisleri kullanılarak yeni koordinatlara göre dinamik eşleştirilir
const pinkDefinitions = [
    { w: 3, i: 6, msg: 1 },   // İ (PEKTABİİ - 7. Harf)
    { w: 14, i: 2, msg: 2 },  // Y (MEYDAN - 3. Harf)
    { w: 5, i: 6, msg: 3 },   // İ (ERKENCİKUŞ - 7. Harf)
    { w: 21, i: 5, msg: 4 },  // K (HALBUKİ - 6. Harf)
    { w: 9, i: 3, msg: 5 },   // İ (GANİTA - 4. Harf)
    { w: 18, i: 0, msg: 6 },  // B (BAVUL - 1. Harf)
    { w: 32, i: 1, msg: 7 },  // E (FENER - 2. Harf)
    { w: 19, i: 6, msg: 8 },  // N (DOĞUKAN - 7. Harf)
    { w: 24, i: 1, msg: 9 },  // İ (SİMGE - 2. Harf)
    { w: 12, i: 7, msg: 10 }, // M (FISTIĞIM - 8. Harf)
    { w: 16, i: 1, msg: 11 }, // L (ALİATAY - 2. Harf)
    { w: 36, i: 1, msg: 12 }, // E (MEŞK - 2. Harf)
    { w: 1, i: 0, msg: 13 },  // S (SEKİZŞUBAT - 1. Harf)
    { w: 8, i: 1, msg: 14 },  // İ (PİLAV - 2. Harf)
    { w: 34, i: 3, msg: 15 }  // N (OYUNHAMURU - 4. Harf)
];

const pinkMap = {};
words.forEach(d => {
    pinkDefinitions.forEach(p => {
        if (p.w === d.n) {
            let pr = d.d === 0 ? d.r : d.r + p.i;
            let pc = d.d === 0 ? d.c + p.i : d.c;
            pinkMap[`${pr},${pc}`] = p.msg;
        }
    });
});

const grid = Array(size * size).fill(null);

words.forEach(d => {
    // Listeye Ekle
    const dirTxt = d.d === 0 ? "Yatay" : "Aşağı";
    clueList.innerHTML += `<div class="clue-item"><b>${d.n}.</b> [${dirTxt}] ${d.q}</div>`;
    
    // Grid'e Ekle
    for (let i = 0; i < d.w.length; i++) {
        const row = d.d === 0 ? d.r : d.r + i;
        const col = d.d === 0 ? d.c + i : d.c;
        if (row >= size || col >= size) continue;
        
        const idx = row * size + col;
        const key = `${row},${col}`;
        const pId = pinkMap[key] || null;
        
        if (!grid[idx]) {
            grid[idx] = { char: d.w[i], num: (i === 0 ? d.n : null), msgId: pId };
        } else {
            if (i === 0 && d.n) grid[idx].num = d.n; 
            if (pId) grid[idx].msgId = pId;
        }
    }
});

function init() {
    // Daha önceki tablo içeriğini temizleyelim
    gridContainer.innerHTML = '';
    // CSS tarafında var olan grid ayarını dinamik olarak yeni boyuta güncelle
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 35px)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 35px)`;

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

    // Şifre Kutularını başlat
    const w1 = [1, 2, 3], w2 = [4, 5], w3 = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    document.getElementById('w1').innerHTML = '';
    document.getElementById('w2').innerHTML = '';
    document.getElementById('w3').innerHTML = '';

    w1.forEach(id => document.getElementById('w1').innerHTML += `<div class="msg-box" id="msg-${id}">?</div>`);
    w2.forEach(id => document.getElementById('w2').innerHTML += `<div class="msg-box" id="msg-${id}">?</div>`);
    w3.forEach(id => document.getElementById('w3').innerHTML += `<div class="msg-box" id="msg-${id}">?</div>`);
}

gridContainer.addEventListener('input', (e) => {
    const input = e.target;
    if (input.tagName.toLowerCase() !== 'input') return;

    const val = toUpperTR(input.value);
    const ans = input.dataset.ans;
    const mid = input.dataset.msg;
    
    if (val === ans) {
        input.style.color = "#4dff88"; 
        if (mid) {
            const b = document.getElementById(`msg-${mid}`);
            b.innerText = val; 
            b.classList.add('filled');
        }
    } else { 
        input.style.color = "#ff4d4d"; 
    }
});

init();