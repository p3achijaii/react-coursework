function Navbar() {
  return (
    <header className="navbar">
      <nav>
        <ul>
          <li>
            <a href="#" className="logo">
              HoneyHomes
            </a>
          </li>
          <div className="nav-links">
            <li>
              <a href="#">Buy</a>
            </li>
            <li>
              <a href="#">Rent</a>
            </li>
            <li>
              <a href="#">Agents</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">Saved</a>
            </li>
            <li>
              <a href="#">Sign In</a>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
