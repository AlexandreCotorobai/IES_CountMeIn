'use client'

import React from "react";
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


export function LoginForm() {
    const form = useForm<LoginSchema>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
          email: "",
          password: "",
        },
      })

    const onSubmit = async (data: LoginSchema) => {
        const response = await fetch('http://localhost:8080/api/login', { // TODO: Change this to the correct URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if(!response.ok) {
            alert('Login failed. Please try again.');
            return;
        }
        const response_data = await response.json();

        if(response_data.errors){
            const errors = response_data.errors;

            if(errors.email){
                form.setError('email', {
                    type: 'manual',
                    message: errors.email,
                });
            } else if (errors.password) {
                form.setError('password', {
                    type: 'manual',
                    message: errors.password,
                });
            } else {
                alert('Login failed. Please try again.');
            }
        }

        if(!response_data.errors){
            form.reset();
            alert('Login successful!');
        }

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