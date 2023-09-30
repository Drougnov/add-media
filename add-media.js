var steps = [1, 2, 3, 4, 5];
var currentStep = steps[0];
var totalSteps = steps.length;
var uploadMethod = "both";
var uploadedMediaType = "";

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
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex < totalSteps - 1) {
            currentStep = steps[currentIndex + 1];
            showStep(currentStep);
            toggleBtnVisiblity();
        }
    });
});

// Go to the previous step on back btn click
document.querySelectorAll('.step-back-btn').forEach((backButton) => {
    backButton.addEventListener('click', () => {
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex > 0) {
            currentStep = steps[currentIndex - 1];
            showStep(currentStep);
            toggleBtnVisiblity();
        }
    });
});

// Show the initial step
showStep(currentStep);


// ----------------------------------------------handle show thumbnail-----------------------------------------

function showSteps(stepArray) {
    steps = stepArray;
    currentStep = steps[0];
    showStep(currentStep);
    console.log(steps);
}

const showDefaultStepsButton = document.getElementById('default-steps-btn');
const showThumbnailStepsButton = document.getElementById('thumbnail-steps-btn');

showDefaultStepsButton.addEventListener('click', () => {
    showSteps([1, 2, 3, 4, 5]);
});

showThumbnailStepsButton.addEventListener('click', () => {
    showSteps([2, 3, 5]);
});


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


const payPerViewContainer = document.querySelector('.pay-per-view-container');
const subscriptionContainer = document.querySelector('.subscription-container');

// Toggle containers based on uploadMethod value
function toggleContainers() {

    if (uploadMethod === "pay-per-view") {
        payPerViewContainer.style.display = "block";
        subscriptionContainer.style.display = "none";
    } else if (uploadMethod === "subscription") {
        payPerViewContainer.style.display = "none";
        subscriptionContainer.style.display = "block";
    } else if (uploadMethod === "both") {
        payPerViewContainer.style.display = "none";
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


// -----------------------------------handle subscription/pvp toggle--------------------------------------------

const subscriptionBtn = document.querySelector('.sub-btn');
const pvpBtn = document.querySelector('.pvp-btn');
const stepFourNextBtn = document.querySelector('.step-container-4 .step-next-btn');
const stepFourBackBtn = document.querySelector('.step-container-4 .step-back-btn');

// On step four show/hide the extra buttons (show 2 out of 4 buttons)
function toggleBtnVisiblity(){
    console.log(uploadMethod, currentStep);
    if(uploadMethod == "both" && currentStep == 4 && subscriptionContainer.style.display == "block"){
        subscriptionBtn.style.display = "none";
        stepFourBackBtn.style.display = "block";
        pvpBtn.style.display = "block";
        stepFourNextBtn.style.display = "none";
    }else if(uploadMethod == "both" && currentStep == 4 && payPerViewContainer.style.display == "block"){
        subscriptionBtn.style.display = "block";
        stepFourBackBtn.style.display = "none";
        pvpBtn.style.display = "none";
        stepFourNextBtn.style.display = "block";
    }else{
        subscriptionBtn.style.display = "none";
        stepFourBackBtn.style.display = "block";
        pvpBtn.style.display = "none";
        stepFourNextBtn.style.display = "block";
    }
}

// Show subscription container and hide pvp container
subscriptionBtn.addEventListener('click', ()=>{
    payPerViewContainer.style.display = "none";
    subscriptionContainer.style.display = "block";
    toggleBtnVisiblity();
})

// Hide subscription container and show pvp container
pvpBtn.addEventListener('click', ()=>{
    payPerViewContainer.style.display = "block";
    subscriptionContainer.style.display = "none";
    toggleBtnVisiblity();
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
