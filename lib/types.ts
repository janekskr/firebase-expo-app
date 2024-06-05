import { Timestamp } from "firebase/firestore"
import { z } from "zod"

const email = z.string({ message: "Email jest wymagany" }).email("Niepoprawny adres email")
const password = z
    .string({ message: "Hasło jest wymagane" })
    .min(8, "Hasło musi mieć minimum 8 znaków")
    .max(30, "Hasło może mieć maksymalnie 30 znaków")

const description = z.string({ message: "Opis jest wymagany" }).max(100, "Opis nie może być dłuższy niż 100")

export const signUpSchema = z
    .object({
        username: z.string({ message: "Pole jest wymagane" }).max(20, "Nazwa użytkownika nie może być dłuższa niż 20"),
        email,
        password,
        privacy_policy: z.literal(true, { message: "Pole jest wymagane" }),
        passwordConfirm: z.string({ message: "Pole jest wymagane" }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        path: ["passwordConfirm"],
        message: "Hasła muszą się zgadzać",
    });

export const signInSchema = z.object({
    email,
    password
});

export const createPostSchema = z.object({
    description,
    imageUrls: z.array(z.string()).optional()
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
export type SignInSchema = z.infer<typeof signInSchema>;
export type CreatePostSchema = z.infer<typeof createPostSchema>;

export type Weights =
  | "black"
  | "bold"
  | "italic"
  | "light"
  | "semibold"
  | "medium"
  | "extrabold"
  | "regular";

export type Post = {
    id: string;
    author: {
        username: string
        profilePicture?: string
        id: string
    }
    description: string;
    imageUrls?: string[];
    timestamp: Timestamp;
  }

export type Like = {
    id: string;
    userId: string;
    postId: string;
    timestamp: Timestamp;
}