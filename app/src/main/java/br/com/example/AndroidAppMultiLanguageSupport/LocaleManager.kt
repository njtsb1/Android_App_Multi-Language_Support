package com.example.AndroidAppMultiLanguageSupport

import android.content.Context
import android.content.SharedPreferences
import android.os.Build
import androidx.preference.PreferenceManager
import java.util.Locale
import android.content.res.Configuration

object LocaleManager {
    private const val KEY_LANGUAGE = "pref_language"

    fun setNewLocale(context: Context, language: String): Context {
        persistLanguage(context, language)
        return updateContextLocale(context)
    }

    fun getLanguage(context: Context): String {
        val prefs = PreferenceManager.getDefaultSharedPreferences(context)
        return prefs.getString(KEY_LANGUAGE, Locale.getDefault().language) ?: Locale.getDefault().language
    }

    private fun persistLanguage(context: Context, language: String) {
        val prefs = PreferenceManager.getDefaultSharedPreferences(context)
        prefs.edit().putString(KEY_LANGUAGE, language).apply()
    }

    fun updateContextLocale(context: Context): Context {
        val language = getLanguage(context)
        val locale = Locale(language)
        Locale.setDefault(locale)

        val res = context.resources
        val config = Configuration(res.configuration)

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            config.setLocale(locale)
            val ctx = context.createConfigurationContext(config)
            return ctx
        } else {
            config.locale = locale
            res.updateConfiguration(config, res.displayMetrics)
            return context
        }
    }
}
