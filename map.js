// Load Data
import investors from "./data/investors.json" assert {type: 'json'};
import realstate_assets from "./data/realstate_assets.json" assert {type: 'json'};

function add_layer(data, icon_class) {
   // Layer
   let layer = L.layerGroup();
   // Icon
   let icon = L.divIcon({
      html: `<i class=${icon_class}></i>`,
      iconSize: [20, 20],
      className: 'icon'
   });
   // Markers
   function add_marker(element) {
      var popup = '<ul><li>Asset Category: Single Family Residence</li></ul>';
      L.marker(
         [element["Latitude"], element["Longitude"]],
         { icon: icon }
      ).addTo(layer).bindPopup(popup);
   };
   data.forEach(add_marker);
   return layer;
}

window.onload = function () {
   // Map
   let map = L.map('map').setView(
      [-12.07, -77.0],
      12,
      { preferCanvas: true }
   );

   // Base Tiles
   var tiles = L.tileLayer(
      // Alternative providers: https://leaflet-extras.github.io/leaflet-providers/preview/
      // 'https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      'https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}.jpg',
      { attribution: '&copy; Map tiles by Stamen Design, under CC BY 4.0. Data by OpenStreetMap, under ODbL.' }
   );

   // Real State Layers
   let realstateLayer = L.layerGroup();
   // Real State Icon
   let realstateIcon = L.divIcon({
      html: '<i class="fa-solid fa-house"></i>',
      iconSize: [20, 20],
      className: 'icon'
   });
   // Real State Markers
   function add_realstate_marker(realstate_asset) {
      var realstatePopup = '<ul><li>Asset Category: Single Family Residence</li></ul>';
      L.marker(
         [realstate_asset["Latitude"], realstate_asset["Longitude"]],
         { icon: realstateIcon }
      ).addTo(realstateLayer).bindPopup(realstatePopup);
   };
   realstate_assets.forEach(add_realstate_marker);

   // Investor Layers
   let investorLayer = L.layerGroup();
   // Investor Icon
   let investorIcon = L.divIcon({
      html: '<i class="fa-solid fa-user"></i>',
      iconSize: [20, 20],
      className: 'icon'
   });
   // Investor Markers
   function add_investor_marker(investor) {
      var investorPopup = '<ul><li>Asset Category: Single Family Residence</li></ul>';
      var investor_marker = L.marker(
         [investor["Latitude"], investor["Longitude"]],
         { icon: investorIcon }
      ).addTo(investorLayer).bindPopup(investorPopup);
   };
   investors.forEach(add_investor_marker);

   // Control Layer
   var control = L.control.layers(
      {
         'Terrain': tiles
      },
      {
         'Real State Assets': realstateLayer,
         'Investors': investorLayer
      },
      {
         'collapsed': false,
         'hideSingleBase': true,
      }
   );
   
   // Click Event
   var clickMarker = L.marker();
   function onMapClick(e) {
      clickMarker.setLatLng(e.latlng).addTo(map);
      clickMarker.bindPopup(
         'Coordinates: ' + e.latlng
      ).openPopup();
   };
   map.on('click', onMapClick);

   map.addLayer(tiles);
   map.addLayer(realstateLayer);
   map.addLayer(investorLayer);
   map.addControl(control);
   console.log(map)
};