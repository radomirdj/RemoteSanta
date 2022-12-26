import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGiftCardIntegrationList } from "../../store/gift-card-request/actions";
import { getGiftCardIntegrationListSelector } from "../../store/gift-card-request/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";

const ChooseGiftCard = () => {
  const dispatch = useDispatch();
  const giftCardIntegrationList = useSelector(
    getGiftCardIntegrationListSelector
  );

  useEffect(() => {
    dispatch(fetchGiftCardIntegrationList());
  }, [dispatch]);

  return (
    <>
      <AppHeaderPrivate />
      <div className="background choose-gift-card"></div>
      <AppFooter />
    </>
  );
};

export default ChooseGiftCard;
