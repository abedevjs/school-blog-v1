import { useQuery } from "@tanstack/react-query";
import { getPosts, readPost } from "../services/apiPosts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatDate } from "../services/utility";

function ReadPost() {
  let { id } = useParams();
  const [post, setPost] = useState("");

  useEffect(
    function () {
      readPost(id).then((data) => {
        setPost(data);
      });
    },
    [id]
  );

  if (!post) return;

  return (
    <div className=" py-2 px-14 mx-auto text-slate-700 lg:px-8 sm:px-1 ">
      {/* <h2 className="judul">{post.title}</h2>
      <span className="judul">{post.user}</span>
      <p>{post.body}</p>
      <img src={`${post.image}`} alt="" /> */}

      {/* TITLE */}
      <h1 className=" mb-8 text-4xl font-semibold uppercase text-center sm:text-2xl">
        {post.title}
      </h1>

      {/* IMAGE */}
      {post.image && (
        <div className=" mb-16 w-80 h-auto mx-auto sm:w-64">
          <img
            src={`${post.image}`}
            className=" h-full  w-full rounded-lg "
            alt=""
          />
        </div>
      )}

      {/* USER AND DATE */}
      <div className=" mb-8 text-sm italic capitalize sm:text-xs">
        <p className=" ">✍️ {post.user}</p>
        <p className=" ">📅 {formatDate(post.created_at)}</p>
      </div>

      {/* BODY */}
      <p className=" text-lg text-slate-500 text-left sm:text-base">
        {post.body}
      </p>
    </div>
  );
}

export default ReadPost;
