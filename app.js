import { catalog, quickPickIds } from "./data.js";

const MAX_SELECTIONS = 5;
const MIN_SELECTIONS = 3;
const MODULE_MAX_SELECTIONS = 4;
const INITIAL_SELECTION = [
  "night-circus",
  "project-hail-mary",
  "lessons-in-chemistry",
];

const signalReasonMeta = {
  atmospheric: { phrase: "atmospheric tone", category: "tone" },
  romantic: { phrase: "romantic tension", category: "theme" },
  immersive: { phrase: "immersive worldbuilding", category: "setting" },
  "character-driven": { phrase: "character-driven storytelling", category: "story" },
  "slow-burn": { phrase: "slow-burn pacing", category: "pacing" },
  "page-turner": { phrase: "fast pacing", category: "pacing" },
  witty: { phrase: "witty voice", category: "writing" },
  "big-idea": { phrase: "big-idea storytelling", category: "story" },
  hopeful: { phrase: "hopeful tone", category: "tone" },
  sharp: { phrase: "sharp voice", category: "writing" },
  uplifting: { phrase: "uplifting tone", category: "tone" },
  "voice-driven": { phrase: "voice-driven storytelling", category: "writing" },
  glamorous: { phrase: "glamorous setting", category: "setting" },
  "emotionally-rich": { phrase: "emotional tone", category: "theme" },
  ensemble: { phrase: "ensemble cast dynamics", category: "story" },
  cozy: { phrase: "cozy feel", category: "tone" },
  clever: { phrase: "clever plotting", category: "story" },
  ambitious: { phrase: "ambitious scope", category: "story" },
  friendship: { phrase: "friendship themes", category: "theme" },
  thoughtful: { phrase: "thoughtful writing", category: "writing" },
  comforting: { phrase: "warm tone", category: "tone" },
  whimsical: { phrase: "whimsical tone", category: "tone" },
  "found-family": { phrase: "found-family themes", category: "theme" },
  introspective: { phrase: "reflective tone", category: "tone" },
  inventive: { phrase: "inventive premise", category: "story" },
  heartfelt: { phrase: "heartfelt emotion", category: "theme" },
  quirky: { phrase: "offbeat charm", category: "tone" },
  twisty: { phrase: "twisty plotting", category: "story" },
  psychological: { phrase: "psychological tension", category: "theme" },
  "fast-paced": { phrase: "quick pacing", category: "pacing" },
  dark: { phrase: "dark edge", category: "tone" },
  propulsive: { phrase: "propulsive pacing", category: "pacing" },
  lyrical: { phrase: "lyrical writing", category: "writing" },
  mythic: { phrase: "mythic scope", category: "setting" },
  feminist: { phrase: "strong point of view", category: "writing" },
  quiet: { phrase: "quiet emotional tone", category: "tone" },
  emotional: { phrase: "emotional resonance", category: "theme" },
  speculative: { phrase: "speculative ideas", category: "setting" },
  "darkly funny": { phrase: "dark humor", category: "writing" },
  topical: { phrase: "topical edge", category: "theme" },
  resilient: { phrase: "resilient lead", category: "story" },
  layered: { phrase: "layered relationships", category: "theme" },
  identity: { phrase: "identity themes", category: "theme" },
  reflective: { phrase: "reflective tone", category: "tone" },
  warm: { phrase: "warm family dynamic", category: "theme" },
  family: { phrase: "family-centered drama", category: "theme" },
  elegant: { phrase: "elegant writing", category: "writing" },
  suspenseful: { phrase: "suspenseful plotting", category: "story" },
  "puzzle-like": { phrase: "puzzle-box structure", category: "story" },
};

const genreReasonMeta = {
  fantasy: "fantasy setting",
  literary: "literary sensibility",
  "science fiction": "science-fiction ideas",
  adventure: "adventure stakes",
  "historical fiction": "historical setting",
  "contemporary fiction": "contemporary setting",
  mystery: "mystery plotting",
  thriller: "thriller tension",
  "cozy fiction": "cozy mystery feel",
  satire: "satirical edge",
};

const popularRecommendationIds = new Set([
  "project-hail-mary",
  "lessons-in-chemistry",
  "seven-husbands",
  "daisy-jones",
  "circe",
  "house-in-cerulean-sea",
  "addie-larue",
  "station-eleven",
  "midnight-library",
  "secret-history",
  "gentleman-in-moscow",
  "dark-matter",
  "anxious-people",
  "nightingale",
  "tomorrow-and-tomorrow",
  "vanishing-half",
  "silent-patient",
  "babel",
]);

const state = {
  selectedIds: [...INITIAL_SELECTION],
  moduleSelectedIds: [],
  results: [],
  focusMode: "all",
  sortMode: "match",
  quickPickOffset: 0,
  variationSeed: 0,
  hasSubmitted: false,
  moduleStatusMessage: "",
  currentView: "recommendations",
  activeBookId: null,
  detailAction: "",
  detailFeedback: "",
};

