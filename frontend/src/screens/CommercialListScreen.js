import React, { useEffect } from 'react'
import { Button, Table, Row, Col, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  createCommercial,
  deleteCommercial,
  listCommercials,
} from '../actions/commercialActions'
import { useNavigate } from 'react-router-dom'
import { COMMERCIAL_CREATE_RESET } from '../constants/commercialConstants'

const CommercialListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const commercialList = useSelector((state) => state.commercialList)
  const { loading, error, commercials } = commercialList

  const commercialDelete = useSelector((state) => state.commercialDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = commercialDelete

  const commercialCreate = useSelector((state) => state.commercialCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    commercial: createdCommercial,
  } = commercialCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: COMMERCIAL_CREATE_RESET })
    // if (userInfo && userInfo.isAdmin) {
    //   dispatch(listcommercials())
    // } else {
    //   navigate('/login')
    // }
    if (!userInfo.isAdmin) {
      navigate('/login')
    }
    if (successCreate) {
      navigate(`/admin/commercial/${createdCommercial._id}/edit`)
    } else {
      dispatch(listCommercials())
    }
  }, [
    dispatch,
    userInfo,
    navigate,
    successDelete,
    successCreate,
    createdCommercial,
  ])

  const deleteHandler = (id) => {
    console.log('delete commercial')
    if (window.confirm('Are you sure?')) {
      dispatch(deleteCommercial(id))
    }
  }

  const createCommercialHandler = () => {
    console.log('create commercial')
   navigate('create')
  }
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>commercials</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createCommercialHandler}>
            <i className="fas fa-plus"></i> Create Commercial
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DESCRIPTION</th>
                <th>SCREENS</th>
                <th>SECONDS</th>
                <th>IMAGE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {commercials.map((commercial) => (
                <tr key={commercial._id}>
                  <td>{commercial._id}</td>
                  <td>{commercial.description}</td>
                  <td>{commercial.screensForDisplay}</td>
                  <td>{commercial.seconds}</td>
                  <td><Image width={50} height={50} src={commercial.imageUrl}/></td>
                  <td>
                    <LinkContainer to={`/admin/commercials/${commercial._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(commercial._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}

export default CommercialListScreen
