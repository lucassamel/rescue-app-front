/**
 * The scale factor used for resizing or transforming dimensions.
 * It is calculated as the ratio of a target size to an original size.
 * 
 * @constant {number}
 */
const scale = 500 / 200;

/**
 * Creates a vehicle element on the map at the specified coordinates.
 *
 * @param {number} x - The x-coordinate of the vehicle's position.
 * @param {number} y - The y-coordinate of the vehicle's position.
 * @returns {HTMLDivElement} The created vehicle element.
 */
function createVehicule(x, y) {
  const map = document.getElementById('map');
  const point = document.createElement('div');
  point.className = 'vehicule';

  const posX = (x + 100) * scale;
  const posY = (100 - y) * scale;

  point.style.left = `${posX}px`;
  point.style.top = `${posY}px`;
  map.appendChild(point);
  return point;
}

/**
 * Creates and appends a visual marker (clear-point) to the map at the specified coordinates.
 *
 * @param {number} x - The x-coordinate of the point to clear, relative to the map.
 * @param {number} y - The y-coordinate of the point to clear, relative to the map.
 * @returns {HTMLDivElement} The created DOM element representing the clear-point.
 */
function clearPoint(x, y) {
  const map = document.getElementById('map');
  const point = document.createElement('div');
  point.className = 'clear-point';

  const posX = (x + 100) * scale;
  const posY = (100 - y) * scale;

  point.style.left = `${posX}px`;
  point.style.top = `${posY}px`;
  map.appendChild(point);
  return point;
}

/**
 * Creates a rescue point on the map at the specified coordinates.
 *
 * @param {number} x - The x-coordinate of the rescue point in the coordinate system.
 * @param {number} y - The y-coordinate of the rescue point in the coordinate system.
 * @returns {HTMLDivElement} The created rescue point element.
 */
function createRescue(x, y, id) {
  const map = document.getElementById('map');
  const point = document.createElement('div');
  point.className = 'rescue-point';
  point.dataset.id = `${id}`; 

  // Convert the coordinates to relative positions
  const posX = (x + 100) * scale;
  const posY = (100 - y) * scale;

  point.style.left = `${posX}px`;
  point.style.top = `${posY}px`;
  map.appendChild(point);
  return point;
}


/**
 * Animates the movement of a vehicle from an initial position to a final position
 * on a 2D plane with smooth transitions.
 *
 * @param {number} xInitial - The initial x-coordinate of the vehicle.
 * @param {number} yInitial - The initial y-coordinate of the vehicle.
 * @param {number} xFinal - The final x-coordinate of the vehicle.
 * @param {number} yFinal - The final y-coordinate of the vehicle.
 */
function moveVehicule(xInitial, yInitial, xFinal, yFinal) {
  const ponto = createVehicule(xInitial, yInitial); // Cria o ponto na posição inicial

  let xCurrent = xInitial;
  let yCurrent = yInitial;

  const interval = 20; // Intervalo entre os movimentos, em milissegundos

  const move = setInterval(() => {
    // Verifica se o ponto chegou ao destino
    if (Math.abs(xCurrent - xFinal) < 1 && Math.abs(yCurrent - yFinal) < 1) {
      clearInterval(move); // Para o movimento
      return;
    }

    // Atualiza as coordenadas, movendo gradualmente
    xCurrent += (xFinal - xCurrent) * 0.1; // Movimento suave no eixo X
    yCurrent += (yFinal - yCurrent) * 0.1; // Movimento suave no eixo Y

    // Converte as novas coordenadas para posições relativas
    const posX = (xCurrent + 100) * scale;
    const posY = (100 - yCurrent) * scale;

    ponto.style.left = `${posX}px`;
    ponto.style.top = `${posY}px`;
  }, interval);
}

/**
 * Animates a rescue action by moving a point from an initial position to a final position.
 *
 * @param {number} xInitial - The initial x-coordinate of the point.
 * @param {number} yInitial - The initial y-coordinate of the point.
 * @param {number} xFinal - The final x-coordinate of the point.
 * @param {number} yFinal - The final y-coordinate of the point.
 */
