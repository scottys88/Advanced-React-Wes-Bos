import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      message
      code
    }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    email: '',
  });

  const [reset, { loading, data, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    // Send email and password to api
    const res = await reset().catch(console.error);
    console.log({ data, error, loading });
    console.log(res);
    resetForm();
  };

  if (data?.sendUserPasswordResetLink === null) {
    return <p>Password reset link sent</p>;
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <DisplayError error={error} />
      <h2>Request a password reset</h2>
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
            required
          />
        </label>
        <button type="submit">Request reset</button>
      </fieldset>
    </Form>
  );
}
