"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "learning/@/components/ui/Tabs/Tabs";
import FPLLogo from "learning/app/components/FPLLogo";
import LoginForm from "learning/app/login/components/LoginForm";
import SignUpForm from "learning/app/login/components/SignUpForm";

const LoginSignUp = () => {
  return (
    <section className="public flex w-full items-center justify-center">
      <div className="my-10 flex w-4/5 max-w-[800px] flex-col items-center rounded-none border-none bg-white md:flex-row">
        <Tabs defaultValue="login" className="w-full md:basis-1/2">
          <TabsContent value="login" className="mt-0">
            <LoginForm />
          </TabsContent>
          <TabsContent value="sign-up" className="mt-0">
            <SignUpForm />
          </TabsContent>
          <TabsList className="flex w-full p-0">
            <TabsTrigger value="login" className="h-full flex-1">
              Login
            </TabsTrigger>
            <TabsTrigger value="sign-up" className="h-full flex-1">
              Sign Up
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex w-auto items-center justify-center md:w-2/4">
          <FPLLogo classnames="p-7 w-full" />
        </div>
      </div>
    </section>
  );
};

export default LoginSignUp;
