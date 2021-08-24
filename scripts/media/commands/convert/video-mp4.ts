/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
// @ts-ignore
const {exec} = require('child_process')

exports.command = 'video-mp4 [input]'

exports.describe = 'Will try and optimize video for web in MP4 format.'

// https://gist.github.com/pinge/b9f9ce1e4d399503f7c80df4c5d09f22
// --scaleDown
// --stripAudio
exports.handler = ({input, scaleDown, stripAudio}: {input: string; scaleDown: boolean; stripAudio: boolean}) => {
  const args = [
    '-y',
    `-i ${input}`,
    '-movflags +faststart',
    '-c:v libx264',
    '-coder 1',
    '-pix_fmt yuv420p',
    '-profile:v high',
    '-preset:v veryslow',
    '-tune film',
    '-bf 3',
    '-b_strategy 2',
    '-g 100',
    '-refs 10',
    '-b:v 3M',
    '-minrate 2.85M',
    '-maxrate 7M',
    '-bufsize 7M',
    scaleDown ? '-filter:v scale=1280:720,setsar=1:1' : '',
    stripAudio ? '-an' : '',
    '-c:a aac -ac 2 -b:a 128k',
  ]
  exec(`ffmpeg ${args.join(' ')} output.mp4`, (error: any, stdout: any, stderr: any) => {
    if (error) {
      console.log(error)
      return
    }
    if (stderr) {
      console.log(stderr)
      return
    }
    console.log(stdout)
  })
}
