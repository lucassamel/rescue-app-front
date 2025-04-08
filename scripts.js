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
  point.id = `${id}`;

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
  const ponto = createVehicule(xInitial, yInitial); 

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

const getVehiculeList = async () => {
  let url = 'http://127.0.0.1:5000/vehicule';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      setUpTable(data.vehicules, 'table-vehicule', true);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

const getRescuePointList = async () => {
  let url = 'http://127.0.0.1:5000/rescue-point';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      setUpTable(data.rescue_points, 'table-rescue-point', false);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/**
 * Performs a rescue operation by sending a GET request to the specified endpoint
 * with the provided rescue ID. Once the rescue data is retrieved, it moves the vehicle
 * to the rescue point, updates the vehicle list, and removes the rescue point from the DOM
 * after a short delay.
 *
 * @param {number} id - The unique identifier of the rescue operation.
 */
const perfomRescue = (id) => {
  let url = `http://127.0.0.1:5000/perform-rescue?id=${id}`;
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      moveVehicule(0, 0, data.rescue_point.longitude, data.rescue_point.latitude);
      getVehiculeList();
      setInterval(() => {
        // clearPoint(data.rescue_point.longitude, data.rescue_point.latitude);

        const elements = $(`#${data.rescue_point.id}.rescue-point`);
        // rescueAction(0, 0, data.rescue_point.longitude, data.rescue_point.latitude);

        elements.remove(); // Remove the rescue point from the DOM
      }, 1000); // 2 seconds delay before clearing the point      
    })
    .catch((error) => {
      console.error('Error:', error);
    });

};

/**
 * Deletes a rescue point by its ID and updates the UI accordingly.
 *
 * Sends a DELETE request to the server to remove the specified rescue point.
 * Upon successful deletion, it clears all rescue point elements from the map,
 * reloads the rescue point list, performs the initial load, and displays a success alert.
 * Logs an error to the console if the request fails.
 *
 * @param {number|string} id - The ID of the rescue point to be deleted.
 */
const deleteRescue = (id) => {
  let url = `http://127.0.0.1:5000/rescue-point?id=${id}`;
  fetch(url, {
    method: 'delete',
  })
    .then((response) => response.json())
    .then((data) => {      
      const container = document.getElementById('map');
      
      const elementos = container.querySelectorAll('.rescue-point');

      elementos.forEach(elemento => {
        elemento.remove();
      });
      getRescuePointList();
      initialLoad();
      alert('Rescue Point deleted!');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

const createRandonRescuePoints = async () => {
  const formData = new FormData();
  formData.append('number', 50);  

  let url = 'http://127.0.0.1:5000/generate-rescue-point';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => console.log(response.json()))
    .then(() => {
      const container = document.getElementById('map');
      
      const elementos = container.querySelectorAll('.rescue-point');

      elementos.forEach(elemento => {
        elemento.remove();
      });
      getRescuePointList();
      initialLoad();
      alert('50 Randon Rescue Points created!');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
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
 * Populates an HTML table with data and initializes it as a DataTable.
 *
 * @param {Array<Object>} lista - An array of objects containing the data to populate the table.
 * @param {string} elementId - The ID of the table element to populate.
 *
 * Each object in the `lista` array should have the following properties:
 * - {string} name - The name to display in the first column.
 * - {number} latitude - The latitude to display in the second column.
 * - {number} longitude - The longitude to display in the third column.
 * - {number} id - The unique identifier used for the "Edit" button.
 *
 * The function clears any existing rows in the table body, appends new rows based on the `lista` data,
 * and initializes the table as a DataTable using the jQuery DataTables plugin.
 */
function setUpTable(lista, elementId, doRescue) {

  const table = document.getElementById(elementId);
  const tbody = table.querySelector('tbody');

  if (tbody) {
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }

  let element = "#" + elementId;

  $(element).find("tbody").html(
    lista.map(x => `
   <tr>
    <td>${x.name}</td>
    <td>${x.latitude}</td>                    
    <td>${x.longitude}</td>
    <td>
    <a  class='btn btn-outline-success btn-sm ${doRescue ? '' : 'd-none'}'   
    data-toggle="tooltip" title="Perform Rescue"
    onclick="perfomRescue(${x.id})">
    <i class="fa fa-play"></i>
    </a> 
    <a  class='btn btn-outline-danger btn-sm ${doRescue ? 'd-none' : ''}'   
    data-toggle="tooltip" title="Delete Rescue Point"
    onclick="deleteRescue(${x.id})">
    <i class="fa fa-times"></i>
    </a>      

   </td>
   </tr>`).join(""));

  $(document).ready(function () {
    $(element).DataTable();
  });

};

/**
 * Changes the visibility of menu sections based on the provided menu ID.
 * It hides all menu sections by adding a specific CSS class and then
 * displays the section corresponding to the given menu ID.
 *
 * @param {number} menuId - The ID of the menu to display:
 *   - 1: Displays the "Vehicule Form" section.
 *   - 2: Displays the "Vehicule List" section and fetches the vehicule list.
 *   - 3: Displays the "Rescue Form" section.
 *   - 4: Displays the "Rescue List" section and fetches the rescue point list.
 *
 * @throws {Error} Logs an error message if an invalid menu ID is provided.
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

/**
 * Initializes the application by loading rescue points from the server
 * and creating rescue markers on the map.
 *
 * @function
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
          createRescue(point.longitude, point.latitude, point.id);
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