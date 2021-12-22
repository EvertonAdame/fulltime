import React from "react";
import { urlFor, client } from "../cliente";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
// import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { RiHeartsFill } from "react-icons/ri";
import { fetchUser } from "../utils/fetchUser";

const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {


  const navigate = useNavigate();
  const user = fetchUser();



  const alreadySaved = !!(save?.filter((item) => item?.postedBy?._id === user?.googleId))?.length;
 

  const savePin = (id) => {
    if (!alreadySaved) {
   

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user?.googleId,
            postedBy: {
              _type: "postedBy",
              _ref: user?.googleId,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
          
        });
    }
  };

  const deletePin = (id) => {
      client
        .delete(id)
        .then(() => {
           window.location.reload(); 
        })
  }

  return (
    <div className="m-2">
      <div
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className="relative mt-4 cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img
          className="rounded-lg w-full"
          alt="user-post"
          src={urlFor(image).width(250).url()}
        />
       
          <div
            className="absolute top-0 w-full h-full flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex  gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-teal-100 w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button
                   onClick={(e) => {
                    e.stopPropagation();
                   
                  }}
                  type="button"
                  className="bg-teal-300 opacity-100 hover:opacity-70 text-white  font-bold w-[3rem] h-[3rem] flex flex-col justify-center items-center px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {save?.length} <RiHeartsFill/>
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  type="button"
                  className="bg-teal-300 opacity-100 hover:opacity-70  text-white font-bold px-5 py-1 flex flex-col justify-center items-center w-[3rem] h-[3rem] text-base rounded-full hover:shadow-md outline-none p-2"
                  title="Amei"
                >
                 <p className="text-xs">Amei</p> <RiHeartsFill/>
                </button>
              )}
            </div>
            <div className=" flex justify-between items-center gap-2 w-full absolute bottom-2">
              {/* {destination && (
                <a
                  href={destination}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-teal-100 flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                >
                  <BsFillArrowUpRightCircleFill />
                  Link
                </a>
              )} */}
              {postedBy?._id === user?.googleId && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                  type="button"
                  className="bg-teal-100 p-2 opacity-70 hover:opacity-100 mr-3 font-bold  text-dark text-base rounded-3xl hover:shadow-md outline-none"
                >
                <AiTwotoneDelete/>
                </button>
              )}
            </div>
          </div>
        
      </div>
      <Link to={`user-profile/${postedBy?._id}`} className="flex gap-2 mt-2 items-center">
        <img className="w-8 h-8 rounded-full object-contain"
            src={postedBy?.image} alt="user-profile"
        />
        <p className="capitalize">{postedBy?.userName}</p>

      </Link>
    </div>
  );
};

export default Pin;
