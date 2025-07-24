import React from "react";
import Header from "../../layout/header";
import Services from "../../components/services";
import Footer from "../../layout/footer";
import ProfileHeader from "../../layout/profile-header";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileHome from "../../components/profile-home";

function Profile() {
  const navigate = useNavigate();
  const { isLoggedIn, userInfo } = useSelector((state) => state.auth);

  !isLoggedIn && navigate("/");

  return (
    <div>
      <Header lineMenu={1} />
      <div className="container mx-auto mt-20 flex">
        <ProfileHeader userInfo={userInfo} />
        <main className="w-full bg-white p-4 shadow-lg rounded text-sm text-gray-500">
          <Outlet />
        </main>
      </div>
      <Services />
      <Footer />
    </div>
  );
}

export default Profile;
