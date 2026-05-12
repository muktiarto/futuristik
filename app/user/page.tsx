import { Metadata } from "next";
import UserTable from "@/components/user-table";

export const metadata:Metadata = {
    title:"Users",
};

const UserPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
        <div className="max-w-3xl mx-auto py-10">
            <h1 className="text-2xl font-bold">User List</h1>
            <UserTable></UserTable>
        </div>
    </div>
  )
}

export default UserPage