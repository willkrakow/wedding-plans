import React from 'react'
import { H2 } from '../components/typography'
import { graphql, PageProps } from 'gatsby';
import PageSection from '../containers/pageSection';

const createReadableTime = (uglyString: string): string => {
  const formatted = new Date(uglyString)
  return formatted.toLocaleTimeString().slice(0, 4) + formatted.toLocaleTimeString().slice(-3)
}

interface ScheduleItemProps {
        id: string,
        data: {
          name: string,
          time: string,
          description: string,
        },
}

interface ScheduleProps extends PageProps {
  data: {
    allAirtable: {
      nodes: Array<ScheduleItemProps>,
    }
  }
}

const Schedule: React.FC<ScheduleProps> = ({data}) => {
    const weddingSchedule = data.allAirtable.nodes;
    
    return (
        <React.Fragment>
            <H2 centered={true} >Wedding Day Schedule</H2>
            {weddingSchedule.map((item) => (
                <PageSection key={item.id} {...{title: item.data.name, subtitle: createReadableTime(item.data.time), bodyText: item.data.description}} />
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