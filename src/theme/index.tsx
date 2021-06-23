import "@fontsource/courgette"
import "@fontsource/open-sans"
import "@fontsource/great-vibes";
import "@fontsource/crimson-text";
import "@fontsource/crimson-text/600-italic.css"
import { DefaultTheme } from 'styled-components'


export const theme: DefaultTheme = {
    colors: {
        text: "#1a1c1f",
        background: "#fafafa",
        primary: "hsl(235, 66%, 12%)",
        secondary: "hsl(208, 93%, 23%)",
        accent: "hsl(17, 52%, 68%)",
        muted: "hsl(235, 6%, 50%)",
        danger: "hsl(9, 100%, 24%)",
        alwayslight: "#fafafa",
        alwaysdark: "#1a1c1f",
        overlap: "#fafafaef",
    },
    fonts: {
        headers: "Crimson Text, serif",
        body: "Crimson Text, serif",
        cursive: "Great Vibes, cursive",
    },
    fontSizes: ["12px", "18px", "24px", "30px", "42px", "56px", "64px"],
    spacing: ["0", "8px", "12px", "16px", "24px", "30px", "36px", "64px"],
    fontWeights: {
        lightest: "200",
        light: "300",
        body: "400",
        heavy: "600",
    },
    borders: ["0px", "2px", "4px"],
    colorInvert: 0
}


export const darkTheme: DefaultTheme = {
    ...theme,
    colors: {
        ...theme.colors,
        background: "#1a1c1f",
        text: "#fafafa",
        primary: "hsl(235, 96%, 72%)",
        secondary: "hsl(300, 66%, 52%)",
        accent: "hsl(40, 86%, 68%)",
        muted: "hsl(235, 6%, 80%)",
        alwayslight: "#fafafa",
        alwaysdark: "#1a1c1f",
        overlap: "#1a1c1fef",
    },
    colorInvert: 1
}