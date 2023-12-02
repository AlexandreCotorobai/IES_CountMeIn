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
import { useAuthContext } from "@/contexts/auth";
import { API_URLS } from "@/lib/urls";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useMutation, useQuery } from "react-query";
import axios from "axios";


export function LoginForm() {

    const {setToken, token, login} = useAuthContext();
    const navigate = useNavigate();
    const [error, setError] = React.useState<string | null>(null);

    
    const form = useForm<LoginSchema>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
          email: "",
          password: "",
        },
      })

    const loginMutation = useMutation({
        mutationFn: async (loginData: LoginSchema) => {
            const {data} = await axios.post(API_URLS.login, loginData);
            return data;
          },
          onSuccess: (data) => {
            setToken(data.token);
          },
          onError: (error: any) => {
            setError(error.response.data.message);
          },
    })

    useQuery({
      queryKey: ['user'],
      queryFn: async () => {
        const {data} = await axios.get(API_URLS.user, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return data;
      },
      enabled: !!token,
      onSuccess: (data) => {
        login(data);
        navigate('/');
      },
      onError: (error) => {
        console.log(error);
      },

    })

    const onSubmit = async (data: LoginSchema) => {
        await loginMutation.mutateAsync(data);
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
                <Button type="submit" className="rounded-full px-10 text-white">Submit</Button>
            </div>
          </form>
        </Form>
      )
}