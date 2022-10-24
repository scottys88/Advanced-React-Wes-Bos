import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';

const SINGIN_MUTATION = gql`
  mutation SINGIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        sessionToken
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
        code
      }
    }
  }
`;

export default function SignIn() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    email: '',
    password: '',
  });

  const [signIn, { loading, data }] = useMutation(SINGIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    // Send email and password to api
    const res = await signIn();
    console.log(res);
    console.log(data?.authenticateUserWithPassword?.message);
    resetForm();
  };

  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <DisplayError error={error} />
      <h2>Sign in to your account</h2>
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
        <button type="submit">Sign In</button>
      </fieldset>
    </Form>
  );
}