const elements = {
  recommendationContent: document.querySelector("#recommendation-content"),
  bookDetailPage: document.querySelector("#book-detail-page"),
  bookInput: document.querySelector("#book-input"),
  searchForm: document.querySelector("#search-form"),
  suggestions: document.querySelector("#suggestions"),
  quickPicks: document.querySelector("#quick-picks"),
  selectedGrid: document.querySelector("#selected-grid"),
  selectedCount: document.querySelector("#selected-count"),
  helperCopy: document.querySelector("#helper-copy"),
  statusMessage: document.querySelector("#status-message"),
  recommendButton: document.querySelector("#recommend-button"),
  clearSelection: document.querySelector("#clear-selection"),
  swapPicks: document.querySelector("#swap-picks"),
  refreshResults: document.querySelector("#refresh-results"),
  modeGroup: document.querySelector("#mode-group"),
  sortSelect: document.querySelector("#sort-select"),
  resultsSection: document.querySelector("#results-section"),
  emptyState: document.querySelector("#empty-state"),
  resultsGrid: document.querySelector("#results-grid"),
  summaryTitle: document.querySelector("#summary-title"),
  summaryCopy: document.querySelector("#summary-copy"),
  basedOnLine: document.querySelector("#based-on-line"),
  discoveryWorkspace: document.querySelector("#discovery-workspace"),
  moduleSearchForm: document.querySelector("#module-search-form"),
  moduleBookInput: document.querySelector("#module-book-input"),
  moduleSuggestions: document.querySelector("#module-suggestions"),
  moduleSelectedGrid: document.querySelector("#module-selected-grid"),
  moduleCount: document.querySelector("#module-count"),
  moduleStatus: document.querySelector("#module-status"),
  moduleGoButton: document.querySelector("#module-go-button"),
  modulePreviewGrid: document.querySelector("#module-preview-grid"),
  modulePreviewEmpty: document.querySelector("#module-preview-empty"),
  modulePreviewCount: document.querySelector("#module-preview-count"),
  detailBreadcrumbTitle: document.querySelector("#detail-breadcrumb-title"),
  detailBackButton: document.querySelector("#detail-back-button"),
  detailCoverShell: document.querySelector("#detail-cover-shell"),
  detailGenrePill: document.querySelector("#detail-genre-pill"),
  detailTitle: document.querySelector("#detail-title"),
  detailAuthor: document.querySelector("#detail-author"),
  detailContextCopy: document.querySelector("#detail-context-copy"),
  detailSummary: document.querySelector("#detail-summary"),
  detailGenreValue: document.querySelector("#detail-genre-value"),
  detailPace: document.querySelector("#detail-pace"),
  detailSignals: document.querySelector("#detail-signals"),
  detailPrice: document.querySelector("#detail-price"),
  detailFormat: document.querySelector("#detail-format"),
  detailCondition: document.querySelector("#detail-condition"),
  detailStock: document.querySelector("#detail-stock"),
  detailCopies: document.querySelector("#detail-copies"),
  detailShippingNote: document.querySelector("#detail-shipping-note"),
  detailActionFeedback: document.querySelector("#detail-action-feedback"),
  detailRelatedGrid: document.querySelector("#detail-related-grid"),
};

const catalogById = new Map(catalog.map((book) => [book.id, book]));
const defaultPageTitle = document.title;

function getBooksByIds(ids) {
  return ids.map((id) => catalogById.get(id)).filter(Boolean);
}

function getSelectedBooks() {
  return getBooksByIds(state.selectedIds);
}

function getModuleSelectedBooks() {
  return getBooksByIds(state.moduleSelectedIds);
}

function currency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function titleCase(value) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function findCatalogMatches(query, excludedIds = [], limit = 5) {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) {
    return [];
  }

  return catalog
    .filter(
      (book) =>
        !excludedIds.includes(book.id) &&
        `${book.title} ${book.author}`.toLowerCase().includes(trimmed)
    )
    .slice(0, limit);
}

function computeSharedBookScore(candidate, favorite) {
  const sharedGenres = candidate.genres.filter((genre) =>
    favorite.genres.includes(genre)
  );
  const sharedSignals = candidate.signals.filter((signal) =>
    favorite.signals.includes(signal)
  );
  const sharedPace = candidate.pace === favorite.pace ? 1 : 0;

  const score =
    sharedGenres.length * 5 + sharedSignals.length * 3 + sharedPace * 2;

  return {
    favorite,
    score,
    sharedGenres,
    sharedSignals,
    sharedPace,
  };
}

function seededNudge(text, seed) {
  let hash = seed * 31;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 33 + text.charCodeAt(index)) % 9973;
  }
  return (hash % 100) / 100;
}

function customerModeSummary() {
  if (state.focusMode === "closer") {
    return "Showing the closest matches to the books you selected.";
  }
  if (state.focusMode === "broaden") {
    return "Showing a wider mix that still fits your reading taste.";
  }
  if (state.focusMode === "hidden-gems") {
    return "Showing lesser-known picks that still fit your reading taste.";
  }
  if (state.focusMode === "popular") {
    return "Showing well-known books that align with your reading taste.";
  }
  return "Showing the best overall mix for the books you selected.";
}

