
// Get the current date
function getCurrentDate() {
  const date = new Date();
  const formatNumber = num => String(num).padStart(2, '0');

  const year = date.getFullYear();
  const month = formatNumber(date.getMonth() + 1);
  const day = formatNumber(date.getDate());
  const hours = formatNumber(date.getHours());
  const minutes = formatNumber(date.getMinutes());
  const seconds = formatNumber(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Gray scale filter (only for /) on specific dates
function grayScale() {
  // Set the date you want to gray scale
  const grayScaleDates = ["04-04", "05-12", "09-18", "11-20", "12-13"];

  // Get the current date
  const currentDate = getCurrentDate();
  const currentMonthDay = currentDate.split(" ")[0].split("-").slice(1).join("-");

  // Check if the current date is in the gray scale date list
  if (grayScaleDates.includes(currentMonthDay)) {
    // If is, set the gray scale filter
    document.body.style.filter = "grayscale(100%)";
  }
}

// Custom console log
console.log(
  `%c\n` +
    `  ______          _        _           \n` +
    ` |__  / |        / \\   ___(_) ___ __ _ \n` +
    `   / /| |       / _ \\ / __| |/ __/ _\` |\n` +
    `  / /_| |___   / ___ \\\\__ \\ | (_| (_| |\n` +
    ` /____|_____| /_/   \\_\\___/_|\\___\\__,_|\n` +
    `                                       \n`,
  "font-family: monospace; background: #222; color: #FFB6C1; font-size: 16px; padding: 8px; border-radius: 4px;"
);
console.log(
  "%c由ZL Asica制作搭建与运行\nBuilt and Operated by ZL Asica",
  "background:#222;color:#FFB6C1"
);
console.log(
  "%c访问我的网站: https://www.zla.pub\nVisit my website: https://www.zla.pub",
  "background:#222;color:#FFB6C1; font-size: 14px; padding: 4px; border-radius: 2px; text-decoration: underline;"
);
console.log(`%c${getCurrentDate()}`, "background:#222;color:#FFB6C1");

// Check if the current URL path is "/"
if (window.location.pathname === "/") {
  grayScale();
}
