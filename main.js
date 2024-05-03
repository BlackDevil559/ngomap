document.addEventListener('DOMContentLoaded', function () {
  const map = L.map('map').setView([31.7087, 76.9320], 8);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  const filePath = 'NGO_Himachal.geojson';

  fetch(filePath)
    .then(response => response.json())
    .then(data => {
      const geoJSONLayer = L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
          return L.marker(latlng);
        },
        onEachFeature: function (feature, layer) {
          if (feature.properties && feature.properties.name) {
            const name = feature.properties.name;
            const coordinates = feature.geometry.coordinates;
            const popupContent = `<h3>${name}</h3><p>Coordinates: ${coordinates[1]}, ${coordinates[0]}</p>`;
            layer.bindPopup(popupContent);
          }
        }
      }).addTo(map);
    })
    .catch(error => console.error('Error loading GeoJSON data:', error));
});