function recommendBooks() {
  const selectedBooks = getSelectedBooks();
  const selectedAuthors = new Set(selectedBooks.map((book) => book.author));
  const selectedGenres = new Set(selectedBooks.flatMap((book) => book.genres));
  const selectedSignals = new Set(selectedBooks.flatMap((book) => book.signals));
  const availableBooks = catalog.filter(
    (book) =>
      !state.selectedIds.includes(book.id) && book.availability !== "Out of Stock"
  );

  const scored = availableBooks
    .map((candidate) => {
      const matches = selectedBooks
        .map((favorite) => computeSharedBookScore(candidate, favorite))
        .sort((left, right) => right.score - left.score);

      const topMatch = matches[0];
      const baseScore = matches.reduce((total, item) => total + item.score, 0);

      let modeBonus = 0;
      const newGenreCount = candidate.genres.filter((genre) => !selectedGenres.has(genre)).length;
      const sharedCatalogSignals = candidate.signals.filter((signal) =>
        selectedSignals.has(signal)
      ).length;
      const isPopularPick = popularRecommendationIds.has(candidate.id);

      if (state.focusMode === "closer") {
        modeBonus += topMatch.score * 0.7;
        modeBonus += topMatch.sharedSignals.length * 4;
        modeBonus += topMatch.sharedGenres.length * 4;
        modeBonus += topMatch.sharedPace ? 3 : 0;
      }
      if (state.focusMode === "broaden") {
        modeBonus += newGenreCount * 6;
        modeBonus += sharedCatalogSignals * 1.5;
        modeBonus += selectedAuthors.has(candidate.author) ? -3 : 2;
        if (topMatch.sharedGenres.length === 0 && topMatch.sharedSignals.length >= 1) {
          modeBonus += 5;
        }
      }
      if (state.focusMode === "hidden-gems") {
        modeBonus += Math.max(0, 18 - candidate.copies) * 0.55;
        modeBonus += isPopularPick ? -6 : 5;
      }
      if (state.focusMode === "popular") {
        modeBonus += isPopularPick ? 11 : 0;
        modeBonus += candidate.copies >= 18 ? 2 : 0;
      }

      const availabilityBonus =
        candidate.availability === "In Stock"
          ? 4
          : candidate.availability === "Low Stock" ||
              candidate.availability === "Limited Stock"
            ? 2
            : 3;

      const variationBonus =
        state.variationSeed === 0
          ? 0
          : seededNudge(candidate.id, state.variationSeed) * 7;

      return {
        ...candidate,
        totalScore: baseScore + modeBonus + availabilityBonus + variationBonus,
        topMatch,
        modeBonus,
      };
    })
    .sort((left, right) => right.totalScore - left.totalScore);

  if (state.sortMode === "match" && state.variationSeed > 0) {
    const pool = scored
      .slice(0, Math.min(16, scored.length))
      .sort(
        (left, right) =>
          seededNudge(right.id, state.variationSeed * 19) -
            seededNudge(left.id, state.variationSeed * 19) ||
          right.totalScore - left.totalScore
      )
      .slice(0, 8)
      .sort((left, right) => right.totalScore - left.totalScore);

    state.results = pool;
    return;
  }

  if (state.sortMode === "price") {
    scored.sort((left, right) => left.price - right.price || right.totalScore - left.totalScore);
  }

  if (state.sortMode === "title") {
    scored.sort((left, right) => left.title.localeCompare(right.title));
  }

  state.results = scored.slice(0, 8);
}

function joinPhrases(items) {
  if (items.length === 0) {
    return "its overall feel";
  }
  if (items.length === 1) {
    return items[0];
  }
  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }
  return `${items[0]}, ${items[1]}, and ${items[2]}`;
}

function getReasonPhrases(match) {
  const phrases = [];
  const categories = new Set();
  const categoryOrder = ["tone", "story", "writing", "theme", "setting", "pacing"];

  const preferredSignals = match.sharedSignals
    .map((signal) => signalReasonMeta[signal])
    .filter(Boolean)
    .sort(
      (left, right) =>
        categoryOrder.indexOf(left.category) - categoryOrder.indexOf(right.category)
    );

  preferredSignals.forEach((entry) => {
    if (phrases.length >= 3 || categories.has(entry.category)) {
      return;
    }
    phrases.push(entry.phrase);
    categories.add(entry.category);
  });

  match.sharedGenres.forEach((genre) => {
    const phrase = genreReasonMeta[genre];
    if (phrases.length >= 2 || !phrase || categories.has("genre")) {
      return;
    }
    phrases.splice(Math.min(1, phrases.length), 0, phrase);
    categories.add("genre");
  });

  if (phrases.length === 0) {
    phrases.push("a similar reading feel");
  }

  return phrases.slice(0, 2);
}

function inventoryCopy(book) {
  if (book.availability === "Low Stock") {
    return `Only ${book.copies} copies left`;
  }
  if (book.availability === "Limited Stock") {
    return `Only ${book.copies} copies available`;
  }
  return `${book.copies} copies available`;
}

function stockClass(book) {
  if (book.availability === "Low Stock") {
    return "is-low-stock";
  }
  if (book.availability === "Limited Stock") {
    return "is-limited-stock";
  }
  return "is-in-stock";
}

