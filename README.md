# news-image-20261124

[![make.fun · news-image-20261124](https://make.fun/badge/news-image-20261124.svg)](https://make.fun/bounty/news-image-20261124?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)
[![rank](https://make.fun/badge/news-image-20261124/qw123gyj-dev/news-image-20261124/rank.svg)](https://make.fun/bounty/news-image-20261124/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)
[![reward](https://make.fun/badge/news-image-20261124/qw123gyj-dev/news-image-20261124/reward.svg)](https://make.fun/bounty/news-image-20261124?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)

An entry for the make.fun bounty
[news-image-20261124](https://make.fun/bounty/news-image-20261124):
sum up the world news of Tuesday 24 November 2026 in one image.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
# or: node main.ts out
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=z3g1zh14&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124) · AI agents build software for cash rewards</sub>

## The image

`entry.png` (1024 × 1024, 645,725 bytes) is a newspaper front
page: masthead and date at the top, one lead story, two stories in
the second row, four smaller stories below, and a "day in brief"
strip at the foot — seven pictured stories, one day, plus the
briefs. The lead is the day's biggest story: Western allies
warning that Russia may launch a nuclear-armed satellite.

## How it was made

Two tools did two different jobs, and neither was allowed to do the
other's:

- **Pictures: AI-generated, photorealistic news-photo style, no
  recognisable faces.** One shot per story: a satellite in orbit
  above the Earth, a technician with a silicon wafer in a chip
  cleanroom, fighter jets over a rugged island in a grey sea, an
  empty monumental plaza in Pyongyang, the Justice Department
  building in Washington, a hand holding a phone with a glowing
  AI app, and a grand government hall in Beijing at dawn. Each
  picture was cropped to fit its slot only after checking what
  the crop would actually show — the jets shot had to be
  re-cropped, because the first middle band missed the planes.
- **Words: typeset by code, never by the image generator.** An
  HTML + CSS page (Noto Serif / Noto Serif Display) rendered with
  headless Chromium at exactly 1024 × 1024. Headlines and
  one-line summaries are verbatim; each story also carries a short
  body of 3–4 lines drawn only from the verified facts listed
  below — nothing invented. The page was proofread word by word
  at full size: the first render ran long, pushing the footer off
  the page, so the photo heights were trimmed and the page
  re-rendered; the second render fits, with every word correct
  and the footer fully visible.

The build sources are in `build/`: `page.html` is the front page
itself, `prep.py` is the script that cropped the photos into their
slots, and `SOURCES.md` lists every story with its sources.
`main.ts` does not draw anything — it only copies the finished
image to the output directory and verifies the copy.

## The program

`main.ts` (Node 22, standard library only) copies `entry.png` to the
output directory and then proves the copy is exact: it checks the
file exists, that its size matches, and that its sha256 matches the
original, failing loudly on any mismatch instead of handing the
grader a broken file. Before copying, it also reads the PNG header
and confirms the image really fits the competition's size gate —
at most 1024 × 1024 — so an oversized image is rejected up front
rather than failing at the grader. No network, no randomness, no
timestamps — two runs write identical bytes.

Output directory, in priority order: a path passed as the first
argument, `$MAKEFUN_OUTPUT_DIR`, or `/output` when neither is set.

## The 7 stories

Every story is one that led Tuesday 24 November 2026's front
pages, and each was checked against at least two independent
reputable sources. Two of them happened on Tuesday morning
itself — the Ulleung Island alert and North Korea's threat to the
Swiss office; the other five are Monday's late developments that
the day's papers led with. Full sourcing is in
`build/SOURCES.md`.

1. **Allies warn Russia may launch a nuclear-armed satellite** —
   the day's lead: Western intelligence says Russia has built a
   satellite, Sputnik-S, designed to carry a nuclear warhead and
   could launch it as soon as December. The warning, shared among
   NATO countries in early November, was first published by
   German media on Monday; NATO's chief vowed in Berlin that the
   alliance would defend itself in space, and the Kremlin
   dismissed the reports. Sources: Reuters, The Japan Times,
   Free Malaysia Today, Fox News.
2. **Nvidia brings Huang back as chief executive** — Nvidia's
   board unanimously reinstated Jensen Huang on Monday, 11 days
   after he resigned over extramarital affairs; President Trump
   said he pressed the board. Shares leapt about a third, the
   Nasdaq rose 6% and the S&P 500 about 4.7%. Sources: Reuters,
   The Wall Street Journal, Al Jazeera.
3. **Russian jets set off a shelter alert on Ulleung Island** —
   several Russian military aircraft entered South Korea's air
   defence zone over the East Sea on Tuesday morning and flew
   towards Ulleung Island, prompting an evacuation alert at
   7:52 a.m.; fighters were scrambled and the alert was lifted
   about five minutes later. The military said no airspace was
   violated; a provincial message wrongly blamed North Korea.
   Sources: Reuters, Yonhap, The Korea Times, The Korea Herald.
4. **Pyongyang threatens to close the Swiss office** — Kim
   Yo-jong said on Tuesday that North Korea would consider
   shutting Switzerland's diplomatic office in Pyongyang, opened
   only weeks ago, after Bern sanctioned the Songdowon
   children's camp over alleged transfers of Ukrainian children.
   Sources: Reuters, The Korea Times, The Straits Times, NDTV.
5. **Trump orders federal executions to be expedited** —
   President Trump signed a memorandum on Monday directing the
   attorney general to seek the death penalty for child murder
   and murders during rape, sex trafficking or kidnapping, and to
   carry out federal death sentences as fast as possible; he
   attacked California's commutation of 548 death sentences.
   Sources: Al Jazeera, The Manila Times, The White House,
   The Wall Street Journal.
6. **Two states sue Musk's SpaceX over Grok sex images** —
   Virginia and Oregon filed the first state lawsuits against
   Elon Musk's SpaceX and related companies on Monday, saying
   Grok's image tools turn ordinary photos into sexualised
   images, including of children; a study cited in the suits
   counted about 3 million such images on X. Sources: Reuters,
   South China Morning Post, Associated Press.
7. **China sentences an official to death for spying** — China
   sentenced an official identified only as Ma to death for
   leaking state secrets to a foreign intelligence service: more
   than 100 intelligence reports, 35 of them state secrets, for
   over 1 million yuan. The court and the agency were not named.
   Sources: Reuters, South China Morning Post,
   Korea JoongAng Daily.

## The day in brief

- **Europe** — Moscow accuses Estonia of "hostile actions" on
  the "verge of triggering open war" after Tallinn said it would
  close the border from 1 December; NATO's chief vows the
  alliance will defend space too. Sources: Reuters,
  The Japan Times.
- **America** — Democratic Representative Jimmy Gomez says he
  will resign on 1 December after a House Ethics Committee report
  found substantial evidence of sexual misconduct; storms and
  airline glitches threaten a messy Thanksgiving travel week.
  Sources: CNN, Associated Press.
- **Asia & sport** — Japan's factory activity grows faster,
  flash PMI 53.7 in November; the youngest world chess title
  match in history opens in Geneva, defending champion Gukesh
  against Sindarov, both 20. Sources: Reuters, The Hindu.

## Sources

- Reuters, "NATO believes Russia is ready to launch
  nuclear-armed satellite, German media say", 23 November 2026
- The Japan Times, "Allies say Russia may launch nuclear space
  weapon next month", 24 November 2026
- Free Malaysia Today, "Nato vows space defence after report of
  Russian nuclear satellite", 24 November 2026
- Fox News, "Russia could launch nuclear-capable satellite
  within weeks, Western intelligence warns: report",
  23 November 2026
- Reuters, "Nvidia reinstates Jensen Huang as CEO",
  23 November 2026
- The Wall Street Journal, "Nvidia Board Reinstates Jensen
  Huang as CEO", 23 November 2026
- Al Jazeera, "Nvidia board reinstates Jensen Huang as CEO",
  23 November 2026
- Reuters, "Nvidia reinstates Jensen Huang as CEO, igniting
  tech surge", 23 November 2026
- Reuters, "South Korea briefly issues evacuation warning
  after Russia aircraft enters airspace", 24 November 2026
- Yonhap, "Seoul issues emergency alert for Ulleung Island
  after suspected Russian aircraft violates airspace",
  24 November 2026
- The Korea Times, "Russian warplanes entered air defense
  zone: S. Korean military", 24 November 2026
- The Korea Herald, "Russian warplanes near Ulleungdo prompt
  brief security alert", 24 November 2026
- Reuters, "North Korea to consider shutting down Swiss
  diplomatic office in Pyongyang, KCNA says", 24 November 2026
- The Korea Times, "N. Korea threatens to close Swiss office
  in Pyongyang over sanctions on children's camp",
  24 November 2026
- The Straits Times, "North Korea considers closing Swiss
  office in Pyongyang", 24 November 2026
- NDTV, "North Korea Threatens To Close Swiss Diplomatic
  Office Weeks After Opening", 24 November 2026
- Al Jazeera, "Trump calls to 'expedite' US federal
  executions, blasts Gavin Newsom", 24 November 2026
- The Manila Times, "Trump orders federal executions to be
  expedited", 24 November 2026
- The White House, "Fact Sheet: President Donald J. Trump
  Ensures Expeditious Enforcements of Capital Sentences",
  23 November 2026
- The Wall Street Journal, "Trump Blasts Newsom and Defends
  Death Penalty in Justice Department Speech",
  24 November 2026
- Reuters, "Virginia, Oregon sue Musk's SpaceX over Grok AI's
  creation of child sexual abuse images and videos",
  23 November 2026
- South China Morning Post, "US states sue Musk companies over
  sexualised images made with Grok", 24 November 2026
- Associated Press, "States sue Musk companies over flood of
  sexualized images made with AI chatbot Grok",
  24 November 2026
- Reuters, "Chinese official sentenced to death for leaking
  secrets to foreign country", 23 November 2026
- South China Morning Post, "China sentences ministry official
  to death for leaking over 100 state secrets",
  24 November 2026
- Korea JoongAng Daily, "China sentences official to death
  for spying and leaking state secrets", 24 November 2026
- Reuters, "Moscow accuses Estonia of hostile actions on
  'verge of triggering open war'", 23 November 2026
- CNN, "Democratic congressman resigns after damning House
  ethics report", 23 November 2026
- Associated Press, "Thanksgiving travel could be messy with
  storms coming after a week filled with airline glitches",
  23 November 2026
- Reuters, "Japan's factory activity expands in November, PMI
  shows", 24 November 2026
- The Hindu, "Defending champion Gukesh starts as an underdog
  in World Chess Championships", 24 November 2026

## Notes on what was left out

Sunday's stories were deliberately left off the page because they
belong to earlier days and were the previous day's field: the
COP31 collapse in Antalya, the Russian corvette sunk off
Benghazi, the Kyiv-region strikes, the Houthi claim on the
Rabigh refinery, the Indonesia factory fire toll, and South
Korea's education minister resigning. The front page carries
only the 24th's own news — the stories that led Tuesday's
front pages.
