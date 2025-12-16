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
      <div className="styles.fav">
        onMouseEnter = {() => setOpen(true)}
        onMouseLeave = {() => setOpen(false)}
        aria-label = "Saved Properties"
      </div>
      ♥ {favourites.length}
      {open && (
        <div className="styles.dropdown">
          {favourites.length === 0 && <p>No saved homes</p>}
          {favourites.map((f) => (
            <div key={f.id}>£{f.price}</div>
          ))}
        </div>
      )}
    </header>
  );
}

export default Navbar;
