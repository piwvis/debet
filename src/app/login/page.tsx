"use client";

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { Button } from "~/components/ui/button";
import logo_meta_mask from "~/assets/icons/icons8-metamask-logo-96.png";
import logo_steam from "~/assets/icons/icons8-steam-96.png";
import { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";

export default function LoginPage() {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const initialState = { accounts: [] };
  const [wallet, setWallet] = useState(initialState);

  useEffect(() => {
    const refreshAccounts = (accounts: any) => {
      if (accounts.length > 0) {
        updateWallet(accounts);
      } else {
        // if length 0, user is disconnected
        setWallet(initialState);
      }
    };

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));

      if (provider) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        refreshAccounts(accounts);
        window.ethereum.on("accountsChanged", refreshAccounts);
      }
    };
    getProvider();
    return () => {
      window.ethereum?.removeListener("accountsChanged", refreshAccounts);
    };
  }, []);

  const updateWallet = async (accounts: any) => {
    setWallet({ accounts });
  };

  const handleConnect = async () => {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    updateWallet(accounts);
  };

  if (wallet.accounts.length) {
    localStorage.setItem("accounts", JSON.stringify(wallet.accounts));
    redirect("/match");
  }

  return (
    <div className=" flex gap-2">
      <h2>{hasProvider ? "" : "Enable Metamask Extension!"}</h2>
      {window.ethereum?.isMetaMask && wallet.accounts.length < 1 && (
        <Button
          onClick={handleConnect}
          className="bg-black"
          variant="secondary"
        >
          <Image
            src={logo_meta_mask}
            alt="MetaMaskLogo"
            quality={100}
            width={40}
            height={40}
          />
        </Button>
      )}
      <Link href="https://steamcommunity.com/oauth/login?response_type=token&client_id=22421D298299C0F7F2E2F667B4208A61&state=whatever_you_want">
        <Button
          onClick={handleConnect}
          className="bg-black"
          variant="secondary"
        >
          <Image
            src={logo_steam}
            alt="MetaMaskLogo"
            quality={100}
            width={40}
            height={40}
          />
        </Button>
      </Link>
    </div>
  );
}
