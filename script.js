//your code here
// Keep track of which element is being dragged
let draggedItem = null;

// Add IDs to all image divs
document.querySelectorAll('.image').forEach((div, index) => {
    div.id = `div${index + 1}`;
});

// Add event listeners to all draggable elements
document.querySelectorAll('.image').forEach(item => {
    // When drag starts
    item.addEventListener('dragstart', function(e) {
        draggedItem = this;
        this.classList.add('selected');
        
        // Required for Firefox
        e.dataTransfer.setData('text/plain', '');
    });

    // When drag ends
    item.addEventListener('dragend', function() {
        this.classList.remove('selected');
        draggedItem = null;
    });

    // When dragging over an element
    item.addEventListener('dragover', function(e) {
        e.preventDefault(); // Allow drop
    });

    // When entering a draggable area
    item.addEventListener('dragenter', function(e) {
        e.preventDefault();
        if (this !== draggedItem) {
            this.classList.add('selected');
        }
    });

    // When leaving a draggable area
    item.addEventListener('dragleave', function() {
        if (this !== draggedItem) {
            this.classList.remove('selected');
        }
    });

    // When dropping the element
    item.addEventListener('drop', function(e) {
        e.preventDefault();
        if (this !== draggedItem) {
            // Swap background images
            const draggedBackground = window.getComputedStyle(draggedItem).backgroundImage;
            const droppedBackground = window.getComputedStyle(this).backgroundImage;
            
            draggedItem.style.backgroundImage = droppedBackground;
            this.style.backgroundImage = draggedBackground;
            
            // Remove selection styling
            this.classList.remove('selected');
        }
    });
});