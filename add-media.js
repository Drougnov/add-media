// Define constants and variables
const popup = document.getElementById("add-media-popup");

// Default step container's number
let steps = [1, 2, 3, 4, 5, 6];

// Set the first step as current step
let currentStep = steps[0];

// Get the total number of steps
var totalSteps = steps.length;

// Set "both" as default value for uploadMethod (show both subscription and ppv details)
let uploadMethod = "both";

// Set default media type (none selected as default)
let uploadedMediaType = "";

// ------------------------------------handle steps toggle--------------------------------------------------

// Function to hide all step containers
function hideAllStepContainers() {
    // Select all elements with the class "step-container" and hide them
    document.querySelectorAll(".step-container").forEach((container) => {
        container.style.display = "none";
    });
}

// Function to update and display the current step and progress bar
function updateStepAndProgressBar(currentStep) {
    // Hide all step containers
    hideAllStepContainers();

    // Display the current step container
    document.querySelector(`.step-container-${currentStep}`).style.display =
        "flex";
    const progressBar = document.querySelector(".progress-bar");

    // Find the index of the current step in the steps array
    const currentIndex = steps.indexOf(currentStep);

    // Calculate the width of the progress bar
    const progressWidth = (currentIndex / (steps.length - 1)) * 100;

    // Set the width of the progress bar
    progressBar.style.width = `${progressWidth}%`;
}

// Function to navigate to the next step
function goToNextStep() {
    // Find the index of the current step in the steps array
    const currentIndex = steps.indexOf(currentStep);

    // Check if it's not the last step
    if (currentIndex < totalSteps - 1) {
        // Move to the next step
        currentStep = steps[currentIndex + 1];

        // Display the step and step-4 buttons
        updateStepAndProgressBar(currentStep, totalSteps);
        toggleBtnVisiblity();
    }
}

// Function to navigate to the previous step
function goToPreviousStep() {
    // Find the index of the current step in the steps array
    const currentIndex = steps.indexOf(currentStep);

    // Check if it's not the first step
    if (currentIndex > 0) {
        // Move to the previous step
        currentStep = steps[currentIndex - 1];

        // Display the step and step-4 buttons
        updateStepAndProgressBar(currentStep, totalSteps);
        toggleBtnVisiblity();
    }
}

// Call functions on click of next and back buttons
document.querySelectorAll(".step-next-btn").forEach((nextButton) => {
    nextButton.addEventListener("click", goToNextStep);
});

document.querySelectorAll(".step-back-btn").forEach((backButton) => {
    backButton.addEventListener("click", goToPreviousStep);
});

// Show the initial step
updateStepAndProgressBar(currentStep, totalSteps);

// Function to show specific step containers
function showStepsContainers(stepArray) {
    steps = stepArray; // Update the steps array with the provided stepArray
    currentStep = steps[0]; // Set the current step to the first step in the updated steps array
    updateStepAndProgressBar(currentStep, totalSteps); // Display the current step and progress bar
}

// Event listeners for popup opener buttons
const showDefaultStepsButton = document.getElementById("default-steps-btn");
const showThumbnailStepsButton = document.getElementById("thumbnail-steps-btn");
const editSettingsButton = document.getElementById("edit-settings-btn");

showDefaultStepsButton.addEventListener("click", () => {
    // Reset uploaded media type by default
    toggleUploadContainers("");

    // Open the popup with default(all) step containers
    showStepsContainers([1, 2, 3, 4, 5, 6]);

    // Reset the back buttons visiblity
    document.querySelectorAll(".step-back-btn").forEach((backBtn) => {
        backBtn.style.display = "block";
    });
});

showThumbnailStepsButton.addEventListener("click", () => {
    // add class to the popup (for styling)
    popup.classList.add("showing-thumbnail");

    // Show thumbnail upload form by default
    toggleUploadContainers("image");

    // Open the popup with specific step containers
    showStepsContainers([3, 5]);

    // Get first step's back button
    const currentStepContainer = document.querySelector(
        `.step-container-${currentStep}`
    );
    const currentStepBackButton =
        currentStepContainer.querySelector(".step-back-btn");
    // Hide the button if exist
    if (currentStepBackButton) {
        currentStepBackButton.style.display = "none";
    }
});

