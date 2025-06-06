const apiKey = 'ff14aaccba6b9dd7ac668aff19eddb1e';

    const searchIcon = document.querySelector('.search-icon');
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.querySelector('#searchInput');
    const searchButton = document.querySelector('.search-button');

    searchIcon.addEventListener('click', () => {
      searchContainer.classList.toggle('hidden');
      if (!searchContainer.classList.contains('hidden')) {
        searchInput.focus();
      }
    });

    searchInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        searchMovie();
      }
    });

    function fetchRecommendations() {
      const recommendationContainer = document.getElementById('recommendations');
      const recommendationTitle = document.getElementById('recommendationTitle');

      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=id-ID`)
        .then(res => res.json())
        .then(data => {
          const movies = data.results;
          recommendationTitle.style.display = 'block';
          movies.slice(0, 5).forEach(movie => {
            const recLink = document.createElement('a');
            recLink.href = `https://www.themoviedb.org/movie/${movie.id}`;
            recLink.target = '_blank';
            recLink.classList.add('recommendation');

            const poster = movie.poster_path
              ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
              : 'https://via.placeholder.com/100x150?text=No+Image';

            recLink.innerHTML = `
              <img src="${poster}" alt="${movie.title}" />
              <div>
                <h3>${movie.title}</h3>
                <p>Rating: ${movie.vote_average}</p>
                <p>${movie.overview || 'Deskripsi tidak tersedia.'}</p>
              </div>
            `;
            recommendationContainer.appendChild(recLink);
          });
        })
        .catch(error => {
          console.error('Gagal fetch rekomendasi:', error);
        });
    }

    function searchMovie() {
      const query = document.getElementById('searchInput').value.trim();
      if (!query) return;

      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=id-ID&query=${encodeURIComponent(query)}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          const movies = data.results;
          const movieContainer = document.getElementById('movies');
          movieContainer.innerHTML = '';

          if (movies.length === 0) {
            movieContainer.innerHTML = '<p>Film tidak ditemukan.</p>';
            return;
          }

          movies.forEach(movie => {
            const movieLink = document.createElement('a');
            movieLink.href = `https://www.themoviedb.org/movie/${movie.id}`;
            movieLink.target = '_blank';
            movieLink.classList.add('movie');

            const poster = movie.poster_path
              ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
              : 'https://via.placeholder.com/100x150?text=No+Image';

            movieLink.innerHTML = `
              <img src="${poster}" alt="${movie.title}" />
              <div>
                <h3>${movie.title}</h3>
                <p>Rating: ${movie.vote_average}</p>
                <p>${movie.overview || 'Deskripsi tidak tersedia.'}</p>
              </div>
            `;
            movieContainer.appendChild(movieLink);
          });
        })
        .catch(error => {
          console.error('Gagal fetch film:', error);
        });
    }

    // Tampilkan rekomendasi saat halaman pertama kali dibuka
    fetchRecommendations();