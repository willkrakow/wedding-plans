import React from 'react'
import { H2 } from '../components/typography'
import { graphql } from 'gatsby';
import PageSection from '../containers/pageSection';

const createReadableTime = (uglyString) => {
  const formatted = new Date(uglyString)
  return formatted.toLocaleTimeString().slice(0, 4) + formatted.toLocaleTimeString().slice(-3)
}

const Schedule = ({data}) => {
    const weddingSchedule = data.allAirtable.nodes;
    
    return (
        <React.Fragment>
            <H2 centered >Wedding Day Schedule</H2>
            {weddingSchedule.map((item) => (
                <PageSection key={item.id} sectionData={{title: item.data.name, subtitle: createReadableTime(item.data.time), bodyText: item.data.description}} />
            ))}
        </React.Fragment>
    )
}

export const query = graphql`
  {
    allAirtable(filter: {table: {eq: "schedule"}}, sort: {fields: data___order}) {
      nodes {
        id
        data {
          name
          time
          description
        }
      }
    }
  }
`

export default Schedule