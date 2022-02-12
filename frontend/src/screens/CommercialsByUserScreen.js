import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listCommercials } from '../actions/commercialActions';
import ClientCommercial from '../components/ClientCommercial';
import Loader from '../components/Loader';

const CommercialByUserScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listCommercials());
  }, [dispatch]);
  const commercialList = useSelector((state) => state.commercialList);
  const { loading, error, commercials } = commercialList;
  // console.log(commercials);
  // console.log(commercials[1].createdAt);
  const ads = [];
  console.log(commercials);
  console.log(id);
  commercials.forEach((commercial) => {
    commercial.screensForDisplay.forEach((value) => {
      if (value.includes(id)) {
        ads.push(commercial);
      }
    });
  });
  console.log(ads);

  //setTimeout(erezeyal, 1000)

  //console.log(commercials);

  return (
    <div>{loading ? <Loader /> : <ClientCommercial commercials={ads} />}</div>
  );
};

export default CommercialByUserScreen;
