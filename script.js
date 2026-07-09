// Google Apps Script Web App Endpoint Configuration
const WEB_APP_URL = "PASTE_URL_HERE"; 

document.addEventListener("DOMContentLoaded", () => {
    initAmbientEffects();
    initMusicController();
    runScreen1();
    setupActivityChips();
    setupDateInteractions();
    setupFormSubmission();
});

/* -------------------------------------------------------------
   Ambient Background Effects: Floating Hearts & Sparkles
------------------------------------------------------------- */
function initAmbientEffects() {
    const canvas = document.getElementById("ambient-canvas");
    const ctx = canvas.getContext("2d");
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 100;
            this.size = Math.random() * 12 + 6;
            this.speed = Math.random() * 1 + 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.type = Math.random() > 0.4 ? 'heart' : 'sparkle';
            this.angle = Math.random() * Math.PI * 2;
            this.spin = Math.random() * 0.02 - 0.01;
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            if (this.type === 'heart') {
                ctx.fillStyle = "#ff4d79";
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(-this.size/2, -this.size/2, -this.size, 0, 0, this.size);
                ctx.bezierCurveTo(this.size, 0, this.size/2, -this.size/2, 0, 0);
                ctx.fill();
            } else {
                ctx.fillStyle = "#fff";
                ctx.beginPath();
                for (let i = 0; i < 4; i++) {
                    ctx.lineTo(0, -this.size);
                    ctx.rotate(Math.PI / 2);
                }
                ctx.fill();
            }
            ctx.restore();
        }
        update() {
            this.y -= this.speed;
            this.angle += this.spin;
            if (this.y < -20) {
                this.y = canvas.height + 20;
                this.x = Math.random() * canvas.width;
            }
        }
    }

    for (let i = 0; i < 30; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
}

/* -------------------------------------------------------------
   Audio Engine Controller
------------------------------------------------------------- */
function initMusicController() {
    const musicBtn = document.getElementById("music-toggle");
    const audio = document.getElementById("bg-music");

    // Audio context initialization fix for browsers
    musicBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play().catch(e => console.log("Audio play blocked: ", e));
            musicBtn.classList.add("playing");
        } else {
            audio.pause();
            musicBtn.classList.remove("playing");
        }
    });
}

/* -------------------------------------------------------------
   Page Router Core
------------------------------------------------------------- */
function switchScreen(currentId, nextId) {
    const current = document.getElementById(currentId);
    const next = document.getElementById(nextId);
    
    current.style.opacity = "0";
    current.style.transform = "scale(0.96) translateY(-10px)";
    
    setTimeout(() => {
        current.classList.remove("active");
        next.classList.add("active");
        // Trigger reflow
        next.offsetWidth;
        next.style.opacity = "1";
        next.style.transform = "scale(1) translateY(0)";
    }, 400);
}

/* -------------------------------------------------------------
   Custom Typing Engine
------------------------------------------------------------- */
function typeText(element, text, speed, callback) {
    element.classList.remove("hidden");
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

/* -------------------------------------------------------------
   Screen 1 Logic: Init Protocol
------------------------------------------------------------- */
function runScreen1() {
    const bar = document.getElementById("loading-progress");
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += 2;
        bar.style.width = progress + "%";
        if (progress >= 100) {
            clearInterval(interval);
            
            // Begin sequential line typography
            const t1 = document.getElementById("typing-s1-1");
            const t2 = document.getElementById("typing-s1-2");
            const nextBtn = document.getElementById("btn-to-s2");

            typeText(t1, "Hello Tannu ❤️", 80, () => {
                setTimeout(() => {
                    typeText(t2, "Dev has something important to ask you...", 60, () => {
                        setTimeout(() => {
                            nextBtn.style.display = "inline-flex";
                        }, 400);
                    });
                }, 600);
            });
        }
    }, 40);

    document.getElementById("btn-to-s2").addEventListener("click", () => {
        switchScreen("screen-1", "screen-2");
        runScreen2();
    });
}

/* -------------------------------------------------------------
   Screen 2 Logic: The Proposal Context
------------------------------------------------------------- */
function runScreen2() {
    const t1 = document.getElementById("typing-s2-1");
    const t2 = document.getElementById("typing-s2-2");
    const t3 = document.getElementById("typing-s2-3");
    const nextBtn = document.getElementById("btn-to-s2");
    const btnToS3 = document.getElementById("btn-to-s3");

    setTimeout(() => {
        typeText(t1, "Hi Tannu...", 80, () => {
            setTimeout(() => {
                typeText(t2, "Mujhe tumse ek chhoti si request hai...", 60, () => {
                    setTimeout(() => {
                        typeText(t3, "Please mana mat karna 🥺", 70, () => {
                            setTimeout(() => {
                                btnToS3.style.display = "inline-flex";
                            }, 400);
                        });
                    }, 500);
                });
            }, 600);
        });
    }, 400);

    btnToS3.addEventListener("click", () => {
        switchScreen("screen-2", "screen-3");
    });
}

/* -------------------------------------------------------------
   Screen 3 Logic: Intelligent Non-Compliant "NO" Button
------------------------------------------------------------- */
const noPhrases = [
    "Pakka? 🥺",
    "Ek baar aur soch ❤️",
    "Pizza meri taraf se 🍕",
    "Chocolate bhi 🍫",
    "Pretty Please 🥹",
    "Tannuuuu ❤️",
    "No unavailable 😂",
    "Yes ❤️"
];
let noInteractionCount = 0;
let yesScale = 1;

