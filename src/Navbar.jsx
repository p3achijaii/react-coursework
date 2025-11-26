function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <li>
          <a href="#" className="nav-logo">
            HoneyHomes
          </a>
        </li>
      </div>
      <ul className="nav-links">
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
      </ul>
    </nav>
  );
}

export default Navbar;
