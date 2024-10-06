import * as THREE from "three";
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import getStarfield from "./src/getStarfield.js";
import { getFresnelMat } from "./src/getFresnelMat.js";

function addDescription() {
  const description = document.createElement('div');
  description.style.position = 'absolute';
  description.style.top = '10px';
  description.style.right = '10px';
  description.style.color = 'white';
  description.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  description.style.padding = '10px';
  description.style.borderRadius = '5px';
  description.style.fontFamily = 'Arial, sans-serif';
  description.innerHTML = `
    <h3 style="margin-top: 0;">Controls:</h3>
    <p>Press 'C' to toggle clouds</p>
    <p>Press 'N' to toggle night lights</p>
    <p>Press 'A' to toggle near-Earth objects</p>
  `;
  document.body.appendChild(description);
}

function addCameraToggleButton() {
  const button = document.createElement('button');
  button.textContent = 'Toggle Camera Mode';
  button.style.position = 'absolute';
  button.style.bottom = '10px';
  button.style.left = '222px';
  button.style.padding = '10px';
  button.style.fontSize = '16px';
  document.body.appendChild(button);
  return button;
}

function addAsteroidButtons(neoData) {
  const buttonContainer = document.createElement('div');
  buttonContainer.style.position = 'absolute';
  buttonContainer.style.bottom = '10px';
  buttonContainer.style.right = '10px';
  buttonContainer.style.maxWidth = '300px';
  buttonContainer.style.maxHeight = '40vh';
  buttonContainer.style.overflowY = 'auto';
  buttonContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  buttonContainer.style.padding = '15px';
  buttonContainer.style.borderRadius = '10px';
  buttonContainer.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

  const title = document.createElement('h3');
  title.textContent = 'Near-Earth Objects';
  title.style.color = 'white';
  title.style.marginTop = '0';
  title.style.marginBottom = '10px';
  title.style.textAlign = 'center';
  buttonContainer.appendChild(title);

  neoData.forEach((neo, index) => {
    const button = document.createElement('button');
    button.textContent = neo.name;
    button.style.display = 'block';
    button.style.width = '100%';
    button.style.padding = '10px';
    button.style.margin = '5px 0';
    button.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.color = 'white';
    button.style.cursor = 'pointer';
    button.style.transition = 'background-color 0.3s';
    button.dataset.index = index;

    button.addEventListener('mouseover', () => {
      button.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    });

    button.addEventListener('mouseout', () => {
      button.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    });

    buttonContainer.appendChild(button);
  });

  document.body.appendChild(buttonContainer);
  return buttonContainer;
}

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 3;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = false;

controls.minDistance = 1.5;
controls.maxDistance = 4;
controls.enableRotate = true;
controls.rotateSpeed = 0.3;
controls.zoomSpeed = 0.5;

const detail = window.innerWidth > 768 ? 12 : 8;
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, detail);
const material = new THREE.MeshPhongMaterial({
  map: loader.load("./textures/00_earthmap1k.jpg"),
  specularMap: loader.load("./textures/02_earthspec1k.jpg"),
  bumpMap: loader.load("./textures/01_earthbump1k.jpg"),
  bumpScale: 0.04,
});
const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

const lightsMat = new THREE.MeshBasicMaterial({
  map: loader.load("./textures/03_earthlights1k.jpg"),
  blending: THREE.AdditiveBlending,
});
const lightsMesh = new THREE.Mesh(geometry, lightsMat);
earthGroup.add(lightsMesh);

const cloudsMat = new THREE.MeshStandardMaterial({
  map: loader.load("./textures/04_earthcloudmap.jpg"),
  transparent: true,
  opacity: 0.5,
  blending: THREE.AdditiveBlending,
  alphaMap: loader.load('./textures/05_earthcloudmaptrans.jpg'),
});
const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
cloudsMesh.scale.setScalar(1.003);
earthGroup.add(cloudsMesh);

const fresnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(geometry, fresnelMat);
glowMesh.scale.setScalar(1.01);
earthGroup.add(glowMesh);

const stars = getStarfield({numStars: 2000});
scene.add(stars);

const sunLight = new THREE.DirectionalLight(0xffffff, 4.0);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);

