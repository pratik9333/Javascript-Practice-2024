// Exporting Module

console.log("Exporting Module");

// Variables declared inside of the module, are scoped to this module.
// Inside a module, the module itself is like the top level scope.
// All top level variables are private inside of this module unlike traditional scripts which put these variables as global.
// These variables are scoped to the current module.
// There are two types of exports, 1. Named exports 2. Default Exports

// Named export - just put the export in front of the anything that we might to Export.
// We can export multiple things using the named export.

const shippingCost = 10;
export const cart = [];

// Named export - always need to happen in top level code.
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(quantity + " " + product + " was added to cart");
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

// default exports - we use default exports when we only Want to export one thing per module.
// while import it, we can give any name that We want.

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(quantity + " " + product + " was added to cart");
}
