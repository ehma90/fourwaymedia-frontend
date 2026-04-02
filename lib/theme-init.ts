/**
 * Must stay aligned with `ThemeProvider` in app/layout.tsx (storageKey, defaultTheme, enableSystem).
 * Inline script in <head> runs before first paint so :root is not stuck on light variables.
 */
export const THEME_STORAGE_KEY = "theme";

export const themeInitScript = `
(function() {
  try {
    var k = ${JSON.stringify(THEME_STORAGE_KEY)};
    var defaultTheme = "dark";
    var enableSystem = true;
    var t = localStorage.getItem(k);
    var resolved = t || defaultTheme;
    if (enableSystem && resolved === "system") {
      resolved = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    var root = document.documentElement;
    if (resolved === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
  } catch (e) {}
})();
`.trim();
