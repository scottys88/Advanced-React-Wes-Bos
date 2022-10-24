import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $password: String!
    $name: String!
  ) {
    createUser(data: { email: $email, password: $password, name: $name }) {
      id
      email
      name
    }
  }
`;

export default function SignUp() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const [signup, { loading, data, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    // Send email and password to api
    const res = await signup().catch(console.error);
    console.log({ data, error, loading });
    console.log(res);
    resetForm();
  };

  if (data?.createUser) {
    return <p>Signed up with {data.createUser.email}, please sign in</p>;
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <DisplayError error={error} />
      <h2>Sign up to an account</h2>
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={inputs.email}
            placeholder="email"
            autoComplete="email"
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="name"
            id="name"
            name="name"
            onChange={handleChange}
            value={inputs.name}
            placeholder="name"
            autoComplete="name"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={inputs.password}
            placeholder="password"
          />
        </label>
        <button type="submit">Sign Up</button>
      </fieldset>
    </Form>
  );
}
