import maplibregl from 'maplibre-gl';
import { setPageStyle } from './style';

let map: maplibregl.Map;

export function initMap(styleFile: string) {
    map = new maplibregl.Map({
        container: 'map',
        style: styleFile,
        center: [0, 0],
        zoom: 1,
        attributionControl: false,
        minZoom: 0,
        maxZoom: 24,
        bearing: 0,
        pitch: 0,
        fadeDuration: 0,
    });

    map.on('load', () => {
        map.setPixelRatio(window.devicePixelRatio || 1);
        map.triggerRepaint();
    });

    setPageStyle(styleFile);
}

export function getMapInstance() {
    return map;
}

export function setMapStyle(styleFile: string) {
    map.setStyle(styleFile);
    setPageStyle(styleFile);
}
