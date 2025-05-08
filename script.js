const apiKey = 'ff14aaccba6b9dd7ac668aff19eddb1e';

function fetchRecommendations() {
  const recommendationContainer = document.getElementById('recommendations');
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=id-ID`)
    .then(res => res.json())
    .then(data => {
      const movies = data.results;
      recommendationContainer.innerHTML = ''; // Clear previous recommendations
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

// Memanggil fetchRecommendations saat halaman dimuat
window.onload = function() {
  fetchRecommendations();
};
