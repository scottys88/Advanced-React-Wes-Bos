import Link from 'next/link';
import { useCart } from '../lib/CartState';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';
import CartCount from './CartCount';

export default function Nav() {
  const user = useUser();
  const data = useCart();

  console.log(user);

  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
          <button onClick={data.toggleCart} type="button">
            My Cart
            <CartCount
              count={user.cart.reduce(
                (tally, next) => tally + next.quantity,
                0
              )}
            />
          </button>
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </NavStyles>
  );
}
