import * as Yup from "yup";
import categories from "./categories";

// Custom validator function for file size (2MB limit)
const fileValidator = (file: File) => {
  if (!file) return true;
  return file.size <= 2 * 1024 * 1024;
};

const commonSchema = {
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  bulletPoints: Yup.array().of(Yup.string()),
  mrp: Yup.number().required("MRP is required"),
  salePrice: Yup.number()
    .required("Sale price is required")
    .lessThan(Yup.ref("mrp"), "Sale price must be less than MRP"),
  category: Yup.string()
    .required("Category is required")
    .oneOf(categories, "Invalid category"),
  quantity: Yup.number().required("Quantity is required").integer(),
  images: Yup.array().of(
    Yup.mixed().test("fileSize", "Image should be less than 2MB", (file) =>
      fileValidator(file as File)
    )
  ),
};

export const newProductInfoSchema = Yup.object().shape({
  ...commonSchema,
  thumbnail: Yup.mixed()
    .required("Thumbnail is required")
    .test("fileSize", "Thumbnail should be less than 2MB", (file) =>
      fileValidator(file as File)
    ),
});

export const updateProductInfoSchema = Yup.object().shape({
  ...commonSchema,
});
