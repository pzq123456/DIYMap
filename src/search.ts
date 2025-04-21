import { getMapInstance } from './map';

export function initSearchFunctionality() {
    const searchWrapper = document.getElementById('search-box') as HTMLDivElement;
    const searchBox = document.getElementById('input-box') as HTMLInputElement;
    const searchBtn = document.getElementById('search-btn') as HTMLButtonElement;
    const cityEl = document.querySelector('.city') as HTMLElement;
    const locEl = document.querySelector('.Location') as HTMLElement;

    async function searchCity() {
        const cityName = searchBox.value.trim();
        if (!cityName) return alert('请输入城市名称');
    
        const statusBar = document.createElement('div');
        statusBar.className = 'search-status loading';
        searchWrapper.appendChild(statusBar);
    
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityName)}&format=json&polygon_geojson=1&limit=1`);
            const data = await response.json();
            if (data.length === 0) throw new Error('未找到该城市');
    
            const city = data[0];
            const bbox = city.boundingbox.map(parseFloat);
            const centerLat = parseFloat(city.lat);
            const centerLon = parseFloat(city.lon);
    
            const map = getMapInstance();
            map.fitBounds([[bbox[2], bbox[0]], [bbox[3], bbox[1]]], { padding: 20 });
    
            cityEl.textContent = city.display_name;
            locEl.textContent = `Latitude: ${centerLat.toFixed(4)}° N Longitude: ${centerLon.toFixed(4)}° E`;
    
            // 显示成功状态
            statusBar.classList.remove('loading');
            statusBar.classList.add('success');
        } catch (err) {
            console.error(err);
            alert('查询失败，请稍后再试');
    
            // 显示失败状态
            statusBar.classList.remove('loading');
            statusBar.classList.add('failed');
        }
    
        // 自动移除状态条
        setTimeout(() => {
            statusBar.remove();
        }, 2500);
    }
    

    searchBtn.addEventListener('click', searchCity);
    searchBox.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchCity();
    });

    // document.addEventListener('keydown', (e) => {
    //     if (e.key === 'Enter') {
    //         e.preventDefault();
    //         const isHidden = searchWrapper.style.display === 'none';
    //         searchWrapper.style.display = isHidden ? 'block' : 'none';
    //         isHidden ? searchBox.focus() : searchBox.blur();
    //     }
    // });
}
