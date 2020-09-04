import React from 'react';
import './videodetail.css';

const VideoDetail = ({video, saveVideo}) => {

    if(!video) {
        return <div>Loading...</div>
    }

    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`

    return (
        <div className="card">
            <div className="embed-responsive embed-responsive-16by9">
                <iframe title="embed-responsive-item" src={videoSrc}/>
            </div>
            <div className="card-body">
                <h4 className="card-title">{video.snippet.title}</h4>
                <p className="text-muted">{video.snippet.description} <button className="btn btn-success" onClick={() => {saveVideo(video)}}>Save Video</button></p>
            </div>
        </div>
    )
}

export default VideoDetail