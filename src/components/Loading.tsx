import { useState } from 'react';
import { ClipLoader } from 'react-spinners';

const override = {
  display: 'felx',
  margin: '0 auto',
  borderColor: '#b26000',
  textAlign: 'center',
};

const Loading = () => {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <>
      <ClipLoader
        color="#b26000"
        loading={loading}
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </>
  );
};

export default Loading;
