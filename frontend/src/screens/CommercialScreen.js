import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup } from "react-bootstrap";
import { listCommercialsDetails } from "../actions/commercialActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
//import commercials from '../commercials'

const CommercialScreen = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const commercialDetails = useSelector((state) => state.commercialDetails);
  const { loading, error, commercial } = commercialDetails;

  //   const commercial = commercials.find((p) => p._id === id)
  console.log(id);
  //   console.log(commercials[id - 1].countInStock)
  //   console.log(commercial.countInStock)

  useEffect(() => {
    dispatch(listCommercialsDetails(id));
  }, [dispatch, id]);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image
                src={commercial.imageUrl}
                alt={commercial.imageUrl}
                fluid
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>Description: {commercial.description}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  Screens: {commercial.screensForDisplay}
                </ListGroup.Item>
                <ListGroup.Item>Seconds: {commercial.seconds}</ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row></Row>
        </>
      )}
    </>
  );
};

export default CommercialScreen;
