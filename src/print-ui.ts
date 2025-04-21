import { PaperSize, PaperOrientation, PrintSizeCalculator } from './print';
import { getMapInstance } from './map';
import { DEFAULT_DPI } from './constants';

export function initPrintSettingsUI() {
    const panel = document.createElement('div');
    panel.id = 'print-settings';
    panel.className = 'print-settings-panel';

    const paperSizeSelect = createSelect('paper-size-select', PrintSizeCalculator.getAvailablePaperSizes());
    const orientationSelect = createSelect(
        'orientation-select',
        Object.values(PaperOrientation),
        (v) => (v === PaperOrientation.Portrait ? '纵向' : '横向'),
    );
    const dpiSelect = createSelect(
        'dpi-select',
        PrintSizeCalculator.getRecommendedDpiOptions(),
        (dpi) => `${dpi} DPI`,
        DEFAULT_DPI.toString()
    );

    const applyButton = document.createElement('button');
    applyButton.id = 'apply-print-settings';
    applyButton.textContent = '应用打印设置';

    panel.innerHTML = `
        <h3>打印设置</h3>
        <div class="print-setting"><label>纸张尺寸:</label></div>
        <div class="print-setting"><label>方向:</label></div>
        <div class="print-setting"><label>分辨率:</label></div>
    `;
    panel.querySelectorAll('.print-setting')[0].appendChild(paperSizeSelect);
    panel.querySelectorAll('.print-setting')[1].appendChild(orientationSelect);
    panel.querySelectorAll('.print-setting')[2].appendChild(dpiSelect);
    panel.appendChild(applyButton);

    document.getElementById('search-wrapper')?.appendChild(panel);
    applyButton.addEventListener('click', applyPrintSettings);
}

export function applyPrintSettings() {
    const paperSize = (document.getElementById('paper-size-select') as HTMLSelectElement).value as PaperSize;
    const orientation = (document.getElementById('orientation-select') as HTMLSelectElement).value as PaperOrientation;
    const dpi = parseInt((document.getElementById('dpi-select') as HTMLSelectElement).value);

    const pixelSize = PrintSizeCalculator.getPixelSize(paperSize, dpi, orientation);
    const container = document.getElementById('container') as HTMLDivElement;
    const mapContainer = document.getElementById('map') as HTMLDivElement;

    container.style.width = mapContainer.style.width = `${pixelSize.width}px`;
    container.style.height = mapContainer.style.height = `${pixelSize.height}px`;

    // 同时将页面也调整为打印大小
    document.body.style.width = `${pixelSize.width}px`;
    document.body.style.height = `${pixelSize.height}px`;

    const map = getMapInstance();
    map.resize();
    map.triggerRepaint();

    // console.log(`应用打印设置: ${paperSize} ${orientation} ${dpi}DPI`);
}

function createSelect(id: string, options: (string | number)[], labelFn = (v: any) => v, defaultValue?: string): HTMLSelectElement {
    const select = document.createElement('select');
    select.id = id;
    options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.toString();
        option.textContent = labelFn(opt);
        if (defaultValue && opt.toString() === defaultValue) {
            option.selected = true;
        }
        select.appendChild(option);
    });
    return select;
}
