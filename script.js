const size = 25; // 25x25 Geniş ve Ferah Izgara
const gridContainer = document.getElementById('puzzleGrid');
const clueList = document.getElementById('clueList');

// Türkçe karakterleri sorunsuz büyütmek için (i -> İ)
function toUpperTR(str) { return str.toLocaleUpperCase('tr-TR'); }

// TAM EKSİKSİZ 37 SORU VE KESİŞİM KOORDİNATLARI
const words = [
    { n: 1, r: 0, c: 4, w: "SEKİZŞUBAT", d: 1, q: "Sevgili olduğumuz tarih (gün/ay)" },
    { n: 2, r: 1, c: 15, w: "İMEJE", d: 1, q: "Bizim yarışma takımımızın adı" },
    { n: 3, r: 2, c: 2, w: "PEKTABİİ", d: 0, q: "Benim kullanmama güldüğün bir kelime" },
    { n: 4, r: 2, c: 12, w: "BETÜL", d: 1, q: "Bizi kim tanıştırdı" },
    { n: 5, r: 3, c: 12, w: "ERKENCİKUŞ", d: 0, q: "İlk başbaşa izlediğimiz dizi" },
    { n: 6, r: 4, c: 10, w: "PAPATYA", d: 1, q: "Senin ilk çiçeğin" },
    { n: 7, r: 6, c: 8, w: "SWIFT", d: 1, q: "Ehliyet aldığın araba (suzuki ...)" },
    { n: 8, r: 6, c: 10, w: "PİLAV", d: 0, q: "Benim en sevdiğim yemek" },
    { n: 9, r: 7, c: 17, w: "GANİTA", d: 1, q: "İlk başbaşa buluştuğumuz yer" },
    { n: 10, r: 6, c: 1, w: "ÖVMEK", d: 1, q: "Utandırmanın en garanti yolu (ortak özellik)" },
    { n: 11, r: 7, c: 21, w: "KOÇ", d: 1, q: "Benim burcum" },
    { n: 12, r: 8, c: 6, w: "FISTIĞIM", d: 0, q: "Benim sana kullandığım tabir" },
    { n: 13, r: 8, c: 16, w: "MANGROV", d: 0, q: "Minecraft kırmızı kütüğün ismi" },
    { n: 14, r: 8, c: 0, w: "MEYDAN", d: 0, q: "Seni ilk gördüğüm yer" },
    { n: 15, r: 8, c: 2, w: "YILDIZI", d: 1, q: "Wither ne düşürür (nether...)" },
    { n: 16, r: 10, c: 5, w: "ALİATAY", d: 0, q: "En sevdiğim oyuncu" },
    { n: 17, r: 10, c: 9, w: "TABLET", d: 1, q: "Yataktan senin neyin düştü" },
    { n: 18, r: 10, c: 15, w: "BAVUL", d: 0, q: "Otobüste neyim kaldı" },
    { n: 19, r: 11, c: 2, w: "DOĞUKAN", d: 0, q: "Bungalov işletmecisi" },
    { n: 20, r: 11, c: 7, w: "ARABALAR", d: 1, q: "İlgi duyduğum bir alan" },
    { n: 21, r: 11, c: 10, w: "HALBUKİ", d: 0, q: "Seni düşünürken dinlediğim şarkı" },
    { n: 22, r: 12, c: 16, w: "MANGAL", d: 0, q: "Birlikte yediğimiz ilk şey" },
    { n: 23, r: 13, c: 6, w: "ÇAY", d: 0, q: "Vazgeçemediğimiz içecek" },
    { n: 24, r: 14, c: 4, w: "SİMGE", d: 1, q: "Kimin burnunu kırdın" },
    { n: 25, r: 14, c: 8, w: "KARNIYARIK", d: 1, q: "Senin en sevdiğin yemek" },
    { n: 26, r: 15, c: 10, w: "TAŞDUVARLAR", d: 0, q: "Sana aşık olurken arka fonda çalan şarkı" },
    { n: 27, r: 14, c: 16, w: "AY", d: 1, q: "İleride yazları gideceğimiz yer" },
    { n: 28, r: 16, c: 7, w: "YALASAM", d: 0, q: "Seni .... napabilirsin ki" },
    { n: 29, r: 16, c: 18, w: "TOPUZ", d: 1, q: "Seni ilk gördüğümde saçın nasıldı" },
    { n: 30, r: 17, c: 9, w: "NAZAR", d: 0, q: "Arabamın ismi (....boncuğu)" },
    { n: 31, r: 17, c: 15, w: "ZOOTOPİA", d: 0, q: "İlk birlikte izlediğimiz film" },
    { n: 32, r: 18, c: 3, w: "FENER", d: 0, q: "Beşirli sahilin sonunda nereye yürüdük" },
    { n: 33, r: 18, c: 6, w: "ELBETTE", d: 1, q: "Benim kullanmama güldüğün bir kelime" },
    { n: 34, r: 19, c: 8, w: "OYUNHAMURU", d: 0, q: "İlk aktivitemiz" },
    { n: 35, r: 19, c: 12, w: "HAZAN", d: 1, q: "Benim sürekli gidelim dediğim yer (...bahçe)" },
    { n: 36, r: 19, c: 14, w: "MEŞK", d: 1, q: "Yanan cafe ye benim söylediğim isim" },
    { n: 37, r: 22, c: 12, w: "AŞKIM", d: 0, q: "Senin bana kullandığın tabir" }
];

