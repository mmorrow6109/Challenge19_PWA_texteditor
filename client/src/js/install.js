const butInstall = document.getElementById('buttonInstall');

// Variable to store the beforeinstallprompt event
let deferredPrompt;

// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default behavior
  event.preventDefault();
  // Store the event for later use
  deferredPrompt = event;
  // Show install button or similar UI element to the user
  butInstall.style.display = 'block';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    // Reset the deferredPrompt variable
    deferredPrompt = null;
    // Hide install button or similar UI element
    butInstall.style.display = 'none';
  }
});

// Add an event handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // Log the event or perform any other necessary actions
  console.log('App installed successfully');
});
