window.onload = function () {
   var map = L.map('map').setView(
      center = [-12.07, -77.0],
      zoom = 12,
      { preferCanvas: true }
   );
   var tiles = L.tileLayer(
      // Alternative providers: https://leaflet-extras.github.io/leaflet-providers/preview/
      // 'https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      'https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}.jpg',
      { attribution: '&copy; Map tiles by Stamen Design, under CC BY 4.0. Data by OpenStreetMap, under ODbL.' }
   )
   var realstateIcon = L.divIcon({
      html: '<i class="fa-solid fa-house"></i>',
      iconSize: [20, 20],
      className: 'icon'
   });
   var realstate = L.marker(
      [-12.07, -77.0],
      {icon: realstateIcon}
   ).bindPopup();
   map.addLayer(tiles);
   map.addLayer(realstate);
};