import "@fontsource/courgette"
import "@fontsource/open-sans"
import "@fontsource/great-vibes";
import "@fontsource/crimson-text";

export const theme = {
    colors: {
        text: "#1a1c1f",
        background: "#fafafa",
        primary: "hsl(235, 66%, 12%)",
        secondary: "hsl(300, 66%, 12%)",
        accent: "hsl(40, 86%, 68%)",
        muted: "hsl(235, 6%, 40%)",
        danger: "hsl(9, 100%, 24%)",
        alwayslight: "#fafafa",
        alwaysdark: "#1a1c1f",
    },
    fonts: {
        headers: "Crimson Text, serif",
        body: "Crimson Text, serif",
        cursive: "Great Vibes, cursive",
    },
    fontSizes: ["12px", "16px", "24px", "30px", "42px", "56px", "64px"],
    spacing: ["0", "8px", "12px", "16px", "24px", "30px", "36px"],
    fontWeights: {
        lightest: 200,
        light: 300,
        body: 400,
        heavy: 600,
    },
    borders: ["0px", "2px", "4px"],
    colorInvert: 0
}

export const darkTheme = {
    ...theme,
    colors: {
        background: "#1a1c1f",
        text: "#fafafa",
        primary: "hsl(235, 96%, 72%)",
        secondary: "hsl(300, 66%, 52%)",
        accent: "hsl(40, 86%, 68%)",
        muted: "hsl(235, 6%, 80%)",
        alwayslight: "#fafafa",
        alwaysdark: "#1a1c1f",
    },
    colorInvert: 1
}