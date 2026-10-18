
import { useState } from 'react'
import './App.css'
import opportunities from './data/opportunities.js'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedView, setSelectedView] = useState('Home')
  const [selectedOpportunity, setSelectedOpportunity] = useState(null)
  const [savedIds, setSavedIds] = useState([])

  const filteredOpportunities = opportunities.filter((item) => {
    const search = searchTerm.toLowerCase().trim()

    const matchesSearch =
      item.title.toLowerCase().includes(search) ||
      item.organization.toLowerCase().includes(search) ||
      item.skills.some((skill) => skill.toLowerCase().includes(search))

    const matchesCategory =
      selectedCategory === 'All' || item.type === selectedCategory

    const matchesSaved =
      selectedView !== 'Saved' || savedIds.includes(item.id)

    return matchesSearch && matchesCategory && matchesSaved
  })

  function toggleSaved(id) {
    setSavedIds((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id]
    )
  }

  function exploreOpportunities() {
    setSelectedView('Opportunities')
    setTimeout(() => {
      document.getElementById('opportunities')?.scrollIntoView({
        behavior: 'smooth',
      })
    }, 0)
  }

  return (
    <div className="app">
      <header className="navbar">
        <button className="brand" onClick={() => setSelectedView('Home')}>
          <span className="brand-icon">O</span>
          OpportunityHub
        </button>

        <nav className="nav-links">
          {['Home', 'Opportunities', 'Saved', 'Profile'].map((view) => (
            <button
              key={view}
              className={`nav-link ${selectedView === view ? 'active' : ''}`}
              onClick={() => setSelectedView(view)}
            >
              {view}
              {view === 'Saved' && savedIds.length > 0 && (
                <span className="saved-count">{savedIds.length}</span>
              )}
            </button>
          ))}
        </nav>
      </header>

      <main>
        {selectedView === 'Home' && (
          <section className="hero">
            <div className="hero-content">
              <p className="eyebrow">YOUR NEXT OPPORTUNITY STARTS HERE</p>
              <h1>
                Discover opportunities.
                <br />
                <span>Build your future.</span>
              </h1>
              <p className="hero-description">
                Find internships, hackathons, scholarships, and competitions
                that help you learn, grow, and achieve more.
              </p>
              <button className="primary-button" onClick={exploreOpportunities}>
                Explore Opportunities <span>→</span>
              </button>

              <div className="hero-stats">
                <div>
                  <strong>{opportunities.length}+</strong>
                  <span>Sample listings</span>
                </div>
                <div>
                  <strong>4</strong>
                  <span>Categories</span>
                </div>
                <div>
                  <strong>{savedIds.length}</strong>
                  <span>Saved by you</span>
                </div>
              </div>
            </div>

            <div className="hero-art" aria-hidden="true">
              <div className="art-orbit orbit-one" />
              <div className="art-orbit orbit-two" />
              <div className="art-center">
                <span className="art-star">✦</span>
                <strong>Your future</strong>
                <small>Starts with one step</small>
              </div>
              <div className="floating-card float-top">
                <span className="float-icon">✧</span>
                <div>
                  <strong>Learn new skills</strong>
                  <small>Keep growing</small>
                </div>
              </div>
              <div className="floating-card float-bottom">
                <span className="float-icon">↗</span>
                <div>
                  <strong>Make it happen</strong>
                  <small>One opportunity at a time</small>
                </div>
              </div>
            </div>
          </section>
        )}

        {selectedView === 'Profile' && (
          <section className="profile-panel">
            <div className="profile-avatar">S</div>
            <p className="eyebrow">YOUR SPACE</p>
            <h1>Student Profile</h1>
            <p>
              Welcome to OpportunityHub! Explore opportunities, save your
              favorites, and discover new ways to develop your skills.
            </p>
            <div className="profile-stat">
              <strong>{savedIds.length}</strong>
              <span>Opportunities saved</span>
            </div>
            <button className="primary-button" onClick={exploreOpportunities}>
              Explore Opportunities →
            </button>
          </section>
        )}

        <section className="opportunities-section" id="opportunities">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                {selectedView === 'Saved'
                  ? 'YOUR COLLECTION'
                  : 'EXPLORE AND GROW'}
              </p>
              <h2>
                {selectedView === 'Saved'
                  ? 'Saved Opportunities'
                  : 'Latest Opportunities'}
              </h2>
              <p className="section-description">
                Find your next step, build experience, and unlock your potential.
              </p>
            </div>
            {selectedView === 'Saved' && (
              <button
                className="text-button"
                onClick={() => setSelectedView('Opportunities')}
              >
                Browse all →
              </button>
            )}
          </div>

          <div className="search-filters">
            <label className="search-box">
              <span>⌕</span>
              <input
                type="search"
                placeholder="Search by title, organization, or skill..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </label>

            <select
              aria-label="Filter by category"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Internship">Internships</option>
              <option value="Hackathon">Hackathons</option>
              <option value="Scholarship">Scholarships</option>
              <option value="Competition">Competitions</option>
            </select>
          </div>

          <div className="results-line">
            <span>
              {filteredOpportunities.length}{' '}
              {filteredOpportunities.length === 1 ? 'opportunity' : 'opportunities'} found
            </span>
            <button
              className="text-button"
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('All')
              }}
            >
              Clear filters
            </button>
          </div>

          {filteredOpportunities.length > 0 ? (
            <div className="opportunity-grid">
              {filteredOpportunities.map((item) => (
                <article className="opportunity-card" key={item.id}>
                  <div className="card-top">
                    <span className={`category-pill ${item.type.toLowerCase()}`}>
                      {item.type}
                    </span>
                    <button
                      className={`save-button ${
                        savedIds.includes(item.id) ? 'is-saved' : ''
                      }`}
                      onClick={() => toggleSaved(item.id)}
                      aria-label={
                        savedIds.includes(item.id)
                          ? 'Remove saved opportunity'
                          : 'Save opportunity'
                      }
                      title={
                        savedIds.includes(item.id)
                          ? 'Remove from saved'
                          : 'Save opportunity'
                      }
                    >
                      {savedIds.includes(item.id) ? '♥' : '♡'}
                    </button>
                  </div>

                  <h3>{item.title}</h3>
                  <p className="organization">{item.organization}</p>

                  <div className="card-meta">
                    <span>⌖ {item.mode}</span>
                    <span>◷ Deadline: {item.deadline}</span>
                  </div>

                  <div className="skills">
                    {item.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>

                  <button
                    className="card-action"
                    onClick={() => setSelectedOpportunity(item)}
                  >
                    View Opportunity <span>→</span>
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">⌕</div>
              <h3>
                {selectedView === 'Saved'
                  ? 'No saved opportunities yet'
                  : 'No opportunities found'}
              </h3>
              <p>
                {selectedView === 'Saved'
                  ? 'Use the heart button on a listing to save it here.'
                  : 'Try another search term or choose a different category.'}
              </p>
              <button
                className="primary-button"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                  if (selectedView === 'Saved') setSelectedView('Opportunities')
                }}
              >
                Show all opportunities
              </button>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <span className="brand-icon">O</span>
          <strong>OpportunityHub</strong>
        </div>
        <p>Discover opportunities. Build your future.</p>
        <small>Student project demo · Listings shown are sample data.</small>
      </footer>

      {selectedOpportunity && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedOpportunity(null)}
        >
          <section
            className="details-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedOpportunity(null)}
              aria-label="Close details"
            >
              ×
            </button>

            <span
              className={`category-pill ${selectedOpportunity.type.toLowerCase()}`}
            >
              {selectedOpportunity.type}
            </span>
            <h2 id="modal-title">{selectedOpportunity.title}</h2>
            <p className="organization">{selectedOpportunity.organization}</p>

            <div className="details-divider" />

            <div className="detail-row">
              <span>Opportunity type</span>
              <strong>{selectedOpportunity.type}</strong>
            </div>
            <div className="detail-row">
              <span>Mode</span>
              <strong>{selectedOpportunity.mode}</strong>
            </div>
            <div className="detail-row">
              <span>Deadline</span>
              <strong>{selectedOpportunity.deadline}</strong>
            </div>

            <h3>Skills and interests</h3>
            <div className="skills">
              {selectedOpportunity.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>

            <p className="sample-notice">
              This is a demonstration listing. Verify the opportunity and its
              deadline with the official organizer before applying.
            </p>

            <button
              className="primary-button modal-save"
              onClick={() => toggleSaved(selectedOpportunity.id)}
            >
              {savedIds.includes(selectedOpportunity.id)
                ? '♥ Saved — Remove from Saved'
                : '♡ Save Opportunity'}
            </button>
          </section>
        </div>
      )}
    </div>
  )
}

export default App
