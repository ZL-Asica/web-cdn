;(function () {
  // --- Language & Code Detection ---
  function pickLang() {
    const qs = new URLSearchParams(location.search)
    const q = qs.get('lang')
    if (q) {
      localStorage.setItem('lang', q)
      return q
    }
    const s = localStorage.getItem('lang')
    if (s) {
      return s
    }
    const nav = (navigator.language || 'en').toLowerCase()
    if (nav.startsWith('zh-tw') || nav.startsWith('zh-hk') || nav.startsWith('zh-mo')) {
      return 'zh-HK'
    }
    if (nav.startsWith('zh')) {
      return 'zh-CN'
    }
    if (nav.startsWith('ar')) {
      return 'ar'
    }
    if (nav.startsWith('ja') || nav.startsWith('jp')) {
      return 'ja'
    }
    return 'en'
  }

  function pickCode() {
    const qs = new URLSearchParams(location.search)
    const fromQuery = qs.get('code')
    if (fromQuery) {
      return fromQuery
    }
    const meta = document.querySelector('meta[name="error-code"]')
    if (meta?.content) {
      return meta.content
    }
    const ds = document.body?.dataset?.errorCode || document.documentElement?.dataset?.errorCode
    if (ds) {
      return ds
    }
    const m = (document.title || '').match(/^(\d{3,4})\b/)
    return m ? m[1] : '500'
  }

  /* ---------- translations & per-code overrides ---------- */
  /* base keys: title, desc, countdownTail, countdownAria(n), goHome, goBack, skip, actionsLabel, dir, redirectURL, countdown */
  const I18N_PACK = {
    'zh-CN': {
      dir: 'ltr',
      base: {
        title: '出错了',
        desc: '抱歉，出现了问题，请稍后再试。🚧',
        countdownTail: '秒后将自动跳转到首页。',
        countdownAria: n => `${n} 秒后将自动跳转到首页`,
        goHome: '返回首页',
        goBack: '返回上一页',
        skip: '跳到主内容',
        actionsLabel: '可用操作',
        redirectURL: '/',
        countdown: 10,
      },
      codes: {
        401: { title: '401 - 没登录哦 🥺', desc: '请先登录再继续冒险吧～ 🔑', redirectURL: '/login' },
        403: { title: '403 - 禁止通行 🚫', desc: '前面是管理员的领地～你还没有通行证呢！💌' },
        404: { title: '404 - 迷路啦 🐾', desc: '唔… 页面跑去喝奶茶了？再看看首页吧 🍵' },
        410: { title: '410 - 消失的内容 🌫️', desc: '它已经悄悄离开这个世界啦…（挥手再见 👋）' },
        418: { title: '418 - 我是个茶壶 🍵', desc: '不要让我煮咖啡啦，我只会泡茶 ☕️💨' },
        429: { title: '429 - 太急啦 ⏳', desc: '休息一下吧，服务器有点累了 😴（喝口水再来～）', countdown: 15 },
        500: { title: '500 - 系统发脾气了 😖', desc: '服务器在闹小情绪中，请稍后再安抚它 💔' },
        502: { title: '502 - 网关卡壳了 🚧', desc: '连接的管道堵住啦～我们正在修理中 🔧' },
        503: { title: '503 - 在打盹 💤', desc: '服务临时休息一下，很快就回来抱抱你 🤗', countdown: 15 },
        1001: { title: '1001 - 小宇宙炸裂 ✨', desc: '发生了意想不到的奇妙错误，别慌，马上好～ 💫' },
      },
    },
    'en': {
      dir: 'ltr',
      base: {
        title: 'Something went wrong',
        desc: 'Sorry, an error occurred. Please try again later. 🚧',
        countdownTail: 'seconds before redirecting to the homepage.',
        countdownAria: n => `${n} seconds before redirecting to the homepage`,
        goHome: 'Go Home',
        goBack: 'Go Back',
        skip: 'Skip to main content',
        actionsLabel: 'Available actions',
        redirectURL: '/',
        countdown: 10,
      },
      codes: {
        401: { title: '401 - Oops, not logged in 🥺', desc: 'Please log in first to keep exploring~ 🔑', redirectURL: '/login' },
        403: { title: '403 - Forbidden 🚫', desc: 'That’s the admin’s secret garden—you need a pass first! 💌' },
        404: { title: '404 - Lost your way 🐾', desc: 'Hmm… looks like this page ran off for bubble tea 🍵' },
        410: { title: '410 - Gone 🌫️', desc: 'This content has quietly left the world… waving goodbye 👋' },
        418: { title: '418 - I’m a teapot 🍵', desc: 'Please don’t make me brew coffee, I only do tea ☕️💨' },
        429: { title: '429 - Too fast! ⏳', desc: 'Take a lil break~ the server’s having a nap 😴', countdown: 15 },
        500: { title: '500 - Server tantrum 😖', desc: 'Our backend is throwing a fit… give it a hug later 💔' },
        502: { title: '502 - Gateway hiccup 🚧', desc: 'The connection pipe got clogged! We’re fixing it 🔧' },
        503: { title: '503 - Taking a nap 💤', desc: 'Service is resting for a bit, be right back for cuddles 🤗', countdown: 15 },
        1001: { title: '1001 - Cosmic glitch ✨', desc: 'A mysterious little error occurred, but don’t panic~ 💫' },
      },
    },
    'ja': {
      dir: 'ltr',
      base: {
        title: 'エラーが発生しました',
        desc: '申し訳ありません。後でもう一度お試しください。🚧',
        countdownTail: '秒後にホームページへリダイレクトします。',
        countdownAria: n => `${n} 秒後にホームページへリダイレクトします`,
        goHome: 'ホームに戻る',
        goBack: '前のページに戻る',
        skip: 'メインコンテンツへスキップ',
        actionsLabel: '利用可能な操作',
        redirectURL: '/',
        countdown: 10,
      },
      codes: {
        401: { title: '401 - ログインしてないよ〜 🥺', desc: '冒険を続ける前に、まずログインしてね〜 🔑', redirectURL: '/login' },
        403: { title: '403 - 立入禁止 🚫', desc: 'ここは管理者の秘密のお庭だよ💌 パスが必要みたい！' },
        404: { title: '404 - 迷子になっちゃった 🐾', desc: 'ページがお出かけ中みたい…タピオカでも飲みに行ったかな🍵' },
        410: { title: '410 - 消えちゃった 🌫️', desc: 'このコンテンツは静かに旅立ってしまいました…さようなら👋' },
        418: { title: '418 - 私はティーポットです 🍵', desc: 'コーヒーは無理〜！お茶しか淹れられません☕️💨' },
        429: { title: '429 - 急ぎすぎ〜 ⏳', desc: 'ちょっと休憩してね〜サーバーがうとうと中😴', countdown: 15 },
        500: { title: '500 - サーバーがご機嫌ナナメ 😖', desc: 'サーバーが少しすねちゃった…あとでなだめてあげて💔' },
        502: { title: '502 - ゲートウェイがつっかえた 🚧', desc: '接続パイプが詰まっちゃった！今なおしてるよ🔧' },
        503: { title: '503 - お昼寝中 💤', desc: 'サービスはちょっとお休み中〜すぐ戻ってくるね🤗', countdown: 15 },
        1001: { title: '1001 - 宇宙のいたずら ✨', desc: 'ちょっぴり不思議なエラーが起きちゃった💫 でも大丈夫！' },
      },
    },
    'ar': {
      dir: 'rtl',
      base: {
        title: 'حدث خطأ',
        desc: 'عذرًا، حدث خطأ. حاول لاحقًا. 🚧',
        countdownTail: 'ثانية قبل إعادة التوجيه إلى الصفحة الرئيسية.',
        countdownAria: n => `سيتم إعادة التوجيه إلى الصفحة الرئيسية خلال ${n} ثانية`,
        goHome: 'الصفحة الرئيسية',
        goBack: 'عودة',
        skip: 'التخطي إلى المحتوى الرئيسي',
        actionsLabel: 'إجراءات متاحة',
        redirectURL: '/',
        countdown: 10,
      },
      codes: {
        401: { title: '401 - لم تسجّل الدخول بعد 🥺', desc: 'سجّل الدخول أولًا لمتابعة مغامرتك~ 🔑', redirectURL: '/login' },
        403: { title: '403 - ممنوع 🚫', desc: 'هذه حديقة المدير السرّية 🌸 تحتاج إلى تصريح 💌' },
        404: { title: '404 - تائه قليلاً 🐾', desc: 'يبدو أن الصفحة خرجت لتشرب شاي الفقاعات 🍵' },
        410: { title: '410 - اختفى المحتوى 🌫️', desc: 'لقد غادر هذا المحتوى بهدوء… إلى اللقاء 👋' },
        418: { title: '418 - أنا إبريق شاي 🍵', desc: 'لا تطلب مني القهوة، أنا أُحضّر الشاي فقط ☕️💨' },
        429: { title: '429 - بسرعة كبيرة ⏳', desc: 'تمهّل قليلًا، الخادم يحتاج إلى قيلولة 😴', countdown: 15 },
        500: { title: '500 - الخادم غاضب 😖', desc: 'الخادم يمرّ بيومٍ صعب… امنحه بعض الوقت 💔' },
        502: { title: '502 - خطأ في البوابة 🚧', desc: 'أنبوب الاتصال مسدود! نقوم بإصلاحه الآن 🔧' },
        503: { title: '503 - في استراحة قصيرة 💤', desc: 'الخدمة تأخذ قسطًا من الراحة، ستعود إليك قريبًا 🤗', countdown: 15 },
        1001: { title: '1001 - خلل كوني ✨', desc: 'حدث خطأ صغير غامض، لا تقلق يا صديقي 💫' },
      },
    },
    'zh-HK': {
      dir: 'ltr',
      base: {
        title: '發生錯誤',
        desc: '抱歉，出現問題，請稍後再試。🚧',
        countdownTail: '秒後將自動跳轉到首頁。',
        countdownAria: n => `${n} 秒後將自動跳轉到首頁`,
        goHome: '返回首頁',
        goBack: '返回上一頁',
        skip: '跳到主內容',
        actionsLabel: '可用操作',
        redirectURL: '/',
        countdown: 10,
      },
      codes: {
        401: { title: '401 - 還沒登入呢 🥺', desc: '先登入一下再繼續冒險吧～ 🔑', redirectURL: '/login' },
        403: { title: '403 - 禁止通行 🚫', desc: '前面是管理員的秘密花園～還沒有通行證呢 💌' },
        404: { title: '404 - 迷路囉 🐾', desc: '唔… 這個頁面好像跑去喝珍奶了？🍵' },
        410: { title: '410 - 消失的內容 🌫️', desc: '它已經悄悄離開這個世界啦～（揮手再見 👋）' },
        418: { title: '418 - 我是茶壺 🍵', desc: '別逼我煮咖啡啦～我只會泡茶 ☕️💨' },
        429: { title: '429 - 太急啦 ⏳', desc: '稍微歇一下吧～伺服器有點累了 😴', countdown: 15 },
        500: { title: '500 - 系統在鬧脾氣 😖', desc: '伺服器有點不開心，請稍後再試試看 💔' },
        502: { title: '502 - 網關卡住了 🚧', desc: '連接的管道堵住啦～我們正在修理中 🔧' },
        503: { title: '503 - 偷偷小睡中 💤', desc: '服務暫時休息一下，馬上就回來抱抱你 🤗', countdown: 15 },
        1001: { title: '1001 - 小宇宙爆發 ✨', desc: '出現了一個神秘的小錯誤，不用擔心喔～ 💫' },
      },
    },
  }
  function applyI18n(cfg) {
    const dict = {
      title: cfg.title,
      desc: cfg.desc,
      countdownTail: cfg.countdownTail,
      countdownAria: cfg.countdownAria,
      goHome: cfg.goHome,
      goBack: cfg.goBack,
      skip: cfg.skip,
      actionsLabel: cfg.actionsLabel,
    }
    document.title = cfg.title
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n')
      const val = dict[key]
      if (val) {
        el.textContent = typeof val === 'function' ? val(el.textContent) : val
      }
    })
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      const pairs = el.getAttribute('data-i18n-attr').split(',').map(s => s.trim())
      pairs.forEach((p) => {
        const [attr, key] = p.split(':')
        const val = dict[key]
        if (val) {
          el.setAttribute(attr, typeof val === 'function' ? val(el.getAttribute(attr)) : val)
        }
      })
    })
  }

  // --- Export to global scope ---
  window.I18N_PACK = I18N_PACK
  window.pickLang = pickLang
  window.pickCode = pickCode
  window.applyI18n = applyI18n
})()
