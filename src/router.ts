import { UPDATE_STATUS } from "@prisma/client";
import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { hadleInputErros } from "./modules/middleware";
import { urlToHttpOptions } from "url";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/update";

const router = Router();

// Product Model
router.get("/product", getProducts);

router.get("/product/:id", getOneProduct);
router.put(
  "/product/:id",
  body("name").exists(),
  hadleInputErros,
  updateProduct
);
router.post("/product", body("name").exists(), hadleInputErros, createProduct);
router.delete("/product/:id", deleteProduct);

// Update Model
router.get("/update", getUpdates);
router.get("/update/:id", getOneUpdate);
router.put(
  "/update/:id",
  [
    body("title").optional(),
    body("body").optional(),
    body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
    body("version").optional(),
    hadleInputErros,
  ],
  updateUpdate
);
router.post(
  "/update",
  [
    body("title").exists().isString(),
    body("body").exists().isString(),
    body("productId").exists(),
    hadleInputErros,
  ],
  createUpdate
);
router.delete("/update/:id", deleteUpdate);

// UpdatePoint Model
router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.put(
  "/updatepoint/:id",
  [
    body("name").optional().isString(),
    body("description").optional().isString(),
    hadleInputErros,
  ],
  (req, res) => {}
);
router.post(
  "/updatepoint",
  [
    body("name").isString(),
    body("description").isString(),
    body("updateId").exists().isString(),
    hadleInputErros,
  ],
  () => {}
);
router.delete("/updatepoint/:id", () => {});

// router.use((err, req, res, next) => {
//   if (err.type === "auth") {
//     res.status(401).json({ message: "unauthorized" });
//   } else if (err.type === "input") {
//     res.status(400).json({ message: "Bad Input" });
//   } else {
//     res.status(500).json({ message: "Woops, it's from us..!" });
//   }
// });

export default router;
