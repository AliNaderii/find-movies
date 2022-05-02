import { HashLoader } from 'react-spinners';
import { css } from '@emotion/react';

export default function Spinner() {
  const override = css`
    display: flex;
    min-height: 50vh;
    margin: 0 auto;
  `;

  return (
    <div className='spinner-container'>
      <HashLoader color='#79b8f3' css={override} size={100} />
    </div>
  );
}