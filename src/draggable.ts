export function makeDraggable(elementId: string = "info"): void {
    const infoDiv = document.getElementById(elementId);

    if (!infoDiv) {
        console.error(`Element with id "${elementId}" not found.`);
        return;
    }

    let isDragging = false;
    let offsetX: number, offsetY: number;

    infoDiv.addEventListener('mousedown', (e) => {
        isDragging = true;

        // 计算鼠标位置与元素左上角的偏移量
        const rect = infoDiv.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        // 防止拖动时选中文本
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        // 计算新位置
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        // 应用新位置
        infoDiv.style.position = 'absolute'; // 确保元素是绝对定位
        infoDiv.style.left = `${x}px`;
        infoDiv.style.top = `${y}px`;
        infoDiv.style.transform = 'none'; // 移除之前的居中transform
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // 确保contenteditable区域不会触发拖动
    const editableElements = infoDiv.querySelectorAll('[contenteditable="true"]');
    editableElements.forEach((el) => {
        el.addEventListener('mousedown', (e) => {
            e.stopPropagation(); // 阻止事件冒泡，避免拖动
        });
    });
}