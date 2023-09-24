import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createPost, getPosts } from "../services/apiPosts";
import { Link } from "react-router-dom";

import { Icon } from "@iconify/react";
import { cutWords, formatDate } from "../services/utility";

function Home() {
  return (
    <section>
      <Header />
      <Main />
    </section>
  );
}
const motto = `Arifah "Memories of XI.05"`;
function Header() {
  return (
    <div className=" mb-12 h-[90vh] flex flex-col justify-around lg:h-[70vh] md:h-[60vh] sm:h-[60vh]">
      {/* Text */}
      <div className=" text-center self-center font-title text-slate-700 text-6xl lg:text-4xl sm:text-2xl">
        <h1>{motto}</h1>
      </div>

      {/* Image */}
      <div className=" mx-auto  flex items-center justify-center">
        {/* Photo ini dimensinya hanya LG sj krn di mobile dia hidden */}
        <img
          className="w-[35%] rounded-lg border-fuchsia-500 border-2 translate-y-8 -rotate-[8deg] md:hidden"
          src="/images/Mahasin2LG.jpg"
          alt="Mahasin2LG"
        />

        {/* Photo ini 2 dimensi, yg 1 akan di hidden di mobile device */}
        <img
          className="w-[35%] rounded-lg border-fuchsia-500 border-2 rotate-[8deg] lg:w-3/4 lg:rotate-0 sm:w-[90%] md:hidden"
          src="/images/Mahasin3LG.jpg"
          alt="Foto1"
        />
        <img
          className="w-[35%] rounded-lg border-fuchsia-500 border-2 rotate-[8deg] lg:w-3/4 lg:rotate-0 sm:w-[90%] hidden md:block"
          src="/images/Mahasin3SM.jpg"
          alt="Foto1"
        />
      </div>

      {/* Button */}
      <div className="flex self-center gap-4 font-semibold">
        <Link
          to="/add"
          target="_blank"
          className="p-2 px-4 text-lg text-slate-700 rounded-xl bg-yellow-500 duration-300 opacity-80 shadow-md hover:opacity-100 md:p-1 md:px-2 md:text-base"
        >
          Tulis Pesan
        </Link>
        <div className="flex justify-between gap-1 sm:gap-2">
          <a
            href="https://www.facebook.com/asingm.m"
            target="_blank"
            rel="noreferrer"
          >
            <Icon icon="devicon:facebook" className=" h-5 w-5" />
          </a>
          <a
            href="https://chat.whatsapp.com/JH8zM89FJzvF44Axt64CQY"
            target="_blank"
            rel="noreferrer"
          >
            <Icon icon="logos:whatsapp-icon" className=" h-5 w-5" />
          </a>
          <a
            href="https://www.instagram.com/asing.ms/"
            target="_blank"
            rel="noreferrer"
          >
            <Icon icon="skill-icons:instagram" className=" h-5 w-5" />
          </a>
          <a
            href="https://t.me/+GPyz9OACw3RlODBl"
            target="_blank"
            rel="noreferrer"
          >
            <Icon icon="logos:telegram" className=" h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
}

function Main() {
  return (
    <main className="">
      <OpenerText />
      <Posts />
    </main>
  );
}

function OpenerText() {
  // eslint-disable-next-line no-irregular-whitespace
  const text = `"Dunia ini hanya memiliki tiga hari: Hari kemarin, ia telah pergi bersama dengan semua yang menyertainya. Hari esok, kamu mungkin tak akan pernah menemuinya. Hari ini, itulah yang kamu miliki, maka beramallah di hari ini." – Hasan al Bashri.`;
  return (
    <div className=" mb-8 w-1/2 mx-auto text-orange-500 text-center text-lg italic font-semibold md:text-base md:w-full sm:text-sm">
      <p>{text}</p>
    </div>
  );
}

// function SearchPosts({ searchQuery, setSearchQuery }) {
//   // const { searchQuery, setSearchQuery } = useContext(PostContext);

//   return (
//     <input
//       value={searchQuery}
//       onChange={(e) => setSearchQuery(e.target.value)}
//       placeholder="Search posts..."
//     />
//   );
// }

// function Results({ posts }) {
//   // const { posts } = useContext(PostContext);
//   return <p>🚀 {posts?.length} atomic posts found</p>;
// }

function Posts() {
  return (
    <section>
      <List />
    </section>
  );
}

// function FormAddPost({ onAddPost }) {
//   // const { onAddPost } = useContext(PostContext);
//   const [title, setTitle] = useState("");
//   const [body, setBody] = useState("");

//   const queryClient = useQueryClient();

//   const { mutate, isLoading: isCreating } = useMutation({
//     mutationFn: createPost,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["posts"] });
//       setTitle(""), setBody("");
//     },
//     onError: (err) => console.log(err),
//   });

//   const handleSubmit = function (e) {
//     e.preventDefault();
//     if (!body || !title) return;
//     // onAddPost({ title, body });

//     mutate({ title, body });

//     // setTitle("");
//     // setBody("");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Post title"
//         minLength={5}
//         maxLength={20}
//       />
//       <textarea
//         value={body}
//         onChange={(e) => setBody(e.target.value)}
//         placeholder="Post body"
//       />
//       <button disabled={isCreating}>Add post</button>
//     </form>
//   );
// }

function List() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return (
    <ul className="mx-auto grid grid-rows-[repeat(1fr,minmax(20rem,20rem))] grid-cols-[repeat(auto-fit,minmax(15rem,25rem))] justify-center  gap-6 ">
      {data?.map(
        (post, i) =>
          post.active && (
            <li
              key={i}
              className=" py-2 px-4 flex flex-col text-slate-600 bg-green-300 rounded-md"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className=" text-lg font-semibold capitalize">
                    {cutWords(post.title, 3)}
                  </h2>
                  <p className=" text-xs italic">✍️ {post.user}</p>
                  <span className=" text-xs italic">
                    📅 {formatDate(post.created_at)}
                  </span>
                </div>
                {post.title && (
                  <img
                    className="max-w-[25%] max-h-24 rounded-sm"
                    src={`${post.image}`}
                    alt=""
                  />
                )}
              </div>
              <p>-------------------------</p>
              <p className=" mb-2 text-xs">{cutWords(post.body, 30)}</p>
              <span>
                <Link
                  to={`read/${post.id}`}
                  className=" self-end text-xs italic text-blue-600 underline"
                  target="_blank"
                >
                  Baca
                </Link>
              </span>
            </li>
          )
      )}
    </ul>
  );
}

// function Archive() {
//   // const { onAddPost } = useContext(PostContext);

//   // Here we don't need the setter function. We're only using state to store these posts because the callback function passed into useState (which generates the posts) is only called once, on the initial render. So we use this trick as an optimization technique, because if we just used a regular variable, these posts would be re-created on every render. We could also move the posts outside the components, but I wanted to show you this trick 😉
//   const [posts] = useState(() =>
//     // 💥 WARNING: This might make your computer slow! Try a smaller `length` first
//     Array.from({ length: 10000 }, () => createRandomPost())
//   );

//   const [showArchive, setShowArchive] = useState(false);

//   return (
//     <aside>
//       <h2>Post archive</h2>
//       <button onClick={() => setShowArchive((s) => !s)}>
//         {showArchive ? "Hide archive posts" : "Show archive posts"}
//       </button>

//       {showArchive && (
//         <ul>
//           {posts.map((post, i) => (
//             <li key={i}>
//               <p>
//                 <strong>{post.title}:</strong> {post.body}
//               </p>
//               {/* <button onClick={() => onAddPost(post)}>Add as new post</button> */}
//             </li>
//           ))}
//         </ul>
//       )}
//     </aside>
//   );
// }

export default Home;
