"use client";
import React from "react";

export default function MatchPage() {

  let walletAddress = "";
  useEffect(() => {
    walletAddress = JSON.parse(localStorage.getItem("accounts"))
  })

  return (
    <div className="">
      <div className="">
         <h1 className="">#user</h1>
         <h2>{walletAddress}</h2>
      </div>
    </div>
  );
}
