/**
 * This function creates a temporary toaster notification that
 *    fades in, stays for a specified duration, and fades out.
 *
 * @param {string} message - The message to display in the toaster
 * @param {number} duration - The duration to display the toaster in milliseconds
 * @param {object} options - Additional options for the toaster
 * @param {string} options.backgroundColor - The background color of the toaster
 * @param {string} options.textColor - The text color of the toaster
 * @param {string} options.fontSize - The font size of the toaster
 * @returns {void}
 */
function showTempToaster(
  message,
  duration = 3000, // Default to 3 seconds
  options = {},
) {
  const {
    backgroundColor = 'rgba(33, 33, 33, 0.9)', // Default dark gray
    textColor = 'white', // Default white text
    fontSize = '18px', // Default font size
  } = options

  const toaster = document.createElement('div')
  toaster.textContent = message

  // Material Design inspired styles
  toaster.style.position = 'fixed'
  toaster.style.top = '20px' // Top of the screen
  toaster.style.left = '50%' // Center horizontally
  toaster.style.transform = 'translateX(-50%)' // Align to center
  toaster.style.maxWidth = '90%' // Limit width for smaller screens
  toaster.style.padding = '15px 25px' // Larger padding for better readability
  toaster.style.backgroundColor = backgroundColor // Customizable background color
  toaster.style.color = textColor // Customizable text color
  toaster.style.borderRadius = '8px' // Rounded corners
  toaster.style.boxShadow
    = '0 4px 6px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1)'
  toaster.style.fontSize = fontSize // Customizable font size
  toaster.style.textAlign = 'center' // Center the text
  toaster.style.lineHeight = '1.4'
  toaster.style.opacity = '0'
  toaster.style.transition = 'opacity 0.5s ease, transform 0.5s ease' // Add transition for fade-in and slight movement
  toaster.style.zIndex = '9999'

  document.body.appendChild(toaster)

  // Show the toaster with fade-in and slight slide-down effect
  setTimeout(() => {
    toaster.style.opacity = '1'
    toaster.style.transform = 'translateX(-50%) translateY(10px)' // Slide down slightly
  }, 100)

  // Remove the toaster after the specified duration
  setTimeout(() => {
    toaster.style.opacity = '0'
    toaster.style.transform = 'translateX(-50%) translateY(0)' // Reset position
    setTimeout(() => {
      toaster.remove()
    }, 500) // Wait for fade-out transition to complete
  }, duration)
}

// Wrap all logic in an IIFE to prevent variable conflicts
(() => {
  const now = new Date()
  const currentMonthDay = `${String(now.getMonth() + 1).padStart(
    2,
    '0',
  )}-${String(now.getDate()).padStart(2, '0')}`

  const messages = {
    'en': 'Today is a special day. We commemorate in silence for 10 seconds.',
    'zh': '今天是一个特殊的日子，我们将默哀 10 秒。',
    'zh-CN': '今天是一个特殊的日子，我们将默哀 10 秒。',
    'zh-TW': '今天是一個特殊的日子，我們將默哀 10 秒。',
    'fr': 'Aujourd\'hui est un jour spécial. Nous commémorons en silence pendant 10 secondes.',
    'ja': '今日は特別な日です。10 秒間黙祷します。',
    'ko': '오늘은 특별한 날입니다. 10 초간 침묵으로 추모합니다。',
    'es': 'Hoy es un día especial. Conmemoramos en silencio durante 10 segundos。',
    'de': 'Heute ist ein besonderer Tag. Wir gedenken 10 Sekunden lang in Stille。',
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
  console.log(`%c
    🚀 由 %cZL Asica%c 制作搭建与运行
      Built & Operated by %cZL Asica%c

    🔗 访问我的博客 (Visit My Blog):
      %chttps://zla.pub%c
    
    📅 当前时间 (Current Time): %c${now.toLocaleString()}%c
  `, 'color: #91c7e0; font-weight: bold; font-size: 12px;', 'color: #f17b96; font-weight: bold; font-size: 14px;', 'color: #91c7e0; font-weight: bold; font-size: 12px;', 'color: #f17b96; font-weight: bold; font-size: 14px;', 'color: #91c7e0; font-weight: bold; font-size: 12px;', 'color: #91c7e0; font-weight: bold; text-decoration: underline;', 'color: #91c7e0;', 'color: #81e6d9; font-weight: bold; font-size: 12px;', 'color: #91c7e0; font-size: 12px;')

  if (window.location.pathname === '/') {
    // GrayScaleModule
    const GrayScaleModule = (() => {
      // Define the dates to apply the grayscale effect
      const grayScaleDates = new Set([
        '01-27',
        '05-12',
        '07-07',
        '09-18',
        '11-20',
        '12-13',
      ])

      // Check if the date string is in the grayScaleDates Set
      const isGrayScaleDate = dateStr => grayScaleDates.has(dateStr)

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

      return { isGrayScaleDate, applyGrayScale, clearGrayScale }
    })()

    if (GrayScaleModule.isGrayScaleDate(currentMonthDay)) {
      GrayScaleModule.applyGrayScale()

      const message = getUserLanguage()
      showTempToaster(message)

      setTimeout(() => {
        GrayScaleModule.clearGrayScale()
      }, 10000) // 10 seconds

      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          GrayScaleModule.clearGrayScale()
        }
      })
    }
  }
})()
