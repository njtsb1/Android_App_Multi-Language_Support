# Creating an Android App with Multi-Language Support

Project developed during the Santander Bootcamp 2023 - Mobile Android with Kotlin, under the guidance of specialist [Igor Rotondo Bagliotti](https://github.com/igorbag "Igor Rotondo Bagliotti").</br>
Use the knowledge gained in this module to build a project incorporating the concept of internationalization (i18n), that is, an app that supports multiple languages, such as English, Portuguese, and Spanish.</br>
Through this project, you will be able to develop your ability to conceptualize a problem, analyze requirements, and implement the necessary solutions to complete the challenge.

## Features

- Localized string resources for **English**, **Portuguese (Brazil)**, and **Spanish**
- Runtime language switching with persistence
- Activity UI showing localized strings and an AI translation fallback example
- Simple, modular structure suitable for extension and testing

## Requirements

- Android Studio Flamingo or later
- Android SDK with API level 21 or higher
- Kotlin 1.8+ (use the project defaults created by Android Studio)

## Assistive Technology

- **AI (Assistive)**: Simulated AI translator module (replaceable with a real translation API).

## Setup

1. Clone or copy the project into Android Studio.
2. Ensure `local.properties` points to your Android SDK path (Android Studio usually creates this).
3. Build the project using **Build > Make Project**.

## Run

- Run the app on an emulator or physical device.
- Use the **Change Language** button to switch languages at runtime. The app restarts the activity to apply the selected locale and persists the choice.

## How Language Switching Works

- `LocaleManager` persists the selected language code in `SharedPreferences`.
- The application base context is updated with the selected `Locale` so resources are loaded from the matching `values-` folder.
- The sample restarts the `MainActivity` after a language change to refresh UI strings.

## Adding or Updating Translations

1. Add a new `values-<locale>` resource folder (for example `values-fr` for French).
2. Create or update `strings.xml` inside that folder with translated string keys matching the default `strings.xml`.
3. Test by selecting the new language in the app or changing the device language.

## AI Translation Fallback

- `AiTranslator` in the sample is a simulated translator that returns a mapped string for demo purposes.
- To integrate a real translation API:
  - Replace `AiTranslator.translateWithFallback` with a suspend function that calls a translation service using Retrofit or OkHttp.
  - Keep the function `suspend` and call it from a coroutine scope.
  - Secure API keys by using a backend proxy or secure storage; do not hardcode keys in the app.

## Notes and Best Practices

- For Android 13 and above, consider using `AppCompatDelegate.setApplicationLocales()` for per-app language preferences.
- Cache dynamic translations to reduce network calls and improve offline behavior.
- Use lint and Android Studio inspections to find missing translations and resource issues.

![Android App Multi-Language Support](/docs/assets/Android_App_Multi-Language_Support_teste2.png)

[LICENSE](/LICENSE)
