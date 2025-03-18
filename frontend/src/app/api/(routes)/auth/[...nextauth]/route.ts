import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt";
import bcrypt from 'bcrypt'
import { prisma } from "@/lib/prisma";


export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // validate credentials
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }
                try{
                    const hashedPassword = await bcrypt.hash(credentials.password, 10);
                    const existUser = await prisma.user.findUnique({ where: { email: credentials.email } });
                    if (!existUser) {
                        const newUser = await prisma.user.create({
                            data : {
                                email : credentials.email,
                                password : hashedPassword,
                                provider : 'manual',
                                name : credentials.email.split('@')[0],
                            }
                        })
                        return {
                            id : newUser.id.toString(),
                            name : newUser.name,
                            email : newUser.email,
                            image : newUser.image,
                        }
                    } 
                    // check if password ok?
                    const isValidPassword = await compare(credentials.password, existUser.password!);
                    if (!isValidPassword) {
                        throw new Error("Invalid credentials");
                    }
                    return {
                        id : existUser.id,
                        name : existUser.name,
                        email : existUser.email,
                        image : existUser.image,
                    }
                } catch(e){
                    console.log(e);
                    throw new Error("Error authentication");
                }
            },

        }),
    ],
    callbacks: {
        async signIn({ user, account } : {user : any, account : any}) {
            // user hold id, name, email, image
            // account hold provider, 
            if (account?.provider === "github") {
                try{
                    const existingUser = await prisma.user.findUnique({ 
                        where : {
                            provider_providerId : {
                                provider : 'github',
                                providerId : user.id
                            }
                        }
                    });
                    if (!existingUser) {
                        // create a new user...
                        const newUser = await prisma.user.create({
                            data : {
                                name : user.name,
                                provider : 'github',
                                providerId : user.id,
                                image : user.image
                            },
                        });
                        user.dbUserId = newUser.id;
                    } else {
                        user.dbUserId = existingUser.id;
                    }
                } catch(e) {
                    console.log("error : " , e);
                    throw new Error('Error Authenticating')
                }
            } else if(account.provider == 'google'){
                try{
                    const existingUser = await prisma.user.findUnique({ 
                        where : {
                            provider_providerId : {
                                provider : 'google',
                                providerId : user.id
                            }
                        }
                    });
                    if (!existingUser) {
                        // create a new user...
                        const newUser = await prisma.user.create({
                            data : {
                                name : user.name,
                                provider : 'google',
                                providerId : user.id,
                                image : user.image,
                                email : user.email,
                            },
                        });
                        user.dbUserId = newUser.id;
                    } else {
                        user.dbUserId = existingUser.id;
                    }
                } catch(e) {
                    console.log("error : " , e);
                    throw new Error('Error Authenticating')
                }
            }
            return true;
        },
        async jwt({token, user} : any) {
            if(user){
                token.id = user.dbUserId;
            }
            return token;
        },
        async session({ session, token } : {session : any, token : any}) {
            if (session.user) {
                const userproviderId = token.sub;
                const userdbId = token.id;
                if(userdbId != null) {
                    session.user.id = userdbId;
                } else {
                    session.user.id = token.sub;
                }
                session.accessToken = token.accessToken;
            }
            return session;
        },
    },
    pages : {
        signIn : '/',
        error : '/',
    },
    session: { strategy: 'jwt' as 'jwt' },
    secret: process.env.NEXTAUTH_SECRET || 'sowravnath',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
