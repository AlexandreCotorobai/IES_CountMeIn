import * as z from "zod";

//Login Form Schema

export const LoginFormSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters")
  })

  export type LoginSchema = z.infer<typeof LoginFormSchema>;


  // Settings Form Schema

  export const SettingsFormSchema = z.object({
    maximumOccupancy: z.number(),
    lock_unlock: z.boolean().optional(),
  })

  export type SettingsSchema = z.infer<typeof SettingsFormSchema>;

  // ---------------------------------------------

  export interface User{
    id: number;
    name: string;
    email: string;
    password: string;
    rooms: Room[];

  }

  export interface RoomSettings{
    id: number;
    maxCapacity: number; //trocar para capacity
    currentOccupancy: number; //trocar para room_count
    upTime: number;
  }

  export interface Room{
    id: number;
    name: string;
    settings: Partial<RoomSettings>;
  }