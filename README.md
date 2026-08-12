# Family Chore Schedule

A chores and allowance tracker for the family, built as a web app you install on
a phone or iPad. Started life as the family chore poster; now it tracks who owes
what, what got done, and what everyone's saving toward.

**Live:** https://erickistheman1313.github.io/chore-board/

## Putting it on an iPhone or iPad

Once per device, and it has to be **Safari** — Chrome on iOS can't install apps.

1. Open https://erickistheman1313.github.io/chore-board/ in Safari.
2. Tap **Share** (the square with the up arrow).
3. Scroll down, tap **Add to Home Screen**, then **Add**.

It opens full screen with no Safari bars and works offline after the first load.
First launch asks who's using the device; that sticks, so each person installs it
on their own phone and only sees their own chores.

## The five tabs

**Household** — your progress today, your balance, day streak, and how everyone
else is doing. Also where the "Tell Dad I'm Done" button lives.

**Chores** — today's list, grouped by category, with a day picker so you can look
at any day of the week. Tap the circle to check off; tap the name for notes,
steps and photo proof.

**Chart** — the whole week as a grid. Green tick = done, red cross = missed,
grey dot = wasn't due. Switch between just you and everyone.

**Balances** — everyone's balance, and a full history of every chore that paid
and every adjustment a parent made. Rewards live here too, with a progress bar
toward each goal.

**Settings** — who's on this device, parent/kid mode, allowance vs points vs no
rewards, Dad's email, and data reset.

## Features

- **Profiles** for each family member with their own chores and balance.
- **Colour-coded chores** with 43 icons to pick from.
- **Per-person scheduling** — each chore picks which days it's due *per person*,
  which is how the poster's alternating A/B rotation is represented. Nuno gets
  Chore B on Mon/Wed and Chore A on Tue/Thu; Isabel is the opposite; Friday is
  Family Reset Day for both. The Monday & Thursday sweep-and-mop tasks only
  appear on those days.
- **Allowance or points** — each chore is worth something; completing it credits
  the balance automatically, unchecking reverses it. Or turn rewards off entirely.
- **Manual adjustments** — a parent can add or deduct any amount with a reason,
  for cash paid out or a bonus. Every change is timestamped in the history.
- **Rewards** with progress bars, either for one person or joint across everyone.
- **Photo proof** — turn it on for a chore and it can't be checked off without a
  photo. Photos are downscaled to 420px and kept on the device.
- **Subtasks** — break a chore into steps, tick them off individually.
- **Notes** on any chore.
- **Streaks** — days in a row at 100%. Miss a day and it resets. You can't farm
  it by checking off a different day's list.
- **Parent / kid mode** — kid devices can check off chores and look at balances
  but can't edit chores or change money. Optional 4-digit PIN stops them
  switching back.
- **Email to Dad** — unlocks at 100% and opens the mail app with the checklist,
  what was earned, and the streak already written. Press send.
- **Dark mode**, **offline**, and it all works with no account and no server.

## What it deliberately doesn't do

- **No syncing between devices.** Each phone keeps its own data. Real sync needs
  a server and a monthly bill; everything here is free and self-contained.
- **No home screen widgets.** Those are iOS-native only and need Xcode plus a
  paid Apple developer account.

## Editing it

| File | What it is |
| --- | --- |
| `index.html` | Page shell and `<head>` |
| `app.css` | All styling |
| `app.js` | All logic — data model, screens, editors |
| `sw.js` | Offline support |
| `manifest.webmanifest` | Makes it installable |
| `icons/`, `make-icons.ps1` | Home screen icons and the script that draws them |
| `build-artifact.js` | Bundles everything into one file for sharing as a Claude artifact |

Change a file, then:

```bash
cd "C:\Users\Nuno\Documents\chore-app" && git add -A && git commit -m "update" && git push
```

Pages redeploys in about a minute. `sw.js` serves HTML, CSS and JS network-first,
so phones pick up changes on next open — you don't have to bump the cache version
for code changes (do bump `CACHE` if you change the icon list).

**Keep the source files plain ASCII.** They're inlined into a single file for the
artifact build, and stray encoding breaks it. `build-artifact.js` verifies the
inlined copy matches byte-for-byte and will fail loudly if it doesn't.

**Don't edit these files with PowerShell text round-trips** (`Get-Content` piped
to `Set-Content`) — on Windows PowerShell 5.1 that adds a BOM and double-encodes
anything non-ASCII, which silently breaks the artifact build.

## Restoring the original chore list

Settings → **Reset chores to the family poster**. Check-offs and balances are kept.

## Privacy

The page is on a public URL, so anyone with the link can open it, and it has
first names and ages on it. `robots.txt` and a `noindex` tag keep it out of
search results — but don't post the link publicly.

Nothing is uploaded. Chores, check-offs, balances, photos and Dad's email address
all stay in local storage on each device.
