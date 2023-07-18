import React from "react";
import ChooseGiftCard from "./ChooseGiftCard";
import { useSelector } from "react-redux";
import { getAuthUserSelector } from "../../store/auth/selectors";

const ChooseGiftCardPersonal = () => {
  const user = useSelector(getAuthUserSelector);
  const countryId = localStorage.getItem("countryId");

  return (
    <>
      <ChooseGiftCard
        countryId={countryId}
        sendToUserId={null}
        sendToEmail={user.email}
        sendToUserName={""}
      />
    </>
  );
};

export default ChooseGiftCardPersonal;