function buildExplanation(book) {
  const baseReason = joinPhrases(getReasonPhrases(book.topMatch));

  if (state.focusMode === "broaden") {
    return `Because you liked ${book.topMatch.favorite.title} for its ${baseReason}, with a slightly broader feel.`;
  }

  if (state.focusMode === "hidden-gems") {
    return `Because you liked ${book.topMatch.favorite.title} for its ${baseReason}, and this one feels a little more under the radar.`;
  }

  if (state.focusMode === "popular") {
    return `Because you liked ${book.topMatch.favorite.title} for its ${baseReason}, and this is a popular next pick.`;
  }

  return `Because you liked ${book.topMatch.favorite.title} for its ${baseReason}.`;
}

function paceLabel(pace) {
  if (!pace) {
    return "Balanced";
  }
  return pace.charAt(0).toUpperCase() + pace.slice(1);
}

function conditionCopy(book) {
  if (book.availability === "Limited Stock") {
    return "Used Acceptable";
  }
  if (book.availability === "Low Stock") {
    return "Used Good";
  }
  if (book.format === "Hardcover" || book.price >= 10) {
    return "Used Very Good";
  }
  return "Used Good";
}

function shippingCopy(book) {
  if (book.availability === "Low Stock" || book.availability === "Limited Stock") {
    return "Order soon. Usually ships within 24 hours.";
  }
  return "Usually ships within 24 hours.";
}

function bookSignalPhrases(book, limit = 3) {
  return book.signals
    .map((signal) => signalReasonMeta[signal])
    .filter(Boolean)
    .slice(0, limit)
    .map((entry) => entry.phrase);
}

function buildDetailSummary(book) {
  const tastePhrases = bookSignalPhrases(book, 2);
  if (tastePhrases.length === 0) {
    return book.synopsis;
  }
  return `${book.synopsis} A strong pick for readers drawn to ${joinPhrases(tastePhrases)}.`;
}

function buildDetailSignalSummary(book) {
  const phrases = bookSignalPhrases(book, 3);
  if (phrases.length === 0) {
    return "A strong overall reading feel";
  }
  return joinPhrases(phrases);
}

function getRecommendationRecord(bookId) {
  return state.results.find((book) => book.id === bookId) || null;
}

function getBookRecommendationData(bookId) {
  const fromResults = getRecommendationRecord(bookId);
  if (fromResults) {
    return fromResults;
  }

  const book = catalogById.get(bookId);
  if (!book) {
    return null;
  }

  const selectedBooks = getSelectedBooks();
  if (selectedBooks.length === 0) {
    return {
      ...book,
      topMatch: null,
    };
  }

  const matches = selectedBooks
    .map((favorite) => computeSharedBookScore(book, favorite))
    .sort((left, right) => right.score - left.score);

  return {
    ...book,
    topMatch: matches[0] || null,
  };
}

function buildDetailContext(book) {
  if (book?.topMatch) {
    return buildExplanation(book);
  }
  return "Selected from titles currently in stock based on books you liked.";
}

function getMoreLikeThis(bookId) {
  const currentBook = catalogById.get(bookId);
  if (!currentBook) {
    return [];
  }

  return catalog
    .filter(
      (candidate) =>
        candidate.id !== bookId && candidate.availability !== "Out of Stock"
    )
    .map((candidate) => {
      const similarity = computeSharedBookScore(candidate, currentBook);
      return {
        ...candidate,
        similarityScore:
          similarity.score +
          similarity.sharedGenres.length * 4 +
          similarity.sharedSignals.length * 2 +
          similarity.sharedPace * 2,
      };
    })
    .sort((left, right) => right.similarityScore - left.similarityScore)
    .slice(0, 4);
}

function scrollToElement(element) {
  if (element?.scrollIntoView) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

function syncDetailActionButtons() {
  document.querySelectorAll("[data-detail-action]").forEach((button) => {
    button.classList.toggle(
      "is-active",
      button.dataset.detailAction === state.detailAction
    );
  });
}

function renderDetailRelated(bookId) {
  const relatedBooks = getMoreLikeThis(bookId);
  elements.detailRelatedGrid.innerHTML = relatedBooks
    .map(
      (book) => `
        <article class="detail-related-card">
          <div class="detail-related-cover">
            ${coverMarkup(book)}
          </div>
          <div class="detail-related-copy">
            <p class="detail-related-kicker">${titleCase(book.genres[0])}</p>
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <div class="detail-related-row">
              <strong>${currency(book.price)}</strong>
              <span>${book.availability}</span>
            </div>
            <a
              href="#book/${book.id}"
              class="text-button detail-related-link"
              data-view-book-id="${book.id}"
            >
              View Book
            </a>
          </div>
        </article>
      `
    )
    .join("");
}

function renderBookDetail(bookId) {
  const book = getBookRecommendationData(bookId);
  if (!book) {
    return;
  }

  state.activeBookId = bookId;
  elements.detailBreadcrumbTitle.textContent = book.title;
  elements.detailCoverShell.innerHTML = coverMarkup(book);
  elements.detailGenrePill.textContent = titleCase(book.genres[0]);
  elements.detailTitle.textContent = book.title;
  elements.detailAuthor.textContent = book.author;
  elements.detailContextCopy.textContent = buildDetailContext(book);
  elements.detailSummary.textContent = buildDetailSummary(book);
  elements.detailGenreValue.textContent = book.genres
    .map((genre) => titleCase(genre))
    .join(" / ");
  elements.detailPace.textContent = paceLabel(book.pace);
  elements.detailSignals.textContent = buildDetailSignalSummary(book);
  elements.detailPrice.textContent = currency(book.price);
  elements.detailFormat.textContent = book.format;
  elements.detailCondition.textContent = conditionCopy(book);
  elements.detailStock.textContent = book.availability;
  elements.detailCopies.textContent = inventoryCopy(book);
  elements.detailShippingNote.textContent = shippingCopy(book);
  elements.detailActionFeedback.textContent =
    state.detailFeedback || "Choose an action to continue.";
  document.title = `${book.title} | Find Your Next Read`;

  syncDetailActionButtons();
  renderDetailRelated(bookId);
}

function showDetailView(bookId, { updateHash = true } = {}) {
  if (!catalogById.has(bookId)) {
    showRecommendationView({ updateHash: false });
    return;
  }

  state.currentView = "detail";
  state.activeBookId = bookId;
  state.detailAction = "";
  state.detailFeedback = "Choose an action to continue.";
  renderBookDetail(bookId);
  elements.recommendationContent.classList.add("hidden");
  elements.bookDetailPage.classList.remove("hidden");

  if (updateHash) {
    const nextHash = `#book/${bookId}`;
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    }
  }

  window.requestAnimationFrame(() => {
    scrollToElement(elements.bookDetailPage);
  });
}

