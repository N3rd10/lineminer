document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');

    // Define block types
    const blockTypes = {
        dirt: { name: 'Dirt', class: 'block-dirt' },
        void: { name: 'Void', class: 'block-void' },
        // Future block types can be added here
    };

    // Create blocks
    const blocks = [];
    for (let i = 0; i < 20; i++) {
        const block = document.createElement('div');
        block.classList.add('block', blockTypes.dirt.class);
        block.dataset.index = i;
        block.dataset.type = 'dirt';
        gameContainer.appendChild(block);
        blocks.push(block);
    }

    // Create player
    const player = document.createElement('div');
    player.classList.add('player');
    gameContainer.appendChild(player);

    // Create cursor
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    gameContainer.appendChild(cursor);

    // Inventory elements
    const inventory = [];
    const inventoryDisplay = document.getElementById('inventory-items');
    let selectedBlockType = null;

    // Function to update inventory display
    function updateInventoryDisplay() {
        inventoryDisplay.innerHTML = '';
        const itemCounts = inventory.reduce((counts, item) => {
            counts[item] = (counts[item] || 0) + 1;
            return counts;
        }, {});

        for (const [item, count] of Object.entries(itemCounts)) {
            const inventoryItem = document.createElement('div');
            inventoryItem.classList.add('inventory-item');
            inventoryItem.textContent = `${blockTypes[item].name}: ${count}`;
            inventoryItem.dataset.type = item;
            if (item === selectedBlockType) {
                inventoryItem.classList.add('selected');
            }
            inventoryItem.addEventListener('click', () => {
                selectedBlockType = item;
                updateInventoryDisplay(); // Refresh to highlight the selected item
                console.log(`Selected block type: ${blockTypes[item].name}`);
            });
            inventoryDisplay.appendChild(inventoryItem);
        }
    }

    // Player movement
    let playerPosition = 0;
    let lastDirection = null;

    document.addEventListener('keydown', (event) => {
        console.log(event.key);

        if (event.key === 'ArrowRight' && playerPosition < 19 && blocks[playerPosition + 1].dataset.type !== 'void') {
            playerPosition++;
            lastDirection = 'right';
        } else if (event.key === 'ArrowLeft' && playerPosition > 0 && blocks[playerPosition - 1].dataset.type !== 'void') {
            playerPosition--;
            lastDirection = 'left';
        } else if (event.key === ' ') {
            // Mine block in the last direction moved
            let minePosition = playerPosition;
            if (lastDirection === 'right' && playerPosition < 19) {
                minePosition++;
            } else if (lastDirection === 'left' && playerPosition > 0) {
                minePosition--;
            }
            if (blocks[minePosition].dataset.type !== 'void') {
                console.log(`Mining block at position: ${minePosition}`);
                const blockType = blocks[minePosition].dataset.type;
                blocks[minePosition].classList.replace(blockTypes[blockType].class, blockTypes.void.class);
                blocks[minePosition].dataset.type = 'void'; // Update block type to void
                inventory.push(blockType); // Add mined block to inventory
                updateInventoryDisplay();
            }
        } else if (event.key === 'Shift' && selectedBlockType) {
            // Place selected block type at the cursor position
            let placePosition = playerPosition;
            if (lastDirection === 'right' && playerPosition < 19) {
                placePosition++;
            } else if (lastDirection === 'left' && playerPosition > 0) {
                placePosition--;
            }
            if (blocks[placePosition].dataset.type === 'void') {
                console.log(`Placing block at position: ${placePosition}`);
                blocks[placePosition].classList.replace(blockTypes.void.class, blockTypes[selectedBlockType].class);
                blocks[placePosition].dataset.type = selectedBlockType; // Update block type to selected block type

                // Remove one instance of the selected block type from the inventory
                const index = inventory.indexOf(selectedBlockType);
                if (index > -1) {
                    inventory.splice(index, 1);
                }
                updateInventoryDisplay(); // Refresh the inventory display
            }
        }
        player.style.left = `${playerPosition * 24}px`;

        // Update cursor position
        let cursorPosition = playerPosition;
        if (lastDirection === 'right' && playerPosition < 19) {
            cursorPosition++;
        } else if (lastDirection === 'left' && playerPosition > 0) {
            cursorPosition--;
        }
        cursor.style.left = `${cursorPosition * 24}px`;
    });

    // Example function to add items to the inventory
    function addItemToInventory(item) {
        inventory.push(item);
        updateInventoryDisplay();
    }

    // Initial inventory update
    updateInventoryDisplay();
});