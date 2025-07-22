import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { sessionModel } from '../models/sessionModel'
import { observer } from 'mobx-react-lite'
import Navbar from '../components/Navbar'

const HomeView = observer(() => {
  const sessionId = useAuthStore((state) => state.sessionId)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchMode, setSearchMode] = useState(false)

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      try {
        const data = searchMode && searchQuery
          ? await sessionModel.searchMovies(searchQuery, page, sessionId)
          : await sessionModel.getMovieList(page, sessionId)

        setMovies(data.results || [])
        setTotalPages(data.total_pages || 1)
      } catch (err) {
        console.error('Gagal ambil data film:', err)
      } finally {
        setLoading(false)
      }
    }

    if (sessionId) {
      fetchMovies()
    }
  }, [sessionId, page, searchMode])

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1)

    if (searchQuery.trim() === '') {
      setSearchMode(false) // kembali ke daftar semua film
    } else {
      setSearchMode(true) // cari berdasarkan query
    }
  }

  const getPageNumbers = () => {
    const maxButtons = 5
    const pages = []
    const half = Math.floor(maxButtons / 2)
    let start = Math.max(1, page - half)
    let end = Math.min(totalPages, start + maxButtons - 1)

    if (end - start < maxButtons - 1) {
      start = Math.max(1, end - maxButtons + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '23px' }}>
        <Navbar />
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <input
            type="text"
            placeholder="Cari film..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '0.5rem',
              width: '100%',
              maxWidth: '400px',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </form>

      {/* Movie List */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <p>Loading movies...</p>
        </div>
      ) : (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            maxWidth: '960px',
            margin: '0 auto'
          }}>
            {movies.map((movie) => (
              <div key={movie.id} style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '0.5rem',
                textAlign: 'center',
                backgroundColor: '#fff'
              }}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  style={{ width: '100%', borderRadius: '4px' }}
                />
                <h4 style={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>
                  {movie.title}
                </h4>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div style={{
            marginTop: '2rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}>
            <button
              disabled={page === 1}
              onClick={() => setPage(prev => Math.max(1, prev - 1))}
              style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
            >
              ← Prev
            </button>

            {getPageNumbers().map((pg) => (
              <button
                key={pg}
                onClick={() => setPage(pg)}
                style={{
                  padding: '0.5rem 0.75rem',
                  fontWeight: pg === page ? 'bold' : 'normal',
                  backgroundColor: pg === page ? '#01b4e4' : '#fff',
                  color: pg === page ? 'white' : 'black',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {pg}
              </button>
            ))}

            <button
              disabled={page >= totalPages}
              onClick={() => setPage(prev => prev + 1)}
              style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
            >
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  )
})

export default HomeView
