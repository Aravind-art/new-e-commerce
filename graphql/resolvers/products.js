import Product from "../../model/product";
import { GraphQLError } from "graphql";

const throwProductNotFound = () => {
  throw new GraphQLError("Product Not Found", {
    extensions: { code: "ITEM_NOT_FOUND" },
  });
};
const products = async (_, args) => {
  const { limit, offset, sort, category } = args;
  let queries = {};
  if (category) queries.category = category;
  return await Product.find(queries)
    .select(["-_id"])
    .skip(offset)
    .limit(limit)
    .sort({ id: sort })
    .catch((err) => console.log(err));
};
const product = async (_, args) => {
  const data = await Product.findOne({ id: args.id })
    .select(["-_id"])
    .catch((err) => console.log(err));
  if (data == null) throwProductNotFound();
  return data;
};
const categories = async (_, args) => {
  const categoriesData = await Product.distinct("category");
  return categoriesData;
};
const addProduct = async (_, args) => {
  const count = await Product.countDocuments();
  const product = {
    id: count + 1,
    title: args.title,
    price: args.price,
    description: args.description,
    image: args.image,
    category: args.category,
  };
  const productInstance = new Product(product);
  try {
    return await productInstance.save();
  } catch (err) {
    return console.log(err);
  }
};
const updateProduct = async (_, args) => {
  const updatedProduct = {};
  const nonRequiredFields = {
    title: args.title,
    price: args.price,
    category: args.category,
    description: args.description,
    image: args.image,
  };
  Object.entries(nonRequiredFields).forEach(([key, value]) => {
    if (key != null) updatedProduct[key] = value;
  });
  const updated = await Product.findOneAndUpdate(
    { id: args.id },
    updatedProduct,
    { new: true }
  );
  if (updated == null) throwProductNotFound();

  return updated;
};
export const productQueries = {
  products,
  product,
  categories,
};
export const productMutations = {
  addProduct,
  updateProduct,
};
