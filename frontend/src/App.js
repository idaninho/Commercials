import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import CommercialScreen from "./screens/CommercialScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import CommercialListScreen from "./screens/CommercialListScreen";
import CommercialEditScreen from "./screens/CommercialEditScreen";
import CommercialsByUserScreen from "./screens/CommercialsByUserScreen";
import CommercialCreateScreen from "./screens/CommercialCreateScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/commercial/:id" element={<CommercialScreen />} />
            <Route path="/screen/:id" element={<CommercialsByUserScreen />} />
            <Route path="/admin/userlist" element={<UserListScreen />} />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
            <Route
              path="/admin/commerciallist"
              element={<CommercialListScreen />}
            />
             <Route
              path="/admin/commerciallist/create"
              element={<CommercialCreateScreen />}
            />
            <Route
              path="/admin/commercials/:id/edit"
              element={<CommercialEditScreen />}
            />
            <Route exact path="/" element={<HomeScreen />} />
            {/* because id is optional in the cart route */}
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
