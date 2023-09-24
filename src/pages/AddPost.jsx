import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createPost } from "../services/apiPosts";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

// function FormAddPostOld({ onAddPost }) {
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

function FormAddPost() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors, isSubmitting, isSubmitSuccessful, isLoading } = formState;

  const queryClient = useQueryClient();

  const {
    mutate,
    isSuccess,
    isLoading: isCreating,
  } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      reset();
      toast.success(
        "Postingan berhasil terkirim. Tunggu konfirmasinya ya kak 😄"
      );
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data?.image[0];

    mutate({ ...data, image: image });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <div className="p-8 h-screen">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className=" w-[30rem] mx-auto flex flex-col gap-4 items-center justify-evenly text-slate-700 md:w-80 sm:w-64"
      >
        {/* USER */}
        <div className=" w-full flex items-center justify-between md:flex-col">
          <label htmlFor="user" className=" font-semibold md:self-start">
            Nama:
          </label>
          <input
            className=" py-1 px-2 w-80 rounded-md outline-none"
            type="text"
            id="user"
            placeholder="Nama Lengkap"
            disabled={isCreating}
            {...register("user", { required: "Nama harus diisi ya kak 😓" })}
          />
        </div>
        {errors?.user?.message && (
          <p className=" text-sm text-red-600 italic">{errors.user.message}</p>
        )}

        {/* NISN */}
        <div className=" w-full flex items-center justify-between md:flex-col">
          <label htmlFor="nisn" className=" font-semibold md:self-start">
            Nomer NISN:
          </label>
          <input
            className=" py-1 px-2 w-80 rounded-md outline-none"
            type="text"
            id="nisn"
            placeholder="Nomer NISN"
            disabled={isCreating}
            {...register("nisn", {
              required: "Nomer NISN harus diisi ya kak 🥺",
            })}
          />
        </div>
        {errors?.nisn?.message && (
          <p className=" text-sm text-red-600 italic">{errors.nisn.message}</p>
        )}

        {/* TITLE */}
        <div className=" w-full flex items-center justify-between  md:flex-col">
          <label htmlFor="title" className=" font-semibold md:self-start">
            Judul:
          </label>
          <input
            className=" py-1 px-2 w-80 rounded-md outline-none"
            type="text"
            id="title"
            placeholder="Judul Postingan"
            // maxLength={50}
            disabled={isCreating}
            {...register("title", {
              required: "Judul postingan harus diisi ya kak 🥺",
            })}
          />
        </div>
        {errors?.title?.message && (
          <p className=" text-sm text-red-600 italic">{errors.title.message}</p>
        )}

        {/* BODY */}
        <div className=" w-full flex items-center justify-between md:flex-col">
          <label htmlFor="body" className=" font-semibold md:self-start">
            Isi:
          </label>
          <textarea
            className=" py-1 px-2 w-80 h-40 rounded-md outline-none"
            type="text"
            id="body"
            placeholder="Apa yang ingin kakak posting 😇"
            disabled={isLoading}
            {...register("body", {
              required: "Postingan harus diisi ya kak 🥺",
            })}
          />
        </div>

        {errors?.body?.message && (
          <p className=" text-sm text-red-600 italic">{errors.body.message}</p>
        )}

        {/* IMAGE */}
        <div className=" w-full flex items-center justify-between  md:flex-col">
          <label htmlFor="body" className=" font-semibold md:self-start">
            Gambar <span className="italic text-xs">(jika ada)</span>:
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            {...register("image")}
          />
        </div>
        <button
          disabled={isLoading}
          className=" mt-4 p-2 px-4 self-end text-lg text-slate-700 rounded-xl bg-yellow-500 duration-300 opacity-80 shadow-md hover:opacity-100 md:p-1 md:px-2 md:text-base"
        >
          Kirim Postingan
        </button>
        {/* {isSuccess && (
          <span className="text-xs text-green-600 font-semibold">
            Postingan berhasil terkirim. Tunggu konfirmasinya ya kak 😄
          </span>
        )} */}
        {/* {!isSuccess && (
          <span className="text-xs text-red-500 font-semibold">
            Postingan gagal. Pastikan data nya sudah benar ya kak 😓
          </span>
        )} */}
      </form>
    </div>
  );
}

export default FormAddPost;
