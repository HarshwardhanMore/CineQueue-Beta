"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import { useUser } from "@clerk/nextjs";

import GenreCombobox from "@/components/custom/genreCombobox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import Link from "next/link";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function addMovie() {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!user) return null;

  const [data, setData] = useState<{
    name: string;
    description: string;
    status: string;
    genre: string[];
    creatorId: string;
  }>({
    name: "",
    description: "",
    status: "",
    genre: [],
    creatorId: user.id,
  });

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("/api/addmovie", data)
      .then(() => toast.success("Movie Added to Watchlist"))
      .catch((e) => toast.error("Something went wrong!" + e.message));
  };

  //

  console.log(data.genre);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value: string = event.target.value;
    if (data.genre.includes(value)) {
      setData({
        ...data,
        genre: data.genre.filter((item: string) => item !== value),
      });
    } else {
      setData({ ...data, genre: [...data.genre, value] });
    }
  };

  return (
    <>
      <div className=" h-full w-full flex items-center justify-center bg-addmovie text-white overflow-x-hidden">
        <div className=" h-full w-full flex items-center justify-center bg-black bg-opacity-50">
          <div className=" w-5/6 ">
            <div className="flex flex-col items-center justify-center my-5">
              <div className=" text-8xl font-bold mb-2">CineQueue</div>
              <div className=" w-2/3 text-sm text-slate-500 text-center">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Nesciunt cum cumque voluptates distinctio quaerat et sequi
                consequuntur sunt illum deserunt!
              </div>
            </div>
            <form onSubmit={sendData} className=" my-5 w-full">
              <div className="flex flex-col w-full">
                <div className=" flex flex-row w-full">
                  <input
                    id="name"
                    name="name"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    required
                    type="text"
                    placeholder="Enter Movie Name"
                    className=" w-2/4 m-1 bg-transparent border border-white rounded-md text-sm pl-2.5 
                    placeholder:text-slate-500 focus:outline-none ring-0 focus:border-b-2"
                  />
                  <div className=" w-1/4 m-1">
                    <div>
                      <h2>Select Multiple Values</h2>
                      <label>
                        <input
                          type="checkbox"
                          value="value1"
                          checked={data.genre.includes("value1")}
                          onChange={handleCheckboxChange}
                        />
                        Value 1
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          value="value2"
                          checked={data.genre.includes("value2")}
                          onChange={handleCheckboxChange}
                        />
                        Value 2
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          value="value3"
                          checked={data.genre.includes("value3")}
                          onChange={handleCheckboxChange}
                        />
                        Value 3
                      </label>
                      <div>Selected Values: {data.genre.join(", ")}</div>
                    </div>
                  </div>
                  <select
                    aria-label="label for the select"
                    id="status"
                    name="status"
                    value={data.status}
                    onChange={(event) => {
                      setData({ ...data, status: event.target.value });
                    }}
                    className=" bg-transparent border border-slate-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="watching">Watching</option>
                    <option value="watched">Watched</option>
                    <option value="notwatched">Not Watched</option>
                  </select>
                </div>
                <div className=" flex flex-row w-full">
                  <Textarea
                    id="description"
                    name="description"
                    value={data.description}
                    onChange={(e) =>
                      setData({ ...data, description: e.target.value })
                    }
                    placeholder="Enter Movie Description"
                    className=" w-3/4 m-1 bg-transparent border border-white rounded-md text-sm pl-2.5 
                    placeholder:text-slate-500 focus:outline-none ring-0 focus:border-b-2 focus:ring-0 focus:outline-0"
                  />

                  <Button
                    className="self-end bg-white text-black font-semibold hover:bg-slate-200 w-1/4 m-1"
                    type="submit"
                  >
                    Add
                  </Button>
                </div>
                {/* Hidden */}
                <div className="grid grid-cols-4 items-center gap-4 hidden">
                  <label htmlFor="creatorId" className="text-right">
                    creatorId
                  </label>
                  <input
                    id="creatorId"
                    name="creatorId"
                    value={data.creatorId}
                    onChange={(e) =>
                      setData({ ...data, creatorId: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                {/* Hidden */}
              </div>
            </form>
            <div className=" w-full flex justify-center my-5">
              <Button className=" w-1/4 h-[100%] self-end bg-white text-black font-semibold hover:bg-slate-200">
                <Link href="watchlist">WatchList</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// "use client";

// import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";

// import { useUser } from "@clerk/nextjs";

// import GenreCombobox from "@/components/custom/genreCombobox";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";

// import Link from "next/link";

// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// export default function addMovie() {
//   const { isLoaded, isSignedIn, user } = useUser();
//   if (!user) return null;

//   const [data, setData] = useState({
//     name: "",
//     description: "",
//     status: "",
//     genre: Array,
//     creatorId: user.id,
//   });

//   const sendData = async (e: any) => {
//     e.preventDefault();
//     axios
//       .post("/api/addmovie", data)
//       .then(() => toast.success("Movie Added to Watchlist"))
//       .catch((e) => toast.error("Something went wrong!" + e.message));
//   };

//   const handleCheckboxChange = (event: any): void => {
//     const value: string = event.target.value;
//     if (data.genre.includes(value)) {
//       setData(data.genre.filter((item: string) => item !== value));
//     } else {
//       setData({ ...data, genre: [...data.genre, value] });
//     }
//   };

//   return (
//     <>
//       <div className=" h-full w-full flex items-center justify-center bg-addmovie text-white overflow-x-hidden">
//         <div className=" h-full w-full flex items-center justify-center bg-black bg-opacity-50">
//           <div className=" w-5/6 ">
//             <div className="flex flex-col items-center justify-center my-5">
//               <div className=" text-8xl font-bold mb-2">CineQueue</div>
//               <div className=" w-2/3 text-sm text-slate-500 text-center">
//                 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
//                 Nesciunt cum cumque voluptates distinctio quaerat et sequi
//                 consequuntur sunt illum deserunt!
//               </div>
//             </div>
//             <form onSubmit={sendData} className=" my-5 w-full">
//               <div className="flex flex-col w-full">
//                 <div className=" flex flex-row w-full">
//                   <input
//                     id="name"
//                     name="name"
//                     value={data.name}
//                     onChange={(e) => setData({ ...data, name: e.target.value })}
//                     required
//                     type="text"
//                     placeholder="Enter Movie Name"
//                     className=" w-2/4 m-1 bg-transparent border border-white rounded-md text-sm pl-2.5
//                     placeholder:text-slate-500 focus:outline-none ring-0 focus:border-b-2"
//                   />
//                   <div className=" w-1/4 m-1">
//                     <GenreCombobox />
//                   </div>
//                   <select
//                     aria-label="label for the select"
//                     id="status"
//                     name="status"
//                     value={data.status}
//                     onChange={(event) => {
//                       setData({ ...data, status: event.target.value });
//                     }}
//                     className=" bg-transparent border border-slate-500"
//                   >
//                     <option value="pending">Pending</option>
//                     <option value="watching">Watching</option>
//                     <option value="watched">Watched</option>
//                     <option value="notwatched">Not Watched</option>
//                   </select>
//                 </div>
//                 <div className=" flex flex-row w-full">
//                   <Textarea
//                     id="description"
//                     name="description"
//                     value={data.description}
//                     onChange={(e) =>
//                       setData({ ...data, description: e.target.value })
//                     }
//                     placeholder="Enter Movie Description"
//                     className=" w-3/4 m-1 bg-transparent border border-white rounded-md text-sm pl-2.5
//                     placeholder:text-slate-500 focus:outline-none ring-0 focus:border-b-2 focus:ring-0 focus:outline-0"
//                   />

//                   <Button
//                     className="self-end bg-white text-black font-semibold hover:bg-slate-200 w-1/4 m-1"
//                     type="submit"
//                   >
//                     Add
//                   </Button>
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4 hidden">
//                   <label htmlFor="creatorId" className="text-right">
//                     creatorId
//                   </label>
//                   <input
//                     id="creatorId"
//                     name="creatorId"
//                     value={data.creatorId}
//                     onChange={(e) =>
//                       setData({ ...data, creatorId: e.target.value })
//                     }
//                     className="col-span-3"
//                   />
//                 </div>
//               </div>
//             </form>
//             <div className=" w-full flex justify-center my-5">
//               <Button className=" w-1/4 h-[100%] self-end bg-white text-black font-semibold hover:bg-slate-200">
//                 <Link href="watchlist">WatchList</Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
