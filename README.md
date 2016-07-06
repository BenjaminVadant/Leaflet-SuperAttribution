## Leaflet-SuperAttribution

Easily add non intrusive attribution control : replace the maybe long copyright text by a little button with a popup

###How to use it 

1 - Import src/super-attribution.js to your project
2 - Then use the following code : 
```javascript
var map = L.map('map',{ attributionControl : false, superAttributionControl : true });
map.attributionControl.addAttribution('<a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors')
```

