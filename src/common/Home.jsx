import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-content">
          <span className="home-badge">Trusted Agri Supplies</span>

          <h1>
            Quality Fertilizers, Pesticides & Seeds for Better Farming
          </h1>

          <p>
            Browse products, check stock availability, and order agriculture
            supplies easily from BLF.
          </p>

          <div className="home-actions">
            <Link className="btn" to="/products">
              Shop Products
            </Link>

            <Link className="btn secondary" to="/about">
              About Us
            </Link>
          </div>
        </div>

        <div className="home-image-card">
          <h2>BLF</h2>
          <p>Bhagyalaxmi Fertilizers, Pesticides & Seeds</p>

          <div className="home-stats">
            <div>
              <strong>Fresh</strong>
              <span>Stock</span>
            </div>

            <div>
              <strong>Fast</strong>
              <span>Orders</span>
            </div>

            <div>
              <strong>Trusted</strong>
              <span>Shop</span>
            </div>
          </div>
        </div>
      </section>

      <section className="home-features">
        <div className="home-feature-card">
          <h3>For Farmers</h3>
          <p>
            View fertilizers, seeds, and pesticides without login and order when needed.
          </p>
        </div>

        <div className="home-feature-card">
          <h3>Easy Ordering</h3>
          <p>
            Add products to cart, place orders, view invoice, and track status.
          </p>
        </div>

        <div className="home-feature-card">
          <h3>Reliable Stock</h3>
          <p>
            Product stock is updated for online orders and offline shop sales.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;