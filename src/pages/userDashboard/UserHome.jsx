import React, { useEffect, useState } from "react";
import CarCard from "../../components/userDashboardComponents/shared/CarCard";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../components/shared_components/Loading";
import { toast } from "react-toastify";
import axios from "axios";
import { NoData } from "../../components/shared_components/NoData";
import MapPane from "../../components/userDashboardComponents/available-page/MapPane";
const UserHome = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const { user } = useAuth0();
  const { logout } = useAuth0();

  async function fetchCars() {
    try {
      setLoading(true);
      const response = await axios({
        url: `https://elite-ryde-management-api.azurewebsites.net/api/car?vendorId=${user?.sub.slice(
          6
        )}`,
        method: "get",
      });

      if (response?.data?.status) {
        setData(response?.data?.data);
        console.log(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  // const checkRole = async () => {
  //   const MGMT_API_ACCESS_TOKEN =
  //     "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhoSlVOeFlFa2VoUy03eDd2V1pKQSJ9.eyJpc3MiOiJodHRwczovL2VsaXRlLXJ5ZGUudXMuYXV0aDAuY29tLyIsInN1YiI6IjhzbUtqbWJEdkZaVFY5MUp4UzV6ZEUzUzVSdE9vdzVhQGNsaWVudHMiLCJhdWQiOiJodHRwczovL2VsaXRlLXJ5ZGUudXMuYXV0aDAuY29tL2FwaS92Mi8iLCJpYXQiOjE2OTczOTc5MDAsImV4cCI6MTY5OTk4OTkwMCwiYXpwIjoiOHNtS2ptYkR2RlpUVjkxSnhTNXpkRTNTNVJ0T293NWEiLCJzY29wZSI6InJlYWQ6Y2xpZW50X2dyYW50cyBjcmVhdGU6Y2xpZW50X2dyYW50cyBkZWxldGU6Y2xpZW50X2dyYW50cyB1cGRhdGU6Y2xpZW50X2dyYW50cyByZWFkOnVzZXJzIHVwZGF0ZTp1c2VycyBkZWxldGU6dXNlcnMgY3JlYXRlOnVzZXJzIHJlYWQ6dXNlcnNfYXBwX21ldGFkYXRhIHVwZGF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgZGVsZXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcnNfYXBwX21ldGFkYXRhIHJlYWQ6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgZGVsZXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDpydWxlc19jb25maWdzIHVwZGF0ZTpydWxlc19jb25maWdzIGRlbGV0ZTpydWxlc19jb25maWdzIHJlYWQ6aG9va3MgdXBkYXRlOmhvb2tzIGRlbGV0ZTpob29rcyBjcmVhdGU6aG9va3MgcmVhZDphY3Rpb25zIHVwZGF0ZTphY3Rpb25zIGRlbGV0ZTphY3Rpb25zIGNyZWF0ZTphY3Rpb25zIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6aW5zaWdodHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpsb2dzX3VzZXJzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyB1cGRhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyByZWFkOmFub21hbHlfYmxvY2tzIGRlbGV0ZTphbm9tYWx5X2Jsb2NrcyB1cGRhdGU6dHJpZ2dlcnMgcmVhZDp0cmlnZ2VycyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIGNyZWF0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIGRlbGV0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIHJlYWQ6Y3VzdG9tX2RvbWFpbnMgZGVsZXRlOmN1c3RvbV9kb21haW5zIGNyZWF0ZTpjdXN0b21fZG9tYWlucyB1cGRhdGU6Y3VzdG9tX2RvbWFpbnMgcmVhZDplbWFpbF90ZW1wbGF0ZXMgY3JlYXRlOmVtYWlsX3RlbXBsYXRlcyB1cGRhdGU6ZW1haWxfdGVtcGxhdGVzIHJlYWQ6bWZhX3BvbGljaWVzIHVwZGF0ZTptZmFfcG9saWNpZXMgcmVhZDpyb2xlcyBjcmVhdGU6cm9sZXMgZGVsZXRlOnJvbGVzIHVwZGF0ZTpyb2xlcyByZWFkOnByb21wdHMgdXBkYXRlOnByb21wdHMgcmVhZDpicmFuZGluZyB1cGRhdGU6YnJhbmRpbmcgZGVsZXRlOmJyYW5kaW5nIHJlYWQ6bG9nX3N0cmVhbXMgY3JlYXRlOmxvZ19zdHJlYW1zIGRlbGV0ZTpsb2dfc3RyZWFtcyB1cGRhdGU6bG9nX3N0cmVhbXMgY3JlYXRlOnNpZ25pbmdfa2V5cyByZWFkOnNpZ25pbmdfa2V5cyB1cGRhdGU6c2lnbmluZ19rZXlzIHJlYWQ6bGltaXRzIHVwZGF0ZTpsaW1pdHMgY3JlYXRlOnJvbGVfbWVtYmVycyByZWFkOnJvbGVfbWVtYmVycyBkZWxldGU6cm9sZV9tZW1iZXJzIHJlYWQ6ZW50aXRsZW1lbnRzIHJlYWQ6YXR0YWNrX3Byb3RlY3Rpb24gdXBkYXRlOmF0dGFja19wcm90ZWN0aW9uIHJlYWQ6b3JnYW5pemF0aW9uc19zdW1tYXJ5IGNyZWF0ZTphdXRoZW50aWNhdGlvbl9tZXRob2RzIHJlYWQ6YXV0aGVudGljYXRpb25fbWV0aG9kcyB1cGRhdGU6YXV0aGVudGljYXRpb25fbWV0aG9kcyBkZWxldGU6YXV0aGVudGljYXRpb25fbWV0aG9kcyByZWFkOm9yZ2FuaXphdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGNyZWF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgcmVhZDpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBjcmVhdGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgcmVhZDpjbGllbnRfY3JlZGVudGlhbHMgY3JlYXRlOmNsaWVudF9jcmVkZW50aWFscyB1cGRhdGU6Y2xpZW50X2NyZWRlbnRpYWxzIGRlbGV0ZTpjbGllbnRfY3JlZGVudGlhbHMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.icYb5HmCXifp0b07kp5-S4tAAafSZEXSOumvbdS9yGMh_G_5OUTEGe_5_L-GtpY7xwublRCv_QLrCohXxSgQ83P6zselYukcfZ_Rp46CaGoaDeEr-Qv_yHtzSspscOFipNSLmcrYc1S2A-aFm4t62pcZs_sNA4HL3lGOZhxf6qJ0hc2Uls_MDmquEzPSPTL3QIplOethh8HxImMXt2gO6SO_kB29tvnBjxe2k9KIH9nBMcDlF9ilVGNRzdbKPkalgnMzfQBhbfSBHk1RnNXCzbHo3iEtfwwIauNUqY6vaOQXYSQ40tjJJlZ-LPHV1rIjBsj6bs31_7Zl5v07LG_XlQ";

  //   const options = {
  //     method: "GET",
  //     url: `https://elite-ryde.us.auth0.com/api/v2/users/${user.sub}/roles`,
  //     headers: { authorization: `Bearer ${MGMT_API_ACCESS_TOKEN}` },
  //   };

  //   axios
  //     .request(options)
  //     .then(async function (response) {
  //       console.log("response.data", response?.data[0]);
  //       if (response?.data[0]?.name !== "vendor") {
  //         await toast("Please create a vendor account");
  //         logout({ logoutParams: { returnTo: window.location.origin } });
  //       }
  //     })
  //     .catch(function (error) {
  //       console.error("error", error);
  //     });
  // };

  useEffect(() => {
    // console.log("user.sub", user.sub.slice(6));
    // checkRole();
    fetchCars();
  }, []);

  return (
    <div className="text-[#fff] 2xl:container 2xl:mx-auto pt-[2rem]">
      <div className="px-[20px]">
        <h1 className="text-egreen  font-bold text-[2.3rem] mb-2">YOUR CARS</h1>

        {loading ? (
          <Loading />
        ) : data?.length === 0 ? (
          <NoData data="cars" />
        ) : (
          <div className="grid grid-cols-3 text-[#fff] ">
            <div className="col-span-3 md:col-span-2 max-h-[80vh] overflow-scroll">
              <div className="flex flex-wrap scrollbar-hide gap-[1.5rem] justify-center items-center">
                {data?.map((d, inx) => {
                  let {
                    basicInformation: { make, model, year, transmission },
                    additionalInformation: {
                      geolocation: { long, lat },
                      location,
                    },
                    _id,
                    photos,
                    booking,
                  } = d;
                  return (
                    <>
                      <CarCard
                        name={`${make} ${model}`}
                        user_ratings={0}
                        key={inx}
                        location={location}
                        year={year}
                        transmission={transmission}
                        image={photos[0]}
                        id={_id}
                        price_per_day={booking?.price?.within_accra || 1000}
                        data={d}
                      />
                      {/* <CarCard
                        name={`${make} ${model}`}
                        user_ratings={0}
                        key={inx}
                        location={location}
                        year={year}
                        transmission={transmission}
                        image={photos[0]}
                        id={_id}
                        price_per_day={booking?.price?.within_accra || 1000}
                        data={d}
                      />
                      <CarCard
                        name={`${make} ${model}`}
                        user_ratings={0}
                        key={inx}
                        location={location}
                        year={year}
                        transmission={transmission}
                        image={photos[0]}
                        id={_id}
                        price_per_day={booking?.price?.within_accra || 1000}
                        data={d}
                      /> */}
                    </>
                  );
                })}
              </div>
            </div>
            {data?.length > 0 && (
              <div className="hidden md:block">
                <MapPane data={data} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHome;
