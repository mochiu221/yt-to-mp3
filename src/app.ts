import express from 'express'
import path from 'path'
import ytRouter from './routers/yt'

const app = express()

const publicPath = path.join(__dirname, '../public')

app.use(express.static(publicPath))
app.use(express.json())
app.use(ytRouter)

export default app