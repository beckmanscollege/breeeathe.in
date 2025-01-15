document.addEventListener("DOMContentLoaded", () => {
  const orb = document.querySelector('.orb');
  const introPopup = document.getElementById('intro-popup');
  const menuToggle = document.getElementById('menu-toggle');
  const inhaleControl = document.getElementById('inhale-control');
  const holdInhaleControl = document.getElementById('hold-inhale-control');
  const exhaleControl = document.getElementById('exhale-control');
  const holdExhaleControl = document.getElementById('hold-exhale-control');
  const inhaleDisplay = document.getElementById('inhale-display');
  const holdInhaleDisplay = document.getElementById('hold-inhale-display');
  const exhaleDisplay = document.getElementById('exhale-display');
  const holdExhaleDisplay = document.getElementById('hold-exhale-display');
  const audioToggle = document.getElementById('audio-toggle');
  const speakerIcon = document.getElementById('speaker-icon');


  // Sounds
  const orbVoiceAudio = new Audio('orbvoiceshort.mp3'); // Plays on first click
  const backgroundMusic = new Audio('bgmusic.mp3'); // Background music
  backgroundMusic.loop = true; // Background music loops
  

  let hasStarted = false; // Tracks if animation has started
  let menuOpen = false; // Tracks if the menu is open

  // Initial durations (in milliseconds)
  let durations = {
    inhale: 4000,
    holdInhale: 2000,
    exhale: 4000,
    holdExhale: 2000,
  };

  // Function to animate the orb
  async function animateOrb() {
    while (true) {
      // Inhale
      if (window.matchMedia("(orientation: portrait)").matches){
        orb.style.width = '81vw';
        orb.style.height = '81vw';
      } else {
        orb.style.width = '45vw';
        orb.style.height = '45vw';
      }
      await new Promise(resolve => setTimeout(resolve, durations.inhale));

      // Hold After Inhale
      await new Promise(resolve => setTimeout(resolve, durations.holdInhale));

      // Exhale
      if (window.matchMedia("(orientation: portrait)").matches){
        orb.style.width = '28vw';
        orb.style.height = '28vw';
      } else {
        orb.style.width = '12vw';
        orb.style.height = '12vw';
      }
      await new Promise(resolve => setTimeout(resolve, durations.exhale));

      // Hold After Exhale
      await new Promise(resolve => setTimeout(resolve, durations.holdExhale));
    }
  }

  // Function to update durations based on sliders
  function updateDurations() {
    durations.inhale = inhaleControl.value * 1000;
    durations.holdInhale = holdInhaleControl.value * 1000;
    durations.exhale = exhaleControl.value * 1000;
    durations.holdExhale = holdExhaleControl.value * 1000;

    inhaleDisplay.textContent = `Breathe in: ${durations.inhale / 1000}s`;
    holdInhaleDisplay.textContent = `Hold: ${durations.holdInhale / 1000}s`;
    exhaleDisplay.textContent = `Breathe out: ${durations.exhale / 1000}s`;
    holdExhaleDisplay.textContent = `Hold: ${durations.holdExhale / 1000}s`;
  }

async function typeWriterEffect(text, element) {
  for (let i = 0; i < text.length; i++) {
    element.textContent += text[i];
    await new Promise(resolve => setTimeout(resolve, 85)); // Typing speed
  }

  // Start fade-out effect after typing
  setTimeout(() => {
    element.style.opacity = 0; // Ensure transition is applied
    //element.classList.add('hidden'); // Add fade-out class
  },1500); // Delay before fading 
}
async function startExperience() {
  if (!hasStarted) {
    hasStarted = true;

    // Stop the bop animation
    const orb = document.querySelector('.orb');
    orb.style.animation = 'none'; // Remove the animation

      // Start orb animation
      animateOrb();

    // Play orb voice sound
    orbVoiceAudio.play();

    // Type the intro text
    await typeWriterEffect('Hello... Breathe with me.', introPopup);

    // Wait for the orb voice audio to finish
    orbVoiceAudio.addEventListener('ended', () => {
      // Play background music after orb voice audio ends
      backgroundMusic.play();
    });
  }
}

  // Add event listener for first click to start the experience
  document.body.addEventListener('click', startExperience);

  // Initialize the display values for the durations
  updateDurations();

  // Menu toggle functionality
  menuToggle.addEventListener('click', () => {
    const sideMenu = document.getElementById('side-menu');
    const audioControl = document.querySelector('.audio-control');
  
    if (menuOpen) {
      sideMenu.style.right = '-100%'; // Hide menu
      sideMenu.classList.remove('open'); // Remove `open` class
      audioControl.style.visibility = 'hidden'; // Hide audio control
    } else {
      sideMenu.style.right = '0'; // Show menu
      sideMenu.classList.add('open'); // Add `open` class
      audioControl.style.visibility = 'visible'; // Show audio control
    }
  
    menuOpen = !menuOpen; // Toggle menu state
  });

  // Looping audio toggle functionality
  audioToggle.addEventListener('click', () => {
    if (backgroundMusic.paused) {
      backgroundMusic.play();
      speakerIcon.src = 'soundon.svg'; // Switch to sound-on icon
    } else {
      backgroundMusic.pause();
      speakerIcon.src = 'soundoff.svg'; // Switch to sound-off icon
    }
  });

  // Attach event listeners to update durations dynamically
  inhaleControl.addEventListener('input', updateDurations);
  holdInhaleControl.addEventListener('input', updateDurations);
  exhaleControl.addEventListener('input', updateDurations);
  holdExhaleControl.addEventListener('input', updateDurations);
  
  // Ensure the icon reflects the correct initial state of the music
  if (backgroundMusic.paused) {
    speakerIcon.src = 'soundon.svg'; // Sound is initially off
  } else {
    speakerIcon.src = 'soundon.svg'; // Sound is initially on
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const orb = document.querySelector('.orb');
  const moodRingColorPicker = document.getElementById('mood-ring-color');
  const body = document.body;

  // Unified function to update both orb and background based on a single color picker
  function updateMoodRing() {
    const color = moodRingColorPicker.value;

    // Update the orb's box-shadow
    orb.style.boxShadow = `
      inset 0 0 2.7em #fff,
      inset 1.25em 0 3.75em ${color},
      inset -1.25em 0 3.75em ${color},
      inset 1.25em 0 18.75em ${color},
      inset -1.25em 0 18.75em ${color},
      0 0 2em #fffceb,
      -0.625em 0 3.75em ${color},
      0.625em 0 3.75em ${color}
    `;

    // Update the background gradient
    body.style.background = `radial-gradient(circle, ${color} 0%, black 40%)`;
  }

  // Add an event listener to update styles whenever the color picker changes
  moodRingColorPicker.addEventListener('input', updateMoodRing);
});

document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("background-video");
  const videoSource = document.getElementById("video-source");
  const orb = document.querySelector(".orb");

  // Video sources for each button
  const videoSources = {
    underground: "https://cdn.glitch.me/530e58f7-2d4b-41ab-88cb-ac245b7406da/underground%20compressed.mp4?v=1736980661096",
    supermarket: "https://cdn.glitch.me/530e58f7-2d4b-41ab-88cb-ac245b7406da/supermarket%20compressed.mp4?v=1736980286901",
    nature: "https://cdn.glitch.me/530e58f7-2d4b-41ab-88cb-ac245b7406da/nature%20100.mp4?v=1736975508567",
    nightlife: "https://cdn.glitch.me/530e58f7-2d4b-41ab-88cb-ac245b7406da/nightlife%20compressed.mp4?v=1736981579822",
  };

  // Function to play video and add the color dodge effect
  function playVideo(source) {
    videoSource.src = source; // Set the video source
    video.load(); // Reload the video
    video.classList.add("active"); // Show the video
    video.play().catch((error) => console.error("Video playback failed:", error));

    // Add color-dodge effect to the orb
    orb.classList.add("color-dodge");
  }

  // Event listeners for theme buttons
  document
    .getElementById("underground-button")
    .addEventListener("click", () => playVideo(videoSources.underground));
  document
    .getElementById("supermarket-button")
    .addEventListener("click", () => playVideo(videoSources.supermarket));
  document
    .getElementById("nature-button")
    .addEventListener("click", () => playVideo(videoSources.nature));
  document
    .getElementById("nightlife-button")
    .addEventListener("click", () => playVideo(videoSources.nightlife));

    function resetToNeutral() {
      video.pause(); // Stop the video
      video.classList.remove("active"); // Hide the video
      orb.classList.remove("color-dodge"); // Remove the color dodge effect
    }
  
    // Add event listener to the Neutral button
    document
      .getElementById("neutral-button")
      .addEventListener("click", resetToNeutral);
});