function rescueAction(xInitial, yInitial, xFinal, yFinal) {
  const ponto = createRescue(xInitial, yInitial); // Cria o ponto na posição inicial

  let xCurrent = xInitial;
  let yCurrent = yInitial;

  const interval = 20;

  const move = setInterval(() => {
    if (Math.abs(xCurrent - xFinal) < 1 && Math.abs(yCurrent - yFinal) < 1) {
      clearInterval(move);
      return;
    }

    xCurrent += (xFinal - xCurrent) * 0.1;
    yCurrent += (yFinal - yCurrent) * 0.1;

    const posX = (xCurrent + 100) * scale;
    const posY = (100 - yCurrent) * scale;

    ponto.style.left = `${posX}px`;
    ponto.style.top = `${posY}px`;
  }, interval);
}


const postVehicule = async (inputName, inputLatitude, inputLongitude) => {
  const formData = new FormData();
  formData.append('name', inputName);
  formData.append('latitude', inputLatitude);
  formData.append('longitude', inputLongitude);

  let url = 'http://127.0.0.1:5000/vehicule';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => console.log(response.json()))
    .then(() => {
      clearForm('form-vehicule');
      alert('Vehicule submitted');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/**
 * Clears the input and textarea fields of a specified form.
 *
 * @param {string} formularioId - The ID of the form to clear.
 *
 * The function iterates through all elements of the form and resets the value
 * of input fields of type "text", "number", and "tel", as well as textareas.
 */
function clearForm(formularioId) {
  const formulario = document.getElementById(formularioId);

  for (let elemento of formulario.elements) {
    if (elemento.tagName === "INPUT" || elemento.tagName === "TEXTAREA") {
      switch (elemento.type) {
        case "text":
        case "number":
        case "tel":
          elemento.value = "";
          break;
      }
    }
  }
};

/**
 * Creates a new vehicle by collecting input values for name, longitude, and latitude,
 * validating them, and then sending the data to the `postVehicule` function.
 * 
 * @function
 * @throws Will alert the user if the vehicle name is empty.
 * @throws Will alert the user if the longitude or latitude are not valid numbers.
 */
const newVehicule = () => {
  let inputName = document.getElementById("vehiculeName").value;
  let inputLongitude = document.getElementById("vehiculeLongitude").value;
  let inputLatitude = document.getElementById("vehiculeLatitude").value;

  if (inputName === '') {
    alert("Write the name of the vehicule!");
  } else if (isNaN(inputLongitude) || isNaN(inputLatitude)) {
    alert("Latitude and Longitude needs to be numbers!");
  } else {
    postVehicule(inputName, inputLongitude, inputLatitude)
  }
}

/*
--------------------------------------------------------------------------------------
This function is used to validate the input fields for vehicule name, latitude and longitude
--------------------------------------------------------------------------------------
*/
const buttons = document.querySelectorAll('#vehiculeLongitude, #vehiculeLatitude');

buttons.forEach(button => {
  button.addEventListener('input', function (event) {
    const value = event.target.value;
    if (value < -100 || value > 100) {
      event.target.value = event.target.value.slice(0, -1);
      event.target.classList.add('is-invalid');
    } else {
      event.target.classList.add('was-validated');
      event.target.classList.remove('is-invalid');
    }
  });
});

const listForms = ['form-vehicule', 'form-rescue-point'];
listForms.forEach(id => {
  const form = document.getElementById(id);
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
    });
  }
});

// Disabling form submissions if there are invalid fields
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

/**
 * Fetches the list of vehicles from the server and populates a table with the data.
 * 
 * This function sends a GET request to the specified URL to retrieve vehicle data.
 * On success, it processes the response and calls the `setUpTable` function to display
 * the data in a table. If an error occurs during the fetch operation, it logs the error
 * to the console.
 * 
 * @async
 * @function getVehiculeList
 * @returns {Promise<void>} A promise that resolves when the vehicle data is fetched and processed.
 */
const initialLoad = () => {

  const loadRescuePoints = async () => {

    let url = 'http://127.0.0.1:5000/rescue-point';
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        data.rescue_points.forEach((point) => {
          createRescue(point.longitude, point.latitude,point.id);
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  loadRescuePoints();

};

window.addEventListener("load", function () {
  initialLoad();
});