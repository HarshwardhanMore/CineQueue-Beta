import React from "react";
import { Separator } from "@/components/ui/separator";

import { useState, useEffect } from "react";
import LoadingComponent from "./loadingComponent";
import { useUser } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Link from "next/link";
import Image from "next/image";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export function TableHead() {
  return (
    <div className=" w-full flex flex-row items-center border border-slate-300 rounded-md mb-2 h-[12%] text-slate-50 text-base">
      <div className="w-2/12 pl-4">Status</div>
      <div className="w-5/12 pl-4 ">Movie</div>
      {/* <div>{description}</div> */}
      <div className="w-4/12  pl-4">Genre</div>
      <div className="w-1/12  pl-4"></div>
    </div>
  );
}
export function TableRow({ name, description, status, genre }: any) {
  return (
    <div className="  w-full flex flex-row items-center border border-slate-600 rounded-md mb-1 h-[12%] text-slate-400 text-sm">
      <div className="w-2/12 h-2/5 flex items-center pl-4 ">
        {status == "Watched" && (
          <CheckCircleIcon style={{ color: "#F8FAFC" }} />
        )}
        {status == "Not Watched" && <CancelIcon style={{ color: "#F8FAFC" }} />}
        {status == "Watching" && <PendingIcon style={{ color: "#F8FAFC" }} />}
      </div>
      <div className="w-5/12 pl-4 flex  items-center">{name}</div>
      {/* <div>{description}</div> */}
      <div className="w-4/12 pl-4 font-normal flex flex-row items-center ">
        {genre.length <= 3
          ? genre.map((i: any) => {
              return (
                <Badge
                  className="bg-slate-50 text-black mr-1 flex flex-row items-center"
                  variant="outline"
                >
                  {i}
                </Badge>
              );
            })
          : genre.slice(0, 3).map((i: any) => {
              return (
                <>
                  <Badge
                    className="bg-slate-50 text-black mr-1 flex flex-row items-center"
                    variant="outline"
                  >
                    {i}
                  </Badge>
                </>
              );
            })}
        {genre.length > 3 ? (
          <Badge
            className=" bg-slate-400 text-black flex flex-row items-center"
            variant="secondary"
          >
            more
          </Badge>
        ) : (
          <></>
        )}
      </div>
      <div className="w-1/12 h-full flex items-center justify-center pl-4 ">
        <Dialog>
          <DialogTrigger className=" flex items-center justify-center w-full h-2/5">
            {/* <img src="/icons/open.png" alt="More" className=" h-full" /> */}
            <OpenInNewIcon style={{ color: "#F8FAFC" }} />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className=" text-slate-800 ">
              <DialogTitle className=" text-2xl font-nunito font-bold">
                {name}
              </DialogTitle>
              <DialogDescription className=" font-tienne">
                {description}
              </DialogDescription>
              <div className=" w-full flex flex-row font-hind">
                <span className=" font-bold">Genres</span>:{" "}
                {/* <span> {genre.join(" | ")} </span> */}
                <span className=" ml-2">
                  {genre.map((i: any) => {
                    return <Badge className=" font-normal">{i}</Badge>;
                  })}{" "}
                </span>
              </div>
              <div className=" font-hind">
                <span className=" font-bold">Status</span>:
                <span> {status}</span>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

const WishList = () => {
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
    // <>
    <div className=" w-full h-full overflow-hidden ">
      <div className="h-[10%] w-full flex items-center">
        <div className=" h-full w-full flex flex-row items-center mb-2 text-slate-300 text-base">
          <div className="h-full w-2/12 flex items-center">
            <Input
              id="status"
              name="status"
              required
              type="text"
              placeholder="Status"
              className=" w-full bg-transparent border border-slate-600 rounded-md text-sm pl-4 
                    placeholder:text-slate-500 focus:outline-none ring-0 focus:border-b-2"
            />
          </div>
          <div className="h-full w-5/12 pl-4 flex items-center">
            <Input
              id="name"
              name="name"
              required
              type="text"
              placeholder="Enter Movie Name"
              className=" w-full bg-transparent border border-slate-600 rounded-md text-sm pl-4 
                    placeholder:text-slate-500 focus:outline-none ring-0 focus:border-b-2"
            />
          </div>
          {/* <div>{description}</div> */}
          <div className="h-full w-4/12  pl-4 flex items-center">
            <Input
              id="genre"
              name="genre"
              required
              type="text"
              placeholder="Genre"
              className=" w-full bg-transparent border border-slate-600 rounded-md text-sm pl-4 
                    placeholder:text-slate-500 focus:outline-none ring-0 focus:border-b-2"
            />
          </div>
          <div className="h-full w-1/12  pl-4 flex items-center">
            <Button className=" w-full bg-transparent border border-white rounded-md text-sm pl-4 bg-slate-50 text-black font-semibold hover:bg-slate-200">
              Find
            </Button>
          </div>
        </div>
      </div>
      <div className="h-[80%] w-full text-slate-600 overflow-hidden">
        <TableHead />
        <div className=" h-full w-full overflow-x-hidden overflow-y-scroll">
          {data.map((i: any) => {
            if (i.creatorId === user.id)
              return (
                <TableRow
                  name={i.name}
                  description={i.description}
                  status={i.status}
                  genre={i.genre}
                />
              );
          })}
        </div>
      </div>
      <div className="h-[10%] w-full flex items-center text-sm underline text-slate-300">
        <Link href="addmovie" className=" w-full h-full flex items-center">
          Add More Movies To Wishlist
        </Link>
      </div>
    </div>
    // </>
  );
};

export default WishList;
