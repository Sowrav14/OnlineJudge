'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { signIn } from 'next-auth/react'
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function LoginDialog() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent)=>{
        e.preventDefault();
        console.log(email, password);
        const res = await signIn('credentials', {
            email,
            password,
            redirect : false
        });

        if(!res?.error){
            router.push('/problems');
        } else {
            toast.error("Invalid Credentials");
        }
    }

    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline"> Get Started </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle> Continue with your account </DialogTitle>
                <DialogDescription>
                    Please enter your email and password to continue
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-3">
                        <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a
                            href="#"
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </a>
                        </div>
                        <Input 
                            id="password" 
                            type="password" 
                            required
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </div>
                </div>
            </form>
            <Button 
                variant="outline" 
                className="w-full"
                onClick={()=>signIn('google')}
            >
                Continue with Google
            </Button>
            <Button 
                variant="outline" 
                className="w-full"
                onClick={()=>signIn('github')}
            > Continue with Github
            </Button>
            <DialogFooter>
            </DialogFooter>
        </DialogContent>
        </Dialog>
  )
}
