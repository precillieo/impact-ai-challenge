# IMPACT '26 · Tech & AI Challenge

Booth mini-game for **Impact '26 Career & Job Fair** (Tech & AI booth).

Static HTML/CSS/JS — works on iPad, laptop, or touchscreen. No backend required.

## Features

- **5 questions per run** with timer + speed bonus
- Categories: Find the Bug (Python), AI Thinker, Privacy, AI Knowledge
- Instant feedback with explanations
- **Leaderboard** (localStorage) — same player name **accumulates** score across runs
- Sound effects (Web Audio API)
- Keyboard answers: `A` `B` `C` `D`

## Run locally

Open `index.html` in a browser, or:

```bash
cd impact-ai-challenge
python3 -m http.server 8080
```

Visit http://localhost:8080

## Deploy to GitHub Pages

1. Create a new GitHub repo (e.g. `impact-ai-challenge`)
2. Push this folder to `main`
3. Repo → **Settings** → **Pages** → Source: **Deploy from a branch** → `main` / `/ (root)`
4. Site URL will be: `https://<user>.github.io/impact-ai-challenge/`

### Or with GitHub CLI

```bash
cd impact-ai-challenge
git init
git add .
git commit -m "Add IMPACT Tech & AI Challenge booth game"
gh repo create impact-ai-challenge --public --source=. --remote=origin --push
gh api repos/{owner}/{repo}/pages -X POST -f build_type=legacy -f source[branch]=main -f source[path]=/
```

## Deploy to Vercel / Netlify

- **Vercel:** Import repo → Framework: Other → Output: project root
- **Netlify:** Drag-and-drop this folder, or connect the repo (publish directory = `/`)

## Booth tips

- Use one shared iPad/laptop so the **leaderboard stays on that device**
- Players should use the **same display name** if they want scores to stack
- After playing, point people to your QR roadmaps (Data Science, AI Eng, Inference Eng, Resume)
- Mute button is top-right if the room is noisy

## Customize

- Questions: `js/questions.js`
- Timing / scoring: top of `js/app.js` (`QUESTIONS_PER_RUN`, `SECONDS_PER_Q`, points)
- Branding colors: `css/styles.css` (`:root` variables)

## License

Built for IMPACT '26 / myFather's House booth use. Enjoy.
