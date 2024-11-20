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
