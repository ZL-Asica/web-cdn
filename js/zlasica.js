const zlaToastTotalDuration = 10_000

// Define the dates to apply the grayscale effect
const grayScaleDates = new Set([
  '01-27',
  '05-12',
  '07-07',
  '09-18',
  '11-20',
  '12-13',
])

// Inject toast styles once
function ensureToastStyles() {
  if (document.getElementById('zl-toast-style')) {
    return
  }

  const style = document.createElement('style')
  style.id = 'zl-toast-style'
  style.textContent = `
    .zl-toast {
      position: fixed;
      left: 50%;
      top: 20px;
      transform: translateX(-50%) translateY(8px);
      /* Wider on desktop so it wraps less aggressively */
      max-width: min(560px, 96vw);
      padding: 12px 20px;
      background-color: var(--zl-toast-bg, rgba(33, 33, 33, 0.95));
      color: var(--zl-toast-fg, #ffffff);
      border-radius: 8px;
      box-shadow:
        0 4px 6px rgba(0, 0, 0, 0.2),
        0 1px 3px rgba(0, 0, 0, 0.1);
      font-size: 16px;
      text-align: center;
      line-height: 1.5;
      opacity: 0;
      transition: opacity 0.4s ease, transform 0.4s ease;
      z-index: 9999;
      box-sizing: border-box;
      /* More natural wrapping: keep words when possible */
      word-break: normal;
      overflow-wrap: anywhere;
      pointer-events: none;
    }

    @media (max-width: 640px) {
      .zl-toast {
        top: 10px;
        /* Smaller outer margin on mobile: 8px each side */
        max-width: calc(100% - 16px);
        padding: 8px 12px;
        font-size: 14px;
        transform: translateX(-50%) translateY(6px);
      }
    }
  `
  document.head.appendChild(style)
}

function showTempToaster(
  message,
  duration = 10000,
  options = {},
) {
  const {
    backgroundColor = 'rgba(33, 33, 33, 0.95)',
    textColor = 'white',
  } = options

  if (typeof document === 'undefined') {
    return
  }

  ensureToastStyles()

  const toaster = document.createElement('div')
  toaster.className = 'zl-toast'
  toaster.textContent = message

  // Pass customizable colors via CSS variables
  toaster.style.setProperty('--zl-toast-bg', backgroundColor)
  toaster.style.setProperty('--zl-toast-fg', textColor)

  document.body.appendChild(toaster)

  // Fade in
  requestAnimationFrame(() => {
    // Let layout settle before animation
    requestAnimationFrame(() => {
      toaster.style.opacity = '1'
      toaster.style.transform = toaster.style.transform
        .replace('8px', '0')
        .replace('6px', '0')
    })
  })

  // Fade out
  setTimeout(() => {
    toaster.style.opacity = '0'
    // No need to change transform here — initial offset is in CSS
    setTimeout(() => {
      toaster.remove()
    }, 400)
  }, duration)
}

function isHomeLikePath() {
  if (typeof window === 'undefined') {
    return false
  }

  let path = window.location.pathname || '/'

  // Make sure the path starts with /
  if (!path.startsWith('/')) {
    path = `/${path}`
  }

  // Remove trailing slashes, but keep the root '/'
  if (path !== '/' && path.endsWith('/')) {
    path = path.slice(0, -1)
  }

  // Here list all the paths should be considered as "home"
  const HOME_PATHS = [
    '/', // Domain root
    '/index.html', // Static homepage
    '/index.htm',
    // Language roots to also count as "home":
    '/zh',
    '/zh-cn',
    '/en',
    '/ja',
    '/en-us',
  ]

  return HOME_PATHS.includes(path.toLowerCase())
}

