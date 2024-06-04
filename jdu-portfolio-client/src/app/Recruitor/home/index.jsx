import { useEffect, useState } from "react";
import HomePage from "../../../components/Pages/Recruitor/homePage";


export default function RecHome({ user }) {

  return (
    <>
      <HomePage user={user} />
    </>
  )
}
