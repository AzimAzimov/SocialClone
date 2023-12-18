import { Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster.tsx";
import {
  AllUsers,
  CreatePost,
  EditPost,
  Explore,
  Home,
  PostsDetails,
  Profile,
  Saved,
  UpdateProfile,
} from "./_root/pages";
import { SignInForm, SignUpForm } from "./_auth/forms";
import AuthLayout from "./_auth/AuthLayout.tsx";
import RootLayout from "./_root/RootLayout.tsx";
import "./global.css";

const App = () => {
  return (
    <main className={"flex h-screen"}>
      <Routes>
        {/*Public Routes*/}
        <Route element={<AuthLayout />}>
          <Route path={"/sign-in"} element={<SignInForm />} />
          <Route path={"/sign-up"} element={<SignUpForm />} />
        </Route>

        {/*Private Routes*/}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path={"/explore"} element={<Explore />} />
          <Route path={"/saved"} element={<Saved />} />
          <Route path={"/all-users"} element={<AllUsers />} />
          <Route path={"/create-post"} element={<CreatePost />} />
          <Route path={"/update-post/:id"} element={<EditPost />} />
          <Route path={"/posts/:id"} element={<PostsDetails />} />
          <Route path={"/profile/:id/*"} element={<Profile />} />
          <Route path={"/update-profile/:id"} element={<UpdateProfile />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