const moonGroup = new THREE.Group();
scene.add(moonGroup);
const moonMat = new THREE.MeshStandardMaterial({
  map: loader.load("./textures/06_moonmap4k.jpg"),
  bumpMap: loader.load("./textures/07_moonbump4k.jpg"),
  bumpScale: 0.002,
});
const moonMesh = new THREE.Mesh(new THREE.SphereGeometry(0.27, 32, 32), moonMat);
moonMesh.position.set(3.84, 0, 0);
moonGroup.add(moonMesh);

const neoData = [
  {
    "name": "(66391) 1999 KW4",
    "distance": 0.0019,
    "uniqueness": "Binary system with mutual orbit",
    "properties": "Diameter ~1.3 km (primary), ~0.4 km (secondary)",
    "details": "A binary asteroid with a smaller moon orbiting the larger primary body."
  },
  {
    "name": "(3200) Phaethon",
    "distance": 0.0181,
    "uniqueness": "Parent body of the Geminids meteor shower",
    "properties": "Diameter ~5.8 km, highly eccentric orbit",
    "details": "A unique asteroid/comet hybrid that is responsible for the Geminids meteor shower."
  },
  {
    "name": "2010 TK7",
    "distance": 0.0015,
    "uniqueness": "Earth’s only known Trojan asteroid",
    "properties": "Diameter ~300 meters, stable Lagrange point orbit",
    "details": "A near-Earth Trojan asteroid that shares Earth's orbit around the Sun."
  },
  {
    "name": "(52768) 1998 OR2",
    "distance": 0.016,
    "uniqueness": "Close approach in 2020",
    "properties": "Diameter ~2 km, highly reflective surface",
    "details": "A large asteroid that passed close to Earth in 2020 with a reflective surface."
  },
  {
    "name": "(2340) Hathor",
    "distance": 0.0063,
    "uniqueness": "Highly eccentric orbit",
    "properties": "Diameter ~0.3 km, close approaches to Earth",
    "details": "An asteroid with a highly eccentric orbit that occasionally passes near Earth."
  },
  {
    name: "(162173) Ryugu",
    distance: 0.0015,
    uniqueness: "Visited by JAXA’s Hayabusa2 mission",
    properties: "Diameter ~900 meters, carbonaceous asteroid",
    details: "A near-Earth asteroid rich in carbon, samples have been returned to Earth."
  },
  {
    name: "(5381) Sekhmet",
    distance: 0.0089,
    uniqueness: "Highly reflective asteroid",
    properties: "Diameter ~1.4 km, rotational period ~2.82 hours",
    details: "An asteroid with a fast rotational period and highly reflective surface."
  },
  {
    name: "2014 JO25",
    distance: 0.0037,
    uniqueness: "Close approach in 2017",
    properties: "Diameter ~650 meters, elongated shape",
    details: "A large, elongated asteroid that passed close to Earth in 2017."
  },
  {
    name: "1998 HL1",
    distance: 0.0004,
    uniqueness: "Close approach in 2019",
    properties: "Diameter ~1 km, slow rotation",
    details: "A large asteroid that passed close to Earth in 2019."
  },
  {
    name: "2019 OK",
    distance: 0.0001,
    uniqueness: "Undetected close approach in 2019",
    properties: "Diameter ~100 meters, fast speed",
    details: "An asteroid that passed extremely close to Earth undetected in 2019."
  },
  {
    name: "(99907) 1989 VA",
    distance: 0.0021,
    uniqueness: "Frequent close approaches to Earth",
    properties: "Diameter ~400 meters, fast rotation",
    details: "An asteroid that frequently passes close to Earth."
  },
  {
    name: "(4769) Castalia",
    distance: 0.0146,
    uniqueness: "First asteroid imaged by radar",
    properties: "Diameter ~1.4 km, binary system",
    details: "A binary asteroid and the first to be imaged using radar."
  },
  {
    name: "2019 VD",
    distance: 0.00065,
    uniqueness: "Close approach in 2019",
    properties: "Diameter ~30 meters, high velocity",
    details: "A small asteroid that made a very close approach in 2019."
  },
  {
    name: "(3122) Florence",
    distance: 0.035,
    uniqueness: "Has two small moons",
    properties: "Diameter ~4.4 km, binary system",
    details: "A large asteroid with two moons that passed near Earth in 2017."
  },
  {
    name: "(6178) 1986 DA",
    distance: 0.0032,
    uniqueness: "Highly metal-rich asteroid",
    properties: "Diameter ~2.3 km, slow rotation",
    details: "An asteroid that is rich in metals, a potential target for space mining."
  },
  {
    name: "(6489) Golevka",
    distance: 0.0034,
    uniqueness: "Has undergone Yarkovsky effect",
    properties: "Diameter ~0.5 km, irregular shape",
    details: "A small asteroid whose orbit has changed due to the Yarkovsky effect."
  },
  {
    name: "2021 PH27",
    distance: 0.001,
    uniqueness: "Fastest orbiting NEO",
    properties: "Diameter ~1 km, 114-day orbital period",
    details: "An asteroid with the fastest known orbit around the Sun."
  },
  {
    name: "(175706) 1996 FG3",
    distance: 0.0029,
    uniqueness: "Potential binary system",
    properties: "Diameter ~1.6 km, rotational period ~3.6 hours",
    details: "A potential binary asteroid with a fast rotation."
  },
  {
    name: "(1036) Ganymed",
    distance: 0.0112,
    uniqueness: "Largest near-Earth asteroid",
    properties: "Diameter ~34.8 km, highly eccentric orbit",
    details: "The largest near-Earth asteroid with a highly elliptical orbit."
  },
  {
    name: "2021 UA1",
    distance: 0.00006,
    uniqueness: "Passed within Earth’s geostationary orbit",
    properties: "Diameter ~2 meters, extremely fast approach",
    details: "A small asteroid that passed very close to Earth in 2021."
  },
  {
    name: "(4660) Nereus",
    distance: 0.003,
    uniqueness: "Potential target for space mining",
    properties: "Diameter ~330 meters, elongated shape",
    details: "A small asteroid with a near-Earth orbit, potential mining target."
  },
  {
    name: "(2100) Ra-Shalom",
    distance: 0.0025,
    uniqueness: "Low albedo (dark surface)",
    properties: "Diameter ~2.5 km, highly reflective surface",
    details: "A dark asteroid with a slow rotational period."
  },
  {
    name: "2008 TC3",
    distance: 0.0005,
    uniqueness: "First asteroid detected before impact",
    properties: "Diameter ~4 meters, fast velocity",
    details: "The first asteroid to be detected before it impacted Earth."
  },
  {
    name: "2022 AE1",
    distance: 0.001,
    uniqueness: "Close approach in 2022",
    properties: "Diameter ~50 meters, high albedo",
    details: "A small, fast-moving asteroid that passed close to Earth in 2022."
  },
  {
    name: "(7753) 1988 XB",
    distance: 0.005,
    uniqueness: "Frequent close approaches to Earth",
    properties: "Diameter ~700 meters, elongated shape",
    details: "An elongated asteroid that frequently passes by Earth."
  },
  {
    name: "(5381) Sekhmet",
    distance: 0.0089,
    uniqueness: "Highly reflective asteroid",
    properties: "Diameter ~1.4 km, fast rotation period",
    details: "A rapidly rotating asteroid with a reflective surface."
  },
  {
    name: "2021 JE1",
    distance: 0.00023,
    uniqueness: "Very small asteroid, 2021 close approach",
    properties: "Diameter ~2 meters, fast-moving object",
    details: "A very small, fast-moving object that passed close to Earth."
  },
  {
    name: "(441987) 2010 NY65",
    distance: 0.0035,
    uniqueness: "Close approach every 2 years",
    properties: "Diameter ~230 meters, binary system",
    details: "An asteroid that has a frequent approach near Earth every two years."
  },
  {
    name: "(408873) 2009 BD",
    distance: 0.0012,
    uniqueness: "Tiny asteroid with high velocity",
    properties: "Diameter ~4 meters, Earth-like orbit",
    details: "A very small asteroid that has an orbit similar to Earth’s."
  },
  {
    name: "2018 AH",
    distance: 0.002,
    uniqueness: "Close approach in 2018",
    properties: "Diameter ~100 meters, high velocity",
    details: "A small asteroid that made a close pass to Earth in 2018."
  },
  {
    name: "(153201) 2000 WO107",
    distance: 0.0014,
    uniqueness: "Metal-rich asteroid",
    properties: "Diameter ~500 meters, high metal content",
    details: "An asteroid rich in metals, with potential for space mining."
  },
  {
    name: "(99942) Apophis",
    distance: 0.00037,
    uniqueness: "Close approach in 2029",
    properties: "Diameter ~370 meters, fast rotation",
    details: "An asteroid that will make a very close approach to Earth in 2029."
  },
  {
    name: "2021 QC1",
    distance: 0.00015,
    uniqueness: "Undetected until after close pass",
    properties: "Diameter ~30 meters, high velocity",
    details: "An asteroid that passed very close to Earth in 2021, detected afterward."
  },
  {
    name: "2021 LX1",
    distance: 0.00043,
    uniqueness: "Small but fast-moving object",
    properties: "Diameter ~10 meters, high speed",
    details: "A small asteroid that passed close to Earth at high speed."
  },
  {
    name: "(101955) Bennu",
    distance: 0.0023,
    uniqueness: "Target of OSIRIS-REx mission",
    properties: "Diameter ~500 meters, rich in carbon",
    details: "An asteroid from which NASA's OSIRIS-REx mission has returned samples."
  },
  {
    name: "(163899) 2003 SD220",
    distance: 0.0022,
    uniqueness: "Close approach every few years",
    properties: "Diameter ~1.6 km, elongated shape",
    details: "A large, elongated asteroid with frequent close approaches to Earth."
  },
  {
    name: "2020 CD3",
    distance: 0.00015,
    uniqueness: "Temporary natural satellite of Earth",
    properties: "Diameter ~3 meters, fast orbit",
    details: "A small asteroid that temporarily became Earth's natural satellite."
  },
  {
    name: "2021 GW4",
    distance: 0.00003,
    uniqueness: "Very close approach in 2021",
    properties: "Diameter ~4 meters, fast velocity",
    details: "A small asteroid that passed very close to Earth in 2021."
  },
  {
    name: "(101955) Bennu",
    distance: 0.002,
    uniqueness: "NASA OSIRIS-REx mission sample return",
    properties: "Diameter ~500 meters, carbonaceous surface",
    details: "A carbon-rich asteroid that was sampled by the OSIRIS-REx mission."
  },
  {
    name: "(85627) 1998 KR2",
    distance: 0.0056,
    uniqueness: "Close approach in 1998",
    properties: "Diameter ~1.2 km, fast rotational period",
    details: "A large asteroid that passed close to Earth in 1998."
  },
  {
    name: "2021 RS2",
    distance: 0.0002,
    uniqueness: "Close approach in 2021",
    properties: "Diameter ~10 meters, high velocity",
    details: "A small asteroid that passed close to Earth in 2021."
  },
  {
    name: "(3122) Florence",
    distance: 0.035,
    uniqueness: "Near-miss in 2017, two moons",
    properties: "Diameter ~4.4 km, binary system",
    details: "A large asteroid that passed close to Earth with two moons."
  },
  {
    name: "2021 PJ1",
    distance: 0.00015,
    uniqueness: "Small but fast-moving object",
    properties: "Diameter ~10 meters, fast velocity",
    details: "A small asteroid that made a close approach in 2021."
  },
  {
    name: "(3122) Florence",
    distance: 0.035,
    uniqueness: "Two moons",
    properties: "Diameter ~4.9 km, binary system",
    details: "A large asteroid with two moons, passed near Earth in 2017."
  },
  {
    "name": "(46610) 1998 KY26",
    "distance": 0.004,
    "uniqueness": "Potential target for future missions",
    "properties": "Diameter ~40 meters, rapid rotation",
    "details": "A small asteroid with a very fast rotation, making it a potential target for future exploration."
  },
  {
    "name": "(3353) Wega",
    "distance": 0.0075,
    "uniqueness": "Has a high albedo",
    "properties": "Diameter ~1.5 km, bright surface",
    "details": "A bright asteroid with a high albedo, which reflects much of the sunlight."
  },
  {
    "name": "(162173) Ryugu",
    "distance": 0.0024,
    "uniqueness": "Sample return mission by Hayabusa2",
    "properties": "Diameter ~900 meters, carbon-rich",
    "details": "A carbon-rich asteroid from which samples were returned by Japan's Hayabusa2 mission."
  },
  {
    "name": "(2181) 1984 YA",
    "distance": 0.0083,
    "uniqueness": "Potentially hazardous asteroid",
    "properties": "Diameter ~1.2 km, well-studied orbit",
    "details": "An asteroid with a well-characterized orbit that poses a potential hazard due to its size."
  },
  {
    "name": "(1433) Aureliania",
    "distance": 0.0124,
    "uniqueness": "Has an unusual light curve",
    "properties": "Diameter ~5.5 km, slow rotation",
    "details": "This asteroid has a peculiar light curve, indicating a complex shape."
  },
  {
    "name": "(951) Gaspra",
    "distance": 0.0145,
    "uniqueness": "First asteroid visited by a spacecraft",
    "properties": "Diameter ~19 km, irregular shape",
    "details": "The first asteroid to be visited by a spacecraft, the Galileo orbiter, in 1991."
  },
  {
    "name": "(1862) Apollo",
    "distance": 0.0061,
    "uniqueness": "Prototype for asteroid classification",
    "properties": "Diameter ~2.1 km, strong reflectivity",
    "details": "This asteroid served as the prototype for the Apollo group of near-Earth asteroids."
  },
  {
    "name": "(13254) 1998 SG35",
    "distance": 0.0023,
    "uniqueness": "Potentially dangerous asteroid",
    "properties": "Diameter ~1 km, stable orbit",
    "details": "An asteroid with a stable orbit that could potentially pose a threat to Earth."
  },
  {
    "name": "(20000) 1998 EQ3",
    "distance": 0.0039,
    "uniqueness": "Trojan asteroid of Venus",
    "properties": "Diameter ~2 km, shared orbit",
    "details": "A Trojan asteroid that shares an orbit with Venus, making it unique among near-Earth objects."
  },
  {
    "name": "(1775) 1970-067",
    "distance": 0.0011,
    "uniqueness": "Known for its irregular shape",
    "properties": "Diameter ~1.8 km, notable light variations",
    "details": "An asteroid known for its irregular shape and significant light variation."
  },
  {
    "name": "(1981) Midas",
    "distance": 0.0078,
    "uniqueness": "Highly reflective surface",
    "properties": "Diameter ~2 km, metallic composition",
    "details": "An asteroid with a metallic surface that reflects a significant amount of sunlight."
  },
  {
    "name": "(3299) 1981 KJ",
    "distance": 0.0055,
    "uniqueness": "Binary system candidate",
    "properties": "Diameter ~1.6 km, slow rotation",
    "details": "A candidate for being a binary asteroid, with a slow rotational period."
  },
  {
    "name": "(4000) 1986 TQ",
    "distance": 0.0043,
    "uniqueness": "Near-Earth object with a stable orbit",
    "properties": "Diameter ~1.2 km, elliptical orbit",
    "details": "A near-Earth object with a well-defined, stable elliptical orbit."
  },
  {
    "name": "(4179) Toutatis",
    "distance": 0.0066,
    "uniqueness": "Has an irregular shape and rotation",
    "properties": "Diameter ~4.5 km, complex rotation",
    "details": "A near-Earth asteroid with a unique, irregular shape and a complex rotation."
  },
  {
    "name": "(18610) 1999 TR3",
    "distance": 0.0028,
    "uniqueness": "Potential target for mining",
    "properties": "Diameter ~1.5 km, metal-rich",
    "details": "An asteroid that is rich in metals and could be a potential target for mining in the future."
  },
  {
    "name": "(11736) 1996 AID",
    "distance": 0.0036,
    "uniqueness": "Unusual surface features",
    "properties": "Diameter ~900 meters, non-uniform surface",
    "details": "An asteroid with a non-uniform surface that displays unusual geological features."
  },
  {
    "name": "(2825) 1981 FJ",
    "distance": 0.0051,
    "uniqueness": "High radar reflectivity",
    "properties": "Diameter ~1.7 km, metallic surface",
    "details": "An asteroid known for its high radar reflectivity due to its metallic surface."
  },
  {
    "name": "(11214) 1994 RZ3",
    "distance": 0.0087,
    "uniqueness": "Potential binary asteroid",
    "properties": "Diameter ~1.4 km, irregular shape",
    "details": "A potential binary asteroid with an irregular shape and varying rotation."
  },
  {
    "name": "(1972) 1985 RA",
    "distance": 0.0030,
    "uniqueness": "Close approaches to Earth",
    "properties": "Diameter ~1 km, stable orbit",
    "details": "An asteroid that frequently approaches Earth with a stable orbital path."
  },
  {
    "name": "(2341) 1985 EL",
    "distance": 0.0067,
    "uniqueness": "Possible cometary origin",
    "properties": "Diameter ~1.5 km, irregular shape",
    "details": "An asteroid believed to have a cometary origin due to its irregular shape and surface features."
  }

];

