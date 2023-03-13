var mapa = L.map('mapid').setView([36.7201600, -4.4203400], 15);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapa);

// Carga el JSON
fetch('https://raw.githubusercontent.com/FRomero999/ExamenDIW2022/main/rutas_arqueologicas.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(datos => {

      // Se obtienen las coordenadas X e Y.
      var x = datos.properties.x;
      var y = datos.properties.y;
      
      // Se agrega la fila a la tabla con el nombre, horario y dirección.
      var tabla = document.getElementById('tabla');
      var fila = tabla.insertRow(-1);

      var inserta = fila.insertCell(0);
      var info = '<b>' + datos.properties.nombre + '</b><br/><br/>' +
        '' + datos.properties.horario + '<br/><br/>' +
        '<span class="bg-dark text-white">' + datos.properties.direccion + '</span>';
        inserta.innerHTML = info;

      // Se crea el popup con las coordenadas x e y
      var popup = L.marker([x, y]).addTo(mapa);

      // Se genera la etiqueta para el marcador con el nombre y dirección
      var etiqueta = datos.properties.direccion + '<br/><br/>' + '<h6><b>' + datos.properties.nombre + '</h6></b>';

      // Se agrega la etiqueta al popup
      popup.bindPopup(etiqueta);
    });
  });