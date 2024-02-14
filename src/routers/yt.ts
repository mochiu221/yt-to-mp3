import express from 'express'
import path from 'path'
import fs from 'fs'
import YoutubeMp3Downloader from 'youtube-mp3-downloader'

const router = express.Router()

// More about ffmpeg commands
// https://blog.miniasp.com/post/2022/10/08/Useful-tool-FFmpeg

// Install ffmpeg in aws
// https://www.youtube.com/watch?v=kudpa3F2oVE

router.post('/yt/download', async (req, res) => {
    const url = req.body.url as string
    const hhmmss = req.body.hhmmss as number[]
    const second = req.body.second as number

    let start = '00:00:00'
    let run = '20'
    if (hhmmss.length === 6) {
        start = hhmmss[0].toString() + hhmmss[1].toString() + ':' + hhmmss[2].toString() + hhmmss[3].toString() + ':' + hhmmss[4].toString() + hhmmss[5].toString()
    }

    if (second) {
        run = second.toString()
    }

    const id = url.split('/watch?v=').pop()

    const downloadsDir = path.join(__dirname, '../../downloads')

    if (!fs.existsSync(downloadsDir)) {
        fs.mkdirSync(downloadsDir)
    }

    const YD = new YoutubeMp3Downloader({
        ffmpegPath: process.env.FFMPEG_PATH,
        outputPath: downloadsDir,
        youtubeVideoQuality: 'highestaudio',
        queueParallelism: 1,
        progressTimeout: 2000,
        allowWebm: false,
        outputOptions: ['-ss', start, '-t', run]
    })

    if (id !== undefined) {
        try {
            YD.download(id)

            YD.on('error', (err, data) => {
                if (!err) {
                    // console.log(data)
                    return res.status(200).send()
                } else {
                    // console.log(err)
                    return res.status(500).send()
                }
            })

            YD.on('finished', (err, data) => {
                if (!err) {
                    // console.log(data)
                    return res.status(200).send()
                } else {
                    // console.log(err)
                    return res.status(500).send()
                }
            })
        } catch (error) {
            return res.status(500).send()
        }
    } else {
        return res.status(500).send()
    }
})

export default router