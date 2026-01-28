import { useContext } from 'react';
import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';
import styles from "../NavBar/Navbar.module.css";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // The nav bar gets the user from the context which is either
  // {username, sub} if logged in or null if not, and shows
  // set of the correct set of links
  return (
    <nav className={styles.nav}>
      {user ? (
        <ul className={styles.list}>
          <li className={styles.welcome}>
            Welcome, {user.username}
          </li>

          <li><Link className={styles.link} to="/">Dashboard</Link></li>
          <li>
            <Link
              className={styles.link}
              to="/"
              onClick={handleSignOut}
            >
              Sign Out
            </Link>
          </li>

          <li><Link className={styles.link} to="/products">Products</Link></li>
          <li><Link className={styles.link} to="/services">Services</Link></li>
          <li><Link className={styles.link} to="/bookings/me">My Bookings</Link></li>

          {user.is_admin && (
            <>
              <li>
                <Link className={styles.link} to="/products/create">
                  Add new product
                </Link>
              </li>
              <li>
                <Link className={styles.link} to="/services/create">
                  Add new service
                </Link>
              </li>
              <li>
                <Link className={styles.link} to="/bookings/admin">
                  Bookings
                </Link>
              </li>
            </>
          )}
          {!user.is_admin && (
          <li>
            <Link className={styles.link} to={`/cart-items/${user.cartId}`}>
              Cart
            </Link>
          </li>
          )}
          <li>
            <Link className={styles.link} to="/orders">
              {user.is_admin ? "Orders" : "My Orders"}
            </Link>
          </li>
        </ul>
      ) : (
        <ul className={styles.list}>
          <li><Link className={styles.link} to="/">Home</Link></li>
          <li><Link className={styles.link} to="/sign-in">Sign In</Link></li>
          <li><Link className={styles.link} to="/sign-up">Sign Up</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
