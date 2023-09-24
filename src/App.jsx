// import { useState } from "react";
// import { createPost, getPosts } from "./services/apiPosts";
import {
  QueryClient,
  QueryClientProvider,
  // useMutation,
  // useQuery,
  // useQueryClient,
} from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddPost from "./pages/AddPost";
import ReadPost from "./pages/ReadPost";
import AppLayout from "./ui/AppLayout";
import { Toaster } from "react-hot-toast";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools/build/lib/devtools";
// import { faker } from "@faker-js/faker";

// const initialPost = [
//   {
//     title: "abe",
//     body: "akbar",
//   },
// ];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000, //* will re-fetch data after 60secs
      staleTime: 0, //* will always re-fetch data
    },
  },
});

function App() {
  // const [posts, setPosts] = useState(() =>
  //   Array.from({ length: 30 }, () => createRandomPost())
  // );

  // const [posts, setPosts] = useState(initialPost);
  // const [searchQuery, setSearchQuery] = useState("");

  // Derived state. These are the posts that will actually be displayed
  // const searchedPosts =
  //   searchQuery.length > 0
  //     ? posts.filter((post) =>
  //         `${post.title} ${post.body}`
  //           .toLowerCase()
  //           .includes(searchQuery.toLowerCase())
  //       )
  //     : posts;

  // function handleAddPost(post) {
  //   setPosts((posts) => [post, ...posts]);
  // }

  // function handleClearPosts() {
  //   setPosts([]);
  // }

  // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
  // useEffect(
  //   function () {
  //     document.documentElement.classList.toggle("fake-dark-mode");
  //   },
  //   [isFakeDark]
  // );

  // useEffect(function () {
  //   getPosts().then((data) => {
  //     setPosts((posts) => [...data, ...posts]);
  //   });
  // }, []);

  // function allPosts() {
  //   const x = useQuery({
  //     queryKey: ["posts"],
  //     queryFn: getPosts,
  //   });

  //   console.log(x);
  // }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="add" element={<AddPost />} />
            <Route path="read/:id" element={<ReadPost />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={true}
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 5000,
          },
          error: {
            duration: 7000,
          },
          style: {
            fontSize: "12px",
            fontWeight: "600",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#f3e8ff",
            color: "#475569",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
