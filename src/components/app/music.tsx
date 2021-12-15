import React from "react";
import { Container, Row, Col } from "reactstrap";
import { FancyInput } from "../RsvpList/styles";
import { H2, H3, H4, P } from "../../components/typography";
import Button, { WhiteButton } from "../button";

// const Music = () => {
//   const [songData, setSongData] = React.useState<any>([]);
//   const [artistData, setArtistData] = React.useState<any>([]);
//   const [query, setQuery] = React.useState("");
//   const [ loading, setLoading ] = React.useState(false);
//   const [ savedSongs, setSavedSongs ] = React.useState<any>([]);

//   const handleSearch = async (e: React.FormEvent) => {
//       e.preventDefault();
//     setLoading(true);
//     const res = await fetch(
//       `https://musicbrainz.org/ws/2/artist/?query=${encodeURI(query)}&fmt=json&limit=10`
//     );
//     const data = await res.json();
//     setArtistData(data.artists);
//     console.log(query)
//     const songRes = await fetch(`https://musicbrainz.org/ws/2/release/?query=arid:${encodeURI(data.artists[0].id)}&fmt=json&limit=20`);
//     const songReleases = await songRes.json();
//     const songReleasesWithArt = await Promise.all(songReleases.releases.map(async (release: any) => {
//         const res = await fetch(`https://coverartarchive.org/release/${release.id}?fmt=json`);
//         if(res.ok){
//         const data = await res.json();
//         return { ...release, ...data };
//         }
//         return release;
//     }));
//     console.log(songReleasesWithArt)
//     setSongData(songReleasesWithArt);
//     setLoading(false);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setQuery(e.target.value);
//   };

//   const handleSaveSong = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     const song = songData.find((song: any) => song.id === e.currentTarget.value);
//     setSavedSongs([...savedSongs, song]);
//     };

//   return (
//     <Container>
//       <Row className="justify-content-center mb-4">
//         <Col xs={12} className="text-center">
//           <H2 centered>Music</H2>
//         </Col>
//       </Row>
//       <Row className="justify-content-center mb-4">
//         <Col xs={12} className="text-center">
//           <H4 inline={false} alwaysdark centered>
//             Request a song at the wedding reception!
//           </H4>
//         </Col>
//       </Row>
//       <Row>
//           <Col xs={12} md={3}><H3>Saved</H3></Col>
//         <Col xs={12} md={9}>
//             {savedSongs.map((song: any) => (
//                 <div key={song.id}>
//                     <P>{song.title}</P>
//                 </div>
//             ))}
//         </Col>
//       </Row>
//       <Row className="justify-content-center mb-4">
//         <Col xs={12} className="text-center">
//           <form onSubmit={handleSearch}>
//             <FancyInput
//               type="text"
//               value={query}
//               onChange={handleChange}
//               placeholder="Find an artist..."
//             />
//             <Button type="submit">Search</Button>
//           </form>
//         </Col>
//       </Row>
//       <Row className="justify-content-center mb-4">
//         {!loading && artistData.length > 0 && (
//           <Col xs={12} className="text-center">
//             <H4 centered inline={false} alwaysdark >
//               {artistData[0].name}
//             </H4>
//           </Col>
//         )}
//     </Row>
//         {!loading && songData.length > 0 && songData.filter(filterSongs).map((song) => {
//             return (
//               <Row key={song.id} className="border-bottom p-2">
//                 <Col
//                   xs={4}
//                   style={{
//                     backgroundImage: `url(${song?.images?.[0]?.thumbnails?.small})`,
//                     backgroundSize: "100%",
//                     backgroundRepeat: "no-repeat",
//                     objectFit: "cover",
//                   }}
//                 />
//                 <Col className="mb-3" xs={6}>
//                   <H3 style={{ fontSize: "22px" }} centered={false}>
//                     {song.title}
//                   </H3>
//                   <P>
//                     {song?.["release-group"]?.["primary-type"] === "Single"
//                       ? "Single"
//                       : song?.["release-group"]?.title}{" "}
//                     – {song?.date?.slice(0, 4)}
//                   </P>
//                 </Col>
//                 <Col xs={2}>
//                   <WhiteButton value={song.id} onClick={handleSaveSong}>
//                     +
//                   </WhiteButton>
//                 </Col>
//               </Row>
//             );
//         })}
//     </Container>
//   );
// };

const Music = () => {
    return (
      <Container>
        <Row className="justify-content-center mb-4">
          <Col xs={12} className="text-center">
            <H2 centered>Music</H2>
          </Col>
        </Row>
        <Row className="justify-content-center mb-4">
          <Col xs={12} className="text-center">
            <H4 inline={false} alwaysdark centered>
              Request a song at the wedding reception!
            </H4>
          </Col>
        </Row>
        <Row>
          <Col>
            <iframe
              src="https://open.spotify.com/embed/playlist/7Jrho0fq9gsnuk75Gwlwkk?utm_source=generator"
              width="100%"
              height="380"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            ></iframe>
          </Col>
        </Row>
      </Container>
    );
}

function filterSongs(song: any) {
    if (song?.disambiguation === "music video") {
        return false;
    }

    if (song?.title?.toLowerCase().includes("(live)")) {
        return false;
    }

    if (song?.title?.toLowerCase().includes("karaoke")) {
        return false;
    }

    if (song?.country !== "US" || song?.releases?.[0]?.status === "Promotion") {
        return false;
    }

    if (song?.title?.toLowerCase().includes("commentary")){
        return false;
    }

    return true

}


export default Music