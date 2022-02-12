import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';

const CommercialByUserScreen = () => {
  const { id } = useParams();
  const [count, setCount] = useState(0);
  let numberOfClient = id % 3;
  const commercialList = useSelector((state) => state.commercialList);

  const { loading, error, commercials } = commercialList;
  console.log(commercials);
  console.log(commercials[1].createdAt);
  const ads = commercials.filter((commercial) =>
    commercial.screensForDisplay.map((value) => value.includes(numberOfClient))
  );
  console.log(ads);
  useEffect(() => {
    const interval = setInterval(() => {
      const today = new Date();
      const startDate = new Date(commercials[count].createdAt);
      const endDate = new Date();
      endDate.setDate(startDate.getDate() + 30);
      console.log(startDate);
      console.log(endDate);
      if (startDate.getTime() <= today && today <= endDate.getTime()) {
        setCount((count + 1) % commercials.length);
      } else {
        setCount((count + 2) % commercials.length);
      }
    }, commercials[count].seconds * 1000);
    return () => clearInterval(interval);
  }, [count, commercials]);

  //setTimeout(erezeyal, 1000)

  console.log(commercials);

  return (
    <div>
      {loading ? <Loader /> : <Image src={commercials[count].imageUrl} />}
    </div>
  );
};

export default CommercialByUserScreen;
