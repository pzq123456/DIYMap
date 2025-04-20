export function showTooltip() {
    const panel = document.getElementById('search-wrapper');
    if (!panel) return;

    // 高亮面板
    panel.classList.add('highlighted');

    // 创建 tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = '按 Enter 键可打开或关闭参数面板';

    document.body.appendChild(tooltip);

    // 定位 tooltip 到面板附近
    const rect = panel.getBoundingClientRect();
    tooltip.style.left = `${rect.right + 10}px`;
    tooltip.style.top = `${rect.top}px`;

    // 5 秒后移除 tooltip 和高亮
    setTimeout(() => {
        tooltip.remove();
        panel.classList.remove('highlighted');
    }, 5000);
}
