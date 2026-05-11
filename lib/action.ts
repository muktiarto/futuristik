"use server";

import { RegisterSchema, SignInSchema } from "@/lib/zod";
import { hashSync } from "bcrypt-ts";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { auth } from "@/auth";

// ================= REGISTER =================
export const signupCredentials = async (
  prevState: unknown,
  formData: FormData
) => {

  const validatedFields = RegisterSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors
    };
  }

  const { name, email, password } = validatedFields.data;

  const hashedPassword = hashSync(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });
  } catch (error) {
    return { message: "Failed to register user" };
  }

  redirect("/login");
};

// ================= LOGIN =================
export const signInCredentials = async (
  prevState: unknown,
  formData: FormData
) => {

  const validatedFields = SignInSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard"
    });

  } catch (error) {

    if (error instanceof AuthError) {

      switch (error.type) {

        case "CredentialsSignin":
          return { message: "Invalid Credentials." };

        default:
          return { message: "Something went wrong." };
      }
    }

    throw error;
  }
};

// ================= SUBMIT JTL =================
export const createJTLReport = async (formData: FormData) => {

  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const kategori = formData.get("kategori") as string;
  const deskripsi = formData.get("deskripsi") as string;
  const tanggal = formData.get("tanggal") as string;

  try {

    await prisma.jTLReport.create({
      data: {
        kategori,
        deskripsi,
        tanggal: new Date(tanggal),
        userId: session.user.id,
      }
    });

  } catch (error) {

    console.log(error);

  }

  redirect("/dashboard");
};