"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import { useUser } from "@clerk/nextjs";

import LoadingComponent from "@/components/custom/loadingComponent";
import DataTable from "@/components/custom/wishlistTable";
import WishList from "@/components/custom/wishList";
// import MuiDataTable from "@/components/custom/muiDataTable";

const WatchListPage = () => {
  // const { isLoaded, isSignedIn, user } = useUser();
  // if (!user) return null;

  // const [data, setData] = useState<any>(null);
  // const [isLoading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   fetch("/api/addmovie")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //       setLoading(false);
  //     });
  // }, []);

  // if (isLoading) return <LoadingComponent />;
  // if (!data) return <p>No data found</p>;

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-end overflow-hidden bg-watchlist text-white">
        {/* <div className="h-full w-full flex items-center justify-center bg-black bg-opacity-50"> */}
        <div className="w-[90%] h-[90%] overflow-hidden">
          <WishList />
          {/* <MuiDataTable /> */}
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default WatchListPage;
