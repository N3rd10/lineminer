document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');

    // Create blocks
    const blocks = [];
    for (let i = 0; i < 20; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.dataset.index = i;
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

    // Player movement
    let playerPosition = 0;
    let lastDirection = null;

    document.addEventListener('keydown', (event) => {
        
        console.log(event.key);

        if (event.key === 'ArrowRight' && playerPosition < 19 && !blocks[playerPosition + 1].classList.contains('void')) {
            playerPosition++;
            lastDirection = 'right';
        } else if (event.key === 'ArrowLeft' && playerPosition > 0 && !blocks[playerPosition - 1].classList.contains('void')) {
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
            if (!blocks[minePosition].classList.contains('void')) {
                blocks[minePosition].classList.remove('block');
                blocks[minePosition].classList.add('void');
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
});
