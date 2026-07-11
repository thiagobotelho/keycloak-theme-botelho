(() => {
  "use strict";

  const STORAGE_KEY = "botelho.identity.theme.v1.2";
  const DARK_CLASS = "pf-v5-theme-dark";
  const RUNTIME_STYLE_ID = "botelho-runtime-overrides";
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

  function injectRuntimeOverrides() {
    if (document.getElementById(RUNTIME_STYLE_ID)) {
      return;
    }

    const style = document.createElement("style");
    style.id = RUNTIME_STYLE_ID;
    style.textContent = `
      .pf-v5-c-login__main,
      .pf-c-login__main {
        border-top: 0 !important;
        border-top-color: transparent !important;
      }

      .pf-v5-c-login__main::before,
      .pf-v5-c-login__main::after,
      .pf-v5-c-login__main-header::before,
      .pf-v5-c-login__main-header::after,
      .pf-v5-c-login__main-body::before,
      .pf-v5-c-login__main-body::after,
      .pf-c-login__main::before,
      .pf-c-login__main::after,
      .pf-c-login__main-header::before,
      .pf-c-login__main-header::after,
      .pf-c-login__main-body::before,
      .pf-c-login__main-body::after,
      .pf-v5-c-form-control::before,
      .pf-v5-c-form-control::after,
      .pf-v5-c-input-group::before,
      .pf-v5-c-input-group::after,
      .pf-v5-c-input-group__item::before,
      .pf-v5-c-input-group__item::after {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
        border: 0 !important;
        background: transparent !important;
        box-shadow: none !important;
        content: none !important;
      }

      .pf-v5-c-login__main input.pf-v5-c-form-control:focus,
      .pf-v5-c-login__main select.pf-v5-c-form-control:focus,
      .pf-v5-c-login__main textarea.pf-v5-c-form-control:focus,
      .pf-v5-c-login__main .pf-v5-c-input-group:focus-within {
        border-color: var(--botelho-input-focus-border, #5d7895) !important;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.035) !important;
        outline: 0 !important;
      }

      .pf-v5-c-login__main .pf-v5-c-input-group > .pf-v5-c-button.pf-m-control,
      .pf-v5-c-login__main .pf-v5-c-input-group > button[data-password-toggle] {
        border-left: 1px solid rgba(115, 151, 187, 0.28) !important;
        border-radius: 0 10px 10px 0 !important;
        background: var(--botelho-card-soft) !important;
        box-shadow: none !important;
      }
    `;

    document.head.append(style);
  }

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
    injectRuntimeOverrides();

    const controls = document.getElementById("botelho-login-controls");
    if (!controls) {
      return;
    }

    moveLocaleControl(controls);
    createThemeControl(controls);

    if (controls.children.length === 1) {
      controls.classList.add("botelho-login-controls--single");
    }

    const recoveryLink = document.querySelector("#kc-form-options a[href*='reset-credentials']");
    if (recoveryLink) {
      document.body.classList.add("botelho-has-password-recovery");
    }

    const registrationLink = document.querySelector("#kc-registration a");
    if (registrationLink) {
      document.body.classList.add("botelho-has-registration");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }

  window.addEventListener("load", injectRuntimeOverrides, { once: true });
})();
