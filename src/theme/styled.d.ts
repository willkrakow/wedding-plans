import 'styled-components'


type Colors = {
        text: string,
        background: string,
        primary: string,
        secondary: string,
        accent: string,
        muted: string,
        danger: string,
        alwayslight: string,
        alwaysdark: string,
        overlap: string,
}

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: Colors,
    fonts: {
        headers: string,
        body: string,
        cursive: string,
    },
    fontSizes: Array<string>,
    spacing: Array<string>,
    fontWeights: {
        lightest: string,
        light: string,
        body: string,
        heavy: string,
    },
    borders: Array<string>,
    colorInvert: Number,
    }
}