# What Should I Read Next? Prototype

This prototype demonstrates a believable used-book ecommerce feature where a reader adds a few books they loved and gets personalized, currently available recommendations without leaving the browsing experience.

## What it demonstrates

- A compact browse-page experience that feels native to an online bookstore
- Search and quick-pick input for 3 to 5 favorite books
- Dense ecommerce-style product cards with price, stock status, short recommendation reasons, and a `View Book` CTA
- Lightweight controls for sorting, refreshing, and shifting recommendation focus
- A secondary inline module showing how the same system could appear on a real product detail page

## How to run it

1. Open a terminal in `/Users/blakerosenthal/Documents/New project/what-should-i-read-next-prototype`
2. Run `python3 -m http.server 4173`
3. Open [http://localhost:4173](http://localhost:4173)

No build step or backend is required.

## What is mocked vs. real

- Mocked:
  - Catalog inventory and book metadata
  - Recommendation logic
  - Availability counts and prices
  - Product page module placement
- Real:
  - Front-end interactions
  - Responsive layout
  - Client-side filtering, ranking, and recommendation explanations

## Notes

- The prototype starts with three sample favorites preloaded so the recommendation value is visible immediately during a demo.
- Results come from a fixed local dataset and use simple scoring based on shared genre, tone, pacing, author variety, and price signals.
