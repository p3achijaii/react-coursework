import { useState } from 'react'
import styles from './Navbar.module.css'

function Navbar({ favourites, theme, setTheme }) {
  const [open, setOpen] = useState(false)

  return (
    <header className={styles.navbar} role="navigation" aria-label="Main navigation">
      <div className={styles.logo}>🍯 HoneyHomes</div>

      <nav className={styles.links}>
        <a href="#">Buy</a>
        <a href="#">Rent</a>
        <a href="#">Sell</a>
      </nav>

      <div className={styles.actions}>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label="Toggle theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        <div
          className={styles.fav}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          aria-label="Favourites"
        >
          ♥ {favourites.length}
          {open && (
            <div className={styles.dropdown}>
              {favourites.length === 0 && <p>No favourites yet</p>}
              {favourites.map(f => (
                <p key={f.id}>£{f.price}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar;
