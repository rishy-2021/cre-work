"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SignupFormData } from "@/types/auth/types";
import { useState } from "react";
import FieldErrorText from "../FieldErrorText";
import { Button, Input } from "antd";
import Link from "next/link";
import { ZodType, z } from "zod";

const signUpSchema: ZodType<SignupFormData> = z
  .object({
    name:z.string().min(2, "Please enter a vaild name"),
    email: z.string().email(),
    password: z.string().min(8, "Password must contain at least 8 characters").max(128)
  });

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<SignupFormData>({ resolver: zodResolver(signUpSchema) });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [passwordShow, setPasswordShow] = useState(false);

  const handleClick = () => {
    setPasswordShow(!passwordShow);
  };

  const submitData = async (formdata: SignupFormData) => {};

  return (
    <form
      onSubmit={handleSubmit(submitData)}
      className="md:min-w-[28rem] min-w-96  rounded-xl bg-white px-8 py-10"
    >
      <div className="mb-6 mx-auto flex flex-col items-center justify-center">
        <p className="text-3xl font-bold mb-1">
          Welcome to <span className="text-[#4534AC]">Workflo!</span>
        </p>
      </div>
      <div className="inputs flex flex-col gap-y-3">
        <Input
          type="fullName"
          {...register("name")}
          placeholder="Your Email"
          size={"large"}
          className="bg-gray-100 mb-2"
        />
        {errors.email && (
          <FieldErrorText>{errors.email.message}</FieldErrorText>
        )}
        <Input
          type="email"
          {...register("email")}
          placeholder="Your Email"
          size={"large"}
          className="bg-gray-100 mb-2"
        />
        {errors.email && (
          <FieldErrorText>{errors.email.message}</FieldErrorText>
        )}
        <Input
          type="password"
          {...register("password")}
          placeholder="Password"
          size={"large"}
          className="bg-gray-100"
        />
        {errors.password && (
          <FieldErrorText>{errors.password.message}</FieldErrorText>
        )}

        <div className="flex items-center justify-between">
          <Button
            loading={isLoading}
            type="primary"
            // disabled={!isValid}
            size={"large"}
            className={`w-full mt-2`}
            style={{
              background: `linear-gradient(180deg, #4C38C2 0%, #2F2188 100%),
              linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))`,
            }}
            onClick={handleSubmit(()=>router.push("/dashboard"))}
          >
            Sign up
          </Button>
        </div>
        <p className="mx-auto text-sm mt-2">
          Already have an account?
          <span className="text-violet-700"><Link href={"/login"}> Log in</Link></span>.
        </p>
      </div>
    </form>
  );
};

export default SignUpForm;
