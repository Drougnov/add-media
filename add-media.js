// Default step container's number
var steps = [1, 2, 3, 4, 5];

// SEt the first step as current step
var currentStep = steps[0];

// Get the total number of steps
var totalSteps = steps.length;

// Set "both" as default value for uploadMethod (show both subscription and ppv details)
var uploadMethod = "both";

// Set default media type (none selected as default)
var uploadedMediaType = "";

// ------------------------------------handle steps toggle--------------------------------------------------

// This function shows the current step and update the progress bar
function showCurrentStep(currentStep, totalSteps) {
    // Initially hide all step containers
    document.querySelectorAll('.step-container').forEach((container) => {
        container.style.display = 'none';
    });

    // Show the current step container
    document.querySelector(`.step-container-${currentStep}`).style.display = 'flex';

    // get the progress bar
    const progressBar = document.querySelector('.progress-bar');

    // set the progress bar width based on currentStep and totalSteps value
    // For ex: if currentStep is '3' & total steps are 5,
    // the progress bar width will be
    // ((3-1) / (5 - 1)) * 100 = 50%
    const progressWidth = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progressBar.style.width = `${progressWidth}%`;
}

// Go to the next step on next btn click
document.querySelectorAll('.step-next-btn').forEach((nextButton) => {
    nextButton.addEventListener('click', () => {
        // Get the index of the current step
        const currentIndex = steps.indexOf(currentStep);
        // If not on the last step, move to the next step
        if (currentIndex < totalSteps - 1) {
            currentStep = steps[currentIndex + 1];

            // Display the step and step-4 buttons
            showCurrentStep(currentStep, totalSteps);
            toggleBtnVisiblity();
        }
    });
});

// Go to the previous step on back btn click
document.querySelectorAll('.step-back-btn').forEach((backButton) => {
    backButton.addEventListener('click', () => {
        // Get the index of the current step
        const currentIndex = steps.indexOf(currentStep);
        // If not on the first step, move to the previous step
        if (currentIndex > 0) {
            currentStep = steps[currentIndex - 1];

            // Display the step and step-4 buttons
            showCurrentStep(currentStep, totalSteps);
            toggleBtnVisiblity();
        }
    });
});

// Show the initial step
showCurrentStep(currentStep, totalSteps);


// ----------------------------------------------handle show thumbnail-----------------------------------------

// Function to update and display a set of steps based on the provided stepArray
function showStepsContainers(stepArray) {
    // Update the global steps array with the provided stepArray
    steps = stepArray;
    // Reset the current step to the first step in the updated steps array
    currentStep = steps[0];
    // Display the current step from the updated steps array
    showCurrentStep(currentStep, totalSteps);
}

// Get the popup opener buttons
const showDefaultStepsButton = document.getElementById('default-steps-btn');
const showThumbnailStepsButton = document.getElementById('thumbnail-steps-btn');

showDefaultStepsButton.addEventListener('click', () => {
    // Open the popup with default(all) step containers
    showStepsContainers([1, 2, 3, 4, 5]);
});

showThumbnailStepsButton.addEventListener('click', () => {
    // Open the popup with specific step containers
    showStepsContainers([2, 3, 5]);
});


// ------------------------------------handle upload method--------------------------------------------------

// Function to update the uploadMethod
function updateUploadMethod(event) {
    // Update the global uploadMethod variable with the selected radio button's value
    uploadMethod = event.target.value;
    toggleContainers();
}

const uploadMethodInputs = document.querySelectorAll('.upload-method-input');
// handle upload method radio click
uploadMethodInputs.forEach((radio) => {
    radio.addEventListener('click', updateUploadMethod);
});


const payPerViewContainer = document.querySelector('.pay-per-view-container');
const subscriptionContainer = document.querySelector('.subscription-container');

