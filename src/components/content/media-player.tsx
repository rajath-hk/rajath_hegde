'use client';

import React, { useState, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize } from 'lucide-react';

const MediaPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // 3 minutes in seconds
  const [volume, setVolume] = useState(80);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Mock video sources
  const videos = [
    {
      id: 1,
      title: 'Project Demo: Portfolio OS',
      url: '/videos/portfolio-demo.mp4',
      thumbnail: '/images/video-thumb1.jpg'
    },
    {
      id: 2,
      title: 'AI Assistant in Action',
      url: '/videos/ai-assistant.mp4',
      thumbnail: '/images/video-thumb2.jpg'
    },
    {
      id: 3,
      title: 'RTSP Loop Recorder Overview',
      url: '/videos/rtsp-demo.mp4',
      thumbnail: '/images/video-thumb3.jpg'
    }
  ];

  const [currentVideo, setCurrentVideo] = useState(videos[0]);

  return (
    <div className="h-full flex flex-col">
      {/* Video Player Area */}
      <div className="relative flex-grow bg-black">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Placeholder for video */}
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-center">
              <div className="bg-gray-700 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Maximize className="text-gray-400" />
              </div>
              <p className="text-gray-400">Video Player</p>
              <p className="text-gray-500 text-sm mt-1">Video would play here</p>
            </div>
          </div>
        </div>
        
        {/* Video Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* Progress Bar */}
          <div className="mb-3">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-300 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          
          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => {
                  const newIndex = (videos.indexOf(currentVideo) - 1 + videos.length) % videos.length;
                  setCurrentVideo(videos[newIndex]);
                }}
                className="text-white hover:text-gray-300"
              >
                <SkipBack size={20} />
              </button>
              <button 
                onClick={togglePlay}
                className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button 
                onClick={() => {
                  const newIndex = (videos.indexOf(currentVideo) + 1) % videos.length;
                  setCurrentVideo(videos[newIndex]);
                }}
                className="text-white hover:text-gray-300"
              >
                <SkipForward size={20} />
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Volume2 size={16} className="text-white" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Playlist */}
      <div className="h-1/3 border-t overflow-y-auto">
        <div className="p-3 border-b">
          <h3 className="font-semibold">Playlist</h3>
        </div>
        <div className="divide-y">
          {videos.map((video) => (
            <div 
              key={video.id}
              onClick={() => setCurrentVideo(video)}
              className={`flex items-center p-3 cursor-pointer ${
                currentVideo.id === video.id ? 'bg-blue-500/20' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
              <div className="ml-3 flex-1 min-w-0">
                <p className="font-medium truncate">{video.title}</p>
                <p className="text-sm text-gray-500">3:00</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;