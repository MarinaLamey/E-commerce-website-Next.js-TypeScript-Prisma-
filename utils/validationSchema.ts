import z from 'zod';



//register
export  const  registerSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }).max(50),
    lastName: z.string().min(1, { message: "Last name is required" }).max((50)),
    email: z.string().min(1, { message: "Email address is required" }).email(),
    phone:z.string()
    .min(1, "Phone number is required")
    .regex(/^\+?[1-9]\d{7,14}$/, "Invalid phone number").optional(),
    password: z.string().min(8, { message: "Password must be at least 8 characters longs" }).regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
        message: "Password should contain at least 1 special character",
      }),
    confirmPassword: z.string().min(1, { message: "Confirm Password is required" }),
  }).refine((input) => input.password === input.confirmPassword, {
    message: "Password and Confirm Password does not match",
    path: ["confirmPassword"],
  });


  export  const loginSchema = z.object({
   
    email: z.string().min(1, { message: "Email address is required" }).email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters longs" })
 
  });

  export const updateUserSchema = z.object({

  email: z.string().email("Invalid email").optional(),
  phone: z.string().min(10, "Phone must be 10 digits").optional(),
  firstName: z.string().min(1, { message: "First name is required" }).optional(),
  lastName: z.string().min(1, { message: "Last name is required" }).optional(),
});


//category 

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name must not exceed 50 characters"),

  imgSrc: z
    .string()
    .url("Image source must be a valid URL"),
});


//products


export const productSchema = z.object({
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .max(200, "Product name must not exceed 200 characters"),

  description: z
    .string()
    .max(5000, "Description is too long")
    .optional(),

  price: z
    .number()
    .positive("Price must be greater than 0"),

  stock: z
    .number()
    .int("Stock must be an integer")
    .min(0, "Stock cannot be negative")
    .optional(),

  imgSrc: z
    .string()
    .url("Image must be a valid URL")
    .max(500, "Image URL is too long"),

  categoryId: z
    .number()
    .int("Category id must be an integer")
    .positive("Category id is required"),

  isOffer: z
    .boolean()
    .optional(),

  max: z
    .number()
    .int("Max must be an integer")
    .positive("Max must be greater than 0")
    .optional(),
});


