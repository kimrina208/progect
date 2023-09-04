  const gmailInput = document.querySelector('#gmail_input');
        const gmailButton = document.querySelector('#gmail_button');
        const gmailResult = document.querySelector('#gmail_result');

        const gmailRegExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

        gmailButton.onclick = () => {
            if (gmailRegExp.test(gmailInput.value)) {
                gmailResult.innerHTML = 'YOUR GMAIL IS VALID!';
                gmailResult.style.color = 'green';
            } else {
                gmailResult.innerHTML = 'YOUR GMAIL IS NOT VALID';
                gmailResult.style.color = 'red';
            }
        };

// moving block
 const childBlock = document.querySelector('#child_block');
        let positionX = 0;
        let positionY = 0;
        let direction = 'right';

        const move = () => {
            if (direction === 'right' && positionX < 350) { // Уменьшено на 50px, чтобы уместиться внутри parent_block
                positionX += 2;
            } else if (direction === 'right') {
                direction = 'down';
            }

            if (direction === 'down' && positionY < 350) { // Уменьшено на 50px, чтобы уместиться внутри parent_block
                positionY += 2;
            } else if (direction === 'down') {
                direction = 'left';
            }

            if (direction === 'left' && positionX > 0) {
                positionX -= 2;
            } else if (direction === 'left') {
                direction = 'up';
            }

            if (direction === 'up' && positionY > 0) {
                positionY -= 2;
            } else if (direction === 'up') {
                direction = 'right';
            }

            childBlock.style.left = `${positionX}px`;
            childBlock.style.top = `${positionY}px`;

            requestAnimationFrame(move);
        };

        window.onload = () => {
            setTimeout(() => {
                move();
            }, 1000);
        };
// *timer*//
    let startTime;
    let intervalId;
    let isRunning = false;
    let elapsedTime = 0;

    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const mlSecondsElement = document.getElementById('ml-seconds');
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const resetButton = document.getElementById('reset');

    function updateTimerDisplay() {
      const minutes = Math.floor(elapsedTime / (60 * 1000));
      const seconds = Math.floor((elapsedTime % (60 * 1000)) / 1000);
      const mlSeconds = elapsedTime % 1000;

      minutesElement.textContent = String(minutes).padStart(2, '0');
      secondsElement.textContent = String(seconds).padStart(2, '0');
      mlSecondsElement.textContent = String(mlSeconds).padStart(3, '0');
    }

    function startTimer() {
      if (!isRunning) {
        startTime = new Date().getTime() - elapsedTime;
        intervalId = setInterval(() => {
          elapsedTime = new Date().getTime() - startTime;
          updateTimerDisplay();
        }, 10);
        isRunning = true;
      }
    }

    function stopTimer() {
      if (isRunning) {
        clearInterval(intervalId);
        isRunning = false;
      }
    }

    function resetTimer() {
      stopTimer();
      elapsedTime = 0;
      updateTimerDisplay();
    }

    startButton.addEventListener('click', startTimer);
    stopButton.addEventListener('click', stopTimer);
    resetButton.addEventListener('click', resetTimer);