editSettingsButton.addEventListener("click", () => {
    // Reset uploaded media type by default
    toggleUploadContainers("");

    // Open the popup with specific step containers
    showStepsContainers([1, 3, 4, 5, 6]);
});

// ------------------------------------handle upload method--------------------------------------------------

// Function to update the uploadMethod
function updateUploadMethod(event) {
    // Update the global uploadMethod variable with the selected radio button's value
    uploadMethod = event.target.value;
    toggleContainers();
}

const uploadMethodInputs = document.querySelectorAll(".upload-method-input");
// handle upload method radio click
uploadMethodInputs.forEach((radio) => {
    radio.addEventListener("click", updateUploadMethod);
});

const payPerViewContainer = document.querySelector(".pay-per-view-container");
const subscriptionContainer = document.querySelector(".subscription-container");

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

const mediaTypeRadioButtons = document.querySelectorAll(".media-type-input");
const uploadNewMediaContainer = document.querySelector(
    ".upload-new-media-container"
);
const uploadContainers = document.querySelectorAll(".upload-container");

// Show/hide upload containers based on the selected media type
function toggleUploadContainers(selectedOption) {
    console.log(selectedOption);
    // Hide all upload containers
    uploadContainers.forEach((container) => {
        container.style.display = "none";
    });

    // Show the selected upload container based on the option value
    const selectedUploadContainer = document.querySelector(
        `.upload-container-${selectedOption}`
    );
    if (selectedUploadContainer) {
        selectedUploadContainer.style.display = "block";
    }

    if (selectedOption) {
        // Add class if any option is selected (for styling)
        uploadNewMediaContainer.classList.add("media-type-selected");
    } else {
        // Remove class if no option is selected/reset (for styling)
        uploadNewMediaContainer.classList.remove("media-type-selected");
    }

    // Show video related checkbox container if video is selected
    const videoPreviewCheckboxContainer = document.querySelector(
        ".video-preview-settings-container"
    );
    if (selectedOption === "video") {
        videoPreviewCheckboxContainer.style.display = "block";
    } else {
        videoPreviewCheckboxContainer.style.display = "none";
    }
}

const mediaTypeContainer = document.getElementById("media-type-container");
const mediaTypeResetBtn = document.querySelector(".media-type-reset-btn");

// handle radio button click
mediaTypeRadioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", function () {
        // get selected radio value
        const selectedOption = this.value;

        // Update the uploaded media type
        uploadedMediaType = selectedOption;

        // Show/hide upload containers
        toggleUploadContainers(selectedOption);

        // Add classes to radio container and selected radio option
        mediaTypeContainer.classList.add("option-selected");
        radioButton.parentElement.classList.add("selected");

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
mediaTypeResetBtn.addEventListener("click", () => {
    // remove class from radio container
    mediaTypeContainer.classList.remove("option-selected");

    mediaTypeRadioButtons.forEach((radioButton) => {
        // uncheck all the radio input
        radioButton.checked = false;
        //hide all the upload containers
        uploadContainers.forEach((container) => {
            container.style.display = "none";
        });

        // remove class from selected option
        if (radioButton.parentElement.classList.contains("selected")) {
            radioButton.parentElement.classList.remove("selected");
        }
    });

    //hide reset button
    mediaTypeResetBtn.style.display = "none";

    // Remove class if no option is selected/reset (for styling)
    uploadNewMediaContainer.classList.remove("media-type-selected");
});

// -----------------------------------handle subscription/pvp toggle--------------------------------------------

const subscriptionBtn = document.querySelector(".sub-btn");
const pvpBtn = document.querySelector(".pvp-btn");
const stepFourNextBtn = document.querySelector(
    ".step-container-4 .step-next-btn"
);
const stepFourBackBtn = document.querySelector(
    ".step-container-4 .step-back-btn"
);

