let currentStep = 1;
let totalSteps = 5;
let uploadMethod = "both";
let uploadedMediaType = "image";

// ------------------------------------handle steps toggle--------------------------------------------------

// Show the current step and update the progress bar
function showStep(step) {
    // Initially hide all step containers
    document.querySelectorAll('.step-container').forEach((container) => {
        container.style.display = 'none';
    });

    // Show the current step container
    document.querySelector(`.step-container-${step}`).style.display = 'flex';

    // Update the progress bar width
    const progressBar = document.querySelector('.progress-bar');
    const progressWidth = ((step - 1) / (totalSteps - 1)) * 100;
    progressBar.style.width = `${progressWidth}%`;
}

// Go to the next step on next btn click
document.querySelectorAll('.step-next-btn').forEach((nextButton) => {
    nextButton.addEventListener('click', () => {
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
        }
    });
});

// Go to the previous step on back btn click
document.querySelectorAll('.step-back-btn').forEach((backButton) => {
    backButton.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    });
});

// Show the initial step
showStep(currentStep);


// ------------------------------------handle upload method--------------------------------------------------

// Function to update the uploadMethod variable
function updateUploadMethod(event) {
    uploadMethod = event.target.value;
    toggleContainers();
}

const uploadMethodInputs = document.querySelectorAll('.upload-method-input');
// update upload method on radio click
uploadMethodInputs.forEach((radio) => {
    radio.addEventListener('click', updateUploadMethod);
});

// Toggle containers based on uploadMethod value
function toggleContainers() {
    const payPerViewContainer = document.querySelector('.pay-per-view-container');
    const subscriptionContainer = document.querySelector('.subscription-container');

    if (uploadMethod === "pay-per-view") {
        payPerViewContainer.style.display = "block";
        subscriptionContainer.style.display = "none";
    } else if (uploadMethod === "subscription") {
        payPerViewContainer.style.display = "none";
        subscriptionContainer.style.display = "block";
    } else if (uploadMethod === "both") {
        payPerViewContainer.style.display = "block";
        subscriptionContainer.style.display = "block";
    }
}

// Show the initial containers
toggleContainers();


// ------------------------------------handle media type--------------------------------------------------

const mediaTypeSelect = document.getElementById('media-type');

// Show upload container based on selected media type option
mediaTypeSelect.addEventListener('change', function () {
    // Get the selected option's value
    const selectedOption = mediaTypeSelect.value;

    // Update the uploaded media type
    uploadedMediaType = selectedOption;

    // Hide all upload containers
    const uploadContainers = document.querySelectorAll('.upload-container');
    uploadContainers.forEach((container) => {
        container.style.display = 'none';
    });

    // Show the selected upload container based on the option value
    const selectedUploadContainer = document.querySelector(`.upload-container-${selectedOption}`);
    if (selectedUploadContainer) {
        selectedUploadContainer.style.display = 'block';
    }
});

// Initially, hide all upload containers except the selected container by default (image)
const uploadContainers = document.querySelectorAll('.upload-container');
uploadContainers.forEach((container) => {
    if (container.classList.contains(`upload-container-${uploadedMediaType}`)) {
        container.style.display = 'block';
    } else {
        container.style.display = 'none';
    }
});
