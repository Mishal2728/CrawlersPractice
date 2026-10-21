class MovieApp {
  constructor() {
    this.API_KEY = "63038c1c";
    this.BASE_URL = "https://www.omdbapi.com/";
    this.FALLBACK_IMG =
      "https://placehold.co/300x450/593d3b/ffffff?text=No+Poster";

    this.isSearching = false;
    this.currentQuery = "";
    this.currentFilter = {
      genre: "",
      year: "",
      sort: "",
    };

    // Popular IMDb IDs for the Trending carousel
    this.TRENDING_IDS = [
      "tt4154796", // Avengers: Endgame
      "tt1375666", // Inception
      "tt0468569", // The Dark Knight
      "tt0816692", // Interstellar
      "tt10872600", // Spider-Man: No Way Home
      "tt1853728", // Django Unchained
      "tt0993846", // The Wolf of Wall Street
      "tt9376612", // Shang-Chi
      "tt1877830", // The Batman
      "tt15398776", // Oppenheimer
    ];

    // Search keyword used per genre when browsing discover
    this.GENRE_KEYWORDS = {
      Action: "war",
      Comedy: "funny",
      Drama: "life",
      Horror: "horror",
      "Sci-Fi": "space",
      Thriller: "mystery",
      Animation: "adventure",
    };

    this.init();
  }

  /* ───────────────────────────── INIT ───────────────────────────── */

  async init() {
    this.setupEventListeners();
    await Promise.all([this.loadTrendingMovies(), this.loadDiscoverMovies()]);
  }

  setupEventListeners() {
    const searchInput = document.getElementById("searchInput");
    const genreFilter = document.getElementById("genreFilter");
    const yearFilter = document.getElementById("yearFilter");
    const sortFilter = document.getElementById("sortFilter");
    const clearBtn = document.getElementById("clearBtn");
    const trendingPrev = document.getElementById("trendingPrevBtn");
    const trendingNext = document.getElementById("trendingNxtBtn");

    // Debounced search
    let searchTimeout;
    searchInput.addEventListener("input", (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        this.handleSearch(e.target.value);
      }, 500);
    });

    genreFilter.addEventListener("change", () => this.handleFilterChange());
    yearFilter.addEventListener("change", () => this.handleFilterChange());
    sortFilter.addEventListener("change", () => this.handleFilterChange());
    clearBtn.addEventListener("click", () => this.clearAllFilters());
    trendingPrev.addEventListener("click", () => this.scrollCarousel("prev"));
    trendingNext.addEventListener("click", () => this.scrollCarousel("next"));

    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.closeModal();
    });
  }

  /* ─────────────────────────── API CALLS ─────────────────────────── */

  // Fetch a single movie's full details by IMDB ID
  async fetchMovieById(id) {
    const response = await fetch(
      `${this.BASE_URL}?apikey=${this.API_KEY}&i=${id}&plot=short`
    );
    const data = await response.json();
    return data.Response === "True" ? data : null;
  }

  // Search movies by title (returns basic list: Title, Year, Poster, imdbID)
  async searchMovies(query, year = "") {
    let url = `${this.BASE_URL}?apikey=${this.API_KEY}&s=${encodeURIComponent(query)}&type=movie`;
    if (year) url += `&y=${year}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.Response === "True" ? data.Search : [];
  }

  /* ──────────────────────────── TRENDING ─────────────────────────── */

  async loadTrendingMovies() {
    const carousel = document.getElementById("trendingCarousel");
    carousel.innerHTML =
      '<div class="loading"><i class="ri-loader-4-line spin"></i> Loading Trending Movies...</div>';

    try {
      // Fetch all trending movies in parallel
      const promises = this.TRENDING_IDS.map((id) => this.fetchMovieById(id));
      const movies = await Promise.all(promises);
      const valid = movies.filter((m) => m !== null);

      if (valid.length === 0) {
        carousel.innerHTML =
          '<div class="error"><i class="ri-error-warning-line"></i> Could not load trending movies.</div>';
        return;
      }

      carousel.innerHTML = valid
        .map((movie, index) => this.createTrendingCard(movie, index + 1))
        .join("");
    } catch (error) {
      console.error("Error loading trending:", error);
      carousel.innerHTML =
        '<div class="error"><i class="ri-error-warning-line"></i> Error loading trending movies.</div>';
    }
  }

  /* ──────────────────────────── DISCOVER ─────────────────────────── */

  async loadDiscoverMovies() {
    const grid = document.getElementById("moviesGrid");
    grid.innerHTML =
      '<div class="loading"><i class="ri-loader-4-line spin"></i> Loading Movies...</div>';

    try {
      // Pick a search keyword based on genre or fall back to generic
      const keyword =
        this.currentFilter.genre
          ? this.GENRE_KEYWORDS[this.currentFilter.genre] ||
            this.currentFilter.genre
          : "the";

      let movies = await this.searchMovies(keyword, this.currentFilter.year);

      // Client-side sort (Year & Title available in basic search results)
      if (this.currentFilter.sort) {
        movies = this.sortMovies(movies, this.currentFilter.sort);
      }

      this.displayMovies(movies, "moviesGrid");
    } catch (error) {
      console.error("Error loading discover:", error);
      grid.innerHTML =
        '<div class="error"><i class="ri-error-warning-line"></i> Error loading movies. Please try again.</div>';
    }
  }

  /* ────────────────────────── CARD BUILDERS ──────────────────────── */

  createTrendingCard(movie, rank) {
    const poster =
      movie.Poster && movie.Poster !== "N/A" ? movie.Poster : this.FALLBACK_IMG;
    const rating = movie.imdbRating !== "N/A" ? movie.imdbRating : "–";
    const year = movie.Year || "TBA";
    const genre = movie.Genre ? movie.Genre.split(",")[0].trim() : "";

    return `
      <div class="trending-card" onclick="app.showModal('${movie.imdbID}')" role="button" tabindex="0">
        <div class="trending-rank">#${rank}</div>
        <img src="${poster}" alt="${movie.Title}" class="trending-poster"
             loading="lazy" onerror="this.src='${this.FALLBACK_IMG}'">
        <div class="trending-overlay">
          <i class="ri-play-circle-fill trending-play"></i>
        </div>
        <div class="trending-info">
          <div class="trending-title">${movie.Title}</div>
          <div class="trending-meta">
            <span class="meta-year"><i class="ri-calendar-line"></i> ${year}</span>
            <span class="meta-rating"><i class="ri-star-fill"></i> ${rating}</span>
          </div>
          ${genre ? `<span class="meta-genre">${genre}</span>` : ""}
        </div>
      </div>`;
  }

  createMovieCard(movie) {
    const poster =
      movie.Poster && movie.Poster !== "N/A" ? movie.Poster : this.FALLBACK_IMG;
    const year = movie.Year || "TBA";

    return `
      <div class="movie-card" onclick="app.showModal('${movie.imdbID}')" role="button" tabindex="0">
        <div class="movie-poster-wrap">
          <img src="${poster}" alt="${movie.Title}" class="movie-poster"
               loading="lazy" onerror="this.src='${this.FALLBACK_IMG}'">
          <div class="movie-overlay">
            <i class="ri-play-circle-fill play-icon"></i>
          </div>
        </div>
        <div class="movie-info">
          <div class="movie-title">${movie.Title}</div>
          <div class="movie-year">${year}</div>
        </div>
      </div>`;
  }

  displayMovies(movies, containerId) {
    const container = document.getElementById(containerId);
    if (!movies || movies.length === 0) {
      container.innerHTML = `
        <div class="no-results">
          <i class="ri-film-line"></i>
          <h2>No Movies Found</h2>
          <p>Try adjusting your search or filters</p>
        </div>`;
      return;
    }
    container.innerHTML = movies.map((m) => this.createMovieCard(m)).join("");
  }

  /* ─────────────────────────── SEARCH ────────────────────────────── */

  async handleSearch(query) {
    const trimmed = query.trim();
    const trendingSection = document.getElementById("trendingSection");
    const sectionTitle = document.getElementById("randomSectionTitle");
    const clearBtn = document.getElementById("clearBtn");

    if (!trimmed) {
      this.isSearching = false;
      this.currentQuery = "";
      trendingSection.style.display = "block";
      sectionTitle.textContent = "🎬 Discover";
      clearBtn.classList.remove("active");
      await this.loadDiscoverMovies();
      return;
    }

    this.isSearching = true;
    this.currentQuery = trimmed;
    trendingSection.style.display = "none";
    sectionTitle.textContent = `🔎 Results for "${trimmed}"`;
    clearBtn.classList.add("active");

    const grid = document.getElementById("moviesGrid");
    grid.innerHTML =
      '<div class="loading"><i class="ri-loader-4-line spin"></i> Searching...</div>';

    try {
      let results = await this.searchMovies(trimmed, this.currentFilter.year);

      if (this.currentFilter.sort) {
        results = this.sortMovies(results, this.currentFilter.sort);
      }

      this.displayMovies(results, "moviesGrid");
    } catch (error) {
      console.error("Search error:", error);
      grid.innerHTML =
        '<div class="error"><i class="ri-error-warning-line"></i> Search failed. Please try again.</div>';
    }
  }

  /* ────────────────────────── FILTERS ────────────────────────────── */

  async handleFilterChange() {
    const genreFilter = document.getElementById("genreFilter");
    const yearFilter = document.getElementById("yearFilter");
    const sortFilter = document.getElementById("sortFilter");
    const searchInput = document.getElementById("searchInput");
    const clearBtn = document.getElementById("clearBtn");
    const trendingSection = document.getElementById("trendingSection");
    const sectionTitle = document.getElementById("randomSectionTitle");

    this.currentFilter = {
      genre: genreFilter.value,
      year: yearFilter.value,
      sort: sortFilter.value,
    };

    const hasFilter =
      this.currentFilter.genre ||
      this.currentFilter.year ||
      this.currentFilter.sort;

    if (hasFilter || searchInput.value.trim()) {
      clearBtn.classList.add("active");
    } else {
      clearBtn.classList.remove("active");
    }

    if (searchInput.value.trim()) {
      trendingSection.style.display = "none";
      await this.handleSearch(searchInput.value);
    } else {
      if (hasFilter) {
        trendingSection.style.display = "none";
        sectionTitle.textContent = "🎬 Filtered Movies";
      } else {
        trendingSection.style.display = "block";
        sectionTitle.textContent = "🎬 Discover";
      }
      await this.loadDiscoverMovies();
    }
  }

  sortMovies(movies, sortBy) {
    const sorted = [...movies];
    switch (sortBy) {
      case "rating":
        return sorted.sort(
          (a, b) =>
            parseFloat(b.imdbRating || 0) - parseFloat(a.imdbRating || 0)
        );
      case "release":
        return sorted.sort(
          (a, b) => parseInt(b.Year || 0) - parseInt(a.Year || 0)
        );
      case "alphabetical":
        return sorted.sort((a, b) =>
          (a.Title || "").localeCompare(b.Title || "")
        );
      default:
        return sorted;
    }
  }

  clearAllFilters() {
    document.getElementById("searchInput").value = "";
    document.getElementById("genreFilter").value = "";
    document.getElementById("yearFilter").value = "";
    document.getElementById("sortFilter").value = "";
    document.getElementById("clearBtn").classList.remove("active");
    document.getElementById("trendingSection").style.display = "block";
    document.getElementById("randomSectionTitle").textContent = "🎬 Discover";
    this.isSearching = false;
    this.currentQuery = "";
    this.currentFilter = { genre: "", year: "", sort: "" };
    this.loadDiscoverMovies();
  }

  /* ───────────────────────── CAROUSEL ────────────────────────────── */

  scrollCarousel(direction) {
    const carousel = document.getElementById("trendingCarousel");
    carousel.scrollBy({
      left: direction === "prev" ? -340 : 340,
      behavior: "smooth",
    });
  }

  /* ──────────────────────────── MODAL ────────────────────────────── */

  async showModal(imdbId) {
    // Show loading modal immediately
    let modal = document.getElementById("movieModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "movieModal";
      modal.className = "modal-overlay";
      modal.addEventListener("click", (e) => {
        if (e.target === modal) this.closeModal();
      });
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-loading">
          <i class="ri-loader-4-line spin"></i> Loading...
        </div>
      </div>`;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    try {
      const movie = await this.fetchMovieById(imdbId);
      if (!movie) {
        this.closeModal();
        return;
      }

      const poster =
        movie.Poster && movie.Poster !== "N/A"
          ? movie.Poster
          : this.FALLBACK_IMG;
      const rating =
        movie.imdbRating !== "N/A" ? `⭐ ${movie.imdbRating}` : "⭐ N/A";

      modal.innerHTML = `
        <div class="modal-content">
          <button class="modal-close" id="modalCloseBtn" aria-label="Close">
            <i class="ri-close-line"></i>
          </button>
          <div class="modal-body">
            <div class="modal-poster-wrap">
              <img src="${poster}" alt="${movie.Title}" class="modal-poster"
                   onerror="this.src='${this.FALLBACK_IMG}'">
            </div>
            <div class="modal-details">
              <h2 class="modal-title">${movie.Title}</h2>
              <div class="modal-badges">
                ${movie.Year ? `<span class="badge">${movie.Year}</span>` : ""}
                ${movie.Runtime && movie.Runtime !== "N/A" ? `<span class="badge">${movie.Runtime}</span>` : ""}
                ${movie.Rated && movie.Rated !== "N/A" ? `<span class="badge">${movie.Rated}</span>` : ""}
                <span class="badge badge-rating">${rating}</span>
              </div>
              ${movie.Genre && movie.Genre !== "N/A" ? `<div class="modal-genre">${movie.Genre.split(",").map(g => `<span class="genre-pill">${g.trim()}</span>`).join("")}</div>` : ""}
              <p class="modal-plot">${movie.Plot && movie.Plot !== "N/A" ? movie.Plot : "No description available."}</p>
              <div class="modal-info-grid">
                ${movie.Director && movie.Director !== "N/A" ? `<div class="info-row"><span class="info-label"><i class="ri-movie-line"></i> Director</span><span>${movie.Director}</span></div>` : ""}
                ${movie.Actors && movie.Actors !== "N/A" ? `<div class="info-row"><span class="info-label"><i class="ri-user-star-line"></i> Cast</span><span>${movie.Actors}</span></div>` : ""}
                ${movie.Language && movie.Language !== "N/A" ? `<div class="info-row"><span class="info-label"><i class="ri-global-line"></i> Language</span><span>${movie.Language}</span></div>` : ""}
                ${movie.Country && movie.Country !== "N/A" ? `<div class="info-row"><span class="info-label"><i class="ri-map-pin-line"></i> Country</span><span>${movie.Country}</span></div>` : ""}
                ${movie.Awards && movie.Awards !== "N/A" ? `<div class="info-row"><span class="info-label"><i class="ri-trophy-line"></i> Awards</span><span>${movie.Awards}</span></div>` : ""}
                ${movie.BoxOffice && movie.BoxOffice !== "N/A" ? `<div class="info-row"><span class="info-label"><i class="ri-money-dollar-circle-line"></i> Box Office</span><span>${movie.BoxOffice}</span></div>` : ""}
              </div>
            </div>
          </div>
        </div>`;

      document.getElementById("modalCloseBtn").addEventListener("click", () =>
        this.closeModal()
      );
    } catch (error) {
      console.error("Error loading movie details:", error);
      this.closeModal();
    }
  }

  closeModal() {
    const modal = document.getElementById("movieModal");
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }
}

/* ──────────────── BOOT ──────────────── */
let app;
document.addEventListener("DOMContentLoaded", () => {
  app = new MovieApp();
});
