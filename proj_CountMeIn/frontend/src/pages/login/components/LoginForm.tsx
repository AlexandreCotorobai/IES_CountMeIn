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
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/auth";


export function LoginForm() {

    const navigate = useNavigate();

    const {user, token, loginMutation, error} = useAuthContext();


    
    const form = useForm<LoginSchema>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
          email: "",
          password: "",
        },
      })

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    } , [token, user]);

    const onSubmit = async (data: LoginSchema) => {
      loginMutation.mutateAsync(data);
    }

    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-sky-100 text-cyan-900">Email:</FormLabel>
                  <FormControl className="border-sky-400">
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
                  <FormLabel className="font-semibold dark:text-sky-100 text-cyan-900">Password:</FormLabel>
                  <FormControl className="border-sky-400">
                    <Input type="password" placeholder="Enter your password..."{...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-center">
                <Button 
                    type="submit" 
                    className="rounded-full dark:bg-sky-900 dark:hover:bg-sky-800 bg-cyan-600 hover:bg-cyan-700 px-10 text-white"
                    disabled={loginMutation.isLoading}
                >
                    {loginMutation.isLoading ? 'Loading...' : 'Submit'}
                </Button>
            </div>
            {error && <div className="text-red-600">{error}</div>}
          </form>
        </Form>
      )
}