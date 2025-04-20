import { initMap } from './map';
import { initPrintSettingsUI, applyPrintSettings } from './print-ui';
import { initSearchFunctionality } from './search';
import { initStyleSelect } from './style';
import { DEFAULT_STYLE } from './constants';
import { showTooltip } from './tooltip';

document.addEventListener('DOMContentLoaded', () => {
    initMap(DEFAULT_STYLE);
    initPrintSettingsUI();
    showTooltip(); // 显示提示信息
    initSearchFunctionality();
    initStyleSelect();
    applyPrintSettings();
});