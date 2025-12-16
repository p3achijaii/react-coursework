import { useState } from "react";

function Navbar({ favourites, theme, setTheme }) {
  const [open, setOpen] = useState(false);

  return(
    <header className="styles.navbar" role = "navigation" aria-label="Main navigation">
      <div className="styles.inner">
        <img src="" alt="HoneyHomes logo"/>
        <span>HoneyHomes</span>
      </div>

      <nav className="styles.nav">
        <a href="#">Buy</a>
        <a href="#">Rent</a>
        <a href="#">Sell</a>
      </nav>
    </header>
  )
}

export default Navbar;
