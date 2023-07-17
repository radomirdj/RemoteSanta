import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ChooseGiftCard from "./ChooseGiftCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrganizationUserList } from "../../store/orgs/actions";
import { getOrganizationUserListSelector } from "../../store/orgs/selectors";

const ChooseGiftCardPeerToPeer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const orgUserList = useSelector(getOrganizationUserListSelector);
  const sendToUserId = searchParams.get("userId");
  const sendToUser = orgUserList.find((user) => user.id === sendToUserId);

  useEffect(() => {
    dispatch(fetchOrganizationUserList());
  }, [dispatch]);

  return (
    <>
      <ChooseGiftCard
        countryId={searchParams.get("countryId")}
        sendToUserId={sendToUserId}
        sendToEmail={sendToUser?.email}
        sendToUserName={sendToUser?.firstName}
      />
    </>
  );
};

export default ChooseGiftCardPeerToPeer;
