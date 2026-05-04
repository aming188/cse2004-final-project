{/* Consulted: https://nextjs.org/docs/app/api-reference/file-conventions/route */}
{/* TMDB docs: https://developer.themoviedb.org/reference/discover-movie */}

const GENRE_IDS = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  Horror: 27,
  Mystery: 9648,
  Romance: 10749,
  "Sci-Fi": 878,
  Thriller: 53,
};

const RUNTIME_RANGES = {
  lt90: { lte: 89 },
  "90-120": { gte: 90, lte: 120 },
  "120-150": { gte: 120, lte: 150 },
  gt150: { gte: 151 },
};

// keywords within TMDB movies that are related to the given moods
const MOOD_KEYWORDS = {
  Cozy: "326774|326004|9914|308158|295282|279521|209972|325679",
  Intense: "321464|288394|10481|12565|316362|318868|227945|325425",
  Funny: "371028|320420|8201|322268|328540|319397",
  Romantic: "324429|9840|244886|9673",
  "Mind-bending": "362567|3307|272553|14779|10854|232997",
  Heartwarming:
    "319357|194088|329716|304995|334465|335803|265537|319319|281585|325824|334685|367611",
  Dark: "259094|10123|286125|230747|340566|322255|210162|243026",
  Adventurous: "322942|207372|189092|4759|1963|1454",
};

export async function GET(request) {
  const token = process.env.TMDB_TOKEN;

  if (!token) {
    return Response.json(
      { error: "TMDB_TOKEN is not properly configured" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const genre = searchParams.get("genre");
  const yearFrom = searchParams.get("yearFrom");
  const yearTo = searchParams.get("yearTo");
  const runtime = searchParams.get("runtime");
  const mood = searchParams.get("mood");

  const tmdbParams = new URLSearchParams({
    language: "en-US",
    page: "1",
    sort_by: "popularity.desc",
    include_adult: "false",
  });

  if (genre && GENRE_IDS[genre]) {
    tmdbParams.set("with_genres", String(GENRE_IDS[genre]));
  }

  if (yearFrom) {
    tmdbParams.set("primary_release_date.gte", `${yearFrom}-01-01`);
  }
  if (yearTo) {
    tmdbParams.set("primary_release_date.lte", `${yearTo}-12-31`);
  }

  if (mood && MOOD_KEYWORDS[mood]) {
    tmdbParams.set("with_keywords", MOOD_KEYWORDS[mood]);
  }

  const runtimeRange = RUNTIME_RANGES[runtime];
  if (runtimeRange?.gte) {
    tmdbParams.set("with_runtime.gte", String(runtimeRange.gte));
  }
  if (runtimeRange?.lte) {
    tmdbParams.set("with_runtime.lte", String(runtimeRange.lte));
  }

  const url = `https://api.themoviedb.org/3/discover/movie?${tmdbParams.toString()}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  });

  if (!res.ok) {
    return Response.json(
      { error: `TMDB returned ${res.status}`, body: await res.text() },
      { status: res.status }
    );
  }

  const data = await res.json();

  const tmdbHeaders = {
    Authorization: `Bearer ${token}`,
    accept: "application/json",
  };

  const resWithRuntime = await Promise.all(
    (data.results ?? []).map(async (movie) => {
      try {
        const detailRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`,
          { headers: tmdbHeaders }
        );
        if (!detailRes.ok) return movie;
        const detail = await detailRes.json();
        return { ...movie, runtime: detail.runtime ?? null };
      } catch {
        return movie;
      }
    })
  );

  return Response.json({ ...data, results: resWithRuntime });
}
