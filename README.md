# Family Chore Schedule

The family chore poster, turned into an app you can put on a phone or iPad.

**Live:** https://erickistheman1313.github.io/chore-board/

## Putting it on an iPhone or iPad

Do this once on each device. It has to be **Safari** — Chrome on iOS can't install apps.

1. Open https://erickistheman1313.github.io/chore-board/ in Safari.
2. Tap the **Share** button (the square with the arrow pointing up).
3. Scroll down and tap **Add to Home Screen**.
4. Tap **Add**.

You now have a gold star icon on the home screen. Opening it runs full screen with
no Safari bars, and it works without internet after the first load.

The first time it opens it asks who you are. That choice sticks, so each person
installs it on their own device and only ever sees their own chores.

## What it does

- Reads today's date and shows the right list: daily chores plus whichever chore
  day you're assigned. Monday Nuno is on Chore B while Isabel is on Chore A,
  Tuesday it flips, Friday is Family Reset Day for both. Zion gets his four daily jobs.
- The Monday & Thursday sweep-and-mop tasks only appear on Mondays and Thursdays.
- **Power Level** bar tracks how far along you are and sticks to the top while scrolling.
- **Streak** counts days in a row at 100%. Miss a day and it resets.
- **Tell Dad I'm Done** unlocks at 100% and opens your mail app with the full
  checklist already written. You press send. (A website can't send mail on its
  own without a paid server, so this is the honest way to do it.) The **Copy**
  button next to it copies the same message if a device has no mail app set up.

Checks save on the device and start fresh each new day.

## Editing it

`index.html` is the whole app — HTML, CSS and JavaScript in one file. Edit it,
then:

```bash
cd "C:\Users\Nuno\Documents\chore-app" && git add -A && git commit -m "update" && git push
```

GitHub Pages redeploys in about a minute. Phones pick up the change next time
they're opened with signal.

**If you change the chore lists,** bump `CACHE` in `sw.js` (`chores-v1` → `chores-v2`)
so already-installed phones fetch the new version instead of the cached one.

### Other files

| File | What it's for |
| --- | --- |
| `manifest.webmanifest` | Makes it installable; sets the name and icon |
| `sw.js` | Offline support |
| `icons/` | Home screen icons |
| `make-icons.ps1` | Regenerates the icons if you want a different design |
| `build-artifact.js` | Builds the single-file version for sharing as a Claude artifact |
| `robots.txt` | Keeps search engines from listing the page |

## A note on privacy

The page is on a public URL, so anyone with the link can open it. It has first
names and ages on it. `robots.txt` and a `noindex` tag keep it out of Google, so
it won't turn up in searches — but don't post the link anywhere public.

Nothing is ever uploaded. Checks, streaks and Dad's email address stay in the
browser's local storage on each device.
