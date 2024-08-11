import * as THREE from "three"
import { OrbitControls } from "jsm/controls/OrbitControls.js"
import getStarField from "./getStarfield.js"

const w = window.innerWidth
const h = window.innerHeight
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000)
camera.position.z = 5
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(w, h)
document.body.insertBefore(renderer.domElement, document.getElementById('maindiv'))

const earthGroup = new THREE.Group()
earthGroup.rotation.z = (-23.4 * Math.PI) / 100
scene.add(earthGroup)
// new OrbitControls(camera, renderer.domElement)

const loader = new THREE.TextureLoader()
const geometry = new THREE.IcosahedronGeometry(1, 12)
const material = new THREE.MeshStandardMaterial({
  // map: loader.load("./assets/earthnasa.jpg"),
  map: loader.load("./assets/earthmap10k.jpg"),
})
const earthMesh = new THREE.Mesh(geometry, material)
earthGroup.add(earthMesh)

const stars = getStarField({ numStars: 3000 })
console.log(stars)
scene.add(stars)

const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffaaff)
earthGroup.add(hemiLight)

const animate = () => {
  requestAnimationFrame(animate)

  earthMesh.rotation.y += 0.002
  renderer.render(scene, camera)
}

animate()
