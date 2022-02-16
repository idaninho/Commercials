import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';

const ClientCommercial = ({ commercials }) => {
  const [count, setCount] = useState(0);

  console.log(commercials);

  useEffect(() => {
    const interval = setInterval(() => {
      const today = new Date();
      const startDate = new Date(commercials[count].createdAt);
      const endDate = new Date();
      endDate.setDate(startDate.getDate() + 30);
      //   console.log(startDate);
      //   console.log(endDate);
      if (startDate.getTime() <= today && today <= endDate.getTime()) {
        setCount((count + 1) % commercials.length);
      } else {
        setCount((count + 2) % commercials.length);
      }
    }, commercials[count].seconds * 1000);
    return () => clearInterval(interval);
  }, [count, commercials]);

  return (
    <div>
      <Image
        src={commercials[count].imageUrl}
        fluid
        style={{
          position: 'relative',
          textAlign: 'center',
        }}
      />
      <h5
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          color: 'blue',
          fontSize: '32px',
        }}
      >
        {commercials[count].description}
      </h5>
    </div>
  );
};

export default ClientCommercial;
