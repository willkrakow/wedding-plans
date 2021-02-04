import React from 'react'
import styled, {keyframes} from 'styled-components'
import { BannerText } from './typography'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'reactstrap';
import '@fontsource/open-sans';
import AniLink from 'gatsby-plugin-transition-link/AniLink';

const slide = keyframes`
  0% {
    height: 100vh;
  }

  40% {
    height: 100vh;
  }

  100% {
    height: 80vh;
  }
`;

const NavigationIn = keyframes`
0% {
  transform: translateY(-10vh);
}

40% {
  transform: translateY(-10vh);
}

100% {
  transform: translateY(0vh);
}
`;


const Banner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  max-width: 100%;
  height: 80vh;
  margin-right: 0;
  margin-top: -10vh;
  animation: ${slide} ${props => props.metatitle === "LGC + WTK" ? "5s ease" : "0s ease"};
  background: rgba(255, 255, 255, 1);
  background-size: cover;
  background: url(${props => props.bannerimage});
  background-blend-mode: multiply;
`

const SecondaryBanner = styled(Banner)`
  height: 40vh;
  animation: none;
`

const Navigation = styled.div`
  width: 100vw;
  height: 10vh;
  background: transparent;
  display: flex;
  max-width: 100%;
  animation: ${NavigationIn} ${props => props.metatitle === "LGC + WTK" ? "5s ease" : "1s ease"};
  justify-content: space-evenly;
  flex-direction: row;
  align-items: center;
`;

const NavItem = styled(AniLink)`
  display: inline-block;
  padding: 0.5rem;
  color: #4e5755;
  font-size: 1.25em;
  font-weight: 300;
`;


export default function Layout({children, metatitle, bannerimage}) {


    return (
      <>
        <Navigation>
          <NavItem swipe to="/" alt="Home">
            Home
          </NavItem>
          <NavItem swipe to="/registry" alt="Registry">
            Registry
          </NavItem>
          <NavItem swipe to="/rsvp" alt="RSVP">
            RSVP
          </NavItem>
          <NavItem swipe to="/about" alt="About">
            About
          </NavItem>
        </Navigation>
        {metatitle !== "Home" ? 
        <SecondaryBanner bannerimage={bannerimage} metatitle={metatitle}>
          <BannerText>{metatitle}</BannerText>
        </SecondaryBanner>
        : <Banner bannerimage={bannerimage} metatitle={metatitle}>
            <BannerText>LGC + WTK</BannerText>
        </Banner>}
        {children}
      </>
    );
}

export const ClassyCard = styled(Container).attrs(props => ({
    className: "mb-5 py-4 mt-4"
}))``

