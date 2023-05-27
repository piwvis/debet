"use client";
import React from "react";

export default function MatchPage() {
  return (
    <div className="">
      <div className="">
         <h1 className="">#user</h1>
         <h2>{JSON.parse(localStorage.getItem("accounts"))}</h2>
      </div>
    </div>
  );
}
