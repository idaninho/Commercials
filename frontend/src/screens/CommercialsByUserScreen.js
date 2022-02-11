import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

const CommercialByUserScreen = () => {
  //const { id } = useParams();
  const [count, setCount] = useState(0);

  const commercialList = useSelector((state) => state.commercialList);

  const { loading, error, commercials } = commercialList;
  console.log(commercials);

  useEffect(() => {
    const interval = setInterval(() => {
      // const today = new Date();
      // const startDate = new Date(products[index])
      // const endDate = new Date(products[index]);
      // if (startDate.getTime() <= today && today <= endDate.getTime()) {
      //   setCurrentAdvertisement([index]);
      // }
      setCount((count + 1) % commercials.length);
    }, commercials[count].seconds * 1000);
    return () => clearInterval(interval);
  }, [count,commercials]);

  //setTimeout(erezeyal, 1000)

  console.log(commercials);

  return (
    <div>
      {loading ? <Loader /> : <Image src={commercials[count].imageUrl} />}
    </div>
  );
};

export default CommercialByUserScreen;