// On step four show/hide the extra buttons
function toggleBtnVisiblity() {
    // If upload method is selected both and user on the step 4 subscription container
    if (
        uploadMethod == "both" &&
        currentStep == 4 &&
        subscriptionContainer.style.display == "block"
    ) {
        // show go-step-back button and show-pvp-form-button and hide others
        subscriptionBtn.style.display = "none";
        stepFourBackBtn.style.display = "block";
        pvpBtn.style.display = "block";
        stepFourNextBtn.style.display = "none";

        // If upload method is selected both and user on the step 4 pvp container
    } else if (
        uploadMethod == "both" &&
        currentStep == 4 &&
        payPerViewContainer.style.display == "block"
    ) {
        // show go-step-next button and show-subscription-tier-button and hide others
        subscriptionBtn.style.display = "block";
        stepFourBackBtn.style.display = "none";
        pvpBtn.style.display = "none";
        stepFourNextBtn.style.display = "block";
    } else {
        // show default buttons (step back and step next)
        subscriptionBtn.style.display = "none";
        stepFourBackBtn.style.display = "block";
        pvpBtn.style.display = "none";
        stepFourNextBtn.style.display = "block";
    }
}

// Show subscription container and hide pvp container
subscriptionBtn.addEventListener("click", () => {
    payPerViewContainer.style.display = "none";
    subscriptionContainer.style.display = "block";
    toggleBtnVisiblity();
});

// Hide subscription container and show pvp container
pvpBtn.addEventListener("click", () => {
    payPerViewContainer.style.display = "block";
    subscriptionContainer.style.display = "none";
    toggleBtnVisiblity();
});

// ------------------------------------------handle-loader----------------------------------------------------

var loaderNumberElement = document.getElementById("loader-number");

// Initialize the loader number starting from 0
var loaderNumber = 0;

// Reset loader interval
var intervalId = null;

// set loader number in html
loaderNumberElement.textContent = loaderNumber;

const loaderIcon = document.getElementById("loader");

function showLoader() {
    loaderIcon.classList.add("gsCWf");
}

function hideLoader() {
    loaderIcon.classList.remove("gsCWf");
}

