import Link from "next/link";
import { ModeToggle } from "./themeButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";



const Navbar = () => {
	const loggedIn = true;
	const user = 'Sowrav Nath';

	return(
		<div className="flex gap-6 p-6 text-lg font-semibold justify-between">
			<div className="text-4xl font-extrabold"> 
				<span className="text-[#035196]"> Online </span> 
				<span className="text-[#df3434]"> Judge </span> 
			</div>
			<div className="flex items-center justify-center  gap-6">
				<Link href={'/'} className="hover:text-blue-500 hover:underline"> Home </Link>
				<Link href={'/problems'} className="hover:text-blue-500 hover:underline"> Problems </Link>
				<ModeToggle/>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link href={'/login'} className="hover:text-blue-500">
								<Avatar>
									<AvatarImage src="" alt="@shadcn"/>
									<AvatarFallback> {loggedIn ? 'SN' : 'UN' } </AvatarFallback>
								</Avatar>
							</Link>
						</TooltipTrigger>
						<TooltipContent>
							<p> {loggedIn ? 'Sowrav Nath' : 'Login'} </p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</div>
	)
}

export default Navbar