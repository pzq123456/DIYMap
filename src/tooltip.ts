export function showTooltip() {
    const panel = document.getElementById('search-wrapper');
    if (!panel) return;

    // 高亮面板
    panel.classList.add('highlighted');

    // 创建 tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = '面板中调节制图参数';

    // 创建进度条背景层
    const progressBar = document.createElement('div');
    progressBar.className = 'tooltip-progress';
    tooltip.appendChild(progressBar);

    document.body.appendChild(tooltip);

    // 定位 tooltip 到面板附近
    const rect = panel.getBoundingClientRect();
    tooltip.style.left = `${rect.right + 10}px`;
    tooltip.style.top = `${rect.top}px`;

    // 设置动画时间
    let startTime = Date.now();
    const duration = 5000;

    // 使用 requestAnimationFrame 更新进度条
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        progressBar.style.width = `${progress * 100}%`;

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    animate();

    // 5 秒后移除 tooltip 和高亮
    setTimeout(() => {
        tooltip.remove();
        panel.classList.remove('highlighted');
    }, duration);
}
