import React from 'react'
import PageSection from "../containers/pageSection";
import {StaticImage} from 'gatsby-plugin-image';
import { PageProps } from 'gatsby';

const IndexPage: React.FC<PageProps> = () => {

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
      },
    },
    {
      label: "Ceremony",
      title: "River Park",
      subtitle: "140 E Margaret Lane | Hillsborough, NC 27278",
      bodyText:
        "Wide open grassy area in downtown Hillsborough with a greenway along the Eno River and a Farmers' Market. Visitors can attend outdoor music and movie events during the warmer months.",
      sectionImg: {
        alt: "Wooden walkway through the park",
        isUrl: true,
        src: "https://res.cloudinary.com/djmk8xgrk/image/upload/v1638716075/riverpark_slkecf.jpg",
      },
      cta: {
        link: "https://www.visitchapelhill.org/listing/river-park/32/",
        label: "Learn more",
      },
      funFact: {
        header: "An unlikely venue",
        body: "River Park is a small, but popularly known outdoor venue in Hillsborough, North Carolina. It is located on the Eno River, which is the main river in the city. It is a popular destination for outdoor enthusiasts and is a popular destination for visitors to the city.",
      },
    },
    {
      label: "Catering",
      title: "Nomad",
      subtitle:
        "122 W King Street | Hillsborough, NC 27278",
      bodyText:
        "Nomad delivers traditional ethnic dishes and craft cocktails with a unique spin, all in a cozy, rustic interior. It’s a modern neighborhood spot that lets you travel the world without leaving Hillsborough.",
      sectionImg: {
        src: "https://res.cloudinary.com/djmk8xgrk/image/upload/v1638712961/nomadfood_foebwt.jpg",
        alt: "Asian shrimp and grits",
        isUrl: true,
      },
      cta: {
        link: "https://thenomadnc.com",
        label: "Learn more",
      },
    },
    {
      label: "Cocktails",
      title: "Yonder Bar",
      subtitle: "114 W King St | Hillsborough, NC 27278",
      bodyText:
        "Yonder serves as Hillsborough’s unofficial living room and art space where folks gather to enjoy craft cocktails, beer, wine, and the arts. Live music and local rotating artist installations make Yonder a comfortable, safe place for friends to gather and relax.",
      sectionImg: {
        src: "https://res.cloudinary.com/djmk8xgrk/image/upload/v1638715947/yonderglass_bguclf.jpg",
        alt: "Martini glass with olive on toothpick",
        isUrl: true,
      },
      cta: {
        link: "https://yonderbarnc.com",
        label: "Learn more",
      },
    },
  ];
  return (
    <React.Fragment>
      <StaticImage
        src={`../images/us.jpg`}
        alt="Laura and Will, sitting on a log as the sun sets on the Hillsborough meadows"
        placeholder="blurred"
        layout="fullWidth"
        aspectRatio={16 / 12}
      />

      {data.map((item, index) => (
        <PageSection {...item} key={index} />
      ))}
      
    </React.Fragment>
  );
}

export default IndexPage
