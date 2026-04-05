// Harf eşleşmeleri (Sadece bu kutular mesajı doldurur)
// İYİ Kİ BENİMLESİN (15 harf)
const questions = [
    { q: "Seni gördüğüm ilk yer? (M...)", a: "MEYDAN", msg: { 0: 6, 5: 8 } }, // M(10)->6, N(15)->8 (Düzeltildi)
    { q: "Bana aldığın ilk fiziki hediye? (B...)", a: "BİLEKLİK", msg: { 1: 1, 4: 4, 6: 9 } }, // İ->1, K->4, İ->9
    { q: "İlk birlikte izlediğimiz dizi? (E...)", a: "ERKENCİKUŞ", msg: { 0: 7, 6: 14 } }, // E->7, İ->14
    { q: "İlk başbaşa buluştuğumuz yer? (G...)", a: "GANİTASAHİL", msg: { 3: 3, 10: 11 } }, // İ->3, L->11
    { q: "Yürüyerek ne aramıştık? (B...)", a: "BİM", msg: { 1: 5 } }, // İ->5
    { q: "En sevdiğin yemek? (K...)", a: "KARNIYARIK", msg: { 8: 2 } }, // Y->2
    { q: "En sevdiğim yemek? (P...)", a: "PİRİNÇPİLAVI", msg: { 5: 10 } }, // M->10
    { q: "Gelecekteki yerleşeceğimiz yer? (A...)", a: "AY", msg: {} },
    { q: "Aşık olduğumu anladığım an çalan şarkı? (T...)", a: "TAŞDUVARLAR", msg: { 1: 12, 3: 13, 10: 15 } } // E->12, S->13, N->15
];

const secretMsg = "İYİ Kİ BENİMLESİN";
const gridContainer = document.getElementById('puzzleGrid');

// Gizli mesaj kutularını oluştur
function setupSecret() {
    const w1 = [1,2,3], w2 = [4,5], w3 = [6,7,8,9,10,11,12,13,14,15];
    w1.forEach(id => document.getElementById('word1').innerHTML += `<div class="msg-box" id="msg-${id}">?</div>`);
    w2.forEach(id => document.getElementById('word2').innerHTML += `<div class="msg-box" id="msg-${id}">?</div>`);
    w3.forEach(id => document.getElementById('word3').innerHTML += `<div class="msg-box" id="msg-${id}">?</div>`);
}

function initGrid() {
    questions.forEach(item => {
        // Soru
        const qDiv = document.createElement('div');
        qDiv.className = 'cell question';
        qDiv.innerHTML = `<span>${item.q}</span>`;
        gridContainer.appendChild(qDiv);

        // Cevap
        item.a.split('').forEach((char, i) => {
            const div = document.createElement('div');
            div.className = 'cell';
            const input = document.createElement('input');
            input.maxLength = 1;
            input.dataset.ans = char;
            if (item.msg[i]) {
                const n = document.createElement('span');
                n.className = 'num';
                n.innerText = item.msg[i];
                div.appendChild(n);
                input.dataset.target = item.msg[i];
            }
            div.appendChild(input);
            gridContainer.appendChild(div);
        });

        // Satır dolgusu
        for(let i=0; i < (11 - item.a.length); i++) {
            const empty = document.createElement('div');
            empty.className = 'cell';
            empty.style.background = "transparent";
            empty.style.border = "none";
            gridContainer.appendChild(empty);
        }
    });
}

gridContainer.addEventListener('input', (e) => {
    const el = e.target;
    const val = el.value.toUpperCase();
    if (val === el.dataset.ans) {
        el.style.color = "#4dff88";
        if (el.dataset.target) {
            const box = document.getElementById(`msg-${el.dataset.target}`);
            box.innerText = val;
            box.classList.add('filled');
        }
        // focus next
        const all = Array.from(document.querySelectorAll('input'));
        const next = all[all.indexOf(el) + 1];
        if (next) next.focus();
    } else {
        el.style.color = "#ff4d4d";
    }
    if (document.querySelectorAll('.msg-box.filled').length === 15) {
        alert("İyi ki benimlesin! Nice mutlu aylara...");
    }
});

setupSecret();
initGrid();