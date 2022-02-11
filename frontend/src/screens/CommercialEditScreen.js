import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import {
  listCommercialsDetails,
  updateCommercial,
} from "../actions/commercialActions";
import { COMMERCIAL_UPDATE_RESET } from "../constants/commercialConstants";

const CommercialEditScreen = () => {
  const [imageUrl, setImageUrl] = useState("");

  const [seconds, setSeconds] = useState("");
  const [description, setDescription] = useState("");
  const [screensForDisplay, setScreensForDisplay] = useState([]);
  const [uploading, setUploading] = useState(false);

  const { id: commercialId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const commercialDetails = useSelector((state) => state.commercialDetails);
  const { loading, error, commercial } = commercialDetails;

  const commercialUpdate = useSelector((state) => state.commercialUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = commercialUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: COMMERCIAL_UPDATE_RESET });
      dispatch(listCommercialsDetails(commercialId));
      navigate("/admin/commerciallist");
    } else {
      if (!commercial || commercial._id !== commercialId) {
        dispatch(listCommercialsDetails(commercialId));
      } else {
        setImageUrl(commercial.imageUrl);
        setDescription(commercial.description);
        setSeconds(commercial.seconds);
        setScreensForDisplay(commercial.screensForDisplay);
      }
    }
  }, [commercial, commercialId, dispatch, navigate, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setImageUrl(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch update commercial
    dispatch(
      updateCommercial({
        _id: commercialId,

        imageUrl,
        description,
        seconds,
        screensForDisplay,
      })
    );
  };

  return (
    <>
      <Link to="/admin/commerciallist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Commercial</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="seconds">
              <Form.Label>Seconds</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter seconds"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              ></Form.Control>

              <Form.Control
                type="file"
                label="Choose File"
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="screens">
              <Form.Label>Screens</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter screens"
                value={screensForDisplay}
                onChange={(e) => setScreensForDisplay(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default CommercialEditScreen;