// İYİ Kİ BENİMLESİN mesajını %100 garanti altına alan harf-koordinat eşleşmesi
const pinkMap = {
    '2,8': 1,   // İ (PEKTABİİ)
    '8,2': 2,   // Y (MEYDAN)
    '3,18': 3,  // İ (ERKENCİKUŞ)
    '11,15': 4, // K (HALBUKİ)
    '10,17': 5, // İ (GANİTA)
    '10,15': 6, // B (BAVUL)
    '18,4': 7,  // E (FENER)
    '11,8': 8,  // N (DOĞUKAN)
    '15,4': 9,  // İ (SİMGE)
    '8,13': 10, // M (FISTIĞIM)
    '10,19': 11,// L (BAVUL)
    '20,14': 12,// E (MEŞK)
    '0,4': 13,  // S (SEKİZŞUBAT)
    '11,16': 14,// İ (HALBUKİ)
    '19,11': 15 // N (OYUNHAMURU)
};

const grid = Array(size * size).fill(null);

words.forEach(d => {
    // Soruları Listeye Ekle
    const dirTxt = d.d === 0 ? "Yatay" : "Aşağı";
    clueList.innerHTML += `<div class="clue-item"><b>${d.n}.</b> [${dirTxt}] ${d.q}</div>`;
    
    // Izgarayı (Grid) Doldur
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
            if (i === 0 && d.n) grid[idx].num = d.n; // Kesişenlerin başlık numarası
            if (pId) grid[idx].msgId = pId; // Pembe kutu ataması
        }
    }
});

function init() {
    // HTML'e Çiz
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

    // Şifre Kutuları (İYİ Kİ BENİMLESİN - 15 Harf)
    const w1 = [1, 2, 3], w2 = [4, 5], w3 = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    w1.forEach(id => document.getElementById('w1').innerHTML += `<div class="msg-box" id="msg-${id}">?</div>`);
    w2.forEach(id => document.getElementById('w2').innerHTML += `<div class="msg-box" id="msg-${id}">?</div>`);
    w3.forEach(id => document.getElementById('w3').innerHTML += `<div class="msg-box" id="msg-${id}">?</div>`);
}

// Harf Girişi
gridContainer.addEventListener('input', (e) => {
    const input = e.target;
    const val = toUpperTR(input.value);
    const ans = input.dataset.ans;
    const mid = input.dataset.msg;
    
    if (val === ans) {
        input.style.color = "#4dff88"; // Doğruysa Yeşil
        if (mid) {
            const b = document.getElementById(`msg-${mid}`);
            b.innerText = val; 
            b.classList.add('filled');
        }
    } else { 
        input.style.color = "#ff4d4d"; // Yanlışsa Kırmızı
    }
});

init();