import React from 'react';

const YoutubeEmbed = ({embedId}) => {
    // console.log(query)
    // const [trailer, setTrailer] = useState({id:{videoId: ""}})
    // const fetchTrailer = async  query => {
    //     const response = await youtube.get('/search',{ 
    //         params: {
    //             q: query+" trailer"
    //         }
    //     });
    //     setTrailer(response.data.items[0])
    // }

    // useEffect(() => {
    //     fetchTrailer(query)
    // },[query])
    console.log(embedId)

    return (
        <div className="video-responsive">
            <iframe
                width="853"
                height="480"
                src={`https://youtube.com/embed/${embedId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />
        </div>
    )
}

export default YoutubeEmbed
