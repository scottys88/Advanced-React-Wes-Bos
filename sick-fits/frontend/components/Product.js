import Link from 'next/link';
import PropTypes from 'prop-types';
import ItemStyles from './styles/ItemStyles';
import TitleStyles from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteProduct from './DeleteProduct';
import AddToCart from './AddToCart';

export default function Product({ product }) {
  return (
    <ItemStyles>
      {product?.photo?.image?.publicUrlTransformed && (
        <img
          src={product.photo.image.publicUrlTransformed}
          alt={product.name}
        />
      )}
      <TitleStyles>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </TitleStyles>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: '/update',
            query: {
              id: product.id,
            },
          }}
        >
          Edit ✏
        </Link>
        <AddToCart id={product.id} />
        <DeleteProduct id={product.id}>Delete ❌</DeleteProduct>
      </div>
    </ItemStyles>
  );
}

Product.propTypes = {
  product: PropTypes.any,
};
