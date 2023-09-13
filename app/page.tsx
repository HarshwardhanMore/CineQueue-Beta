"use client";

import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default async function Home() {
  const router = await useRouter();
  router.push("/addmovie");
  return <></>;
}
