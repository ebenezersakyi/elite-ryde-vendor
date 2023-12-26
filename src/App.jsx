import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { routes } from "./utils/routes";
import { useAuth0 } from "@auth0/auth0-react";
import { baseURLGeneral } from "./utils";
import AccountSuspended from "./pages/user_site/AccountSuspendedPage";
import axios from "axios";
import AccessDeniedPage from "./pages/user_site/AccessDeniedPage";

function App() {
  const { user } = useAuth0();
  const [isSuspended, setIsSuspended] = useState(false);
  const [isAccessDenied, setIsAccessDenied] = useState(false);

  const isAccountSuspended = async () => {
    try {
      const response = await axios.post(`${baseURLGeneral}/account-suspended`, {
        id: user?.sub?.slice(6),
        accountType: "vendor",
      });
      console.log("response", response);
      if (response?.data?.data.suspended) {
        setIsSuspended(response?.data?.data.suspended);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const checkRole = async () => {
    // console.log("user.subuser.sub", user.sub);

    // const options = {
    //   method: "GET",
    //   url: `https://elite-ryde.us.auth0.com/api/v2/users/${user.sub}/roles`,
    //   headers: { authorization: `Bearer ${MGMT_API_ACCESS_TOKEN}` },
    // };

    axios
      .get(
        `https://elite-ryde-management-api.azurewebsites.net/api/check-role?userSub=${user.sub}`
      )
      .then((response) => {
        console.log("responseresponseresponse", response?.data?.data[0]);
        if (response?.data?.data[0]?.name !== "vendor") {
          setIsAccessDenied(true);
        } else {
          setIsAccessDenied(false);
        }
      })
      .catch(function (error) {
        console.error("error", error);
      });

    // axios
    //   .request(options)
    //   .then(async function (response) {
    //     console.log("response.data", response?.data[0]);
    //     if (response?.data[0]?.name !== "vendor") {
    //       // await toast("Please create a user account");
    //       // logout({ logoutParams: { returnTo: window.location.origin } });
    //       // logout();
    //       // nav('/access-denied');
    //       setIsAccessDenied(true);
    //     } else {
    //       setIsAccessDenied(false);
    //     }
    //   })
    //   .catch(function (error) {
    //     console.error("error", error);
    //   });
  };

  React.useEffect(() => {
    isAccountSuspended();
    if (user?.sub) {
      checkRole();
    }
  }, [user]);

  if (isSuspended) {
    return <AccountSuspended />;
  }

  if (isAccessDenied) {
    return <AccessDeniedPage />;
  }

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
