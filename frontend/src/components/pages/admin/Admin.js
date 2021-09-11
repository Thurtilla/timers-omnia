import React, { useEffect, useState } from 'react';
import PcComp from '../../pcs/PcComp';
export default function Home() {
  const [loading, setLoading] = useState(false);

  if (loading) return <>Loading...</>;
  return (
    <>
      <div className='container'>
        <PcComp />
      </div>
    </>
  );
}