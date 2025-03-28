const escala = 500 / 200; // Escala para o plano cartesiano (-100 a 100)

function criarPonto(x, y) {
  const mapa = document.getElementById('mapa');
  const ponto = document.createElement('div');
  ponto.className = 'vehicule';

  // Converte as coordenadas para posições relativas
  const posX = (x + 100) * escala;
  const posY = (100 - y) * escala;

  ponto.style.left = `${posX}px`;
  ponto.style.top = `${posY}px`;
  mapa.appendChild(ponto);
  return ponto;
}

function createRescue(x, y) {
  const mapa = document.getElementById('mapa');
  const ponto = document.createElement('div');
  ponto.className = 'rescue-point';

  // Converte as coordenadas para posições relativas
  const posX = (x + 100) * escala;
  const posY = (100 - y) * escala;

  ponto.style.left = `${posX}px`;
  ponto.style.top = `${posY}px`;
  mapa.appendChild(ponto);
  return ponto;
}

function moverPonto(xInicial, yInicial, xFinal, yFinal) {
  const ponto = criarPonto(xInicial, yInicial); // Cria o ponto na posição inicial

  let xAtual = xInicial;
  let yAtual = yInicial;

  const passo = 1; // Passo do movimento (quanto ele se desloca a cada iteração)
  const intervalo = 20; // Intervalo entre os movimentos, em milissegundos

  const mover = setInterval(() => {
    // Verifica se o ponto chegou ao destino
    if (Math.abs(xAtual - xFinal) < 1 && Math.abs(yAtual - yFinal) < 1) {
      clearInterval(mover); // Para o movimento
      return;
    }

    // Atualiza as coordenadas, movendo gradualmente
    xAtual += (xFinal - xAtual) * 0.1; // Movimento suave no eixo X
    yAtual += (yFinal - yAtual) * 0.1; // Movimento suave no eixo Y

    // Converte as novas coordenadas para posições relativas
    const posX = (xAtual + 100) * escala;
    const posY = (100 - yAtual) * escala;

    ponto.style.left = `${posX}px`;
    ponto.style.top = `${posY}px`;
  }, intervalo);
}

function rescueAction(xInicial, yInicial, xFinal, yFinal) {
  const ponto = createRescue(xInicial, yInicial); // Cria o ponto na posição inicial

  let xAtual = xInicial;
  let yAtual = yInicial;

  const passo = 1; // Passo do movimento (quanto ele se desloca a cada iteração)
  const intervalo = 20; // Intervalo entre os movimentos, em milissegundos

  const mover = setInterval(() => {
    // Verifica se o ponto chegou ao destino
    if (Math.abs(xAtual - xFinal) < 1 && Math.abs(yAtual - yFinal) < 1) {
      clearInterval(mover); // Para o movimento
      return;
    }

    // Atualiza as coordenadas, movendo gradualmente
    xAtual += (xFinal - xAtual) * 0.1; // Movimento suave no eixo X
    yAtual += (yFinal - yAtual) * 0.1; // Movimento suave no eixo Y

    // Converte as novas coordenadas para posições relativas
    const posX = (xAtual + 100) * escala;
    const posY = (100 - yAtual) * escala;

    ponto.style.left = `${posX}px`;
    ponto.style.top = `${posY}px`;
  }, intervalo);
}

/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputName, inputLatitude, inputLongitude) => {
  const formData = new FormData();
  formData.append('name', inputName);
  formData.append('latitude', inputLatitude);
  formData.append('longitude', inputLongitude);

  console.log(formData);

  let url = 'http://127.0.0.1:5000/vehicule';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => console.log(response.json()))
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
--------------------------------------------------------------------------------------
Função para adicionar um novo item com nome, quantidade e valor 
--------------------------------------------------------------------------------------
*/
const newVehicule = () => {
  let inputName = document.getElementById("vehiculeName").value;
  let inputLongitude = document.getElementById("vehiculeLongitude").value;
  let inputLatitude = document.getElementById("vehiculeLatitude").value;

  if (inputName === '') {
    alert("Escreva o nome de um item!");
  } else if (isNaN(inputLongitude) || isNaN(inputLatitude)) {
    alert("Quantidade e valor precisam ser números!");
  } else {
    postItem(inputName, inputLongitude, inputLatitude)
  }
}


const buttons = document.querySelectorAll('#vehiculeLongitude, #vehiculeLatitude');

buttons.forEach(button => {
  button.addEventListener('input', function (event) {
    const value = event.target.value;
    if (value < -100 || value > 100) {
      event.target.value = event.target.value.slice(0, -1);
      event.target.classList.add('is-invalid');// Limpa o campo se o valor estiver fora do intervalo
    } else {
      event.target.classList.add('was-validated');
      event.target.classList.remove('is-invalid');
    }
  });
});


const formulario = document.getElementById('form');

formulario.addEventListener('submit', function (event) {
  event.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)
});

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()