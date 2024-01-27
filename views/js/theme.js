(() => {
    'use strict'

    const switcher = document.getElementById('themeSwitcher')
    const lightThemeIndicator = document.getElementById('lightThemeIndicator')
    const darkThemeIndicator = document.getElementById('darkThemeIndicator')
    const autoThemeIndicator = document.getElementById('autoThemeIndicator')

    // getters/setters for the theme
    const getStoredTheme = () => localStorage.getItem('theme')
    const setStoredTheme = theme => {
        localStorage.setItem('theme', theme)
        visuallyRefreshTheme()
        refreshThemeIndicator(theme)
    }

    // shows the correct icon on the theme switcher
    const refreshThemeIndicator = theme => {
        if (theme === 'auto') {
            autoThemeIndicator.style.display = 'block'
            lightThemeIndicator.style.display = 'none'
            darkThemeIndicator.style.display = 'none'
        } else if (theme === 'light') {
            autoThemeIndicator.style.display = 'none'
            lightThemeIndicator.style.display = 'block'
            darkThemeIndicator.style.display = 'none'
        } else if (theme == 'dark') {
            autoThemeIndicator.style.display = 'none'
            lightThemeIndicator.style.display = 'none'
            darkThemeIndicator.style.display = 'block'
        }
    }

    // correctly loads/shows initial theme
    const initializeThemePreference = () => {
        const storedTheme = getStoredTheme()
        if (storedTheme) {
            visuallyRefreshTheme()
        }
        setStoredTheme('auto')
    }

    // gives either light or dark
    const getCurrentEvaluatedTheme = () => {
        const storedTheme = getStoredTheme()
        if (storedTheme === 'auto') {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark'
            } else {
                return 'light'
            }
        }
        return storedTheme
    }

    // just sets the document element
    const visuallyRefreshTheme = () => {
        const currentEvaluatedTheme = getCurrentEvaluatedTheme()
        document.documentElement.setAttribute('data-bs-theme', currentEvaluatedTheme)
    }

    // start subscribers to system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        visuallyRefreshTheme()
    })
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
        visuallyRefreshTheme()
    })

    // start things up
    initializeThemePreference()

    // cycles to the next theme
    const toggleTheme = ev => {
        const currentTheme = getStoredTheme()
        if (currentTheme == 'auto') {
            setStoredTheme('dark')
        } else if (currentTheme == 'dark') {
            setStoredTheme('light')
        } else if (currentTheme == 'light') {
            setStoredTheme('auto')
        }
    }

    // hook up the click action of the switcher to cycling the theme
    switcher.onclick = toggleTheme
})()