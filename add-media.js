let currentStep = 1;
let totalSteps = 5;
let uploadMethod = "both";
let uploadedMediaType = "";

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
            console.log(uploadMethod)
        }
    });
});

// Go to the previous step on back btn click
document.querySelectorAll('.step-back-btn').forEach((backButton) => {
    backButton.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
            console.log(uploadMethod)
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

const mediaTypeRadioButtons = document.querySelectorAll('.media-type-input');
const uploadContainers = document.querySelectorAll('.upload-container');

// Show/hide upload containers based on the selected media type
function toggleUploadContainers(selectedOption) {
    // Hide all upload containers
    uploadContainers.forEach((container) => {
        container.style.display = 'none';
    });

    // Show the selected upload container based on the option value
    const selectedUploadContainer = document.querySelector(`.upload-container-${selectedOption}`);
    if (selectedUploadContainer) {
        selectedUploadContainer.style.display = 'block';
    }
}

toggleUploadContainers();

const mediaTypeContainer = document.getElementById('media-type-container');
const mediaTypeResetBtn = document.querySelector('.media-type-reset-btn');

// handle radio button click
mediaTypeRadioButtons.forEach((radioButton) => {
    radioButton.addEventListener('change', function () {
        const selectedOption = this.value;

        // Update the uploaded media type
        uploadedMediaType = selectedOption;

        // Show/hide upload containers
        toggleUploadContainers(selectedOption);

        // Add classes to radio container and selected radio option
        mediaTypeContainer.classList.add('option-selected');
        radioButton.parentElement.classList.add('selected');

        // Show reset button
        mediaTypeResetBtn.style.display = "block";
    });
});

// Initially, hide all upload containers except the selected container by default (image)
mediaTypeRadioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
        uploadedMediaType = radioButton.value;
        toggleUploadContainers(uploadedMediaType);
    }
});


// handle reset button click
mediaTypeResetBtn.addEventListener('click', ()=>{
    // remove class from radio container
    mediaTypeContainer.classList.remove('option-selected');

    mediaTypeRadioButtons.forEach((radioButton) => {
        // uncheck all the radio input
        radioButton.checked = false;
        //hide all the upload containers
        uploadContainers.forEach((container) => {
            container.style.display = 'none';
        });

        // remove class from selected option
        if(radioButton.parentElement.classList.contains('selected')){
            radioButton.parentElement.classList.remove('selected');
        }
    })

    //hide reset button
    mediaTypeResetBtn.style.display = "none";
})


// ------------------------------------------handle-loader----------------------------------------------------

var loaderNumberEl = document.getElementById('loader-number');
var loader = 0;
var totalDuration = 2; // Total duration in seconds
var intervalId = null;

loaderNumberEl.textContent = loader;


function startloader() {
    intervalId = setInterval(function() {
        loader = ++loader > 100 ? 0 : loader; // count up to 100 the stop

        loaderNumberEl.textContent = loader;

        if (loader === 100) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }, (totalDuration * 1000) / 100); // Adjust the interval based on the total duration
}

uploadButtons = document.querySelectorAll('.upload-button');
uploadButtons.forEach(uploadBtn => {
    uploadBtn.addEventListener('click', ()=>{
        const loader = document.getElementById('loader');
        loader.classList.add('gsCWf');
        startloader();
    });
})