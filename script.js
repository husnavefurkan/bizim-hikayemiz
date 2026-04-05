const size = 26; // 26x26 Güvenli Boyut
const gridContainer = document.getElementById('puzzleGrid');
const clueList = document.getElementById('clueList');

// Grid sütun sayısını JS'den CSS'e zorla gönderiyoruz ki ASLA kayma yapmasın
gridContainer.style.gridTemplateColumns = `repeat(${size}, 25px)`;

function toUpperTR(str) { return str.toLocaleUpperCase('tr-TR'); }

// ÇAKIŞMAYAN GÜVENLİ KOORDİNATLAR
const words = [
    { n: 1, r: 1, c: 2, w: "SEKİZŞUBAT", d: 1, q: "Sevgili olduğumuz tarih (gün/ay)" },
    { n: 2, r: 1, c: 20, w: "İMEJE", d: 1, q: "Bizim yarışma takımımızın adı" },
    { n: 3, r: 3, c: 0, w: "PEKTABİİ", d: 0, q: "Benim kullanmama güldüğün bir kelime" }, // K'de 1 ile kesişir (3,2)
    { n: 4, r: 1, c: 12, w: "BETÜL", d: 1, q: "Bizi kim tanıştırdı" },
    { n: 5, r: 7, c: 12, w: "ERKENCİKUŞ", d: 0, q: "İlk başbaşa izlediğimiz dizi" },
    { n: 6, r: 5, c: 5, w: "PAPATYA", d: 1, q: "Senin ilk çiçeğin" },
    { n: 7, r: 5, c: 8, w: "SWIFT", d: 1, q: "Ehliyet aldığın araba (suzuki ...)" },
    { n: 8, r: 5, c: 5, w: "PİLAV", d: 0, q: "Benim en sevdiğim yemek" }, // P'de 6 ile kesişir (5,5)
    { n: 9, r: 8, c: 18, w: "GANİTA", d: 1, q: "İlk başbaşa buluştuğumuz yer" },
    { n: 10, r: 8, c: 22, w: "ÖVMEK", d: 1, q: "Utandırmanın en garanti yolu (ortak özellik)" },
    { n: 11, r: 8, c: 25, w: "KOÇ", d: 1, q: "Benim burcum" },
    { n: 12, r: 11, c: 0, w: "FISTIĞIM", d: 0, q: "Benim sana kullandığım tabir" },
    { n: 13, r: 11, c: 10, w: "MANGROV", d: 0, q: "Minecraft kırmızı kütüğün ismi" },
    { n: 14, r: 13, c: 0, w: "MEYDAN", d: 0, q: "Seni ilk gördüğüm yer" },
    { n: 15, r: 12, c: 4, w: "YILDIZI", d: 1, q: "Wither ne düşürür (nether...)" },
    { n: 16, r: 14, c: 8, w: "ALİATAY", d: 0, q: "En sevdiğim oyuncu" },
    { n: 17, r: 13, c: 15, w: "TABLET", d: 1, q: "Yataktan senin neyin düştü" },
    { n: 18, r: 15, c: 14, w: "BAVUL", d: 0, q: "Otobüste neyim kaldı" },
    { n: 19, r: 15, c: 0, w: "DOĞUKAN", d: 0, q: "Bungalov işletmecisi" },
    { n: 20, r: 15, c: 8, w: "ARABALAR", d: 1, q: "İlgi duyduğum bir alan" },
    { n: 21, r: 17, c: 10, w: "HALBUKİ", d: 0, q: "Seni düşünürken dinlediğim şarkı" },
    { n: 22, r: 17, c: 18, w: "MANGAL", d: 0, q: "Birlikte yediğimiz ilk şey" },
    { n: 23, r: 19, c: 0, w: "ÇAY", d: 0, q: "Vazgeçemediğimiz içecek" },
    { n: 24, r: 18, c: 4, w: "SİMGE", d: 1, q: "Kimin burnunu kırdın" },
    { n: 25, r: 16, c: 22, w: "KARNIYARIK", d: 1, q: "Senin en sevdiğin yemek" },
    { n: 26, r: 19, c: 10, w: "TAŞDUVARLAR", d: 0, q: "Sana aşık olurken arka fonda çalan şarkı" },
    { n: 27, r: 20, c: 0, w: "AY", d: 1, q: "İleride yazları gideceğimiz yer" },
    { n: 28, r: 21, c: 3, w: "YALASAM", d: 0, q: "Seni .... napabilirsin ki" },
    { n: 29, r: 19, c: 24, w: "TOPUZ", d: 1, q: "Seni ilk gördüğümde saçın nasıldı" },
    { n: 30, r: 23, c: 10, w: "NAZAR", d: 0, q: "Arabamın ismi (....boncuğu)" },
    { n: 31, r: 23, c: 17, w: "ZOOTOPİA", d: 0, q: "İlk birlikte izlediğimiz film" },
    { n: 32, r: 25, c: 0, w: "FENER", d: 0, q: "Beşirli sahilin sonunda nereye yürüdük" },
    { n: 33, r: 19, c: 7, w: "ELBETTE", d: 1, q: "Benim kullanmama güldüğün bir kelime" },
    { n: 34, r: 20, c: 8, w: "OYUNHAMURU", d: 0, q: "İlk aktivitemiz" },
    { n: 35, r: 20, c: 12, w: "HAZAN", d: 1, q: "Benim sürekli gidelim dediğim yer (...bahçe)" }, // H'de 34 ile kesişir (20,12)
    { n: 36, r: 20, c: 14, w: "MEŞK", d: 1, q: "Yanan cafe ye benim söylediğim isim" }, // M'de 34 ile kesişir (20,14)
    { n: 37, r: 25, c: 13, w: "AŞKIM", d: 0, q: "Senin bana kullandığın tabir" }
];

// İYİ Kİ BENİMLESİN (15 Harf) ŞİFRESİ İÇİN KESİN KOORDİNAT HARİTASI
const pinkMap = {
    '3,6': 1,   // İ (PEKTABİİ)
    '13,2': 2,  // Y (MEYDAN)
    '7,18': 3,  // İ (ERKENCİKUŞ)
    '17,15': 4, // K (HALBUKİ)
    '11,18': 5, // İ (GANİTA)
    '15,14': 6, // B (BAVUL)
    '25,1': 7,  // E (FENER)
    '15,6': 8,  // N (DOĞUKAN)
    '19,4': 9,  // İ (SİMGE)
    '11,7': 10, // M (FISTIĞIM)
    '14,9': 11, // L (ALİATAY)
    '21,14': 12,// E (MEŞK)
    '1,2': 13,  // S (SEKİZŞUBAT)
    '5,6': 14,  // İ (PİLAV)
    '20,11': 15 // N (OYUNHAMURU)
};

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

    // Şifre Kutuları
    const w1 = [1, 2, 3], w2 = [4, 5], w3 = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    w1.forEach(id => document.getElementById('w1').innerHTML += `<div class="msg-box" id="msg-${id}">?</div>`);
    w2.forEach(id => document.getElementById('w2').innerHTML += `<div class="msg-box" id="msg-${id}">?</div>`);
    w3.forEach(id => document.getElementById('w3').innerHTML += `<div class="msg-box" id="msg-${id}">?</div>`);
}

gridContainer.addEventListener('input', (e) => {
    const input = e.target;
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