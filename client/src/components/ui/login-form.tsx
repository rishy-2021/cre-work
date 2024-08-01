"use client";
import styles from "@/styles/signup.module.css";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { LoginFormData } from "@/types/auth/types";
import { useState } from "react";
import FieldErrorText from "../FieldErrorText";
import { Button, Input } from "antd";
import Link from "next/link";
import { ZodType, z } from "zod";

const LoginForm = ({ toast }: any) => {

  const loginSchema: ZodType<LoginFormData> = z
  .object({
    email: z.string().email(),
    password: z.string().min(8).max(128)
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);

  const handleClick = () => {
    setPasswordShow(!passwordShow);
  };

  const submitData = async (formdata: LoginFormData) => {};

  return (
    <form
      onSubmit={handleSubmit(submitData)}
      className="md:min-w-[28rem] min-w-96  rounded-xl bg-white px-8 py-12"
    >
      <div className="mb-6 mx-auto flex flex-col items-center justify-center">
        <p className="text-3xl font-bold mb-1">
          Welcome to <span className="text-[#4534AC]">Workflo!</span>
        </p>
      </div>
      <div className="inputs flex flex-col gap-y-3">
      <Controller
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <>
              <Input
                 type="email"
                 {...register("email")}
                 placeholder="Your Email"
                 size={"large"}
                 className="bg-gray-100 mb-2"
                status={error && "error"}
                onChange={onChange}
                value={value}
                suffix={
                  error && (
                    <p
                      className={
                        "flex text-sm items-start justify-start h-full px-1 text-red-600"
                      }
                    >
                      Required*
                    </p>
                  )
                }
              />
            </>
          );
        }}
        name="email"
      />
       <Controller
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <>
              <Input
                  type="password"
                  placeholder="Password"
                  size={"large"}
                  className="bg-gray-100"
                status={error && "error"}
                onChange={onChange}
                value={value}
                suffix={
                  error && (
                    <p
                      className={
                        "flex text-sm items-start justify-start h-full px-1 text-red-600"
                      }
                    >
                      Required*
                    </p>
                  )
                }
              />
            </>
          );
        }}
        name="password"
      />
        <div className="flex items-center justify-between">
          <Button
            loading={isLoading}
            type="primary"
            // disabled={!isValid}
            color="blue"
            size={"large"}
            className={`w-full mt-2`}
            style={{
              background: `linear-gradient(180deg, #4C38C2 0%, #2F2188 100%),
              linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))`,
            }}
            onClick={handleSubmit(()=> router.replace("/dashboard"))}
          >
            Login
          </Button>
        </div>
        <p className="mx-auto text-sm mt-2">
          Don&apos;t have an account? Create a
          <span className="text-violet-700 pointer"><Link href={"/signup"}> new account</Link></span>.
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
