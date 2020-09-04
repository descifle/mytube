import React from 'react';
import './videoitem.css';

const VideoItem = ({ video, onVideoSelect, status}) => {
    return (
        <div onClick={() => {onVideoSelect(video)}} className={status ? "saved-video_item py-2"  :  "item video-item py-2"}>
            <img className="img-fluid" src={video.snippet.thumbnails.medium.url} alt={video.title} />
            <div className="">
               <div className={status ? "saved-video_text pl-2" : "text-dark pl-2"}>
               {video.snippet.title}
               </div>
            </div>
        </div>
    )
}

export default VideoItem;