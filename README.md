# Code Like a Journalist

Hi! 👋

My name is Nael Shiab. I am a
[computational journalist](https://www.naelshiab.com/) based in Montreal. I work
for CBC News as a Senior Data Producer.

This repository stores the code for
[code-like-a-journalist](https://www.code-like-a-journalist.com/), a free,
open-source online course on TypeScript fundamentals and acquiring, analyzing,
visualizing, and automating data with SDA. It's available in English and French.

## Tested course toolchain

The first two chapters use VS Code, its built-in TypeScript formatter, and
Node.js directly: `node main.ts` or `node --watch main.ts`. The libraries and
tasks lessons introduce npm without a project generator.

Chapter 3 begins with an SDA setup lesson using `npx @nshiab/setup-data-project`.
Generated projects use `npm run sda` to format, check, and run once, and
`npm run sda:watch` to repeat those steps on changes. `all-tests` and `fix`
provide separate checking and formatting commands.

The Node migration was checked on October 16, 2026, with:

- Node.js 24.22.0 LTS (and 26.3.0 for example checks)
- @nshiab/setup-data-project 3.0.5
- @nshiab/simple-data-analysis 6.0.12
- TypeScript 7.0.2 and Vite+ 1.3.0 in the generated starter

Keep this list as the single source of truth when the course's tested toolchain
changes. Lessons should use unversioned setup commands so learners receive the
current compatible packages selected by `setup-data-project`.

Validation covers the generated starter, representative runtime examples,
TypeScript checks of lesson examples, library packaging, the production build,
and all 82 English/French routes. Live scrapes, the full census analysis, and the
one-billion-row workload are not part of this validation.

## Screenshots awaiting replacement

Outdated screenshots remain visible inside `OutdatedScreenshot` components,
with a red border and a localized warning. The original image assets are kept
so they can be replaced while reviewing the rendered lessons. Once a capture
matches the Node instructions, replace its component with a regular Markdown
image. The shared component is registered in `mdx-components.jsx`.

Thanks to the support of the
[Michener Awards Foundation](https://www.michenerawards.ca/media-release/michener-awards-foundation-announces-its-2024-fellowships-winners/),
I took several months off from my current job to fully focus on building the
course. I could also count on the support of
[Jean-Hugues Roy](https://github.com/jhroy), data journalist at La Presse and
former journalism professor at UQAM.

To allow teachers and professors to reuse the course with their students, the
content is released under the
[Creative Commons Attribution 4.0 International Public License](https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1).
The only condition is to give appropriate credit with my name and a link to the
[website](https://www.code-like-a-journalist.com/).

If you want to know when new lessons are available, subscribe to the
[newsletter](https://mailchi.mp/0db676437a2f/code-like-a-journalist).

You can also follow me on these platforms:

- [GitHub](https://github.com/nshiab)
- [Mastodon](https://vis.social/@naelshiab)
- [Bluesky](https://bsky.app/profile/naelshiab.bsky.social)
- [LinkedIn](https://www.linkedin.com/mynetwork/)

And add a star to the GitHub
[repository](https://github.com/nshiab/code-like-a-journalist) to keep me
motivated!
