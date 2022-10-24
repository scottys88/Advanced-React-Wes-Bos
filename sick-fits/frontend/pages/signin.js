import styled from 'styled-components';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import RequestReset from '../components/RequestReset';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

export default function SignInPage() {
  return (
    <Grid>
      <SignIn />
      <SignUp />
      <RequestReset />
    </Grid>
  );
}
