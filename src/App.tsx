import "./index.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { useCart } from "./hooks/useCart";

function App() {
  const {
    data,
    cart,
    showMaxMessage,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        showMaxMessage={showMaxMessage}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Guitarras</h2>
        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
