import Link from "next/link";
import Image from "next/image";
import { auth, signOut } from "@/auth";

const Navbar = async() => {
    const session = await auth()
  return (
    <nav className='bg-white border-gray-200 border-b'>
        <div className="max-w-7xl flex items-center justify-between mx-auto p-4">
            <Link href="/">
                <Image src="/Navbar-left-logo.png" alt="logo" width={128} height={36} priority></Image>
            </Link>
            <div className="flex items-center gap-3">
                <ul className="hidden md:flex items-center gap-4 mr-5 font-semibold text-gray-600 hover:text-gray-800">
                    <li><Link href="/">Home</Link></li>
                {session && (
                <>
                    <li>
                        <Link href="/dashboard" className="hover:text-blue-600 transition">
                        Pelaporan
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/jtl/list" className="hover:text-blue-600 transition">
                        Riwayat Laporan
                        </Link>
                    </li>

                    {session.user.role=== "admin" ? (
                    <li><Link href="/user">Users</Link></li>
                    ):null}
                </>
                )}
                
                </ul>
                {session && (
                
                <div className="flex gap-3 items-center">
                    <div className="flex flex-col justify-center -space-y-1">
                        <span className="font-semibold text-gray-500 text-right capitalize">
                            {session.user.name}
                        </span>
                        <span className="font-xs text-gray-400 text-right capitalize">
                            {session.user.role}
                        </span>
                    </div>
                    <button type="button" className="text-sm ring-2 bg-gray-100 rounded-full">
                        <Image src={session.user.image || "/globe.svg"} alt="avatar" width={64} height={64} className="w-8 h-8"></Image>
                    </button>
                </div>
                )}
                {session ? (
                    <form action={async()=>{
                        "use server";
                        await signOut({redirectTo:"/login"})
                    }}>
                        <button type="submit" className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500">Sign Out</button>
                    </form>
                ):(
                    <Link href="/login" className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500">Sign In</Link>
                )}
            </div>
        </div>
    </nav>
  )
}

export default Navbar