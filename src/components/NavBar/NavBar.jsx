import { useContext } from 'react';
import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';

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
    <nav>
      {user ? (
        <ul>
          <li>Welcome, {user.username}</li>
          <li><Link to='/'>Dashboard</Link></li>
          <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
          <li><Link to='/products'>Products</Link></li>
          <li><Link to='/services'>Services</Link></li>
          <li><Link to='/bookings/me'>My bookings</Link></li>
          {user.is_admin && (
            <div>
              <li><Link to='/products/create'>Add new product</Link></li>
             <li><Link to='/services/create'>Add new service</Link></li>
             <li><Link to='/bookings/admin'>Bookings</Link></li>
            </div>
          )}
          <li><Link to={`/cart-items/${user.cartId}`}>Cart</Link></li>
          <li><Link to={'/orders'}>{user.is_admin ? "Orders" : "My Orders"}</Link></li>
        </ul>
      ) : (
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/sign-in'>Sign In</Link></li>
          <li><Link to='/sign-up'>Sign Up</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
