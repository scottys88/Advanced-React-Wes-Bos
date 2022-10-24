import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      message
      code
    }
  }
`;

export default function Reset({ token }) {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });

  const [reset, { loading, data, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });

  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    // Send email and password to api
    const res = await reset().catch(console.error);
    console.log({ data, error, loading });
    console.log(res);
    resetForm();
  };

  if (data?.redeemUserPasswordResetToken === null) {
    return <p>Password reset. You can now sign in.</p>;
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <DisplayError error={error || successfulError} />
      <h2>Reset your password</h2>
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
        <button type="submit">Request reset</button>
      </fieldset>
    </Form>
  );
}
