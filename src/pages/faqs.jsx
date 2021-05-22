import React from 'react'
import PageSection from '../containers/pageSection'
import { graphql } from 'gatsby'
import { H2, H4 } from '../components/typography'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const SidebarWrapper = styled.div`
position: sticky;
top: 0;
left: 0;
`

const Sidebar = ({ links }) => {
    return (
        <SidebarWrapper>
            {links.map(link => (
                <H4 key={link.id}>{link.data.question}</H4>
            ))}
        </SidebarWrapper>
    )
}

Sidebar.propTypes = {
    links: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        data: PropTypes.shape({
            question: PropTypes.string,
        })
    }))
}

const Faqs = ({ data }) => {
    const faqlist = data.allAirtable.nodes
    return (
        <React.Fragment>
            <H2 centered>Frequently Asked Questions</H2>
            {faqlist.map(q => (
                <PageSection id={q.id} key={q.id} sectionData={{ title: q.data.question, bodyText: q.data.answer }} />
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

Faqs.propTypes = {
    data: PropTypes.shape({
        allAirtable: PropTypes.shape({
            nodes: PropTypes.arrayOf(PropTypes.shape({
                data: PropTypes.shape({
                    answer: PropTypes.string,
                    question: PropTypes.string,
                    order: PropTypes.number,
                }),
            })),
        }),
    }),
}

export default Faqs