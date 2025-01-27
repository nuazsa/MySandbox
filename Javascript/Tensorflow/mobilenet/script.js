const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const predict = document.getElementById('predict');
const loadingOverlay = document.getElementById('loading');

let currentFacingMode = "environment"; // Default kamera belakang

// Fungsi untuk memulai video dengan mode kamera yang dipilih
function startVideo(facingMode) {
  navigator.mediaDevices.getUserMedia({
    video: { facingMode: facingMode }
  })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    console.error("Error accessing camera:", err);
  });
}

// Fungsi untuk toggle antara kamera depan dan belakang
function toggleCamera() {
  currentFacingMode = currentFacingMode === "environment" ? "user" : "environment";
  startVideo(currentFacingMode);
}
// Mulai kamera dengan default kamera belakang
startVideo(currentFacingMode);


// Capture and classify image
function capture() {
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  classifyImage();
}

async function classifyImage() {
  const imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);

  // Show loading overlay
  loadingOverlay.classList.add('active');
  predict.innerHTML = '';

  try {
    const model = await mobilenet.load();
    const tensor = tf.browser.fromPixels(imageData);
    const predictions = await model.classify(tensor);

    // Display predictions
    predict.innerHTML = predictions.map((p, i) =>
      `<p>${i + 1}. ${p.className} - ${(p.probability * 100).toFixed(0)}%</p>`
    ).join('');
  } catch (error) {
    predict.innerHTML = `<p>Error: ${error.message}</p>`;
  } finally {
    // Hide loading overlay
    loadingOverlay.classList.remove('active');
  }
}

