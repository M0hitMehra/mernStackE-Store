const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

//Get All Product
router.route("/products").get(getAllProducts);

//GET ADMIN ALL PRODUCTs
router.route("/admin/products").get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts)

// Create Product
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

//Update Product
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);

// Delete Product
router
  .route("/admin/product/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

//Get A PRoduct Details
router.route("/product/:id").get(getProductDetails);

//Reviews
router.route("/review").put(isAuthenticatedUser, createProductReview);

//get All Reviews of a Product
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser ,deleteReview);

module.exports = router;
