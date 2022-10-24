import React from 'react';
import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function ResetPage(props) {
  const { query } = props;

  if (!query?.token) {
    return (
      <div>
        <RequestReset />
      </div>
    );
  }

  return (
    <div>
      <Reset token={query.token} />
    </div>
  );
}

// {
//   itemId: '63381f95c343ca6a84d6dcad',
//   identity: 'scott_schubert@hotmail.com.au',
//   token: 'NBVbWsCM86tew4bGAHLB'
// }
