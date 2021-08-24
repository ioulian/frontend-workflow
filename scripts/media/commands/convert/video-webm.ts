/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
// @ts-ignore
const {exec} = require('child_process')

exports.command = 'video-webm [input]'

exports.describe = 'Will try and optimize video for web in WEBM format.'

// https://gist.github.com/pinge/b9f9ce1e4d399503f7c80df4c5d09f22
// --scaleDown
// --stripAudio
exports.handler = ({input, scaleDown, stripAudio}: {input: string; scaleDown: boolean; stripAudio: boolean}) => {
  const args = [
    '-y',
    `-i ${input}`,
    '-movflags +faststart',
    '-c:v libvpx-vp9',
    '-pix_fmt yuv420p',
    '-b:v 2M -maxrate 5M',
    scaleDown ? '-filter:v scale=1280:720,setsar=1:1' : '',
    stripAudio ? '-an' : '',
    '-c:a libopus -b:a 64k',
  ]
  exec(`ffmpeg ${args.join(' ')} output.webm`, (error: any, stdout: any, stderr: any) => {
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
