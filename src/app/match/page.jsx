"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Button } from "~/components/ui/button";
import logo from "~/assets/icons/icons8-metamask-logo-96.png";

const userAccount = [
  {
    userData: JSON.parse(localStorage.getItem("accounts")),
  },
];

console.log(userAccount.userData);

export default function MatchPage() {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    var userData = JSON.parse(localStorage.getItem("accounts"));
  }

  return (
    <div className="bg-rounded border-solid border-6 border-black ">
      <h1>#user</h1>
      <h2>{JSON.parse(localStorage.getItem("accounts"))}</h2>
    </div>
  );
}
