// Toaster notification
function showToaster(
  message,
  duration = 3000, // Default to 3 seconds
  options = {}
) {
  const {
    backgroundColor = "rgba(33, 33, 33, 0.9)", // Default dark gray
    textColor = "white", // Default white text
    fontSize = "18px", // Default font size
  } = options;

  const toaster = document.createElement("div");
  toaster.innerText = message;

  // Material Design inspired styles
  toaster.style.position = "fixed";
  toaster.style.top = "20px"; // Top of the screen
  toaster.style.left = "50%"; // Center horizontally
  toaster.style.transform = "translateX(-50%)"; // Align to center
  toaster.style.maxWidth = "90%"; // Limit width for smaller screens
  toaster.style.padding = "15px 25px"; // Larger padding for better readability
  toaster.style.backgroundColor = backgroundColor; // Customizable background color
  toaster.style.color = textColor; // Customizable text color
  toaster.style.borderRadius = "8px"; // Rounded corners
  toaster.style.boxShadow =
    "0 4px 6px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1)";
  toaster.style.fontSize = fontSize; // Customizable font size
  toaster.style.textAlign = "center"; // Center the text
  toaster.style.lineHeight = "1.4";
  toaster.style.opacity = "0";
  toaster.style.transition = "opacity 0.5s ease, transform 0.5s ease"; // Add transition for fade-in and slight movement
  toaster.style.zIndex = "9999";

  document.body.appendChild(toaster);

  // Show the toaster with fade-in and slight slide-down effect
  setTimeout(() => {
    toaster.style.opacity = "1";
    toaster.style.transform = "translateX(-50%) translateY(10px)"; // Slide down slightly
  }, 100);

  // Remove the toaster after the specified duration
  setTimeout(() => {
    toaster.style.opacity = "0";
    toaster.style.transform = "translateX(-50%) translateY(0)"; // Reset position
    setTimeout(() => {
      toaster.remove();
    }, 500); // Wait for fade-out transition to complete
  }, duration);
}

const now = new Date();
const currentMonthDay = `${String(now.getMonth() + 1).padStart(
  2,
  "0"
)}-${String(now.getDate()).padStart(2, "0")}`;

// Language dictionary
const messages = {
  en: "Today is a special day. We commemorate in silence for 3 seconds.",
  zh: "今天是一个特殊的日子，我们将默哀3秒。",
  "zh-CN": "今天是一个特殊的日子，我们将默哀3秒。",
  "zh-TW": "今天是一個特殊的日子，我們將默哀3秒。",
  fr: "Aujourd'hui est un jour spécial. Nous commémorons en silence pendant 3 secondes.",
  ja: "今日は特別な日です。3秒間黙祷します。",
  ko: "오늘은 특별한 날입니다. 3초간 침묵으로 추모합니다。",
  es: "Hoy es un día especial. Conmemoramos en silencio durante 3 segundos。",
  de: "Heute ist ein besonderer Tag. Wir gedenken 3 Sekunden lang in Stille。",
};

// Function to get user's preferred language
function getUserLanguage() {
  const lang = navigator.language || "en";
  return messages[lang] || messages[lang.split("-")[0]] || messages["en"];
}

// Gray scale effect (Only for specific dates)
function grayScale() {
  const grayScaleDates = ["04-04", "05-12", "09-18", "11-20", "12-13"];
  if (grayScaleDates.includes(currentMonthDay)) {
    document.body.style.filter = "grayscale(100%)";
    document.body.style.transition = "filter 1s ease"; // Add transition effect

    // Get the message based on user's language
    const message = getUserLanguage();
    showToaster(message);
  }
}

// Clear gray scale effect
function clearGrayScale() {
  document.body.style.filter = "none";
}

// Custom console log
console.log(`
  ______          _        _           
 |__  / |        / \\   ___(_) ___ __ _ 
   / /| |       / _ \\ / __| |/ __/ _\` |
  / /_| |___   / ___ \\\\__ \\ | (_| (_| |
 /____|_____| /_/   \\_\\___/_|\\___\\__,_|

由ZL Asica制作搭建与运行
Built and Operated by ZL Asica
访问我的网站/Visit my website:
https://www.zla.pub

${now.toLocaleString()}
`);

// Check if the current page is the homepage
if (window.location.pathname === "/") {
  grayScale();

  // Timeout to clear gray scale effect
  setTimeout(() => {
    clearGrayScale();
  }, 3000);

  // Listen for tab switching
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      clearGrayScale(); // Clear gray scale effect
    }
  });
}