const noBtn = document.getElementById("btn-no");
const yesBtn = document.getElementById("btn-yes");

function dodgeNoButton() {
    const card = noBtn.closest('.glass-card');
    const cardRect = card.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Prevent clipping past card boundaries
    const maxX = cardRect.width - btnRect.width - 30;
    const maxY = cardRect.height - btnRect.height - 30;

    const randomX = Math.max(15, Math.random() * maxX);
    const randomY = Math.max(15, Math.random() * maxY);

    noBtn.style.position = "absolute";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";

    // Cycle UI phrases
    noBtn.innerText = noPhrases[noInteractionCount % noPhrases.length];
    noInteractionCount++;

    // Increment absolute structural volume layout on structural alternate path
    yesScale += 0.15;
    yesBtn.style.transform = `scale(${yesScale})`;
}

// Mouse events and touch interfaces
noBtn.addEventListener("mouseenter", dodgeNoButton);
noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    dodgeNoButton();
});

// Event sequence termination execution on selection realization
yesBtn.addEventListener("click", () => {
    // Elegant Particle Spark Eruptions via Canvas Confetti engine
    confetti({ particleCount: 140, spread: 80, origin: { y: 0.6 } });
    setTimeout(() => {
        confetti({ particleCount: 100, angle: 60, spread: 55, origin: { x: 0 } });
    }, 250);
    setTimeout(() => {
        confetti({ particleCount: 100, angle: 120, spread: 55, origin: { x: 1 } });
    }, 400);

    setTimeout(() => {
        switchScreen("screen-3", "screen-4");
        runSlideshow();
    }, 1000);
});

/* -------------------------------------------------------------
   Screen 4 Logic: Presentation Memory Carousel
------------------------------------------------------------- */
let currentSlideIndex = 0;
function runSlideshow() {
    const slides = document.getElementsByClassName("slide");
    if(slides.length === 0) return;
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    currentSlideIndex++;
    if (currentSlideIndex > slides.length) { currentSlideIndex = 1 }    
    slides[currentSlideIndex-1].style.display = "block";  
    setTimeout(runSlideshow, 3000); // Transitions safely context wide every 3 seconds
}

document.getElementById("btn-to-s5").addEventListener("click", () => {
    switchScreen("screen-4", "screen-5");
});

/* -------------------------------------------------------------
   Screen 5 & 6 Controls: Chip Array Matrices and Date Rules
------------------------------------------------------------- */
function setupActivityChips() {
    const chips = document.querySelectorAll(".activity-chip");
    chips.forEach(chip => {
        chip.addEventListener("click", () => {
            chip.classList.toggle("selected");
        });
    });
}

function setupDateInteractions() {
    // Restricts past timing inputs selection
    const datePicker = document.getElementById("date-picker");
    const today = new Date().toISOString().split('T')[0];
    datePicker.setAttribute('min', today);
}

/* -------------------------------------------------------------
   Screen 7 Logic: Pipeline Streaming & System Execution
------------------------------------------------------------- */
function setupFormSubmission() {
    document.getElementById("btn-submit").addEventListener("click", () => {
        const dateVal = document.getElementById("date-picker").value;
        const timeVal = document.getElementById("time-picker").value;
        const notesVal = document.getElementById("extra-notes").value;
        
        if(!dateVal || !timeVal) {
            alert("Please pick a beautiful Date and Time for us! 🥺");
            return;
        }

        const selectedChips = [];
        document.querySelectorAll(".activity-chip.selected").forEach(chip => {
            selectedChips.push(chip.getAttribute("data-value"));
        });

        // Toggle state visually
        switchScreen("screen-5", "screen-7");

        // Animate custom pipeline metrics loaders
        const submitBar = document.getElementById("submit-progress");
        let loadWidth = 0;
        const loaderInterval = setInterval(() => {
            loadWidth += 4;
            submitBar.style.width = loadWidth + "%";
            if(loadWidth >= 100) {
                clearInterval(loaderInterval);
                
                // Show final package elements
                document.getElementById("submit-loader").classList.add("hidden-element");
                document.getElementById("final-letter").classList.remove("hidden-element");
                
                // Activate active runtime tracking clocks
                startCountdown(dateVal, timeVal);
            }
        }, 100);

        // Payload Construct Mapping
        const transmissionPayload = {
            date: dateVal,
            time: timeVal,
            activities: selectedChips.join(", "),
            message: notesVal,
            timestamp: new Date().toLocaleString()
        };

        // Async dispatch framework execution pipeline
        if (WEB_APP_URL !== "PASTE_URL_HERE") {
            fetch(WEB_APP_URL, {
                method: "POST",
                mode: "no-cors", // Bypasses CORS protection policies for direct script streaming
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(transmissionPayload)
            })
            .then(() => console.log("Success! Data transmitted safely to Dev."))
            .catch(err => console.error("Transmission interruption encountered:", err));
        }
    });
}

/* -------------------------------------------------------------
   Asynchronous Production Countdown Clocks
------------------------------------------------------------- */
function startCountdown(targetDate, targetTime) {
    const timerDisplay = document.getElementById("countdown-timer");
    const targetTimestamp = new Date(`${targetDate}T${targetTime}`).getTime();

    function updateClock() {
        const now = new Date().getTime();
        const difference = targetTimestamp - now;

        if (difference <= 0) {
            timerDisplay.innerText = "The moment is here! ❤️";
            clearInterval(clockInterval);
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        timerDisplay.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    updateClock();
    const clockInterval = setInterval(updateClock, 1000);
}