const neoGroup = new THREE.Group();
scene.add(neoGroup);

const asteroidLight = new THREE.PointLight(0xffffff, 2, 0, 0);
asteroidLight.position.set(0, 0, 0);
scene.add(asteroidLight);

function createAsteroidGeometry(radius) {
  const geometry = new THREE.SphereGeometry(radius, 20, 20);
  const positions = geometry.attributes.position;
  const vector = new THREE.Vector3();

  for (let i = 0; i < positions.count; i++) {
    vector.fromBufferAttribute(positions, i);
    vector.normalize().multiplyScalar(radius * (1 + 0.2 * Math.random()));
    positions.setXYZ(i, vector.x, vector.y, vector.z);
  }

  geometry.computeVertexNormals();
  return geometry;
}

function getAsteroidColor() {
  const colors = [0x8B4513, 0xA0522D, 0xD2691E, 0xCD853F, 0xDEB887];
  return colors[Math.floor(Math.random() * colors.length)];
}

function createAsteroidTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 128, 128);

  for (let i = 0; i < 1000; i++) {
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5})`;
    ctx.beginPath();
    ctx.arc(Math.random() * 128, Math.random() * 128, Math.random() * 2, 0, Math.PI * 2);
    ctx.fill();
  }

  return new THREE.CanvasTexture(canvas);
}

function createTextSprite(message, fontSize = 30) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = `Bold ${fontSize}px Arial`;
  
  const metrics = context.measureText(message);
  const textWidth = metrics.width;
  const textHeight = fontSize * 1.4;

  canvas.width = textWidth;
  canvas.height = textHeight;

  context.fillStyle = 'rgba(0, 0, 0, 0)';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = 'rgba(255, 255, 255, 1.0)';
  context.font = `Bold ${fontSize}px Arial`;
  context.fillText(message, 0, fontSize);

  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(0.1, 0.05, 1.0);

  return sprite;
}

const asteroids = [];

function getAsteroidSize(diameter) {
  const earthScale = 2 / 12742;
  const visualScale = 0.05;
  return diameter * earthScale * visualScale;
}

neoData.forEach((neo, index) => {
  let size;
  if (typeof neo.properties === 'string' && neo.properties.includes("Diameter")) {
    const match = neo.properties.match(/Diameter[:\s]~?\s?([\d.]+)/);
    if (match && match[1]) {
      size = getAsteroidSize(parseFloat(match[1]));
    } else {
      size = getAsteroidSize(1);
    }
  } else {
    size = getAsteroidSize(1);
  }

  size = Math.max(size, 0.01);

  const geometry = createAsteroidGeometry(size);
  const material = new THREE.MeshStandardMaterial({
    color: getAsteroidColor(),
    roughness: 0.8,
    metalness: 0.2,
    map: createAsteroidTexture(),
    bumpMap: createAsteroidTexture(),
    bumpScale: 0.002,
  });
  const mesh = new THREE.Mesh(geometry, material);
  
  const orbitRadius = 2.5 + neo.distance * 200;
  const orbitSpeed = 0.0005 / Math.sqrt(orbitRadius);
  const orbitAngle = Math.random() * Math.PI * 2;
  const orbitInclination = Math.random() * Math.PI / 6;
  
  mesh.userData = { orbitRadius, orbitSpeed, orbitAngle, orbitInclination, neoData: neo, size };
  
  const nameSprite = createTextSprite(neo.name);
  nameSprite.position.set(0, size * 1.2, 0);
  mesh.add(nameSprite);

  neoGroup.add(mesh);
  asteroids.push(mesh);
});

let isEarthFocused = true;
let focusedAsteroid = null;
const cameraToggleButton = addCameraToggleButton();
const asteroidButtonContainer = addAsteroidButtons(neoData);

function createInfoPopup() {
  const popup = document.createElement('div');
  popup.style.position = 'absolute';
  popup.style.left = '222px';
  popup.style.top = '20px';
  popup.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  popup.style.color = 'white';
  popup.style.padding = '20px';
  popup.style.borderRadius = '10px';
  popup.style.display = 'none';
  popup.style.maxWidth = '300px';
  document.body.appendChild(popup);
  return popup;
}

const infoPopup = createInfoPopup();

function showInfoPopup(object) {
  let data;
  if (object === earthMesh) {
    data = {
      name: "Earth",
      fact: "Earth is the only known planet with liquid water on its surface.",
      properties: {
        mass: "5.97 × 10^24 kg",
        radius: "6,371 km",
        rotationPeriod: "23.93 hours"
      },
      description: "Earth, our home planet, is the third planet from the Sun and the only astronomical object known to harbor life. About 29.2% of Earth's surface is land, with the remaining 70.8% covered with water. Earth's atmosphere is composed primarily of nitrogen and oxygen."
    };
  } else if (object === moonMesh) {
    data = {
      name: "Moon",
      fact: "The Moon is gradually moving away from Earth at a rate of about 3.8 cm per year.",
      properties: {
        mass: "7.34 × 10^22 kg",
        radius: "1,737.1 km",
        orbitalPeriod: "27.3 days"
      },
      description: "The Moon is Earth's only natural satellite and the fifth largest moon in the Solar System. It is about one-quarter the diameter of Earth and has a surface area slightly smaller than the continent of Asia. The Moon's gravitational influence produces the ocean tides, body tides, and the slight lengthening of the day."
    };
  } else {
    data = object.userData.neoData;
  }

  infoPopup.innerHTML = `
    <h2>${data.name}</h2>
    <p><strong>Fact:</strong> ${data.fact || data.uniqueness}</p>
    <h3>Properties:</h3>
    <p>${data.properties}</p>
    <p>${data.description || data.details}</p>
  `;
  infoPopup.style.display = 'block';
}

function hideInfoPopup() {
  infoPopup.style.display = 'none';
}

cameraToggleButton.addEventListener('click', () => {
  isEarthFocused = !isEarthFocused;
  focusedAsteroid = null;
  if (isEarthFocused) {
    controls.minDistance = 1.5;
    controls.maxDistance = 4;
    controls.enableRotate = true;
    controls.rotateSpeed = 0.3;
    controls.zoomSpeed = 0.5;
    controls.enablePan = false;
    camera.position.set(0, 0, 3);
    controls.target.set(0, 0, 0);
    camera.fov = 75;
    camera.updateProjectionMatrix();
    showInfoPopup(earthMesh);
  } else {
    controls.minDistance = 0;
    controls.maxDistance = Infinity;
    controls.enableRotate = true;
    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 1;
    controls.enablePan = true;
    hideInfoPopup();
  }
  controls.update();
});

function onMouseClick(event) {
  event.preventDefault();
  
  if (event.target !== renderer.domElement) return;

  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects([earthMesh, moonMesh, ...asteroids]);

  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    if (clickedObject === earthMesh || clickedObject === moonMesh) {
      isEarthFocused = true;
      focusedAsteroid = null;
      controls.minDistance = 1.5;
      controls.maxDistance = 4;
      controls.enableRotate = true;
      controls.rotateSpeed = 0.3;
      controls.zoomSpeed = 0.5;
      controls.enablePan = false;
      camera.position.set(0, 0, 3);
      controls.target.set(0, 0, 0);
      camera.fov = 75;
      camera.updateProjectionMatrix();
    } else if (asteroids.includes(clickedObject)) {
      focusOnAsteroid(clickedObject);
    }
    showInfoPopup(clickedObject);
  } else {
    hideInfoPopup();
  }
}

renderer.domElement.addEventListener('click', onMouseClick);

function focusOnAsteroid(asteroid) {
  focusedAsteroid = asteroid;
  isEarthFocused = false;
  
  controls.enabled = false;

  const asteroidSize = asteroid.userData.size;
  const cameraOffset = new THREE.Vector3(0, 0, asteroidSize * 20);
  camera.position.copy(asteroid.position).add(cameraOffset);
  controls.target.copy(asteroid.position);

  const baseFOV = 5;
  const minFOV = 0.1;
  const maxFOV = 10;
  const sizeFactor = Math.max(asteroidSize, 0.001) / 0.01;
  camera.fov = Math.max(minFOV, Math.min(maxFOV, baseFOV / sizeFactor));
  camera.updateProjectionMatrix();

  showInfoPopup(asteroid);

  setTimeout(() => {
    controls.enabled = true;
  }, 1000);
}

asteroidButtonContainer.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const index = parseInt(event.target.dataset.index);
    focusOnAsteroid(asteroids[index]);
  }
});

document.addEventListener('click', (event) => {
  if (event.target !== renderer.domElement && 
      event.target.tagName !== 'BUTTON' && 
      !asteroidButtonContainer.contains(event.target)) {
    hideInfoPopup();
  }
});

let time = 0;
const dayDuration = 60;

function animate() {
  requestAnimationFrame(animate);

  time += 0.016;
  const dayProgress = (time % dayDuration) / dayDuration;

  earthMesh.rotation.y += 0.002;
  lightsMesh.rotation.y += 0.002;
  cloudsMesh.rotation.y += 0.0023;
  glowMesh.rotation.y += 0.002;

  stars.rotation.y -= 0.0002;

  moonGroup.rotation.y += 0.00005;
  moonMesh.rotation.y += 0.0005;

  asteroids.forEach((asteroid) => {
    const { orbitRadius, orbitSpeed, orbitAngle, orbitInclination } = asteroid.userData;
    asteroid.userData.orbitAngle += orbitSpeed;
    
    const x = orbitRadius * Math.cos(asteroid.userData.orbitAngle);
    const z = orbitRadius * Math.sin(asteroid.userData.orbitAngle);
    
    asteroid.position.x = x * Math.cos(orbitInclination);
    asteroid.position.y = x * Math.sin(orbitInclination);
    asteroid.position.z = z;
    
    asteroid.rotation.x += 0.001 * Math.random();
    asteroid.rotation.y += 0.001 * Math.random();
    asteroid.rotation.z += 0.001 * Math.random();
  });

  const sunAngle = dayProgress * Math.PI * 2;
  sunLight.position.x = Math.cos(sunAngle) * 2;
  sunLight.position.y = Math.sin(sunAngle) * 2;

  if (focusedAsteroid) {
    const asteroidSize = focusedAsteroid.userData.size;
    const cameraOffset = new THREE.Vector3(0, 0, asteroidSize * 20);
    camera.position.copy(focusedAsteroid.position).add(cameraOffset);
    controls.target.copy(focusedAsteroid.position);
  } else if (isEarthFocused) {
    controls.target.set(0, 0, 0);
  }

  controls.update();
  renderer.render(scene, camera);
}

animate();

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);

function toggleClouds() {
  cloudsMesh.visible = !cloudsMesh.visible;
}

function toggleNightLights() {
  lightsMesh.visible = !lightsMesh.visible;
}

function toggleNEOs() {
  neoGroup.visible = !neoGroup.visible;
}

window.toggleClouds = toggleClouds;
window.toggleNightLights = toggleNightLights;
window.toggleNEOs = toggleNEOs;

document.addEventListener('keydown', (event) => {
  if (event.key === 'c' || event.key === 'C') {
    toggleClouds();
  } else if (event.key === 'n' || event.key === 'N') {
    toggleNightLights();
  } else if (event.key === 'a' || event.key === 'A') {
    toggleNEOs();
  }
});

addDescription();