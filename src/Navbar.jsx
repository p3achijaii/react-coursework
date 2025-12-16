import { useState } from "react";

function Navbar({ favourites, theme, setTheme }) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="styles.navbar"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="styles.inner">
        <img src="" alt="HoneyHomes logo" />
        <span>HoneyHomes</span>
      </div>
      <nav className="styles.nav">
        <a href="#">Buy</a>
        <a href="#">Rent</a>
        <a href="#">Sell</a>
      </nav>

        <div className="styles.actions">
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle theme"
            className="styles.themeBtn"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <div
            className="styles.fav"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            aria-label="Saved properties"
          >
            ♥ {favourites.length}
            {open && (
              <div className="styles.dropdown">
                {favourites.length === 0 && <p>No saved homes</p>}
                {favourites.map(f => (
                  <div key={f.id}>£{f.price}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar;
