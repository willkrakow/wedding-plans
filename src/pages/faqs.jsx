import React from 'react'
import PageSection from '../containers/pageSection'
import { graphql } from 'gatsby'
import { H2, H4 } from '../components/typography'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Col } from 'reactstrap'

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
            <Sidebar links={faqlist} />
            {faqlist.map(q => (
                <PageSection id={q.id} key={q.id} sectionData={{ title: q.data.question, bodyText: q.data.answer }} />
            ))} 
            <Col xs={12} md={3}>
            <div id="list-example" className="list-group">
                <a className="list-group-item list-group-item-action" href="#list-item-1">Item 1</a>
                <a className="list-group-item list-group-item-action" href="#list-item-2">Item 2</a>
                <a className="list-group-item list-group-item-action" href="#list-item-3">Item 3</a>
                <a className="list-group-item list-group-item-action" href="#list-item-4">Item 4</a>
            </div>
            </Col>
            <Col xs={12} md={9}>
            <div data-spy="scroll" data-target="#list-example" data-offset="0" class="scrollspy-example">
                <h4 id="list-item-1">Item 1</h4>
                <p>...</p>
                <h4 id="list-item-2">Item 2</h4>
                <p>...</p>
                <h4 id="list-item-3">Item 3</h4>
                <p>...</p>
                <h4 id="list-item-4">Item 4</h4>
                <p>...</p>
            </div>
            </Col>
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