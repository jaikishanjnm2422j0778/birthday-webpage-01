        // ---------- Blue flower petals background ----------
        const flowerSVG = `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <g>
                <circle cx="20" cy="10" r="7" fill="#4fb3e8" opacity="0.9"/>
                <circle cx="30" cy="20" r="7" fill="#7b8cf0" opacity="0.9"/>
                <circle cx="20" cy="30" r="7" fill="#2d6cdf" opacity="0.9"/>
                <circle cx="10" cy="20" r="7" fill="#a9ddf7" opacity="0.9"/>
                <circle cx="20" cy="20" r="6" fill="#ffd166"/>
            </g>
        </svg>`;

        const flowersBg = document.querySelector("#flowersBg");
        const petalCount = 16;
        for (let i = 0; i < petalCount; i += 1) {
            const petal = document.createElement("span");
            petal.className = "petal";
            petal.innerHTML = flowerSVG;
            petal.style.left = `${Math.random() * 100}vw`;
            const duration = 9 + Math.random() * 10;
            const delay = Math.random() * -20;
            const size = 16 + Math.random() * 20;
            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;
            petal.style.animationDuration = `${duration}s, ${3 + Math.random() * 2}s`;
            petal.style.animationDelay = `${delay}s, ${delay}s`;
            flowersBg.appendChild(petal);
        }

        // ---------- Lock / unlock ----------
        const lockScreen = document.querySelector("#lockScreen");
        const mainPage = document.querySelector("#mainPage");
        const passwordInput = document.querySelector("#passwordInput");
        const unlockButton = document.querySelector("#unlockButton");
        const lockError = document.querySelector("#lockError");

        // Change this to your own secret word before sending the page.
        const PASSWORD = "Sweetheart";

        const button = document.querySelector("#surpriseButton");
        const note = document.querySelector("#surpriseNote");
        const musicButton = document.querySelector("#musicButton");
        const songPicker = document.querySelector("#songPicker");
        const loveSong = document.querySelector("#loveSong");
        const songStatus = document.querySelector("#songStatus");

        // ---------- Default song (a gentle generated melody, no file needed) ----------
        // This plays automatically as "our song" unless a real love-song.mp3 is
        // provided next to this file, or the person picks their own track above.
        let audioCtx = null;
        let defaultSongTimer = null;
        let defaultSongPlaying = false;

        function startDefaultSong() {
            if (defaultSongPlaying) return;
            audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
            if (audioCtx.state === "suspended") audioCtx.resume();
            defaultSongPlaying = true;

            // A soft looping little melody (music-box style).
            const notes = [523.25, 587.33, 659.25, 523.25, 659.25, 783.99, 659.25, 587.33,
                            523.25, 659.25, 783.99, 880.00, 783.99, 659.25, 587.33, 523.25];
            const noteLength = 0.42;
            let step = 0;

            function playNote() {
                if (!defaultSongPlaying) return;
                const freq = notes[step % notes.length];
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = "sine";
                osc.frequency.value = freq;
                const now = audioCtx.currentTime;
                gain.gain.setValueAtTime(0, now);
                gain.gain.linearRampToValueAtTime(0.09, now + 0.05);
                gain.gain.exponentialRampToValueAtTime(0.001, now + noteLength);
                osc.connect(gain).connect(audioCtx.destination);
                osc.start(now);
                osc.stop(now + noteLength + 0.05);
                step += 1;
                defaultSongTimer = setTimeout(playNote, noteLength * 1000 * 0.92);
            }
            playNote();
        }

        function stopDefaultSong() {
            defaultSongPlaying = false;
            if (defaultSongTimer) clearTimeout(defaultSongTimer);
        }

        async function tryUnlock() {
            if (passwordInput.value.trim().toLowerCase() === PASSWORD.toLowerCase()) {
                lockScreen.classList.add("hidden");
                mainPage.classList.remove("locked");
                lockError.classList.remove("show");

                // Autoplay the song right after unlocking (this click counts as user interaction).
                try {
                    await loveSong.play();
                    musicButton.textContent = "Pause our song ⏸️";
                    songStatus.textContent = "Playing our song for you...";
                } catch {
                    // No love-song.mp3 found (or it can't autoplay) — fall back to our default tune.
                    startDefaultSong();
                    musicButton.textContent = "Pause our song ⏸️";
                    songStatus.textContent = "Playing our song for you... (add your own assets/audio/love-song.mp3, or pick one above, any time)";
                }
            } else {
                lockError.classList.add("show");
                passwordInput.focus();
                passwordInput.select();
            }
        }

        const startStoryButton = document.querySelector("#startStoryButton");
        const landingPage = document.querySelector("#landingPage");
        const mainContent = document.querySelector("#mainContent");
        
        if (startStoryButton && landingPage && mainContent) {
            startStoryButton.addEventListener("click", () => {
                // Hide landing page
                landingPage.classList.add("hidden");
                // Show main content
                mainContent.classList.add("show");
                // Scroll to top of main content
                window.scrollTo(0, 0);
            });
        }

        unlockButton.addEventListener("click", tryUnlock);
        passwordInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") tryUnlock();
        });

        button.addEventListener("click", () => {
            note.classList.toggle("show");
            button.textContent = note.classList.contains("show")
                ? "I love you! 💙"
                : "Open your surprise 💌";

            const colors = ["#2d6cdf", "#4fb3e8", "#7b8cf0", "#a9ddf7", "#ffd166"];
            for (let i = 0; i < 14; i += 1) {
                const heart = document.createElement("span");
                heart.className = "heart-pop";
                heart.textContent = ["♥", "💙", "✨"][i % 3];
                heart.style.left = `${Math.random() * 100}vw`;
                heart.style.top = `${55 + Math.random() * 30}vh`;
                heart.style.fontSize = "1.8rem";
                heart.style.color = colors[i % colors.length];
                document.body.appendChild(heart);
                setTimeout(() => heart.remove(), 1700);
            }
        });

        musicButton.addEventListener("click", async () => {
            const somethingPlaying = !loveSong.paused || defaultSongPlaying;
            if (!somethingPlaying) {
                try {
                    await loveSong.play();
                    musicButton.textContent = "Pause our song ⏸️";
                    songStatus.textContent = "Playing our song for you...";
                } catch {
                    startDefaultSong();
                    musicButton.textContent = "Pause our song ⏸️";
                    songStatus.textContent = "Playing our song for you...";
                }
            } else {
                loveSong.pause();
                stopDefaultSong();
                musicButton.textContent = "Play our song 🎵";
                songStatus.textContent = "Song paused.";
            }
        });

        songPicker.addEventListener("change", () => {
            const [song] = songPicker.files;
            if (!song) return;
            stopDefaultSong();
            loveSong.src = URL.createObjectURL(song);
            songStatus.textContent = `Ready to play: ${song.name}`;
            loveSong.play().then(() => {
                musicButton.textContent = "Pause our song ⏸️";
            }).catch(() => {
                musicButton.textContent = "Play our song 🎵";
            });
        });

        loveSong.addEventListener("ended", () => {
            musicButton.textContent = "Play our song 🎵";
        });

        // ---------- Reveal "miles between us" quote cards as they scroll into view ----------
        const revealCards = document.querySelectorAll(".quote-card.reveal");
        if (revealCards.length && "IntersectionObserver" in window) {
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.25 });
            revealCards.forEach((card) => revealObserver.observe(card));
        } else {
            revealCards.forEach((card) => card.classList.add("in-view"));
        }

        // ---------- Final Surprise Heart Tap Interaction ----------
        const finalHeart = document.querySelector("#finalHeart");
        const finalMessage = document.querySelector("#finalMessage");
        const tapHint = document.querySelector("#tapHint");
        let heartTapped = false;

        if (finalHeart) {
            finalHeart.addEventListener("click", () => {
                if (!heartTapped) {
                    heartTapped = true;
                    finalMessage.classList.remove("hidden");
                    finalMessage.classList.add("show");
                    tapHint.style.opacity = "0";
                    tapHint.style.pointerEvents = "none";

                    // Reveal the birthday image
                    const finalImageWrap = document.querySelector("#finalImageWrap");
                    if (finalImageWrap) {
                        finalImageWrap.classList.add("show");
                        setTimeout(() => {
                            finalImageWrap.scrollIntoView({ behavior: "smooth", block: "center" });
                        }, 500);
                    }

                    // Create heart burst animation
                    const burstColors = ["❤️", "💙", "✨", "💕", "🌹"];
                    for (let i = 0; i < 10; i += 1) {
                        const burst = document.createElement("span");
                        burst.className = "heart-pop";
                        burst.textContent = burstColors[i % burstColors.length];
                        burst.style.left = `${finalHeart.getBoundingClientRect().left + finalHeart.offsetWidth / 2}px`;
                        burst.style.top = `${finalHeart.getBoundingClientRect().top + finalHeart.offsetHeight / 2}px`;
                        burst.style.fontSize = "1.6rem";
                        document.body.appendChild(burst);
                        setTimeout(() => burst.remove(), 1700);
                    }
                }
            });
        }
