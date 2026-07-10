(() => {
  "use strict";

  const STORAGE_KEY = "botelho.identity.theme.v1.2";
  const DARK_CLASS = "pf-v5-theme-dark";
  const validModes = new Set(["light", "dark", "system"]);
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const safeStorage = {
    get() {
      try {
        return window.localStorage.getItem(STORAGE_KEY);
      } catch (_error) {
        return null;
      }
    },
    set(value) {
      try {
        window.localStorage.setItem(STORAGE_KEY, value);
      } catch (_error) {
        // Browser policy may disable storage. The selected mode still applies to the current page.
      }
    },
  };

  function resolvedMode(mode) {
    return mode === "system" ? (mediaQuery.matches ? "dark" : "light") : mode;
  }

  function normalizeMode(mode) {
    return validModes.has(mode) ? mode : "dark";
  }

  function applyMode(mode) {
    const normalized = normalizeMode(mode);
    const resolved = resolvedMode(normalized);

    document.documentElement.classList.toggle(DARK_CLASS, resolved === "dark");
    document.documentElement.dataset.botelhoTheme = normalized;
    document.documentElement.dataset.botelhoResolvedTheme = resolved;
    document.documentElement.style.colorScheme = resolved;
  }

  // Apply before DOMContentLoaded to minimize visual flicker. Dark is the branded default.
  const initialMode = normalizeMode(safeStorage.get());
  applyMode(initialMode);

  function createThemeControl(container) {
    const language = document.documentElement.lang?.toLowerCase() ?? "pt-br";
    const isPortuguese = language.startsWith("pt");

    const wrapper = document.createElement("label");
    wrapper.className = "botelho-theme-control";

    const label = document.createElement("span");
    label.className = "botelho-control-label";
    label.textContent = isPortuguese ? "Tema" : "Theme";

    const select = document.createElement("select");
    select.className = "botelho-theme-select";
    select.setAttribute("aria-label", isPortuguese ? "Selecionar tema" : "Select theme");

    const options = isPortuguese
      ? [["dark", "Escuro"], ["light", "Claro"], ["system", "Sistema"]]
      : [["dark", "Dark"], ["light", "Light"], ["system", "System"]];

    for (const [value, text] of options) {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = text;
      select.append(option);
    }

    select.value = initialMode;

    select.addEventListener("change", () => {
      safeStorage.set(select.value);
      applyMode(select.value);
    });

    mediaQuery.addEventListener("change", () => {
      if (select.value === "system") {
        applyMode("system");
      }
    });

    wrapper.append(label, select);
    container.append(wrapper);
  }

  function moveLocaleControl(container) {
    const select = document.getElementById("login-select-toggle");
    if (!select) {
      return;
    }

    const originalControl = select.closest(".pf-v5-c-form-control") ?? select.parentElement;
    if (!originalControl) {
      return;
    }

    originalControl.classList.add("botelho-locale-control");
    select.setAttribute("aria-label", select.getAttribute("aria-label") || "Language");
    container.append(originalControl);

    const utilities = document.querySelector(".pf-v5-c-login__main-header-utilities");
    if (utilities && !utilities.textContent?.trim()) {
      utilities.setAttribute("hidden", "");
    }
  }

  function initialize() {
    const controls = document.getElementById("botelho-login-controls");
    if (!controls) {
      return;
    }

    moveLocaleControl(controls);
    createThemeControl(controls);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
