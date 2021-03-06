import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { deleteUser, listUsers } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [online, setOnline] = useState(0);
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const clientOnline = async () => {
    const data = await fetch('http://localhost:5001/api/connected/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((error) => {
      window.alert(error);
      return;
    });

    const jsonnn = await data.json();
    console.log(jsonnn[0].counter);
    setOnline(jsonnn[0].counter);
  };

  
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
      clientOnline();
    } else {
      navigate('/login');
    }
  }, [dispatch, userInfo, navigate, successDelete]);

  const deleteHandler = (id) => {
    console.log('delete user');
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h4 style={{ textAlign: 'right' }}>
            Number of Online Users: {online}
          </h4>

          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(user._id)}
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
  );
};

export default UserListScreen;
