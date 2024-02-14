# A simple youtube to MP3 app

Copy the link of the youtube, input the starting time and the mp3 length, and submit.

The mp3 files should be found in /downloads

## requirements

Install FFMPEG

## env settings

Path: /config/dev.env

Example:

PORT=3000
FFMPEG_PATH=/usr/local/Cellar/ffmpeg/6.1.1_2/bin/ffmpeg

## run

```bash
npm run dev
```

## bugs found

Some typescript errors were found in the npm module - youtube-mp3-downloader. Since I just use this app for my own purpose, so I just did a quick fix for the error directly.
