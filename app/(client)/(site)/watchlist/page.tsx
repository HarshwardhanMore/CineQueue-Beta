"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import { useUser } from "@clerk/nextjs";

import LoadingComponent from "@/components/custom/loadingComponent";
import DataTable from "@/components/custom/wishlistTable";

const WatchListPage = () => {
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
      <div className="h-screen w-screen flex justify-center items-end overflow-hidden bg-white text-black">
        <div className="w-[90%] h-[90%]">
          {/* <div>Watchlist</div> */}
          <div>
            <DataTable />
          </div>
          {/* <div> My name is {user.id}</div>
          <div>
            {data.map((i: any) => {
              if (i.creatorId == user.id)
                return (
                  <div>
                    <div>{i.name}</div>
                    <div>{i.description}</div>
                    <div>{i.creatorId}</div>
                  </div>
                );
            })}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default WatchListPage;
