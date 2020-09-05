import React from 'react';
import './videolist.scss';
import VideoItem  from './/VideoItem';

const VideoList = ({ videos, onVideoSelect, status, removeVideo}) => {

    const renderedList = videos.map((video) => {
        return <VideoItem removeVideo={removeVideo} status={status} key={video.id.videoId} onVideoSelect={onVideoSelect} video={video} />
    })

    return (
        <div className={status}>
            {status ? <h2 className="w-100">Your Saved Videos</h2> : false}
            {renderedList}
        </div>
    )
}

export default VideoList;