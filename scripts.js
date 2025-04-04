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

/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getVehiculeList = async () => {
  let url = 'http://127.0.0.1:5000/vehicule';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      setUpTable(data.vehicules, 'table-vehicule');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getRescuePointList = async () => {
  let url = 'http://127.0.0.1:5000/rescue-point';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      setUpTable(data.rescue_points, 'table-rescue-point');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function setUpTable(lista, elementId) {
  
  const table = document.getElementById(elementId); 
  const tbody = table.querySelector('tbody'); 
 
  if (tbody) {
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }
  
  let element = "#"+elementId;

  $(element).find("tbody").html(
    lista.map(x => `
   <tr>
    <td>${x.name}</td>
    <td>${x.latitude}</td>                    
    <td>${x.longitude}</td>
    <td>
    <a  class='btn btn-outline-info btn-sm btnEditar'   
    data-toggle="tooltip" title="Editar"
    data-id='${x.id}'>
    <i class="fa fa-edit"></i>
    </a>
    <button type="button"
    class='btn btn-outline-danger btn-sm btnExcluir'
    data-id='${x.id}'
    data-toggle="tooltip" title="Excluir">
    <i class="fa fa-times"></i>
    </button>

   </td>
   </tr>`).join(""));

  $(document).ready( function () {
    $(element).DataTable();
  } );

};

/*
  --------------------------------------------------------------------------------------
  Function to change the menu
  --------------------------------------------------------------------------------------
*/
const changeMenu = (menuId) => {

  const elementos = document.querySelectorAll('.menu'); // Seleciona os elementos que serão manipulados
  const classe = 'd-none'; // Nome da classe a ser adicionada ou removida

  // Remove a classe de todos os elementos antes de adicionar a nova
  elementos.forEach(elemento => elemento.classList.add(classe));

  // Switch case para diferentes opções
  switch (menuId) {
    case 1: // Vehicule Form
      elementos.forEach((elemento, index) => {
        if (index === 0) {
          elemento.classList.remove(classe);
        }
      });
      break;
    case 2: // Vehicule List
      elementos.forEach((elemento, index) => {
        if (index === 1) {
          elemento.classList.remove(classe);
        }
      });
      getVehiculeList();
      break;
    case 3: // Rescue Form
      elementos.forEach((elemento, index) => {
        if (index === 2) {
          elemento.classList.remove(classe);
        }
      });
      break;
    case 4: // Rescue List
      elementos.forEach((elemento, index) => {
        if (index === 3) {
          elemento.classList.remove(classe);
        }
      });
      getRescuePointList();
      break;
    default:
      console.log('Opção inválida!');
  }
};



