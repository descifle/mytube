import React from 'react';
import './videoitem.css';

const VideoItem = ({ video, onVideoSelect, status, removeVideo}) => {

    return (
        <div onClick={() => {onVideoSelect(video)}} className={status ? "saved-video_item py-2"  :  "item video-item py-2"}>
            <img className="img-fluid" src={video.snippet.thumbnails.medium.url} alt={video.title} />
            <div className="">
               <div className={status ? "saved-video_text py-1" : "text-dark pl-2"}>
               {status ? video.snippet.title.slice(0,30) + "..." : video.snippet.title}
               </div>
               {status ? <button onClick={() => {removeVideo(video)}} className="btn  btn-danger">Delete</button> : false}
            </div>
        </div>
    )
}

export default VideoItem;