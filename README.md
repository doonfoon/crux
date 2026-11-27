# CRUX — daily geography climb 🧗

A daily geography trivia game with a 30-second clock per question. Every day there's a new 7-question route; each question has many right
answers, and **rarer right answers are harder holds that climb you higher**.

| Hold      | Height |
|-----------|--------|
| Jug       | +100 m |
| Sloper    | +200 m |
| Crimp     | +300 m |
| Foot Chip | +400 m |
| Slip / out of time | +0 m |

## Files
- `index.html` – the page
- `style.css` – the look
- `game.js` – the game logic and screens
- `scene.js` – the illustrated climbing wall and the move animations
- `fx.js` – confetti, sparks, chalk puffs and the hold drawings
- `map.js` – the map reveal after each move
- `sfx.js` – sound effects, made live by the browser (no sound files)
- `geo.js` – map coordinates for cities, mountains, lakes and tiny countries
- `questions.js` – **the question bank** (edit this to add questions or change how rare an answer is)

## Adding a question
Copy one of the blocks in `questions.js`. Put each right answer in one of the four lists
(Jug, Sloper, Crimp, Foot Chip). Every question needs all four lists, even if one is empty `[]`.
Give it a `cat` of `"flag"`, `"nature"` or `"city"` so the daily mix stays varied, and for city/landmark
answers add their coordinates to `geo.js` so they show up on the map.

## Testing an old route
Add `?route=3` to the address to replay route #3 (it won't count toward your streak).

## Publishing free on GitHub Pages
1. Create a new public repository on github.com (e.g. `crux`).
2. Upload these files to it (**Add file → Upload files**).
3. Go to **Settings → Pages**, set *Source* to `Deploy from a branch`, branch `main`, folder `/ (root)`, and save.
4. After a minute your game is live at `https://<your-username>.github.io/crux/`.
