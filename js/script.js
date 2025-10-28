// Get config from global i18n pack
const lang = window.pickLang()
const code = window.pickCode()
const i18n = window.I18N_PACK || {}
const pack = i18n[lang] || i18n.en || {}
const perCode = (pack.codes && pack.codes[code]) || {}
const cfg = { ...pack.base, ...perCode }

// Set language & direction
document.documentElement.lang = lang
document.documentElement.dir = pack.dir || 'ltr'

// Apply translation
if (window.applyI18n) {
  window.applyI18n(cfg)
}

/* ---------- Redirect Timer & Buttons ---------- */
const redirectURL = cfg.redirectURL || '/'
const countdownTime = Number(cfg.countdown) || 10

let timer = countdownTime

const timerElement = document.getElementById('timer')
const redirectLink = document.getElementById('redirect-link')
const backButton = document.getElementById('back-button')

redirectLink.href = redirectURL

// Timer Countdown (also for screen readers)
const interval = setInterval(() => {
  timer -= 1
  if (timerElement) {
    timerElement.textContent = String(timer)
    const ariaText = (cfg.countdownAria && cfg.countdownAria(timer)) || `${timer}`
    timerElement.setAttribute('aria-label', ariaText)
  }
  if (timer <= 0) {
    clearInterval(interval)
    // JS fallback redirect (in addition to <meta refresh>)
    window.location.href = redirectURL
  }
}, 1000)

// Back button behavior
if (backButton) {
  backButton.addEventListener('click', () => {
    if (document.referrer) {
      window.history.back()
    }
    else {
      window.location.href = redirectURL
    }
  })
}
