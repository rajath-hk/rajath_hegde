'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Maximize,
  ListMusic,
  Heart,
  Download,
  Repeat,
  Shuffle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const MediaPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // 3 minutes in seconds
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playlist = [
    {
      id: 1,
      title: "RTSP Loop Recorder Demo",
      artist: "Rajath Hegde",
      duration: "2:45",
      cover: "/images/rtsp-demo.jpg"
    },
    {
      id: 2,
      title: "Self-Hosted Platform Walkthrough",
      artist: "Rajath Hegde",
      duration: "4:20",
      cover: "/images/self-hosted-demo.jpg"
    },
    {
      id: 3,
      title: "PortfolioOS Introduction",
      artist: "Rajath Hegde",
      duration: "3:15",
      cover: "/images/portfolio-demo.jpg"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (isPlaying && currentTime < duration) {
        setCurrentTime(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, currentTime, duration]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeChange = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    setIsMuted(value[0] === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      setVolume(0);
    } else {
      setVolume(80);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
    setCurrentTime(0);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
    setCurrentTime(0);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Player Header */}
      <div className="border-b p-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Media Player</h2>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}
        >
          <ListMusic className="w-4 h-4 mr-2" />
          {isPlaylistOpen ? 'Hide' : 'Show'} Playlist
        </Button>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Main Player */}
        <div className={`flex-1 flex flex-col ${isPlaylistOpen ? 'md:w-2/3' : 'w-full'}`}>
          {/* Media Display */}
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center max-w-md">
              <div className="w-64 h-64 rounded-xl overflow-hidden mx-auto mb-6 shadow-lg">
                <img 
                  src={playlist[currentTrack].cover} 
                  alt={playlist[currentTrack].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-1">{playlist[currentTrack].title}</h3>
              <p className="text-muted-foreground mb-6">{playlist[currentTrack].artist}</p>
              
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Button variant="ghost" size="icon">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Download className="w-5 h-5" />
                </Button>
              </div>

            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="px-6 mb-2">
            <div className="flex justify-between text-sm text-muted-foreground mb-1">
              <span>{formatTime(currentTime)}</span>
              <span>{playlist[currentTrack].duration}</span>
            </div>
            <Slider
              value={[currentTime]}
              onValueChange={handleTimeChange}
              max={duration}
              step={1}
            />
          </div>
          
          {/* Controls */}
          <div className="px-6 py-4">
            <div className="flex items-center justify-center space-x-6">
              <Button variant="ghost" size="icon">
                <Shuffle className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={prevTrack}>
                <SkipBack className="w-6 h-6" />
              </Button>
              <Button 
                className="rounded-full w-12 h-12" 
                size="icon"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6 ml-1" />
                )}
              </Button>
              <Button variant="ghost" size="icon" onClick={nextTrack}>
                <SkipForward className="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="icon">
                <Repeat className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-2 mt-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleMute}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </Button>
              <Slider
                className="w-24"
                value={[volume]}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
              />
              <Button variant="ghost" size="icon">
                <Maximize className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Playlist */}
        {isPlaylistOpen && (
          <div className="w-full md:w-1/3 border-l flex flex-col">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Playlist</h3>
            </div>
            <div className="flex-1 overflow-y-auto">
              {playlist.map((track, index) => (
                <div 
                  key={track.id}
                  className={`flex items-center p-3 hover:bg-accent cursor-pointer ${
                    index === currentTrack ? 'bg-accent' : ''
                  }`}
                  onClick={() => {
                    setCurrentTrack(index);
                    setCurrentTime(0);
                  }}
                >
                  <div className="w-10 h-10 rounded mr-3 overflow-hidden">
                    <img 
                      src={track.cover} 
                      alt={track.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{track.title}</p>
                    <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {track.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaPlayer;