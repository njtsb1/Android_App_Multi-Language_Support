package br.com.igorbag.AndroidAppMultiLanguageSupport

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        //The challenge will be to create a value in strings.xml
        // And change the XML text to make it international (English, Spanish, etc...)
    }
}
