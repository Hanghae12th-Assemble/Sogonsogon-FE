import { useState, useRef, useEffect } from "react";

export const useClipPlayControls = () => {
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef(null);

  useEffect(() => {
    if (played === 1) {
      setPlaying(false);
    }
  }, [played]);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleProgress = (progress) => {
    setPlayed(progress.played);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 15);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 15);
  };

  const handleSeekChange = (e) => {
    const newPlayed = parseFloat(e.target.value);
    setPlayed(newPlayed);
    playerRef.current.seekTo(newPlayed * duration);
  };

  return {
    playing,
    played,
    duration,
    playerRef,
    handlePlayPause,
    handleProgress,
    handleDuration,
    handleRewind,
    handleFastForward,
    handleSeekChange,
  };
};
