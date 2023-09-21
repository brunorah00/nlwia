import ytdl from 'ytdl-core'
import fs from 'fs'
import { promises } from 'dns'
import { error } from 'console'

export const download = (videoId) => new promises((resolve, reject) => {
  const videoURL = "https://www.youtube.com/shorts/" + videoId
  
  console.log('Realizando o download do video:', videoId)

  ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
  .on("info", (info) => {
    const seconds = info.formats[0].approxDurationMs / 1000
    if(seconds > 60){
      throw new Error("A duração desse vídeo é maior que 60 segundos.")
    }
    }
  ).on("end", () => {
    console.log("Download do vídeo finalizado.")
    resolve()
  })
  .on("erro", () => {
    console.log("Não foi possível fazer o donwload do vídeo. Detalhes do erro:", error)
    reject(error)
  }).pipe(fs.createReadStream("./tmp/audio.mp4"))
})