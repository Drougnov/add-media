let currentStep = 1;
const totalSteps = 6;
let uploadMethod = "";

// Show the current step and update the progress bar
function showStep(step) {
    // Initially hide all step containers
    document.querySelectorAll('.step-container').forEach((container) => {
        container.style.display = 'none';
    });

    // Show the current step container
    document.querySelector(`.step-container-${step}`).style.display = 'block';

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
