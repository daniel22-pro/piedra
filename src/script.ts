let victoriasUsuario = 0;
let victoriasComputadora = 0;

// Mapa con las rutas de las imágenes para cada opción
const imagenes: { [key: string]: string } = {
  piedra: 'img/piedra.png',
  papel: 'img/papel.png',
  tijera: 'img/tijera.png',
  lagarto: 'img/lagarto.png',
  spock: 'img/spock.png'
};

function jugar(opcionUsuario: string): void {
  const opciones = ['piedra', 'papel', 'tijera', 'lagarto', 'spock'];
  const opcionComputadora = opciones[Math.floor(Math.random() * opciones.length)];
  let resultado = '';

  // Actualizar imágenes de las elecciones
  const imgUsuario = document.getElementById('img-usuario') as HTMLImageElement;
  const imgComputadora = document.getElementById('img-computadora') as HTMLImageElement;

  if (imgUsuario && imgComputadora) {
    imgUsuario.src = imagenes[opcionUsuario];
    imgUsuario.alt = opcionUsuario;

    imgComputadora.src = imagenes[opcionComputadora];
    imgComputadora.alt = opcionComputadora;
  }

  if (opcionUsuario === opcionComputadora) {
    resultado = '¡Empate!';
  } else {
    let ganaUsuario = false;

    switch (opcionUsuario) {
      case 'piedra':
        ganaUsuario = opcionComputadora === 'tijera' || opcionComputadora === 'lagarto';
        break;
      case 'papel':
        ganaUsuario = opcionComputadora === 'piedra' || opcionComputadora === 'spock';
        break;
      case 'tijera':
        ganaUsuario = opcionComputadora === 'papel' || opcionComputadora === 'lagarto';
        break;
      case 'lagarto':
        ganaUsuario = opcionComputadora === 'spock' || opcionComputadora === 'papel';
        break;
      case 'spock':
        ganaUsuario = opcionComputadora === 'tijera' || opcionComputadora === 'piedra';
        break;
    }

    if (ganaUsuario) {
      resultado = `¡Ganaste! ${opcionUsuario} vence a ${opcionComputadora}`;
      victoriasUsuario++;
    } else {
      resultado = `¡Perdiste! ${opcionComputadora} vence a ${opcionUsuario}`;
      victoriasComputadora++;
    }
  }

  // Mostrar mensaje de resultado con clases para estilo
  const mensajeResultado = document.getElementById('mensaje-resultado') as HTMLElement;
  if (mensajeResultado) {
    mensajeResultado.innerText = resultado;
    mensajeResultado.classList.remove('gana', 'pierde', 'empate');

    if (resultado.includes('Ganaste')) {
      mensajeResultado.classList.add('gana');
    } else if (resultado.includes('Perdiste')) {
      mensajeResultado.classList.add('pierde');
    } else {
      mensajeResultado.classList.add('empate');
    }
  }

  // Actualizar puntajes en pantalla
  const usuarioSpan = document.getElementById('usuario') as HTMLElement;
  const computadoraSpan = document.getElementById('computadora') as HTMLElement;
  if (usuarioSpan && computadoraSpan) {
    usuarioSpan.innerText = victoriasUsuario.toString();
    computadoraSpan.innerText = victoriasComputadora.toString();
  }

  // Actualizar texto (opcional, si tienes estos spans)
  const eleccionUsuarioSpan = document.getElementById('eleccion-usuario') as HTMLElement;
  const eleccionComputadoraSpan = document.getElementById('eleccion-computadora') as HTMLElement;
  if (eleccionUsuarioSpan && eleccionComputadoraSpan) {
    eleccionUsuarioSpan.innerText = opcionUsuario;
    eleccionComputadoraSpan.innerText = opcionComputadora;
  }
}

// Hacer accesible la función al HTML
(window as any).jugar = jugar;
