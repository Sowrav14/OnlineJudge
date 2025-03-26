'use client'

import Link from "next/link";
import { ModeToggle } from "./themeButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const getInitials = (fullname : string) => {
	if(fullname.length === 0) return null;
	const namparts = fullname.split(' ');
	const initials = namparts.map(name => name.charAt(0).toUpperCase()).join('');
	return initials;
}

const Navbar = () => {
	const router = useRouter();
	const { data : session, status } = useSession();
	let loggedIn = status === 'authenticated';
	let userName;
	if(loggedIn){
		userName = session?.user?.name || 'Anonymous User';
	} else {
		userName = 'Please Login'
	}
	let userImg = session?.user?.image || '';
	let initials = getInitials(userName as string);

	const handleClick = () => {
		if(loggedIn) {
			signOut();
		}
		router.push('/');
	}

	return(
		<div className="flex gap-6 p-6 text-lg font-semibold justify-between">
			<div className="text-4xl font-extrabold"> 
				<span className="text-[#035196]"> Online </span> 
				<span className="text-[#df3434]"> Judge </span> 
			</div>
			<div className="flex items-center justify-center  gap-6">
				{!loggedIn && <Link href={'/'} className="hover:text-blue-500 hover:underline"> Home </Link>}
				<Link href={'/problems'} className="hover:text-blue-500 hover:underline"> PROBLEMS </Link>
				<Link href={'/setter'} className="hover:text-blue-500 hover:underline"> SETTER </Link>
				<ModeToggle/>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button onClick={handleClick} variant='link' className="hover:text-blue-500">
								<Avatar>
									<AvatarImage src={userImg} alt="@shadcn"/>
									<AvatarFallback> {initials} </AvatarFallback>
								</Avatar>
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p> {userName} </p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</div>
	)
}

export default Navbar