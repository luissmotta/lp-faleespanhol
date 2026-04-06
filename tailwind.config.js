module.exports = {
  content: ["./*.html", "./*.js"],
  darkMode: "class",
  theme: {
      extend: {
          "colors": {
              "on-primary-fixed-variant": "#93000d",
              "surface-container-lowest": "#ffffff",
              "on-primary-fixed": "#410002",
              "on-tertiary-fixed": "#221b00",
              "inverse-surface": "#2f3131",
              "primary-container": "#e3001b",
              "on-tertiary-fixed-variant": "#544600",
              "surface-bright": "#f9f9f9",
              "surface-tint": "#c00015",
              "on-tertiary-container": "#4c3f00",
              "tertiary": "#705d00",
              "surface-container-highest": "#e2e2e2",
              "on-error-container": "#93000a",
              "on-surface": "#1a1c1c",
              "on-primary-container": "#fff4f2",
              "secondary-fixed": "#fcd400",
              "surface-container-low": "#f3f3f3",
              "inverse-primary": "#ffb4ac",
              "error-container": "#ffdad6",
              "on-tertiary": "#ffffff",
              "on-primary": "#ffffff",
              "tertiary-container": "#c9a900",
              "on-background": "#1a1c1c",
              "surface": "#f9f9f9",
              "background": "#f9f9f9",
              "on-secondary": "#ffffff",
              "outline": "#936e6a",
              "surface-container-high": "#e8e8e8",
              "primary-fixed": "#ffdad6",
              "outline-variant": "#e8bcb7",
              "on-error": "#ffffff",
              "primary-fixed-dim": "#ffb4ac",
              "secondary-container": "#fcd400",
              "primary": "#b50013",
              "on-secondary-fixed-variant": "#544600",
              "tertiary-fixed": "#fcd400",
              "on-secondary-container": "#221b00",
              "on-secondary-fixed": "#221b00",
              "surface-dim": "#dadada",
              "tertiary-fixed-dim": "#fcd400",
              "surface-variant": "#e2e2e2",
              "secondary": "#fcd400",
              "surface-container": "#eeeeee",
              "secondary-fixed-dim": "#fcd400",
              "error": "#ba1a1a",
              "on-surface-variant": "#5e3f3b",
              "inverse-on-surface": "#f1f1f1"
          },
          "borderRadius": {
              "DEFAULT": "0.25rem",
              "lg": "0.5rem",
              "xl": "0.75rem",
              "full": "9999px"
          },
          "fontFamily": {
              "headline": ["Plus Jakarta Sans"],
              "body": ["Inter"],
              "label": ["Inter"]
          }
      },
  },
  plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/container-queries')
  ]
}
