import * as THREE from "three"
import { OrbitControls } from "jsm/controls/OrbitControls.js"
import getStarField from "./getStarfield.js"

const fov = 75
const w = window.innerWidth
const h = window.innerHeight
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(fov, w / h, 0.1, 1000)
camera.position.z = 5
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(w, h)
document.body.insertBefore(renderer.domElement, document.getElementById("main"))

const earthGroup = new THREE.Group()
earthGroup.rotation.z = (-23.4 * Math.PI) / 100
scene.add(earthGroup)
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.03

const loader = new THREE.TextureLoader()
const detail = 12
const ball = new THREE.IcosahedronGeometry(1, detail)
const material = new THREE.MeshStandardMaterial({
  map: loader.load("./assets/earthmap10k.jpg"),
  // map: loader.load("./assets/earthmap10k.jpg"),
})
const earthMesh = new THREE.Mesh(ball, material)
earthGroup.add(earthMesh)

const cloudsMaterial = new THREE.MeshStandardMaterial({
  map: loader.load("./assets/earthcloudmap2.jpg"),
  blending: THREE.AdditiveBlending,
  transparent: true,
  opacity: 0.2,
})
const cloudsMesh = new THREE.Mesh(ball, cloudsMaterial)
cloudsMesh.scale.setScalar(1.003)
earthGroup.add(cloudsMesh)

const lightsMaterial = new THREE.MeshBasicMaterial({
  map: loader.load("./assets/earthnasa.jpg"),
  blending: THREE.AdditiveBlending,
})
const lightsMesh = new THREE.Mesh(ball, lightsMaterial)
earthGroup.add(lightsMesh)
const stars = getStarField({ numStars: 5000 })
scene.add(stars)



const sunLight = new THREE.DirectionalLight(0xffffff)
sunLight.position.set(-2, 0.5, 2)
scene.add(sunLight)

const animate = () => {
  requestAnimationFrame(animate)

  earthMesh.rotation.y += 0.002
  lightsMesh.rotation.y += 0.002
  cloudsMesh.rotation.y += 0.002
  renderer.render(scene, camera)
  controls.update()
}

animate()
