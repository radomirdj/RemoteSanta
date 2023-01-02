import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClaimPointsEventList } from "../../store/claim-points-event/actions";
import { getClaimPointsEventListSelector } from "../../store/claim-points-event/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";

const Home = () => {
  const dispatch = useDispatch();
  const claimPointsEventList = useSelector(getClaimPointsEventListSelector);

  useEffect(() => {
    dispatch(fetchClaimPointsEventList());
  }, [dispatch]);

  return (
    <>
      <AppHeaderPrivate />
      <div className="background home">
        {/* {user.firstName} , {user.lastName} , {user.email}*/}
      </div>
      <AppFooter />
    </>
  );
};

export default Home;
