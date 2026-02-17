const URL = "https://teachablemachine.withgoogle.com/models/NDLXa3bgJ/";

let model, webcam, labelContainer, maxPredictions;

const startButton = document.getElementById("start-button");
startButton.addEventListener("click", init);

async function init() {
    // Hide the start button and show loading text
    startButton.style.display = 'none';
    const loadingText = document.createElement('p');
    loadingText.innerText = '모델을 불러오는 중입니다...';
    document.getElementById('controls').appendChild(loadingText);

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    try {
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(480, 480, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        // append elements to the DOM
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            const resultBar = document.createElement("div");
            resultBar.classList.add("result-bar");
            resultBar.innerHTML = `
                <div class="result-label"></div>
                <div class="progress-bar-container">
                    <div class="progress-bar"></div>
                </div>
            `;
            labelContainer.appendChild(resultBar);
        }
        
        // Remove loading text
        loadingText.style.display = 'none';

    } catch (e) {
        console.error(e);
        loadingText.innerText = '오류가 발생했습니다. 카메라 권한을 확인해주세요.';
    }
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        
        const resultBar = labelContainer.childNodes[i];
        const label = resultBar.querySelector('.result-label');
        const progressBar = resultBar.querySelector('.progress-bar');
        
        label.innerHTML = prediction[i].className;
        
        const percentage = (prediction[i].probability * 100).toFixed(0);
        progressBar.style.width = percentage + '%';
        progressBar.innerText = percentage + '%';
    }
}
