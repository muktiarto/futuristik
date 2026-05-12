"use server";

import { RegisterSchema, SignInSchema } from "@/lib/zod";
import { hashSync } from "bcrypt-ts";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

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
  const latitude = formData.get("latitude") as string;
  const longitude = formData.get("longitude") as string;

  try {

    await prisma.jTLReport.create({
      data: {
        kategori,
        deskripsi,
        tanggal: new Date(tanggal),
        latitude,
        longitude,
        userId: session.user.id,
      }
    });

  } catch (error) {

    console.log(error);

  }

  redirect("/dashboard");
};

// ================= DELETE JTL REPORT =================
export const deleteJTLReport = async (id: string) => {
  try {
    await prisma.jTLReport.delete({
      where: {
        id,
      },
    });

    revalidatePath("/dashboard/jtl/list");

  } catch (error) {
    console.log(error);
  }
};

// ================= UPDATE STATUS JTL=================
export const updateJTLStatus = async (
  id: string,
  status: string
) => {

  // cek session login
  const session = await auth();

  // jika belum login
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // cek role user
  // hanya ADMIN yang boleh update status
  if (session.user.role !== "admin") {
    throw new Error("Access denied");
  }

  try {

    await prisma.jTLReport.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    revalidatePath("/dashboard/jtl/list");

  } catch (error) {

    console.log(error);

  }
};

// ================= SUBMIT P2TL =================
export const createP2TLReport = async (formData: FormData) => {

  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const deskripsi = formData.get("deskripsi") as string;
  const tanggal = formData.get("tanggal") as string;
  const latitude = formData.get("latitude") as string;
  const longitude = formData.get("longitude") as string;

  try {

    await prisma.p2TLReport.create({
      data: {
        deskripsi,
        tanggal: new Date(tanggal),
        latitude,
        longitude,
        userId: session.user.id,
      }
    });

  } catch (error) {

    console.log(error);

  }

  redirect("/dashboard");
};

// ================= DELETE P2TL REPORT =================
export const deleteP2TLReport = async (id: string) => {
  try {
    await prisma.p2TLReport.delete({
      where: {
        id,
      },
    });

    revalidatePath("/dashboard/p2tl/list");

  } catch (error) {
    console.log(error);
  }
};

// ================= UPDATE STATUS P2TL=================
export const updateP2TLStatus = async (
  id: string,
  status: string
) => {

  // cek session login
  const session = await auth();

  // jika belum login
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // cek role user
  // hanya ADMIN yang boleh update status
  if (session.user.role !== "admin") {
    throw new Error("Access denied");
  }

  try {

    await prisma.p2TLReport.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    revalidatePath("/dashboard/p2tl/list");

  } catch (error) {

    console.log(error);

  }
};

// ================= SUBMIT ENERGI =================
export const createENERGIReport = async (formData: FormData) => {

  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const deskripsi = formData.get("deskripsi") as string;
  const tanggal = formData.get("tanggal") as string;
  const latitude = formData.get("latitude") as string;
  const longitude = formData.get("longitude") as string;

  try {

    await prisma.energiReport.create({
      data: {
        deskripsi,
        tanggal: new Date(tanggal),
        latitude,
        longitude,
        userId: session.user.id,
      }
    });

  } catch (error) {

    console.log(error);

  }

  redirect("/dashboard");
};


// ================= DELETE ENERGI REPORT =================
export const deleteENERGIReport = async (id: string) => {
  try {
    await prisma.energiReport.delete({
      where: {
        id,
      },
    });

    revalidatePath("/dashboard/energi/list");

  } catch (error) {
    console.log(error);
  }
};

// ================= UPDATE STATUS ENERGI=================
export const updateENERGIStatus = async (
  id: string,
  status: string
) => {

  // cek session login
  const session = await auth();

  // jika belum login
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // cek role user
  // hanya ADMIN yang boleh update status
  if (session.user.role !== "admin") {
    throw new Error("Access denied");
  }

  try {

    await prisma.energiReport.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    revalidatePath("/dashboard/energi/list");

  } catch (error) {

    console.log(error);

  }
};