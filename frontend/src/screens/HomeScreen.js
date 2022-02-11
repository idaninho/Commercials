import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCommercials } from "../actions/commercialActions";
import { Col, Row } from "react-bootstrap";
import Commercial from "../components/Commercial";
import Message from "../components/Message";
import Loader from "../components/Loader";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const commercialList = useSelector((state) => state.commercialList);

  const { loading, error, commercials } = commercialList;

  useEffect(() => {
    dispatch(listCommercials());
  }, [dispatch]);
  console.log(commercials);

  return (
    <div>
      <h1>latest Commercials</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {commercials.map((commercial) => (
              <Col key={commercial._id} sm={12} md={6} lg={4} xl={3}>
                <Commercial commercial={commercial} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

export default HomeScreen;
