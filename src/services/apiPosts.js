import supabase, { supabaseUrl } from "./supabase";

export async function getPosts() {
  let { data, error } = await supabase.from("posts").select("*");

  if (error) {
    console.error(error);
    throw new Error("error dari getPosts()");
  }

  return data;
}

export async function createPost(newPost) {
  // https://bufuebjpkpewvlqvpyny.supabase.co/storage/v1/object/public/image/How%20To%20Instantly%20Feel%20Better.png

  const hasImagePath = newPost.image?.startsWith?.(supabaseUrl);
  const imgName = `${Math.random()}-${newPost.image.name}`.replaceAll("/", "");
  const imgPath = hasImagePath
    ? newPost.image
    : `${supabaseUrl}/storage/v1/object/public/image/${imgName}`;

  //1. Create Post
  const { data, error } = await supabase
    .from("posts")
    .insert([{ ...newPost, image: imgPath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("error dari createPost()");
  }

  //2. Create Image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("image")
    .upload(imgName, newPost.image);

  //3. Delete post IF there was an error during image uploading
  // if (storageError) {
  //   await supabase.from("posts").delete().eq("id", data.id);
  //   console.error(storageError);
  //   throw new Error("File uploading image error");
  // }

  return data;
}

export async function readPost(id) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error(error);
    throw new Error("error dari readPost(id)");
  }

  // console.log(data);
  return data;
}