// Show/hide containers based on uploadMethod value
function toggleContainers() {

    if (uploadMethod === "pay-per-view") {
        subscriptionContainer.style.display = "none";
        payPerViewContainer.style.display = "block";
    } else if (uploadMethod === "subscription") {
        subscriptionContainer.style.display = "block";
        payPerViewContainer.style.display = "none";
    } else if (uploadMethod === "both") {
        subscriptionContainer.style.display = "block";
        payPerViewContainer.style.display = "none";
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

// On step four show/hide the extra buttons
function toggleBtnVisiblity(){
    // If upload method is selected both and user on the step 4 subscription container
    if(uploadMethod == "both" && currentStep == 4 && subscriptionContainer.style.display == "block"){
        // show go-step-back button and show-pvp-form-button and hide others
        subscriptionBtn.style.display = "none";
        stepFourBackBtn.style.display = "block";
        pvpBtn.style.display = "block";
        stepFourNextBtn.style.display = "none";

        // If upload method is selected both and user on the step 4 pvp container
    }else if(uploadMethod == "both" && currentStep == 4 && payPerViewContainer.style.display == "block"){
        // show go-step-next button and show-subscription-tier-button and hide others
        subscriptionBtn.style.display = "block";
        stepFourBackBtn.style.display = "none";
        pvpBtn.style.display = "none";
        stepFourNextBtn.style.display = "block";
    }else{
        // show default buttons (step back and step next)
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

var loaderNumberElement = document.getElementById('loader-number');

// Initialize the loader number starting from 0
var loaderNumber = 0;

// Initialize the loader number starting from 0
var intervalId = null;

// Initialize the loader number starting from 0
loaderNumberElement.textContent = loaderNumber;

const loaderIcon = document.getElementById('loader');

function showLoader(){
    loaderIcon.classList.add('gsCWf');
}

function hideLoader(){
    loaderIcon.classList.remove('gsCWf');
}

// Function to start loader counting up to 100 with a specified duration
function startloaderCountDown(duration) {
    // Display the loader number element
    loaderNumberElement.style.display = "block";

    // Set up an interval to update the loader number
    intervalId = setInterval(function() {
        // Increment the loader number and reset to 0 if it reaches 100
        loaderNumber = ++loaderNumber > 100 ? 0 : loaderNumber;

        // Update the displayed loader number
        loaderNumberElement.textContent = loaderNumber;

        // If the loader number reaches 100, stop the interval
        if (loaderNumber === 100) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }, duration / 100); // convert duration from seconds to milliseconds
}

function hideAndResetLoader(){
    hideLoader();
    loaderNumberElement.style.display = "none";
    loaderNumber = 0;
}


// ------------------------------------------handle-upload----------------------------------------------------

const uploadForm = document.querySelector('.upload-form');
const recievedFormContainer = document.querySelector('.recieved-form-container');
const filePlaceholderElement = document.querySelector('.file-placeholder');

// Function to display the received file and perform necessary actions
function showRecievedFile(){
    // Hide and reset the loader
    hideAndResetLoader();
    // Display the recieved file container
    recievedFormContainer.style.display = "block";
}

// Function to simulate getting a file from a database (demo)
function getFile(){
    // Set a duration for simulating the process of getting a file (3 seconds)
    let gettingFileDuration = 3000;

    // Start the loader countdown
    startloaderCountDown(gettingFileDuration);

    // Simulate getting files from a database with an interval
    let getFilesFromDataBase = setInterval(()=>{
        // Display a placeholder image (simulating receiving a file)
        filePlaceholderElement.innerHTML = `<img src="https://plus.unsplash.com/premium_photo-1690350731538-57344931ac02?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEyOHxTNE1LTEFzQkI3NHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60" >`

        // Hide the upload form and show the received file
        uploadForm.parentElement.style.display = 'none';
        showRecievedFile();

        // Clear the interval after receiving the file
        clearInterval(getFilesFromDataBase);
    }, gettingFileDuration);
}

// On uploading media (submitting form)
uploadForm.addEventListener('submit', (e)=>{
    // stop page reloading on submit
    e.preventDefault();

    // Add a class to indicate that a file has been uploaded
    uploadForm.parentElement.classList.add('file-uploaded');

    // Show spinner loader
    showLoader();

    // Simulate the process of getting a file
    getFile();
})
