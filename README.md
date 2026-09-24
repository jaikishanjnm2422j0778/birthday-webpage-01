# 💙 Happy 20th Birthday, My Love

A little birthday surprise website — password-protected, with a love song,
falling petals, a photo gallery, and a final heart-tap that reveals a
birthday card image.

## ✨ Features

- 🔒 Lock screen (password protected)
- 🎵 Background love song (with fallback tune)
- 🌸 Falling flower petals animation
- 🖼️ "Our little moments" photo gallery
- 📍 "The miles between us" distance section
- ❤️ Final heart-tap that reveals the birthday image

## 📁 Project structure

```
.
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/          # all photos used on the page
│   └── audio/
│       └── love-song.mp3   # <- add your song here
├── .gitignore
└── README.md
```

## 🚀 Run locally

Just open `index.html` in your browser, or serve the folder:

```bash
# Python
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 🌐 Deploy with GitHub Pages

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Source**, choose **Deploy from a branch**.
4. Select branch **main** and folder **/ (root)**, then **Save**.
5. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

## 🔑 Changing the password

Open `js/script.js` and edit:

```js
const PASSWORD = "Sweetheart";
```

> ⚠️ The password check runs in the browser, so anyone who views the page
> source can see it. It's a fun lock screen for a surprise, not real security.
> If the repo is public, the photos are public too.

## 🎵 Adding your song

Put your song at `assets/audio/love-song.mp3`. If the file is missing, the
page falls back to a default tune.

## 🛠️ Built with

Plain HTML, CSS and JavaScript — no frameworks or build step.

---

Made with love, just for you — across every mile ♡
