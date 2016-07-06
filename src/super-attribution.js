(function(){
/*
 * L.Control.SuperAttribution is used for displaying attribution on the map (added by default).
 */

L.Control.SuperAttribution = L.Control.extend({
  options: {
    position: 'bottomright'
  },

  initialize: function (options) {
    L.setOptions(this, options);

    this._attributions = {};
  },

  onAdd: function (map) {
    this._container = L.DomUtil.create('div', 'leaflet-control-attribution');
    L.DomEvent.disableClickPropagation(this._container);

    this._container.onclick = function(event) {
      if(document.getElementById('superAttributionContent').style.display === 'none') {
        document.getElementById('superAttributionContent').style.display = '';
      } else {
        document.getElementById('superAttributionContent').style.display = 'none';
      }
    }
    for (var i in map._layers) {
      if (map._layers[i].getAttribution) {
        this.addAttribution(map._layers[i].getAttribution());
      }
    }
    
    map
        .on('layeradd', this._onLayerAdd, this)
        .on('layerremove', this._onLayerRemove, this);

    this._update();

    return this._container;
  },

  onRemove: function (map) {
    map
        .off('layeradd', this._onLayerAdd)
        .off('layerremove', this._onLayerRemove);

  },

  addAttribution: function (text) {
    if (!text) { return; }

    if (!this._attributions[text]) {
      this._attributions[text] = 0;
    }
    this._attributions[text]++;

    this._update();

    return this;
  },

  removeAttribution: function (text) {
    if (!text) { return; }

    if (this._attributions[text]) {
      this._attributions[text]--;
      this._update();
    }

    return this;
  },

  _update: function () {
    if (!this._map) { return; }

    var attribs = [];

    for (var i in this._attributions) {
      if (this._attributions[i]) {
        attribs.push(i);
      }
    }

    this._container.innerHTML = "&copy; <div style='display:none' id='superAttributionContent'>"+ attribs.join('<br>') +"</div>";
  },

  _onLayerAdd: function (e) {
    if (e.layer.getAttribution) {
      this.addAttribution(e.layer.getAttribution());
    }
  },

  _onLayerRemove: function (e) {
    if (e.layer.getAttribution) {
      this.removeAttribution(e.layer.getAttribution());
    }
  }
});

L.Map.mergeOptions({
  superAttributionControl: false
});

L.Map.addInitHook(function () {
  if (this.options.superAttributionControl) {
    this.attributionControl = (new L.Control.SuperAttribution()).addTo(this);
  }
});

L.control.superAttribution = function (options) {
  return new L.Control.SuperAttribution(options);
};
})();
