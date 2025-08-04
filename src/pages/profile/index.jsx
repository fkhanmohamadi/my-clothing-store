import React, { useEffect, useState } from "react";
import Header from "../../layout/header";
import Services from "../../components/services";
import Footer from "../../layout/footer";
import ProfileHeader from "../../layout/profile-header";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoChevronForward } from "react-icons/io5";

function Profile() {
  const navigate = useNavigate();
  const { isLoggedIn, userInfo } = useSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (location.pathname === "/profile") {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }, [location]);

  return (
    <div>
      <Header lineMenu={1} />
      {userInfo && (
        <div className="container mx-auto mt-25 lg:mt-20">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* سایدبار هدر */}
            <div className={`lg:w-1/4 ${showMenu === false ? "hidden lg:block" : ""}`}>
              <ProfileHeader setShowMenu={setShowMenu} />
            </div>

            {/* محتوای */}
            <main className="lg:w-3/4 bg-white p-4 shadow-lg rounded text-sm text-gray-500 w-full">
              {!showMenu && (
                <div className="flex items-center gap-1 pb-3 mb-10 text-gray-500 border-b border-gray-300 lg:hidden">
                  <IoChevronForward />
                  <Link to="/profile" onClick={() => setShowMenu(true)}>
                    بازگشت به لیست
                  </Link>
                </div>
              )}
              <Outlet />
            </main>
          </div>
        </div>
      )}
      <Services />
      <Footer />
    </div>
  );
}

export default Profile;
