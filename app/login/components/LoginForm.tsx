"use client";

import { ReactNode, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "learning/@/components/ui/Alert/Alert";
import { Button } from "learning/@/components/ui/Button/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "learning/@/components/ui/Card/Card";
import { Input } from "learning/@/components/ui/Input/Input";
import Loading from "learning/app/components/Loading/Loading";

import { signIn } from "../actions";

type FormInputs = {
  email: string;
  password: string;
  status?: string;
};

type ErrorProps = {
  children: ReactNode;
};

const ErrorMessage = ({ children }: ErrorProps) => {
  return <p className="mt-1.5 font-semibold text-red-700">{children}</p>;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const [loading, setLoading] = useState(false);

  const [serverStatus, setServerStatus] = useState<string>();

  const formRef = useRef(null);

  const onSubmit = async () => {
    if (serverStatus) {
      setServerStatus("");
    }

    const formData = new FormData(formRef.current);

    let errorMessage;

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      errorMessage = await signIn(formData);
    }

    if (errorMessage) {
      setServerStatus(errorMessage);
      setLoading(false);
    }
  };

  return (
    <Card className="flex w-full max-w-[800px] flex-col items-center rounded-none border-none bg-white md:flex-row">
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="bg-purple py-2">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold">
              Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <Input
                data-testid="login_email"
                type="text"
                name="email"
                className="mt-1.5 border border-purple-900"
                placeholder="Email"
                {...register("email", {
                  required: "Please enter the Email",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  },
                })}
              />
              {errors.email ? (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              ) : null}
            </div>
            <div className="mt-2 flex flex-col">
              <Input
                data-testid="login_password"
                type="password"
                name="password"
                placeholder="Password"
                className="mt-1.5 border-purple-900"
                {...register("password", {
                  required: "Please enter the Password",
                  minLength: {
                    value: 6,
                    message: "Min. length is 6",
                  },
                })}
              />
              {errors.password ? (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              ) : null}
            </div>
            {serverStatus && !loading ? (
              <Alert variant="destructive" className="mt-2 rounded">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertTitle className="font-bold">Error</AlertTitle>
                <AlertDescription>{serverStatus}</AlertDescription>
              </Alert>
            ) : null}
            <Button
              type="submit"
              className="mt-4 w-full bg-purple-900 font-semibold text-white hover:text-purple-900"
            >
              {loading ? <Loading /> : "Login"}
            </Button>
          </CardContent>
        </div>
      </form>
    </Card>
  );
};

export default LoginForm;
