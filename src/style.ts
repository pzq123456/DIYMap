export function extractColorsFromJSON(jsonFile: string): Promise<{ backgroundColor: string; borderColor: string }> {
    return fetch(jsonFile)
        .then(res => res.json())
        .then(data => {
            const backgroundColor = data.layers[0]?.paint?.['background-color'] ?? '#ffffff';
            const borderColor = data.layers.find((l: any) => l.id === 'road_major')?.paint?.['line-color'] ?? '#000000';
            return { backgroundColor, borderColor };
        });
}

export function setPageStyle(styleFile: string) {
    extractColorsFromJSON(styleFile).then(colors => {
        document.body.style.backgroundColor = colors.backgroundColor;
        const infoDiv = document.getElementById('info') as HTMLDivElement;
        infoDiv.style.color = colors.borderColor;
    });
}

export function initStyleSelect() {
    const styleSelect = document.getElementById('style-select') as HTMLSelectElement;
    styleSelect.addEventListener('change', (e) => {
        const selectedFile = (e.target as HTMLSelectElement).value;
        import('./map').then(({ setMapStyle }) => {
            setMapStyle(selectedFile);
        });
    });
}
