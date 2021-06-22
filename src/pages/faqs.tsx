import React from 'react'
import PageSection from '../containers/pageSection'
import { graphql, PageProps } from 'gatsby'
import { H2 } from '../components/typography'

interface FaqItemProps {
    id: string,
    data: {
    answer: string,
    question: string,
    order: number,        
    }
}

interface FaqProps extends PageProps {
    data: {
        allAirtable: {
            nodes: Array<FaqItemProps>
        }
    }
}


const Faqs: React.FC<FaqProps> = ({ data }) => {
    const faqlist = data.allAirtable.nodes
    return (
        <React.Fragment>
            <H2 centered>Frequently Asked Questions</H2>
            {faqlist.map(q => (
                <PageSection key={q.id} title={q.data.question} bodyText={q.data.answer} />
            ))} 
        </React.Fragment>
    )
}

export const query = graphql`
  {
    allAirtable(filter: {table: {eq: "faqs"}}, sort: {fields: data___order}) {
      nodes {
        id
        data {
          answer
          question
          order
        }
      }
    }
  }
`


export default Faqs