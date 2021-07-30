import React from 'react'
import BlockContent from '@sanity/block-content-to-react'
import { PageProps } from 'gatsby'
import { H2 } from '../components/typography'

interface IBlockChild {
    _key: string,
    _type: "span" | "image",
    marks: string[],
    text: string,
}

enum TextBlockType {
    CODE = 'code',
    H1 = 'h1',
    H2 = 'h2',
    H3 = 'h3',
    H4 = 'h4',
    H5 = 'h5',
    NORMAL = 'normal',
}


interface IContentBlock {
    _rawChildren: IBlockChild[],
    _type: string,
    style: TextBlockType | null,

}

interface IProps {
    pageContext: {
        title: string,
        content: IContentBlock[],
    }
}

type Props = IProps & PageProps

const Page = (props: Props) => {

    console.log(props)


return (
        <>
        <H2>{props.pageContext.title}</H2>
        </>
    )
}

export default Page
