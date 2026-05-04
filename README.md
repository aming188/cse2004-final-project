This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Overview

**NextWatch** is a movie discovery web app that helps you decide what to watch without all of the hassle. Pick from pre-defined filters like genre, release year, runtime, and mood, and the app pulls a curated set of films from [The Movie Database (TMDB)](https://www.themoviedb.org/). Click on any movie to see its description, poster, rating, and runtime, then save it to your personal watchlist.

Once a film is on your watchlist, you can mark it **Watched**, give it a star rating, and flag whether you liked it or not. The app tracks your stats, including how many movies you've liked vs. disliked and your average rating in each category. This can be viewed any time from the **Stats** button in the dashboard.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

# TMDB Movie API Key Setup

This section is useful only if you want to run the project locally. If not, please look forward to the next section, which provides the public Vercel URL. 

This project pulls movie data from [The Movie Database (TMDB)](https://www.themoviedb.org/); you will need a free API token to run it locally. Create an account at themoviedb.org, then go to **Profile → Settings → API** and click **Request an API Key**. Pick the "Developer" option and fill out the short form (you can click "personal" and use WashU address as this is a WashU project). Once completed, copy the **API Read Access Token** and add it to a `.env.local` file in the project root as `TMDB_TOKEN=your_token`. Restart the server and verify the API endpoint is working as expected.

## Deployment on Vercel + Demo

View the webpage here: https://nextwatch-six.vercel.app/
Watch a short demo here: https://drive.google.com/file/d/14CpboS1B1oCGw3CoWAPR53J54P7pJssD/view?usp=sharing


