"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUpValidation } from "@/lib/validation";
import { useState } from "react";
import Loader from "@/components/shared/Loader.tsx";
import { Link, useNavigate } from "react-router-dom";
import { createUserAccount } from "@/lib/appwrite/api.ts";
import { useToast } from "@/components/ui/use-toast.ts";
import { z } from "zod";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/ract-query/queriesAndMutations.ts";
import { useUserContext } from "@/context/AuthContext.tsx";

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { mutateAsync: createUserAccount, isLoading: isCreatingAccount } =
    useCreateUserAccount();
  const { mutateAsync: signInAccount, isLoading: isSigningInUser } =
    useSignInAccount();

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignUpValidation>) {
    const newUser = await createUserAccount(values);
    if (!newUser) return toast({ title: "Sign up failed. Please try again." });

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) return toast({ title: "Sign in failed. Please try again." });

    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      return toast({ title: "Sign up failed. Please try again." });
    }

    console.log(newUser);
  }

  return (
    <Form {...form}>
      <div className={"sm:w-420 flex-center flex-col"}>
        <img src={"./assets/images/logo.svg"} alt={"logo"} />
        <h2 className={"h3-bold md:h2-bold pt-5 sm:pt-12"}>
          Create a new account
        </h2>
        <p className={"text-light-3 small-medium md:base-regular mt-2"}>
          To use Snapgram, please enter your details
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={"flex flex-col gap-5 w-full mt-4"}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type={"text"} className={"shad-input"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type={"text"} className={"shad-input"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type={"email"} className={"shad-input"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type={"password"}
                    className={"shad-input"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className={"shad-button_primary"}>
            {isCreatingAccount ? (
              <div className={"flex-center gap-2"}>
                <Loader />
                Loading...
              </div>
            ) : (
              "Sign up"
            )}
          </Button>
        </form>
        <div className={"flex-center gap-2 mt-6 sm:mt-6 "}>
          <p className={"opacity-75 text-md text-small-regular"}>
            Already have an account?
          </p>
          <Link to={"/sign-in"} className={"text-primary-500"}>
            Log in
          </Link>
        </div>
      </div>
    </Form>
  );
};

export { SignUpForm };
