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
    roomId: z.number(),
    maxCapacity: z.number().optional(),
    locked: z.boolean(),
  })

  export type SettingsSchema = z.infer<typeof SettingsFormSchema>;

  // ---------------------------------------------

  export interface User{
    id: number;
    name: string;
    email: string;
    password: string;
    rooms: Partial<Room[]>;

  }

  export interface RoomSettings{
    roomId: number;
    maxCapacity: number;
    currentOccupancy: number; 
    upTime: number;
  }

  export interface Room extends RoomSettings, RoomData {
    id: number;
    name: string;
    address: string;
    locked: boolean;
  }

  export interface RoomData {
    room_count: number;
    date: string;
  }