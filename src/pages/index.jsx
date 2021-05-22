import React from 'react'
import PageSection from "../containers/pageSection";
import ParallaxImg from '../components/parallaxImg';


const IndexPage = () => {

  const data = [
    {
      label: "Date",
      title: "May 1, 2022",
      subtitle: "4pm - 10pm",
      cta: {
        link: "/rsvp",
        label: "RSVP",
        centered: true,
      },
      funFact: {
        header: "A mysterious holiday",
        body: "Mayday is a seldom-celebrated holiday that takes place each year on May 1. While scholars are uncertain of the holiday's origins, many believe it to be a celebration of the first day of May.",
      }
    },
    {
      label: "Venue",
      title: "The Parlour at Manns Chapel",
      subtitle: "125 Farrington Rd. Chapel Hill, NC 27517",
      bodyText: "Located in beautiful Chapel Hill, North Carolina, The Parlour is an intimate venue in the sweetest vintage chapel. With a capacity of 100 or less, the small guest count affords you and your guests a higher quality experience. Now your day will be filled with personal touches that leave your loved ones feeling valued and inspired.",
      sectionImg: {
        alt: "White chairs at rustic wooden tables surrounded by greenery",
        isUrl: true,
        src: "http://static.showit.co/2400/xENhftg_QS2pGfzKfp-wUw/58186/schuh-788.jpg",
      },
      cta: {
        link: "https://theparlourchapel.com/",
        label: "Learn more",
      },
      funFact: {
        header: "An unlikely venue",
        body: "Early in the wedding planning process, both Will and Laura agreed that they did not want to get married in a church. Thus–a chapel."
      }
    },
    {
      label: "Catering",
      title: "Carolina Crust",
      subtitle: "Wood-fired pizza and apps",
      bodyText: "Carolina Crust offers wood-fired pizza cooked on a Mugnani Valoriani® oven, fresh salads, seasonal appetizers and a variety of other top-notch entrees out of a custom International Harvester truck.",
      sectionImg: {
        src: "https://static.wixstatic.com/media/1ddb7c_930ed368d8d54742beb4c917bcabdd18~mv2_d_2304_1536_s_2.jpg/v1/fill/w_1280,h_672,al_c,q_85,usm_0.66_1.00_0.01/1ddb7c_930ed368d8d54742beb4c917bcabdd18~mv2_d_2304_1536_s_2.webp",
        alt: "1950s era flatbed truck that has been converted into a mobile pizza oven",
        isUrl: true,
      },
      cta: {
        link: "https://carolinacrust.com",
        label: "Learn more",
      }
    },
    {
      label: "Bar service",
      title: "Yonder",
      subtitle: "Eryk Pruitt and Lana Pierce",
      bodyText: "Yonder serves as Hillsborough’s unofficial living room and art space where folks gather to enjoy craft cocktails, beer, wine, and the arts. Live music and local rotating artist installations make Yonder a comfortable, safe place for friends to gather and relax.",
      sectionImg: {
        src: "https://yonderbarnc.com/wp-content/uploads/2019/07/Yonder-Full-Logo-1024x629.png",
        alt: "Martini glass with olive on toothpick",
        isUrl: true,
      },
      cta: {
        link: "https://yonderbarnc.com",
        label: "Learn more",
      }
    }
  ]
  return (
    <React.Fragment>
      <ParallaxImg />

      {data.map((item, index) => (
          <PageSection sectionData={item} key={index} />
      ))}

    </React.Fragment>
  );
}

export default IndexPage
