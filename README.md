# The Most Beautiful Girl In The World — Birthday Site

A small, elegant, interactive static site designed to create a magical birthday journey.

## Structure

- `index.html` — animated landing with floating hearts
- `pages/story.html` — typewriter compliments
- `pages/gallery.html` — masonry gallery with lightbox
- `pages/quiz.html` — small quiz to unlock the finale
- `pages/final.html` — heartfelt letter and confetti
- `pages/map.html` — opens your GeoGuessr map of special places
- `assets/css` — shared styles and animations
- `assets/js` — page-specific scripts

## Customize

1. Replace images: add your photos in `assets/sample/` and update `assets/js/gallery.js` `images` array.
2. Edit messages: change text in `assets/js/typewriter.js` and `assets/js/final.js`.
3. Adjust quiz: tweak questions/validation in `pages/quiz.html` and `assets/js/quiz.js`.
4. GeoGuessr link: set your map URL in `assets/js/map.js` (`GEO_GUESSSR_URL`).

## Local preview

Open `index.html` directly, or use any static server. For example:

```bash
npx serve -l 5173
```

Then open `http://localhost:5173`.

## Deploy to your domain

Upload all files to your hosting provider or use static hosting (Netlify, Vercel, GitHub Pages) and point your domain `themostbeautifulgirlintheworld` to it via DNS (A/AAAA or CNAME).


