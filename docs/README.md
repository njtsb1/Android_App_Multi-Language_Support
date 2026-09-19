# Creating an Android App with Multi-Language Support

Project developed during the Santander Bootcamp 2023 - Mobile Android with Kotlin, under the guidance of specialist [Igor Rotondo Bagliotti](https://github.com/igorbag "Igor Rotondo Bagliotti").</br>
Use the knowledge gained in this module to build a project incorporating the concept of internationalization (i18n), that is, an app that supports multiple languages, such as English, Portuguese, and Spanish.</br>
Through this project, you will be able to develop your ability to conceptualize a problem, analyze requirements, and implement the necessary solutions to complete the challenge.

## Features

- **Dark / Light mode** with moon/sun icons; dark is the default and user preference is persisted in `localStorage`.
- **Multi-language UI** (EN-US, PT-BR, ES) with runtime switching and persistence.
- **Accessible controls**: keyboard operable, ARIA attributes, skip link, focus styles.
- **Responsive layout**: works on desktop, tablet and smartphone.
- **Simulated AI translation fallback**: a small demo function that returns translated text; replace with a real API if needed.

## Requirements

- Android Studio Flamingo or later
- Android SDK with API level 21 or higher
- **Kotlin** 1.8+ (use the project defaults created by Android Studio)

## Assistive Technology

- **AI (Assistive)**: Simulated AI translator module (replaceable with a real translation API).

## Additional Technologies

- **HTML**: semantic HTML with accessible controls and ARIA attributes.
- **CSS**: CSS variables, responsive layout, dark/light theme support.
- **JavaScript**: language switching, theme persistence, simulated AI translation fallback.

## How to use

1. Open `index.html` in a browser (no server required).
2. Use the language selector to switch UI language.
3. Toggle theme using the moon/sun button. The choice is saved for future visits.
4. Click "Translate with AI fallback" to see a simulated translated string for the selected language.

## Accessibility notes

- The page includes a skip link for keyboard users.
- Buttons and controls have visible focus styles and `aria` attributes.
- `aria-live` regions announce translation results for assistive technologies.

## Extending the demo

- Replace the `aiTranslate` function in `script.js` with an asynchronous call to a translation API (e.g., via `fetch`).
- Add more languages by extending the `TRANSLATIONS` object and adding options to the `<select>` element.
- Improve persistence by storing a timestamped cache of translations.

![Android App Multi-Language Support](./assets/Android_App_Multi-Language_Support_teste2.png)

[LICENSE](./LICENSE)
