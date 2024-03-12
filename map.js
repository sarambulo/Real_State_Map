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
   var realstatePopup = '<ul><li>Asset Category: Single Family Residence</li></ul>';
   var realstate = L.marker(
      [-12.07, -77.0],
      {icon: realstateIcon}
   ).bindPopup(realstatePopup);

   var realstateAssets = L.layerGroup();
   realstateAssets.addLayer(realstate);

   var control = L.control.layers(
      {
         'Terrain': tiles
      },
      {
         'Real State Assets': realstateAssets
      },
      {
         'collapsed': false,
         'hideSingleBase': true,
      }
   );
   map.addLayer(tiles);
   map.addControl(control);

   var clickMarker = L.marker();
   function onMapClick(e) {
      clickMarker.setLatLng(e.latlng).addTo(map);
      clickMarker.bindPopup(
         'Coordinates: ' + e.latlng
      ).openPopup();
   }
   map.on('click', onMapClick)
};