import { usePlayerStore } from "@/store/playerStore"
import { useState, useRef, useEffect } from "react"
import { Slider } from "./Slider"

export const Pause = () => (
    <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>
  )
  
export const Play = () => (
    <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16"><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path></svg>
  )

const CurrentSong = ({image, title, artists}) => {
    return (
        <div className="flex items-center gap-4 relative overflow-hidden">
            <picture className=" w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
                <img src={image} alt={title}></img>
            </picture>

            <div className="flex flex-col">
                <h3 className=" font-semibold block text-sm"> 
                    {title}
                </h3>
                <span className="opacity-80 text-xs">
                    {artists?.join(', ')}
                </span>
            </div>
        </div>
    )
}

  export function Player (){

    const {currentMusic, isPlaying, setIsPlaying} = usePlayerStore( state => state)
    const audioRef = useRef()
    const volumeRef = useRef(1)

    useEffect(() => {
        isPlaying ? audioRef.current.play() :  audioRef.current.pause()
        }, [isPlaying]);

    useEffect(() => {
        const {song, playlist, songs} = currentMusic
        console.log({song, playlist, songs})
        if(song){
            const src = `/music/${playlist?.id}/0${song.id}.mp3`
            audioRef.current.src = src
            audioRef.current.volume = volumeRef.current
            audioRef.current.play()
        }
    }, [currentMusic]);
    

    const handleClick = () => {

        if(isPlaying){
            audioRef.current.pause()
        }else{
            audioRef.current.play()
            audioRef.current.volume = 0.1
        }

        setIsPlaying(!isPlaying)
    }

    return(
        <div className="flex flex-row justify-between w-full px-4 z-50 mt-2">
            <div>
                <CurrentSong {...currentMusic.song} />               
            </div>
            <div className= "grid place-content-center gap-4 flex-1">
                <div className="flex justify-center">
                    <button className="bg-white rounded-full p-2" onClick={handleClick}>
                        {isPlaying ? <Pause/> : <Play/>}
                    </button>
                </div>
                Reproductor
            </div>
            <div className="grid place-content-center">
                <Slider
                    defaultValue={[100]}
                    max={100}
                    min={0}
                    className="w-[95px]"  
                    onValueChange={(value) =>{
                        const [newVolume] = value
                        const volumeValue = newVolume / 100
                        volumeRef.current = volumeValue
                        audioRef.current.volume = volumeValue
                    }} 
                ></Slider>
            </div>
            <audio ref={audioRef}></audio>
        </div>
    ) 
  }