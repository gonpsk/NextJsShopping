"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { useRouter } from "next/navigation";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import axios from "axios";

function Page() {
  const { logOut, user } = useUserAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [opencart, setopencart] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null); // State to store item to be deleted
  const [cartCount, setCartCount] = useState(0);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  //  fetch api use axios
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (err) {
        console.error("Fetch products error:", err);
      }
    };

    fetchProducts();
  }, []);

  // handle addtocart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item.id === product.id);

      if (itemIndex > -1) {
        // Product already in cart, update quantity without changing cartCount
        const updatedCart = [...prevCart];
        updatedCart[itemIndex] = {
          ...updatedCart[itemIndex],
          quantity: updatedCart[itemIndex].quantity + 1,
        };
        return updatedCart;
      } else {
        // Product not in cart, add to cart and increment cartCount
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    // Increment cartCount only when adding a new product to the cart
    if (!cart.some((item) => item.id === product.id)) {
      setCartCount((prevCount) => prevCount + 1);
    }
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const openDeleteModal = (itemId) => {
    setItemToDelete(itemId); // Set the item to be deleted
    setIsModalOpen(true); // Open modal
  };

  const confirmDelete = () => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemToDelete));
    setCartCount((prevCount) => prevCount - 1);
    closeModal(); // Close modal after deletion
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
    setItemToDelete(null); // Clear the itemToDelete
  };

  const handleCheckout = () => {
    if (user) {
      router.push("/input");
    } else {
      alert("you must login first!");
      router.push("/login");
    }
  };

  // Calculate the total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      <nav className="bg-gray-700 text-white p-4 w-full fixed z-40 mb-20">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold">MyApp</div>
          <div className="relative flex items-center space-x-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center"
            >
              <FaUserCircle className="text-2xl" />
            </button>

            <button
              className="relative flex items-center"
              onClick={() => setopencart(true)}
            >
              <FaShoppingCart className="text-2xl" />

              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            </button>

            {isOpen && (
              <div className="absolute right-10 top-5  mt-2 w-48 bg-white text-black shadow-lg rounded-md z-50 ">
                <ul>
                  {user ? (
                    <>
                      <li className="px-4 py-2 border-b text-gray-500">
                        Logged in as {user.email}
                      </li>
                      <li
                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                        onClick={handleLogout}
                      >
                        Logout
                      </li>
                    </>
                  ) : (
                    <li
                      className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => router.push("/signup")}
                    >
                      Sign up
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-20">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border rounded-lg shadow-md p-4 relative h-auto"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
            <p className="text-gray-700 mb-2">${product.price}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 absolute bottom-2 right-3"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {opencart && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-auto lg:w-2/5  h-3/5 p-6 rounded-lg shadow-lg relative overflow-auto">
            <button
              className="absolute top-2 right-8 text-gray-500 text-2xl"
              onClick={() => setopencart(false)}
            >
              &times;
            </button>
            <div className="flex ">
              <FaShoppingCart className="text-2xl mr-4" />
              <h2 className="text-xl font-bold mb-4">My Cart</h2>
            </div>

            <ul>
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between mb-4 p-4 border rounded-lg"
                >
                  <div>
                    <img src={item.image} alt="" className="w-2/12 h-2/12" />
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-700">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      className="bg-gray-300 px-2 py-1 rounded"
                      onClick={() =>
                        updateQuantity(item.id, Math.max(item.quantity - 1, 1))
                      }
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="bg-gray-300 px-2 py-1 rounded"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded  hover:bg-red-600"
                      onClick={() => openDeleteModal(item.id, item.name)}
                    >
                      X
                    </button>
                    <p>Total ${item.price * item.quantity}</p>
                  </div>
                </li>
              ))}
              {/* ทศนิยมสองตำแหน่ง */}
            </ul>

            <div className="flex justify-end">
              <p className="font-bold px-5 mr-4 mt-2">
                Total Price: ${totalPrice.toFixed(2)}
              </p>

              <button
                className="border border-1 px-5 text-black mr-4   "
                onClick={() => {
                  setopencart(false);
                }}
              >
                Close
              </button>

              <button
                className="bg-blue-400 p-2 text-white"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white w-[450px] p-6 rounded-lg shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-8 text-gray-500 text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <img src="/Icon.png" alt="" className="h-15 w-15" />
              </div>
              <p className="text-xl font-bold mb-8">Are you sure? </p>
              <div className="flex space-x-4">
                <button
                  className="bg-gray-300 text-black py-2 px-4 rounded-lg"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-lg"
                  onClick={confirmDelete}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