// Wrap all logic in an IIFE to prevent variable conflicts
(() => {
  const now = new Date()
  const currentMonthDay = `${String(now.getMonth() + 1).padStart(
    2,
    '0',
  )}-${String(now.getDate()).padStart(2, '0')}`

  const humanReadableDuration = Math.floor(zlaToastTotalDuration / 1000)

  const messages = {
    'en': `Today is a special day. We commemorate in silence for ${humanReadableDuration} seconds.`,
    'zh': `今天是一个特殊的日子，我们将默哀 ${humanReadableDuration} 秒。`,
    'zh-CN': `今天是一个特殊的日子，我们将默哀 ${humanReadableDuration} 秒。`,
    'zh-TW': `今天是一個特殊的日子，我們將默哀 ${humanReadableDuration} 秒。`,
    'fr': `Aujourd'hui est un jour spécial. Nous commémorons en silence pendant ${humanReadableDuration} secondes.`,
    'ja': `今日は特別な日です。${humanReadableDuration} 秒間黙祷します。`,
    'ko': `오늘은 특별한 날입니다. ${humanReadableDuration} 초간 침묵으로 추모합니다。`,
    'es': `Hoy es un día especial. Conmemoramos en silencio durante ${humanReadableDuration} segundos.`,
    'de': `Heute ist ein besonderer Tag. Wir gedenken ${humanReadableDuration} Sekunden lang in Stille.`,
  }

  function getUserLanguage() {
    const lang = navigator.language || 'en'
    return messages[lang] || messages[lang.split('-')[0]] || messages.en
  }

  // eslint-disable-next-line no-console
  console.log(`%c
    ███████╗██╗          █████╗ ███████╗██╗ ██████╗ █████╗ 
    ╚══███╔╝██║         ██╔══██╗██╔════╝██║██╔════╝██╔══██╗
      ███╔╝ ██║         ███████║███████╗██║██║     ███████║
    ███╔╝  ██║         ██╔══██║╚════██║██║██║     ██╔══██║
    ███████╗███████╗    ██║  ██║███████║██║╚██████╗██║  ██║
    ╚══════╝╚══════╝    ╚═╝  ╚═╝╚══════╝╚═╝ ╚═════╝╚═╝  ╚═╝
  `, 'color: #ff9fb2; font-weight: bold; text-shadow: 2px 2px 4px rgba(255,159,178,0.6); font-size: 14px;')

  // eslint-disable-next-line no-console
  console.log(
    `%c
    🚀 由 %cZL Asica%c 制作搭建与运行
      Built & Operated by %cZL Asica%c

    🔗 访问我的博客 (Visit My Blog):
      %chttps://zla.pub%c
    
    📅 当前时间 (Current Time): %c${now.toLocaleString()}%c
  `,
    'color: #91c7e0; font-weight: bold; font-size: 12px;',
    'color: #f17b96; font-weight: bold; font-size: 14px;',
    'color: #91c7e0; font-weight: bold; font-size: 12px;',
    'color: #f17b96; font-weight: bold; font-size: 14px;',
    'color: #91c7e0; font-weight: bold; font-size: 12px;',
    'color: #91c7e0; font-weight: bold; text-decoration: underline;',
    'color: #91c7e0;',
    'color: #81e6d9; font-weight: bold; font-size: 12px;',
    'color: #91c7e0; font-size: 12px;',
  )

  const isHomeLike = isHomeLikePath()
  // Check if the date string is in the grayScaleDates Set
  const isGrayScaleDate = grayScaleDates.has(currentMonthDay)

  // eslint-disable-next-line no-console
  console.log(
    `%c[ZL Asica Script] isHomeLike: ${isHomeLike}, currentMonthDay: ${currentMonthDay}, isGrayScaleDate: ${isGrayScaleDate}`,
    'color: #91c7e0; font-weight: bold;',
  )
  if (isHomeLike) {
    // GrayScaleModule
    const GrayScaleModule = (() => {
      // Apply the grayscale effect
      const applyGrayScale = () => {
        Object.assign(document.body.style, {
          filter: 'grayscale(100%)',
          transition: 'filter 1s ease',
        })
      }

      // Clear the grayscale effect
      const clearGrayScale = () => {
        document.body.style.filter = 'none'
      }

      return { applyGrayScale, clearGrayScale }
    })()

    if (isGrayScaleDate) {
      GrayScaleModule.applyGrayScale()

      const message = getUserLanguage()
      showTempToaster(message, zlaToastTotalDuration)

      setTimeout(() => {
        GrayScaleModule.clearGrayScale()
      }, zlaToastTotalDuration)

      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          GrayScaleModule.clearGrayScale()
        }
      })
    }
  }
})()
