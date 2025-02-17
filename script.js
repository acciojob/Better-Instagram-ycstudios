let dragSrcEl = null;
let draggableElements = document.querySelectorAll('.image');

// Add IDs to all image divs and background images
draggableElements.forEach((div, index) => {
    div.id = `div${index + 1}`;
    div.style.backgroundImage = `url(https://picsum.photos/id/${237 + index}/200/300)`;
});

function handleDragStart(e) {
    this.classList.add('selected');
    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    this.classList.add('selected');
}

function handleDragLeave(e) {
    this.classList.remove('selected');
}

function handleDrop(e) {
    e.stopPropagation();
    e.preventDefault();

    if (dragSrcEl !== this) {
        // Swap background images
        const tempBackground = this.style.backgroundImage;
        this.style.backgroundImage = dragSrcEl.style.backgroundImage;
        dragSrcEl.style.backgroundImage = tempBackground;

        // Swap inner content if any
        const tempContent = this.innerHTML;
        this.innerHTML = dragSrcEl.innerHTML;
        dragSrcEl.innerHTML = tempContent;
    }

    return false;
}

function handleDragEnd(e) {
    draggableElements.forEach(function(item) {
        item.classList.remove('selected');
    });
}

draggableElements.forEach(function(item) {
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragenter', handleDragEnter);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('dragleave', handleDragLeave);
    item.addEventListener('drop', handleDrop);
    item.addEventListener('dragend', handleDragEnd);
});