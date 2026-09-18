package com.example.AndroidAppMultiLanguageSupport

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.launch
import android.widget.Button
import android.widget.TextView

class MainActivity : AppCompatActivity() {

    private lateinit var tvGreeting: TextView
    private lateinit var tvDescription: TextView
    private lateinit var btnChangeLanguage: Button
    private lateinit var btnAiTranslate: Button
    private lateinit var tvTranslated: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        LocaleManager.updateContextLocale(this)
        setContentView(R.layout.activity_main)

        tvGreeting = findViewById(R.id.tvGreeting)
        tvDescription = findViewById(R.id.tvDescription)
        btnChangeLanguage = findViewById(R.id.btnChangeLanguage)
        btnAiTranslate = findViewById(R.id.btnAiTranslate)
        tvTranslated = findViewById(R.id.tvTranslated)

        btnChangeLanguage.setOnClickListener { showLanguageDialog() }
        btnAiTranslate.setOnClickListener { performAiTranslation() }
    }

    private fun showLanguageDialog() {
        val languages = arrayOf(
            getString(R.string.language_en),
            getString(R.string.language_pt),
            getString(R.string.language_es)
        )
        val codes = arrayOf("en", "pt", "es")
        AlertDialog.Builder(this)
            .setTitle(getString(R.string.change_language))
            .setItems(languages) { _, which ->
                val code = codes[which]
                LocaleManager.setNewLocale(this, code)
                // Restart activity to apply language
                val intent = Intent(this, MainActivity::class.java)
                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_NEW_TASK)
                startActivity(intent)
                finish()
            }
            .show()
    }

    private fun performAiTranslation() {
        val textToTranslate = getString(R.string.description)
        val targetLang = LocaleManager.getLanguage(this)
        lifecycleScope.launch {
            val translated = AiTranslator.translateWithFallback(textToTranslate, targetLang)
            tvTranslated.text = translated
        }
    }
}
