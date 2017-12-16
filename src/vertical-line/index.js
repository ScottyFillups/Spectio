import glAudioAnalyser from 'gl-audio-analyser'
import createShader from 'gl-shader'
import draw from 'a-big-triangle'

import songFile from './assets/song.mp3'
import frag from './frag.glsl'
import vert from './vert.glsl'

const audio = new Audio(songFile)
const shell = require('gl-now')()

let gl
let shader
let analyser

shell.on('gl-init', function () {
  gl = shell.gl
  shader = createShader(gl, vert, frag)
  analyser = glAudioAnalyser(gl, audio)
})

shell.on('gl-render', function (t) {
  const width = gl.drawingBufferWidth
  const height = gl.drawingBufferHeight

  gl.viewport(0, 0, width, height)

  shader.bind()
  shader.uniforms.uWaveform = analyser.bindFrequencies(0)
  shader.uniforms.uResolution = [width, height]

  draw(gl)
})

audio.loop = true
audio.play()
