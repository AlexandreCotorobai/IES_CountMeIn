'use client'

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input";
import { LoginFormSchema, LoginSchema } from "@/lib/types";
import useUserAuth from "@/hook/useUserAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export function LoginForm() {

    const navigate = useNavigate();
    const { login, isLoading, error, isLogged } = useUserAuth();

    
    const form = useForm<LoginSchema>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
          email: "",
          password: "",
        },
      })

    useEffect(() => {
        if (isLogged) {
            navigate('/');
        }
    } , [isLogged]);

    const onSubmit = async (data: LoginSchema) => {
      await login(data);
    }

    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input placeholder="example@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password:</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password..."{...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-center">
                <Button 
                    type="submit" 
                    className="rounded-full px-10 text-white"
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Submit'}
                </Button>
            </div>
            {error && <div className="text-red-600">{error}</div>}
          </form>
        </Form>
      )
}