import "./global.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./_root/pages";
import { SignInForm, SignUpForm } from "./_auth/forms";
import AuthLayout from "./_auth/AuthLayout.tsx";
import RootLayout from "./_root/RootLayout.tsx";

const App = () => {
  return (
    <main className={"flex h-screen"}>
      <Routes>
        <Route element={<AuthLayout />}>
          {/*Public Routes*/}
          <Route path={"/sign-in"} element={<SignInForm />} />
          <Route path={"/sign-up"} element={<SignUpForm />} />
        </Route>

        <Route element={<RootLayout />}>
          {/*Private Routes*/}
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
