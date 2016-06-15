<template>
  <div class="vr">
    <div id="webglviewer"></div>
  </div>
</template>

<style>
  #webglviewer {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
</style>

<script>
  import THREE from 'three'
  import '../assets/js/lib/StereoEffect'
//  import Vr from '../assets/js/Vr/index'
  import VrLayer from '../assets/js/Vr/VrLayer'
  import ExperienceManager from '../assets/js/Experiences/ExperienceManager'

  export default{
    data () {
      return {
        msg: 'hello vue'
      }
    },
    ready () {
//      let vr = new Vr()
//      console.log(vr)

      if (0) {
        return false
      }
      var scene
      var camera
      var renderer
      var element
      var container
      var effect
      var video
      var canvas
      var context
      var texture
      var vrLayer
      var experienceManager

      init()

      function init () {
        scene = new THREE.Scene()
        camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 700)
        camera.position.set(0, 15, 0)
        scene.add(camera)

        renderer = new THREE.WebGLRenderer()
        element = renderer.domElement
        container = document.getElementById('webglviewer')
        container.appendChild(element)

        effect = new THREE.StereoEffect(renderer)

        video = document.createElement('video')
        video.setAttribute('autoplay', true)

        var options = {
          video: {
            optional: [{facingMode: 'environment'}]
          }
        }

        navigator.getUserMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia)

        navigator.mediaDevices.enumerateDevices()
          .then(function (sources) {
            navigator.getUserMedia(options, streamFound, streamError)
          })

        function streamFound (stream) {
          document.body.appendChild(video)
          video.src = window.URL.createObjectURL(stream)
          video.style.width = '100%'
          video.style.height = '100%'
          video.play()

          canvas = document.createElement('canvas')
          canvas.width = video.clientWidth
          canvas.height = video.clientHeight
          canvas.width = nextPowerOf2(canvas.width)
          canvas.height = nextPowerOf2(canvas.height)

          function nextPowerOf2 (x) {
            return Math.pow(2, Math.ceil(Math.log(x) / Math.log(2)))
          }

          context = canvas.getContext('2d')
          texture = new THREE.Texture(canvas)
          texture.context = context

          var cameraPlane = new THREE.PlaneGeometry(1920, 1080)

          var cameraMesh = new THREE.Mesh(cameraPlane, new THREE.MeshBasicMaterial({
            color: 0xffffff, opacity: 1, map: texture
          }))
          cameraMesh.position.z = -600
          scene.add(cameraMesh)

          vrLayer = new VrLayer(canvas.width, canvas.height)
          experienceManager = new ExperienceManager(vrLayer)
          console.log(experienceManager)
          animate()
        }

        function streamError (error) {
          console.log('Stream error: ', error)
        }
      }

      function animate () {
        if (context) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height)
          vrLayer.stage.update()
          context.drawImage(vrLayer.canvas, 0, 0, canvas.width, canvas.height)

          if (video.readyState === video.HAVE_ENOUGH_DATA) {
            texture.needsUpdate = true
          }

          window.requestAnimationFrame(animate)

          update()
          render()
        }
      }

      function resize () {
        var width = container.offsetWidth
        var height = container.offsetHeight

        camera.aspect = width / height
        camera.updateProjectionMatrix()

        renderer.setSize(width, height)
        effect.setSize(width, height)
      }

      function update (dt) {
        resize()

        camera.updateProjectionMatrix()
      }

      function render (dt) {
        effect.render(scene, camera)
      }
    }
  }
</script>
