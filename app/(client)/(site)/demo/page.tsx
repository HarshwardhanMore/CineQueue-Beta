"use client";

import React from "react";

import MuiDataTable from "@/components/custom/muiDataTable";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import LoadingComponent from "@/components/custom/loadingComponent";

const DemoPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!user) return null;

  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/addmovie")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <LoadingComponent />;
  if (!data) return <p>No data found</p>;

  return (
    <>
      <MuiDataTable rows={data} />
    </>
  );
};

export default DemoPage;
