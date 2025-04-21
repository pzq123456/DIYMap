import { initMap } from './map';
import { initPrintSettingsUI, applyPrintSettings } from './print-ui';
import { initSearchFunctionality } from './search';
import { initStyleSelect } from './style';
import { DEFAULT_STYLE } from './constants';
import { showTooltip } from './tooltip';
import { makeDraggable } from './draggable';

document.addEventListener('DOMContentLoaded', () => {
    initMap(DEFAULT_STYLE);
    makeDraggable();
    initPrintSettingsUI();
    showTooltip(); // 显示提示信息
    initSearchFunctionality();
    initStyleSelect();
    applyPrintSettings();
});