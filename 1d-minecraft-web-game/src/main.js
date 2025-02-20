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

    // Player movement
    let playerPosition = 0;
    let lastDirection = null;

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight' && playerPosition < 19 && !blocks[playerPosition + 1].classList.contains('void')) {
            playerPosition++;
            lastDirection = 'right';
        } else if (event.key === 'ArrowLeft' && playerPosition > 0 && !blocks[playerPosition - 1].classList.contains('void')) {
            playerPosition--;
            lastDirection = 'left';
        } else if (event.key === 'Space') {
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
    });
});