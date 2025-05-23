import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
renderer.xr.setReferenceSpaceType( 'local' );
////////////////////////////
document.body.appendChild( renderer.domElement );
document.body.appendChild( VRButton.createButton( renderer ) );//


const controls = new OrbitControls(camera, renderer.domElement);
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

const textureArma = new THREE.TextureLoader().load('Texturas/ARMA.png');
const textureArmaMira = new THREE.TextureLoader().load('Texturas/mira.png');
const materialArma = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, map: textureArma, transparent: true });
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, map: textureArmaMira, transparent: true });

const path = 'Texturas/cube/';
const format = '.png';
const urls = [
  path + 'px' + format, path + 'nx' + format,
  path + 'py' + format, path + 'ny' + format,
  path + 'pz' + format, path + 'nz' + format
];

const reflectionCube = new THREE.CubeTextureLoader().load(urls);
scene.background = reflectionCube;

const cubeMaterial1 = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  envMap: reflectionCube,
  metalness: 0.1,
  roughness: 0.8
});

const geometry1 = new THREE.BoxGeometry(0.015, 0.015, 0.05);
const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cubeS = new THREE.Mesh(geometry1, material1);
cubeS.position.z = -0.5;
camera.add(cubeS);
scene.add(camera);

const geometryArma = new THREE.PlaneGeometry(1, 0.5);
const Arma = new THREE.Mesh(geometryArma, materialArma);
Arma.position.set(-0.45, -0.5, -0.9);
camera.add(Arma);

window.addEventListener('mousedown', () => {
  Arma.visible = false;
});

window.addEventListener('mouseup', () => {
  Arma.visible = true;
});

const geometry = new THREE.PlaneGeometry(1.25, 1.25);
const plano = new THREE.Mesh(geometry, material);
plano.visible = false;
plano.position.set(-0.05, -0.09, -0.9);
camera.add(plano);

window.addEventListener('mousedown', () => {
  plano.visible = true;
});

window.addEventListener('mouseup', () => {
  plano.visible = false;
});

const textureCarta1 = new THREE.TextureLoader().load('Texturas/Cartas/carta .png');
const textureCarta2 = new THREE.TextureLoader().load('Texturas/Cartas/carta 2.png');
const textureCarta3 = new THREE.TextureLoader().load('Texturas/Cartas/carta 3.png');
const textureCarta4 = new THREE.TextureLoader().load('Texturas/Cartas/carta 4.png');
const textureCarta5 = new THREE.TextureLoader().load('Texturas/Cartas/carta 5.png');
const textureCarta6 = new THREE.TextureLoader().load('Texturas/Cartas/parte tracera.png');

function CreateCartas(pox, poy, poz, rx, ry, rz, miTextura) {
  const geometryCarta = new THREE.PlaneGeometry(3, 4);
  const materialCarta = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    map: miTextura,
    transparent: true,
    opacity: 0.8
  });
  const Carta = new THREE.Mesh(geometryCarta, materialCarta);
  Carta.position.set(pox, poy, poz);
  Carta.rotation.set(rx, ry, rz);
  scene.add(Carta);

  return {
    Mesh: Carta,
  };
}

const Cartas = [
  CreateCartas(-18, 6, -14, 0, -0.25, 0, textureCarta1),
  CreateCartas(-10, 5, 8, 0, 0.2, 0, textureCarta2),
  CreateCartas(-5, 4, -10, 0, 0.15, 0, textureCarta3),
  CreateCartas(-2, 10, 20, 0, -0.1, 0, textureCarta4),
  CreateCartas(0, 7, -5, 0, 0, 0, textureCarta5),
  CreateCartas(2, 6, 3, 0, 0.1, 0, textureCarta6),
  CreateCartas(4, 5, -12, 0, 0.12, 0, textureCarta1),
  CreateCartas(7, 9, 17, 0, -0.2, 0, textureCarta2),
  CreateCartas(10, 5, -6, 0, 0.25, 0, textureCarta3),
  CreateCartas(12, 7, 9, 0, -0.15, 0, textureCarta4),
  CreateCartas(15, 4, 25, 0, -0.3, 0, textureCarta5),
  CreateCartas(-12, 8, 15, 0, 0.18, 0, textureCarta6),
  CreateCartas(-7, 10, -7, 0, -0.12, 0, textureCarta1),
  CreateCartas(0, 12, 0, 0, 0.05, 0, textureCarta2),
  CreateCartas(8, 3, -18, 0, 0.22, 0, textureCarta3)
];


// Virus
const cubos = [];
const textureVirus = new THREE.TextureLoader().load('Texturas/virus.jpg');

function ObjetoCubo(pox, poy, poz) {
  const geometry = new THREE.SphereGeometry(0.5, 16, 16);
  const material = new THREE.MeshStandardMaterial({
    map: textureVirus,
    envMap: reflectionCube,
  });
  this.cube = new THREE.Mesh(geometry, material);
  this.cube.name = "cubo_n1";
  this.cube.position.set(pox, poy, poz);

  let velocidadY = 0;
  const gravedad = -0.00004;

  scene.add(this.cube);

  this.actualizar = function () {
    velocidadY += gravedad;
    this.cube.position.y += velocidadY;
    this.cube.rotation.x += 0.005;
    this.cube.rotation.y += 0.005;

    if (this.cube.position.y < -10) {
      scene.remove(this.cube);
      const index = cubos.indexOf(this);
      if (index !== -1) cubos.splice(index, 1);
    }
  };
}

function crearCubo() {
  const cubo = new ObjetoCubo(Math.random() * 8 - 4, 10, Math.random() * 8 - 4);
  cubos.push(cubo);
}
setInterval(crearCubo, 800);

// Disparo FPS
const raycasterFPS = new THREE.Raycaster();
const tempMatrix = new THREE.Matrix4();
let aciertos = 0;

function disparar() {
  tempMatrix.identity().extractRotation(camera.matrixWorld);
  raycasterFPS.ray.origin.setFromMatrixPosition(camera.matrixWorld);
  raycasterFPS.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

  const objetos = cubos.map(c => c.cube);
  const intersects = raycasterFPS.intersectObjects(objetos);

  if (intersects.length > 0) {
    const obj = intersects[0].object;
    scene.remove(obj);
    const index = cubos.findIndex(c => c.cube === obj);
    if (index !== -1) cubos.splice(index, 1);
    aciertos++;
    document.getElementById('aciertos').innerText = `Aciertos: ${aciertos}`;

  }
}
window.addEventListener('click', disparar);

camera.position.set(0, 3, 3);


// Carga del sonido
const sonidoDisparo = new Audio('Texturas/Efecto-disparo.mp3');

sonidoDisparo.volume = 0.4;
// Al hacer clic en cualquier parte del documento
document.addEventListener('click', () => {
    sonidoDisparo.currentTime = 0; // Reinicia el sonido por si ya estaba sonando
    sonidoDisparo.play();
});


function animate() {

  // Cubos
  for (const c of cubos) {
    c.actualizar();
  }
  console.log(cubeS.position)

  Cartas.forEach(carta => {
    carta.Mesh.rotation.y += 0.005;
  });
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
