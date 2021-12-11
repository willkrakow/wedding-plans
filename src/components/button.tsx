import styled from 'styled-components'

const Button = styled.button(props => ({
    backgroundColor: props.theme.colors.text,
    color: props.theme.colors.background,
    paddingTop: props.theme.spacing[1],
    paddingBottom: props.theme.spacing[1],
    paddingLeft: props.theme.spacing[3],
    paddingRight: props.theme.spacing[3],
    fontSize: props.theme.fontSizes[1],
    fontFamily: props.theme.fonts.body,
    borderRadius: props.theme.spacing[0],
    borderStyle: "solid",
    borderWidth: props.theme.borders[1],
    borderColor: "transparent",
    textDecoration: 'underline',
    textDecorationColor: 'transparent',
    textDecorationThickness: props.theme.spacing[2],
    transition: 'text-decoration-color 0.5s ease',
    ":hover": {
        textDecoration: 'underline',
        textDecorationColor: props.theme.colors.accent,
        textDecorationThickness: props.theme.spacing[2],
    },
    ":disabled": {
        backgroundColor: "#e2e2e2",
        color: props.theme.colors.muted,
        cursor: 'default'
    }
}))

export const WhiteButton = styled(Button)(props => ({
    backgroundColor: props.theme.colors.background,
    color: props.theme.colors.text,
    borderColor: props.theme.colors.text,
}))

export const RedButton = styled(Button)(props => ({
    backgroundColor: props.theme.colors.background,
    color: props.theme.colors.danger,
    borderColor: props.theme.colors.danger
}))


export const StickyButton = styled(Button)`
position: sticky;
bottom: ${props => props.theme.spacing[4]};
left: 100vw;
z-index: 50;
`

export const StickyWhiteButton = styled(WhiteButton)`
position: sticky;
bottom: ${props => props.theme.spacing[4]};
left: 100vw;
z-index: 50;
`


export default Button