import React, { useState, useEffect } from 'react';
import youtube from '../apis/youtube';


const YoutubeEmbed = ({query}) => {
    console.log(query)
    const [trailer, setTrailer] = useState({id:{videoId: ""}})
    const fetchTrailer = async  query => {
        const response = await youtube.get('/search',{ 
            params: {
                q: query+" trailer"
            }
        });
        setTrailer(response.data.items[0])
    }

    console.log(trailer)

    useEffect(() => {
        fetchTrailer(query)
    },[])


    return (
        <div className="video-responsive">
            <iframe
                width="853"
                height="480"
                src={`https://youtube.com/embed/${trailer.id.videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />
        </div>
    )
}

export default YoutubeEmbed
