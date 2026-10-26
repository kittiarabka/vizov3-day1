const symbols = Array.from(document.querySelectorAll(".symbol"));
const button = document.getElementById("scan-button");
const finale = document.getElementById("finale");
const liveStatus = document.getElementById("live-status");

const SCAN_MS = 1000;
const GLOW_FADE_MS = 560;
const BETWEEN_MS = 420;
const FINALE_DELAY_MS = 700;

const ordinals = ["первый", "второй", "третий"];

button.addEventListener("click", startScan);

function startScan() {
  button.disabled = true;
  button.textContent = "Сканирование…";
  scanAt(0);
}

function scanAt(index) {
  if (index >= symbols.length) {
    window.setTimeout(showFinale, FINALE_DELAY_MS);
    return;
  }

  const symbol = symbols[index];
  const glyph = symbol.querySelector(".glyph");
  liveStatus.textContent = "Сканируется " + ordinals[index] + " символ";
  glyph.classList.add("is-scanning");

  window.setTimeout(() => {
    glyph.classList.remove("is-scanning");
    glyph.classList.add("is-decoded");

    window.setTimeout(() => {
      symbol.classList.add("is-revealed");
      const hint = symbol.querySelector(".hint");
      hint.removeAttribute("aria-hidden");
      const word = hint.textContent;
      liveStatus.textContent = "Расшифровано слово «" + word + "»";
      window.setTimeout(() => scanAt(index + 1), BETWEEN_MS);
    }, GLOW_FADE_MS);
  }, SCAN_MS);
}

function showFinale() {
  button.classList.add("is-hidden");
  button.setAttribute("aria-hidden", "true");
  finale.classList.add("is-visible");
  finale.setAttribute("role", "status");
  finale.removeAttribute("aria-hidden");
  liveStatus.textContent = finale.textContent;
}