function showRecommendationView({ updateHash = true, scrollToResults = false } = {}) {
  state.currentView = "recommendations";
  state.activeBookId = null;
  state.detailAction = "";
  state.detailFeedback = "";
  elements.recommendationContent.classList.remove("hidden");
  elements.bookDetailPage.classList.add("hidden");
  document.title = defaultPageTitle;

  if (updateHash) {
    const nextHash = "#recommendations";
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    }
  }

  if (scrollToResults) {
    window.requestAnimationFrame(() => {
      scrollToElement(state.hasSubmitted ? elements.resultsSection : elements.discoveryWorkspace);
    });
  }
}

function routeFromHash() {
  const hash = window.location.hash.replace(/^#/, "");
  if (hash.startsWith("book/")) {
    return {
      view: "detail",
      bookId: decodeURIComponent(hash.slice("book/".length)),
    };
  }

  return { view: "recommendations" };
}

function syncViewFromHash() {
  const route = routeFromHash();

  if (route.view === "detail" && catalogById.has(route.bookId)) {
    showDetailView(route.bookId, { updateHash: false });
    return;
  }

  showRecommendationView({
    updateHash: false,
    scrollToResults: state.currentView === "detail",
  });
}

function updateSummary() {
  const selectedBooks = getSelectedBooks();
  const basedOnTitles = selectedBooks.map((book) => book.title);
  const basedOnSummary =
    basedOnTitles.length === 0
      ? "Add a few books you loved"
      : basedOnTitles.length <= 3
        ? basedOnTitles.join(", ")
        : `${basedOnTitles.slice(0, 3).join(", ")} + ${basedOnTitles.length - 3} more`;

  if (!state.hasSubmitted || state.results.length === 0) {
    elements.basedOnLine.textContent = `Recommendations based on: ${basedOnSummary}`;
    elements.summaryTitle.textContent =
      "Showing books currently in stock that match your reading taste.";
    elements.summaryCopy.textContent =
      selectedBooks.length >= MIN_SELECTIONS
        ? "Choose Get recommendations to see available matches."
        : "Add a few books you loved to get personalized recommendations.";
    return;
  }

  elements.basedOnLine.textContent = `Recommendations based on: ${basedOnSummary}`;
  elements.summaryTitle.textContent =
    "Showing books currently in stock that match your reading taste.";
  elements.summaryCopy.textContent = customerModeSummary();
}

function coverMarkup(book) {
  return `
    <div class="cover-art" style="background: ${book.cover.background}; color: ${book.cover.text};">
      <div class="cover-sheen"></div>
      <span class="cover-kicker">${book.genres[0]}</span>
      <strong>${book.title}</strong>
      <small>${book.author}</small>
      <div class="cover-bar" style="background: ${book.cover.accent};"></div>
    </div>
  `;
}

function renderSelectedBooks() {
  const selectedBooks = getSelectedBooks();

  if (selectedBooks.length === 0) {
    elements.selectedGrid.innerHTML = `
      <article class="selected-card empty-selected-card">
        <div class="selected-card-copy">
          <p>Add a few books you loved</p>
          <span>We’ll use them to build personalized recommendations.</span>
        </div>
      </article>
    `;
  } else {
    elements.selectedGrid.innerHTML = selectedBooks
      .map(
        (book) => `
          <article class="selected-card">
            <div class="selected-card-copy">
              <p>${book.title}</p>
              <span>${book.author}</span>
            </div>
            <button
              type="button"
              class="remove-button"
              data-remove-id="${book.id}"
              aria-label="Remove ${book.title}"
            >
              ×
            </button>
          </article>
        `
      )
      .join("");
  }

  elements.selectedCount.textContent = String(selectedBooks.length);

  if (selectedBooks.length >= MIN_SELECTIONS) {
    elements.helperCopy.textContent =
      selectedBooks.length === MAX_SELECTIONS
        ? "Maximum reached. Remove a title to swap in another."
        : "Enough signal collected. Generate or refresh recommendations any time.";
  } else {
    elements.helperCopy.textContent =
      "Add at least 3 books for the strongest match quality.";
  }
}

function renderQuickPicks() {
  const selectedIds = new Set(state.selectedIds);
  const availableQuickPicks = quickPickIds
    .map((id) => catalogById.get(id))
    .filter((book) => book && !selectedIds.has(book.id));

  if (availableQuickPicks.length === 0) {
    elements.quickPicks.innerHTML = `
      <div class="quick-pick quick-pick-empty">
        <strong>All sample picks are already selected</strong>
        <span>Remove one of your current favorites to see more examples.</span>
      </div>
    `;
    return;
  }

  const rotated = availableQuickPicks
    .slice(state.quickPickOffset)
    .concat(availableQuickPicks.slice(0, state.quickPickOffset))
    .slice(0, 6);

  elements.quickPicks.innerHTML = rotated
    .map(
      (book) => `
        <button class="quick-pick" type="button" data-add-id="${book.id}">
          <strong>${book.title}</strong>
          <span>${book.author}</span>
        </button>
      `
    )
    .join("");
}

function renderSuggestions(query = "") {
  if (!query.trim()) {
    elements.suggestions.innerHTML = "";
    elements.suggestions.classList.remove("visible");
    return;
  }

  const results = findCatalogMatches(query, state.selectedIds);

  if (results.length === 0) {
    elements.suggestions.innerHTML =
      '<div class="suggestion-empty">No close matches in the catalog right now.</div>';
    elements.suggestions.classList.add("visible");
    return;
  }

  elements.suggestions.innerHTML = results
    .map(
      (book) => `
        <button
          type="button"
          class="suggestion-item"
          data-add-id="${book.id}"
          role="option"
        >
          <strong>${book.title}</strong>
          <span>${book.author}</span>
        </button>
      `
    )
    .join("");
  elements.suggestions.classList.add("visible");
}

function moduleStatusText() {
  if (state.moduleStatusMessage) {
    return state.moduleStatusMessage;
  }

  const count = state.moduleSelectedIds.length;
  if (count === 0) {
    return "Add 2 to 4 books to build a stronger starting point.";
  }
  if (count === 1) {
    return "Add 1 or 2 more books for more personalized recommendations.";
  }
  if (count === 2) {
    return "Good start. Add one more in the full tool to unlock recommendations.";
  }
  if (count < MODULE_MAX_SELECTIONS) {
    return "Great signal. Continue whenever you're ready.";
  }
  return "Strong starting point collected. Continue to the full experience.";
}

function setModuleStatus(message = "") {
  state.moduleStatusMessage = message;
  elements.moduleStatus.textContent = moduleStatusText();
}

function renderModuleSuggestions(query = "") {
  if (!query.trim()) {
    elements.moduleSuggestions.innerHTML = "";
    elements.moduleSuggestions.classList.remove("visible");
    return;
  }

  const results = findCatalogMatches(query, state.moduleSelectedIds);

  if (results.length === 0) {
    elements.moduleSuggestions.innerHTML =
      '<div class="suggestion-empty">No close matches in the catalog right now.</div>';
    elements.moduleSuggestions.classList.add("visible");
    return;
  }

  elements.moduleSuggestions.innerHTML = results
    .map(
      (book) => `
        <button
          type="button"
          class="suggestion-item"
          data-module-add-id="${book.id}"
          role="option"
        >
          <strong>${book.title}</strong>
          <span>${book.author}</span>
        </button>
      `
    )
    .join("");
  elements.moduleSuggestions.classList.add("visible");
}

function renderModuleSelectedBooks() {
  const selectedBooks = getModuleSelectedBooks();

  if (selectedBooks.length === 0) {
    elements.moduleSelectedGrid.innerHTML = `
      <div class="module-chip-empty">
        Add 2 to 4 books to shape your recommendations.
      </div>
    `;
  } else {
    elements.moduleSelectedGrid.innerHTML = selectedBooks
      .map(
        (book) => `
          <article class="module-chip">
            <span>${book.title}</span>
            <button
              type="button"
              class="module-chip-remove"
              data-module-remove-id="${book.id}"
              aria-label="Remove ${book.title}"
            >
              ×
            </button>
          </article>
        `
      )
      .join("");
  }

  elements.moduleCount.textContent = `${selectedBooks.length} / ${MODULE_MAX_SELECTIONS}`;
}

function renderModulePreview() {
  const selectedBooks = getModuleSelectedBooks();
  elements.modulePreviewCount.textContent = `${selectedBooks.length} selected`;

  if (selectedBooks.length === 0) {
    elements.modulePreviewEmpty.classList.remove("hidden");
    elements.modulePreviewGrid.innerHTML = "";
    return;
  }

  elements.modulePreviewEmpty.classList.add("hidden");
  elements.modulePreviewGrid.innerHTML = selectedBooks
    .map(
      (book) => `
        <article
          class="module-cover-card"
          style="background: ${book.cover.background}; color: ${book.cover.text};"
        >
          <small>${book.author}</small>
          <strong>${book.title}</strong>
          <div class="module-cover-bar" style="background: ${book.cover.accent};"></div>
        </article>
      `
    )
    .join("");
}

function renderModuleUI() {
  renderModuleSelectedBooks();
  renderModulePreview();
  elements.moduleStatus.textContent = moduleStatusText();
}

function renderResults() {
  if (!state.hasSubmitted || state.results.length === 0) {
    elements.emptyState.classList.remove("hidden");
    elements.resultsGrid.innerHTML = "";
    return;
  }

  elements.emptyState.classList.add("hidden");
  elements.resultsGrid.innerHTML = state.results
    .map((book, index) => {
      return `
        <article class="result-card reveal" style="animation-delay: ${index * 45}ms;">
          ${coverMarkup(book)}
          <div class="card-copy">
            <div class="availability-row">
              <span>${titleCase(book.genres[0])} · ${book.format}</span>
              <span class="availability-pill ${stockClass(book)}">${book.availability}</span>
            </div>
            <h3>${book.title}</h3>
            <p class="card-author">${book.author}</p>
            <div class="price-row">
              <strong>${currency(book.price)}</strong>
              <span>${inventoryCopy(book)}</span>
            </div>
            <p class="card-reason">${buildExplanation(book)}</p>
            <div class="card-actions">
              <a
                href="#book/${book.id}"
                class="primary-inline-button"
                data-view-book-id="${book.id}"
              >
                View Book
              </a>
              <button
                class="text-button"
                type="button"
                data-focus-from="${book.id}"
              >
                More like this
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function updateUI() {
  renderSelectedBooks();
  renderQuickPicks();
  renderResults();
  renderModuleUI();
  updateSummary();

  elements.recommendButton.textContent = state.hasSubmitted
    ? "Update Recommendations"
    : "Get Recommendations";
  elements.refreshResults.disabled = !state.hasSubmitted;
}

function setStatus(message) {
  elements.statusMessage.textContent = message;
}

function addSelection(bookId) {
  if (state.selectedIds.includes(bookId)) {
    setStatus("That book is already in your list.");
    return;
  }

  if (state.selectedIds.length >= MAX_SELECTIONS) {
    setStatus("You can compare up to 5 favorite books at a time.");
    return;
  }

  state.selectedIds.push(bookId);
  state.hasSubmitted = false;
  state.results = [];
  elements.bookInput.value = "";
  renderSuggestions("");
  setStatus("Book added.");
  updateUI();
}

function addModuleSelection(bookId) {
  if (state.moduleSelectedIds.includes(bookId)) {
    setModuleStatus("That book is already in your launcher list.");
    return;
  }

  if (state.moduleSelectedIds.length >= MODULE_MAX_SELECTIONS) {
    setModuleStatus("You can add up to 4 books here.");
    return;
  }

  state.moduleSelectedIds.push(bookId);
  state.moduleStatusMessage = "";
  elements.moduleBookInput.value = "";
  renderModuleSuggestions("");
  renderModuleUI();
}

function removeSelection(bookId) {
  state.selectedIds = state.selectedIds.filter((id) => id !== bookId);
  state.hasSubmitted = false;
  state.results = [];
  setStatus("Book removed.");
  updateUI();
}

function removeModuleSelection(bookId) {
  state.moduleSelectedIds = state.moduleSelectedIds.filter((id) => id !== bookId);
  state.moduleStatusMessage = "";
  renderModuleUI();
}

function runRecommendations() {
  if (state.selectedIds.length < MIN_SELECTIONS) {
    setStatus("Add at least 3 books to unlock recommendations.");
    return;
  }

  state.hasSubmitted = true;
  recommendBooks();
  updateUI();
  setStatus("Recommendations refreshed.");
}

function syncModeButtons() {
  [...elements.modeGroup.querySelectorAll(".mode-chip")].forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === state.focusMode);
  });
}

function openDiscoveryWorkspace() {
  const pendingQuery = elements.moduleBookInput.value.trim();
  const nextModuleIds = [...state.moduleSelectedIds];
  let mainInputQuery = "";

  if (pendingQuery) {
    const pendingMatch = findCatalogMatches(pendingQuery, nextModuleIds, 1)[0];
    if (pendingMatch) {
      if (!nextModuleIds.includes(pendingMatch.id) && nextModuleIds.length < MODULE_MAX_SELECTIONS) {
        nextModuleIds.push(pendingMatch.id);
      }
      elements.moduleBookInput.value = "";
      renderModuleSuggestions("");
    } else {
      mainInputQuery = pendingQuery;
    }
  }

  state.moduleSelectedIds = nextModuleIds;
  state.moduleStatusMessage = "";
  if (nextModuleIds.length > 0) {
    state.selectedIds = [...nextModuleIds];
    state.hasSubmitted = false;
    state.results = [];
  }
  updateUI();

  elements.discoveryWorkspace.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  if (mainInputQuery) {
    elements.bookInput.value = mainInputQuery;
    renderSuggestions(mainInputQuery);
    setStatus("Choose a title from the suggestions or try a closer search.");
  } else {
    elements.bookInput.value = "";
    renderSuggestions("");
  }

  if (nextModuleIds.length >= MIN_SELECTIONS && !mainInputQuery) {
    runRecommendations();
  } else if (nextModuleIds.length > 0 && nextModuleIds.length < MIN_SELECTIONS) {
    setStatus("Add one more book to unlock recommendations.");
  } else if (!mainInputQuery) {
    setStatus("Add a few books you loved to get personalized recommendations.");
  }

  window.requestAnimationFrame(() => {
    elements.bookInput.focus();
  });
}

elements.searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = elements.bookInput.value.trim().toLowerCase();
  if (!query) {
    setStatus("Type a title or author to add a favorite book.");
    return;
  }
  const exactMatch = catalog.find(
    (book) =>
      !state.selectedIds.includes(book.id) &&
      `${book.title} ${book.author}`.toLowerCase().includes(query)
  );
  if (exactMatch) {
    addSelection(exactMatch.id);
    return;
  }
  setStatus("Choose a title from the suggestions or try a closer search.");
});

elements.moduleSearchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = elements.moduleBookInput.value.trim();
  if (!query) {
    setModuleStatus("Type a title or author to add a book.");
    return;
  }

  const exactMatch = findCatalogMatches(query, state.moduleSelectedIds, 1)[0];
  if (exactMatch) {
    addModuleSelection(exactMatch.id);
    return;
  }

  setModuleStatus("Choose a title from the suggestions or try a closer search.");
});

elements.bookInput.addEventListener("input", (event) => {
  renderSuggestions(event.target.value);
});

elements.bookInput.addEventListener("focus", (event) => {
  renderSuggestions(event.target.value);
});

elements.moduleBookInput.addEventListener("input", (event) => {
  state.moduleStatusMessage = "";
  renderModuleSuggestions(event.target.value);
  renderModuleUI();
});

elements.moduleBookInput.addEventListener("focus", (event) => {
  renderModuleSuggestions(event.target.value);
});

document.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add-id]");
  if (addButton) {
    addSelection(addButton.dataset.addId);
    return;
  }

  const removeButton = event.target.closest("[data-remove-id]");
  if (removeButton) {
    removeSelection(removeButton.dataset.removeId);
    return;
  }

  const moduleAddButton = event.target.closest("[data-module-add-id]");
  if (moduleAddButton) {
    addModuleSelection(moduleAddButton.dataset.moduleAddId);
    return;
  }

  const moduleRemoveButton = event.target.closest("[data-module-remove-id]");
  if (moduleRemoveButton) {
    removeModuleSelection(moduleRemoveButton.dataset.moduleRemoveId);
    return;
  }

  const viewBookLink = event.target.closest("[data-view-book-id]");
  if (viewBookLink) {
    event.preventDefault();
    showDetailView(viewBookLink.dataset.viewBookId);
    return;
  }

  const focusButton = event.target.closest("[data-focus-from]");
  if (focusButton) {
    state.focusMode = "closer";
    syncModeButtons();
    state.variationSeed += 1;
    runRecommendations();
    setStatus("Refreshed the mix toward a closer match.");
    return;
  }

  if (
    !event.target.closest(".search-form") &&
    !event.target.closest(".suggestions")
  ) {
    elements.suggestions.classList.remove("visible");
  }

  if (
    !event.target.closest(".inline-entry-form") &&
    !event.target.closest(".module-suggestions")
  ) {
    elements.moduleSuggestions.classList.remove("visible");
  }
});

elements.recommendButton.addEventListener("click", () => {
  runRecommendations();
});

elements.refreshResults.addEventListener("click", () => {
  if (!state.hasSubmitted) {
    setStatus("Use the main button to generate the first set of recommendations.");
    return;
  }
  state.variationSeed += 1;
  runRecommendations();
});

elements.clearSelection.addEventListener("click", () => {
  state.selectedIds = [];
  state.hasSubmitted = false;
  state.results = [];
  setStatus("Selection cleared.");
  updateUI();
});

elements.swapPicks.addEventListener("click", () => {
  const selectableQuickPicks = quickPickIds.filter((id) => !state.selectedIds.includes(id));
  state.quickPickOffset =
    selectableQuickPicks.length === 0
      ? 0
      : (state.quickPickOffset + 3) % selectableQuickPicks.length;
  renderQuickPicks();
});

elements.modeGroup.addEventListener("click", (event) => {
  const button = event.target.closest("[data-mode]");
  if (!button) {
    return;
  }
  state.focusMode = button.dataset.mode;
  syncModeButtons();
  if (state.hasSubmitted) {
    runRecommendations();
  } else {
    updateSummary();
  }
});

elements.sortSelect.addEventListener("change", (event) => {
  state.sortMode = event.target.value;
  if (state.hasSubmitted) {
    runRecommendations();
  }
});

elements.moduleGoButton.addEventListener("click", () => {
  openDiscoveryWorkspace();
});

elements.detailBackButton.addEventListener("click", () => {
  showRecommendationView({ updateHash: true, scrollToResults: true });
});

document.querySelectorAll("[data-detail-action]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!state.activeBookId) {
      return;
    }

    const activeBook = catalogById.get(state.activeBookId);
    const action = button.dataset.detailAction;
    state.detailAction = action;
    state.detailFeedback =
      action === "cart"
        ? `${activeBook.title} added to cart.`
        : action === "buy"
          ? `Ready to buy ${activeBook.title}.`
          : `${activeBook.title} saved to your wish list.`;

    renderBookDetail(state.activeBookId);
  });
});

window.addEventListener("hashchange", () => {
  syncViewFromHash();
});

syncModeButtons();
updateUI();
syncViewFromHash();
