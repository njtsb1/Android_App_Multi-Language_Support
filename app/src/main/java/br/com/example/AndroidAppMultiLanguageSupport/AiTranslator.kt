package com.example.AndroidAppMultiLanguageSupport

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

/**
 * Simulated AI translator. Replace the implementation with a real API client.
 * Keep the function suspend so you can call network APIs safely.
 */
object AiTranslator {

    // Simulated translation map for demo purposes
    private val simulated = mapOf(
        Pair("en", "This app demonstrates Android internationalization."),
        Pair("pt", "Este app demonstra internacionalização no Android."),
        Pair("es", "Esta app demuestra internacionalización en Android.")
    )

    suspend fun translateWithFallback(text: String, targetLang: String): String {
        return withContext(Dispatchers.IO) {
            // 1) Try local resource-based translation (already handled by Android)
            // 2) If missing or you want dynamic translation, call AI service
            // Here we simulate network latency and return a fallback
            simulated[targetLang] ?: simulated["en"] ?: text
        }
    }
}
