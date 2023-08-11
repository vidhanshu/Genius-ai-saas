import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const LandingPage = () => {
  return (
    <div>
      <p>LandingPage</p>
      <Link href="/sign-in">
        <Button>Login</Button>
      </Link>
      <Link href="/sign-in">
        <Button>Register</Button>
      </Link>
      <Link href="/dashboard">
        <Button>Dashboard</Button>
      </Link>
    </div>
  );
};

export default LandingPage;