// Function to start loader counting up to 100 with a specified duration
function startloaderCountDown(duration) {
    // Display the loader number element
    loaderNumberElement.style.display = "block";

    // Set up an interval to update the loader number
    intervalId = setInterval(function () {
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

function hideAndResetLoader() {
    hideLoader();
    loaderNumberElement.style.display = "none";
    loaderNumber = 0;
}

// ------------------------------------------handle-upload----------------------------------------------------

const uploadForm = document.querySelector(".upload-form");
const recievedFormContainer = document.querySelector(
    ".recieved-form-container"
);
const filePlaceholderElement = document.querySelector(".file-placeholder");
const uploadFormOverlay = document.querySelector(".step-feature-overlay");

// Function to display the received file and perform necessary actions
function showRecievedFile() {
    // Hide and reset the loader
    hideAndResetLoader();

    // Hide the white overlay
    uploadFormOverlay.style.display = "none";

    // Display the recieved file container
    recievedFormContainer.style.display = "block";
}

function startAwsProcessing() {
    let processingFileDuration = 2000;
    // Simulate getting files from a database with an interval
    let getFilesFromDataBase = setInterval(() => {
        // Display a placeholder image (simulating receiving a file)
        filePlaceholderElement.style.backgroundImage = `url("https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60")`;

        // show the received file
        showRecievedFile();
        console.log("file recieved");

        // Clear the interval after receiving the file
        clearInterval(getFilesFromDataBase);
    }, processingFileDuration);
}

// Function to simulate getting a file from a database (demo)
function startUploading() {
    // Set a duration for simulating the process of uploading a file (2 seconds)
    let uploadingFileDuration = 2000;

    // Start the loader countdown
    startloaderCountDown(uploadingFileDuration);

    // Simulate the uploading process
    setTimeout(() => {
        // Simulate the completion of the upload after 2 seconds
        console.log("Upload completed");

        // Show loader processing text
        document.querySelector(".loader-text").style.display = "block";

        // Preload the image and move on to AWS processing
        const image = new Image();
        image.src =
            "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60";
        image.onload = function () {
            // Once the image is loaded, you can display it after AWS processing
            startAwsProcessing();
        };
    }, uploadingFileDuration);
}

// On uploading media (submitting form)
uploadForm.addEventListener("submit", (e) => {
    // stop page reloading on submit
    e.preventDefault();

    // Hide existing media container and upload-form container
    document.querySelector(".existing-media-container").style.display = "none";
    uploadForm.parentElement.style.display = "none";

    // Add a class to indicate that a file has been uploaded (for styling)
    uploadNewMediaContainer.classList.add("file-uploaded");

    // Show spinner loader
    showLoader();

    // Show white overlay
    uploadFormOverlay.style.display = "block";

    // Simulate the process of getting a file
    startUploading();
    console.log("start uploading");
});

// -----------------------------------------handle reset on close------------------------------------------

function resetEverything() {
    // reset variables
    steps = [1, 2, 3, 4, 5, 6];
    currentStep = steps[0];
    totalSteps = steps.length;
    uploadMethod = "both";
    uploadedMediaType = "";

    // reset radio and checkbox
    const selectionRadioInputs = document.querySelectorAll(
        '.selection-radio input[type="radio"]'
    );
    const selectedRadioInputsByDefault = document.querySelectorAll(
        ".checked-by-default"
    );
    const checkBoxes = document.querySelectorAll(".image-div .check");

    // Uncheck all the radio inputs and checkboxes
    selectionRadioInputs.forEach((input) => (input.checked = false));
    checkBoxes.forEach((input) => (input.checked = false));
    // Recheck the radios that selected by default
    selectedRadioInputsByDefault.forEach((input) => (input.checked = true));

    // recall the functions
    updateStepAndProgressBar(currentStep, totalSteps);
    toggleContainers();
    toggleUploadContainers(uploadedMediaType);

    // reset media type Selection
    mediaTypeResetBtn.click();

    // reset the forms
    document.querySelector("form.recieved-form").reset();
    document.querySelector("form.ppv-form").reset();

    // reset the upload containers
    document.querySelector(".existing-media-container").style.display = "block";
    uploadForm.parentElement.style.display = "block";
    recievedFormContainer.style.display = "none";

    // remove styling class
    popup.classList.remove("showing-thumbnail");
    uploadNewMediaContainer.classList.remove("file-uploaded");
}

// Close the popup when clicking on the overlay
const targetElement = document.querySelector("#add-media-popup");
targetElement.addEventListener("click", function (e) {
    if (
        e.target.classList.contains("DuKSh") ||
        e.target.classList.contains("AYaOY")
    ) {
        resetEverything();
    }
});

// Close the popup when clicking on elements with class 'AYaOY(close buttons)'
const closeButtonElements = targetElement.querySelectorAll(`.AYaOY`);
closeButtonElements.forEach(function (element) {
    element.addEventListener("click", function () {
        resetEverything();
    });
});

// ------------------------------------------------handle display settings chekboxes----------------------------------------------------

const displaySettingsCheckboxes = document.querySelectorAll(
    '.display-settings-label input[type="checkbox"]'
);
const displayPrivateCheckbox = document.getElementById("display-private");

displaySettingsCheckboxes.forEach((checkBox) => {
    checkBox.addEventListener("change", () => {
        if (checkBox.value !== "private") {
            // If any checkbox with a value other than 'private' is checked,
            // uncheck the 'Private' checkbox
            if (displayPrivateCheckbox.checked) {
                displayPrivateCheckbox.checked = false;
            }
        } else if (checkBox === displayPrivateCheckbox) {
            // If the 'Private' checkbox is checked, uncheck all other checkboxes
            if (checkBox.checked) {
                displaySettingsCheckboxes.forEach((otherCheckbox) => {
                    if (otherCheckbox !== checkBox) {
                        otherCheckbox.checked = false;
                    }
                });
            }
        }
    });
});
