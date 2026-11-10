const componentInfo = {
  cpu: {
    category: 'Cálculo · Procesador',
    title: 'Procesador (CPU)',
    description: 'Ejecuta instrucciones y cálculos, y coordina gran parte del trabajo del ordenador. Se instala en el zócalo central de la placa base.',
    fact: 'El procesador debe ser compatible con el zócalo y el chipset de la placa.'
  },
  ram: {
    category: 'Memoria · RAM',
    title: 'Memoria RAM',
    description: 'Guarda temporalmente los datos y programas que el ordenador está usando para que el procesador acceda a ellos con rapidez.',
    fact: 'Los módulos se colocan en ranuras largas; algunas placas recomiendan instalarlos por parejas.'
  },

  chipset: {
    category: 'Comunicación · Chipset',
    title: 'Chipset',
    description: 'Gestiona parte de la comunicación entre el procesador y los dispositivos conectados a la placa, como unidades, puertos y tarjetas de expansión.',
    fact: 'Sus funciones y compatibilidades dependen del modelo y la generación de la placa.'
  },
  pcie: {
    category: 'Expansión · Tarjeta gráfica',
    title: 'Ranura PCIe x16 para tarjeta gráfica',
    description: 'La ranura PCI Express más larga sirve para instalar la tarjeta gráfica, que procesa y genera la imagen que ves en pantalla.',
    fact: 'La placa también tiene ranuras PCIe más cortas para tarjetas de expansión como red, sonido o captura.'
  },
  io: {
    category: 'Conexiones externas · Panel I/O',
    title: 'Puertos traseros',
    description: 'El panel trasero reúne conexiones para periféricos y dispositivos externos. En este modelo se aprecian puertos USB y conexiones de vídeo; la configuración exacta cambia entre placas.',
    fact: 'Comprueba las especificaciones de la placa para conocer el tipo y la velocidad de cada puerto.'
  },
  audio: {
    category: 'Sonido · Conectores de audio',
    title: 'Puertos de audio',
    description: 'Los conectores de audio permiten enchufar auriculares, altavoces y micrófonos. El color y la función de cada toma pueden variar según la configuración de sonido.',
    fact: 'Algunas placas combinan varias tomas analógicas con audio digital o funciones de sonido envolvente.'
  },
  battery: {
    category: 'Alimentación auxiliar · CMOS',
    title: 'Pila CMOS',
    description: 'Mantiene el reloj interno y ayuda a conservar algunos ajustes del firmware cuando el equipo está apagado y desconectado de la corriente.',
    fact: 'Si se agota, pueden perderse la fecha y la hora o restablecerse ciertos ajustes al apagar el ordenador.'
  },
  ssd: {
    category: 'Almacenamiento · M.2',
    title: 'SSD M.2',
    description: 'Esta unidad guarda el sistema operativo, los programas y los archivos. Se instala directamente en una ranura M.2 de la placa base.',
    fact: 'La ranura y la unidad deben ser compatibles; M.2 puede usar protocolos SATA o NVMe.'
  },
  bios: {
    category: 'Firmware · BIOS / UEFI',
    title: 'Chip BIOS / UEFI',
    description: 'Guarda el firmware que inicia y comprueba el hardware cuando se enciende el ordenador, antes de arrancar el sistema operativo.',
    fact: 'Una actualización debe corresponder al modelo exacto de placa y seguir las instrucciones del fabricante.'
  },
  sata: {
    category: 'Almacenamiento · SATA',
    title: 'Conectores SATA',
    description: 'Sirven para conectar unidades de almacenamiento SATA, como discos duros y algunos SSD, mediante un cable de datos.',
    fact: 'Cada unidad SATA también necesita alimentación desde la fuente de alimentación.'
  },
  power24: {
    category: 'Alimentación · ATX',
    title: 'Conector principal de 24 pines',
    description: 'Este conector recibe de la fuente de alimentación la energía principal para la placa base.',
    fact: 'Debe conectarse el cable ATX de 24 pines de la fuente; no hay que confundirlo con el conector de alimentación de la CPU.'
  },
  socket: {
    category: 'Instalación · Socket',
    title: 'Socket del procesador',
    description: 'Es el zócalo donde se instala y fija el procesador. Sus contactos eléctricos conectan la CPU con la placa base.',
    fact: 'El procesador debe coincidir con el tipo de socket; sus contactos son delicados y no deben tocarse.'
  },
  eps8: {
    category: 'Alimentación · EPS de 8 pines',
    title: 'Conector de alimentación de CPU',
    description: 'Este conector lleva alimentación de 12 V desde la fuente al circuito que suministra energía al procesador.',
    fact: 'Normalmente se conecta aquí el cable EPS 4+4 de la fuente; no es el cable ATX principal de 24 pines.'
  },
  fan: {
    category: 'Refrigeración · CPU_FAN',
    title: 'Conector del ventilador',
    description: 'Permite conectar el ventilador del disipador del procesador. La placa puede regular su velocidad según la temperatura.',
    fact: 'Conecta aquí el ventilador del disipador para que la placa pueda detectar y controlar sus revoluciones.'
  }
};

const app = document.querySelector('#app');
const infoPanel = document.querySelector('#info-panel');
const board = document.querySelector('#board');
const sceneLabelTitle = document.querySelector('.scene-label-title');
const markers = [...document.querySelectorAll('[data-component]')];
const title = document.querySelector('#component-title');
const previousButton = document.querySelector('#previous-button');
const nextButton = document.querySelector('#next-button');
let activeIndex = -1;

function showComponent(index) {
  if (!markers.length) return;
  activeIndex = (index + markers.length) % markers.length;
  const marker = markers[activeIndex];
  const info = componentInfo[marker.dataset.component];
  if (!info) return;

  markers.forEach((item) => item.classList.toggle('is-selected', item === marker));
  document.querySelector('#component-category').textContent = info.category;
  title.textContent = info.title;
  document.querySelector('#component-description').textContent = info.description;
  document.querySelector('#component-fact').textContent = info.fact;
  document.querySelector('#component-count').textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(markers.length).padStart(2, '0')}`;

  app.classList.add('is-split');
  infoPanel.setAttribute('aria-hidden', 'false');

  const target = marker.dataset.position.trim().split(/\s+/).map((value) => `${value}m`).join(' ');
  board.cameraTarget = target;
  board.cameraOrbit = `0deg 88deg ${marker.dataset.zoom || '3.2m'}`;
  board.fieldOfView = '40deg';
}

function returnToOverview() {
  app.classList.remove('is-split');
  infoPanel.setAttribute('aria-hidden', 'true');
  markers.forEach((marker) => marker.classList.remove('is-selected'));
  activeIndex = -1;
  board.cameraTarget = '0m 0m -7.8m';
  board.cameraOrbit = '0deg 88deg 130%';
  board.fieldOfView = '34deg';
}

markers.forEach((marker, index) => {
  marker.addEventListener('click', () => showComponent(index));
});

document.querySelector('#back-button').addEventListener('click', returnToOverview);
previousButton.addEventListener('click', () => showComponent(activeIndex - 1));
nextButton.addEventListener('click', () => showComponent(activeIndex + 1));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && app.classList.contains('is-split')) returnToOverview();
  if (app.classList.contains('is-split') && event.key === 'ArrowLeft') showComponent(activeIndex - 1);
  if (app.classList.contains('is-split') && event.key === 'ArrowRight') showComponent(activeIndex + 1);
});

board.addEventListener('error', () => {
  sceneLabelTitle.textContent = 'NO SE PUDO CARGAR';
});
