import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar(){
  const pathname = usePathname();
    return(
        <div className = 'flex flex-row py-5 px-5 gap-5 bg-white border-b border-gray-500 drop-shadow-1md'>
        <span className = 'text-primary text-lg font-bold'>Psychology AI Research Portal</span>
        <nav className="flex flex-row gap-10">
        <Link href='/' className={`${pathname === "/" ?"text-primary font-bold" : "" }`}> Home</Link> 
        <Link href='/scenario' className={`${pathname === "/scenario" ? "text-primary font-bold" : "" } `}> Scenario</Link> 
        <Link href = '/grading' className={`${pathname === "/grading" ? "text-primary font-bold" : ""} `}> Grading </Link></nav>
      </div>
    )
}