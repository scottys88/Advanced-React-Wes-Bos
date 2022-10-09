import Updateproduct from '../components/UpdateProduct';

export default function UpdatePage({ query }) {
  console.log(query);

  return (
    <div>
      <Updateproduct id={query.id} />
    </div>
  );
}
