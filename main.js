const URL = "https://teachablemachine.withgoogle.com/models/NDLXa3bgJ/";

let model, labelContainer, maxPredictions;

const imageUpload = document.getElementById("image-upload");
const imagePreview = document.getElementById("image-preview");

// Load the model first
async function loadModel() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    
    const status = document.createElement('p');
    status.innerText = '모델을 불러오는 중입니다...';
    document.getElementById('controls').appendChild(status);

    try {
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        status.innerText = '판별할 이미지를 선택해주세요.';
    } catch (e) {
        console.error(e);
        status.innerText = '모델 로딩 중 오류가 발생했습니다.';
    }
    
    // Setup the label container
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
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
}

// Handle file upload
imageUpload.addEventListener("change", async (event) => {
    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            // Wait for the image to be loaded before predicting
            imagePreview.onload = () => predict();
        }
        reader.readAsDataURL(event.target.files[0]);
    }
});

// Run the prediction
async function predict() {
    if (!model) {
        console.error("Model not loaded yet");
        return;
    }
    const prediction = await model.predict(imagePreview);
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

// Initialize the application
loadModel();
