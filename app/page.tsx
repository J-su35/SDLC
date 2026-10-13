const categories = [
  { icon: "🥦", name: <>Fruits &amp;<br />Vegetables</> },
  { icon: "🍞", name: <>Breads &amp;<br />Sweets</>, active: true },
  { icon: "🍤", name: <>Frozen<br />Seafoods</> },
  { icon: "🥩", name: <>Raw Meats</> },
  { icon: "🍷", name: <>Wines &amp;<br />Alcohol Drinks</> },
  { icon: "☕", name: <>Coffees and<br />Teas</> },
  { icon: "🥛", name: <>Milks and<br />Dairies</> },
  { icon: "🐾", name: <>Pet Foods</> },
];

const featured = [
  { label: "SNACKS", name: "Popcorn", icon: "🍿", color: "lavender" },
  { label: "ORGANIC", name: "Fresh soup", icon: "🍵", color: "cream" },
  { label: "SODA CAN BOX", name: "Berry soda", icon: "🥤", color: "mint" },
  { label: "ORGANIC", name: "Hot dog", icon: "🌭", color: "green" },
];

const navItems = [
  "Deals Today",
  "Special Prices",
  "Fresh",
  "Frozen",
  "Bakery",
  "Shop",
  "Blog",
  "Pages",
  "Shop +",
];

export default function Home() {
  return (
    <main className="storefront">
      <header className="site-header">
        <div className="header-main page-width">
          <a className="brand" href="#" aria-label="Farmart home">
            <span className="brand-mark">🌾</span>
            <span>Farmart</span>
          </a>

          <form className="search" action="#">
            <label className="sr-only" htmlFor="language">Search language</label>
            <select id="language" defaultValue="all">
              <option value="all">ALL LANGUAGE</option>
              <option value="en">English</option>
            </select>
            <label className="sr-only" htmlFor="search-products">Search products</label>
            <input id="search-products" name="q" placeholder="Search products..." />
            <button className="search-button" type="submit" aria-label="Search">⌕</button>
          </form>

          <div className="header-actions">
            <a className="phone" href="tel:88003326566">8 800 332 65-66</a>
            <button className="icon-button" aria-label="Your account">👤</button>
            <button className="icon-button notification" aria-label="Wishlist, 2 items">
              ❤️<span>2</span>
            </button>
            <button className="icon-button notification cart-icon" aria-label="Cart, 3 items">
              🛒<span>3</span>
            </button>
            <strong className="cart-total">$3,099.00</strong>
          </div>
        </div>

        <nav className="navigation">
          <div className="page-width nav-inner">
            <a className="all-categories" href="#categories">▦&nbsp; SHOP ALL CATEGORY</a>
            <div className="nav-links">
              {navItems.map((item) => <a href="#featured" key={item}>{item}</a>)}
            </div>
            <a className="recently-viewed" href="#featured">◉ Recently Viewed</a>
          </div>
        </nav>
      </header>

      <div className="page-width page-content">
        <section className="promotions" aria-label="Current promotions">
          <article className="promo promo-drink">
            <div className="promo-copy">
              <span className="eyebrow">FRESH DRINK</span>
              <h1>Active Summer With<br />Juice Milk 300ml</h1>
              <p>New arrivals with natural fresh juice milk,<br className="desktop-break" /> customize the varieties.</p>
              <a className="button button-orange" href="#featured">Shop Now</a>
            </div>
            <span className="promo-art juice-art" aria-hidden="true">🧃</span>
          </article>
          <article className="promo promo-sale">
            <div className="promo-copy">
              <span className="eyebrow">SYNTHETIC GOODS</span>
              <h2>20% SALE OFF</h2>
              <p>Synthetic Goods<br />Net 2.0 Oz</p>
              <a className="button button-light" href="#featured">Shop Now</a>
            </div>
            <span className="promo-art box-art" aria-hidden="true">📦</span>
          </article>
        </section>

        <section className="content-section categories-section" id="categories">
          <div className="section-heading">
            <h2>Browse by Category</h2>
            <a href="#categories">All Categories <span aria-hidden="true">⟶</span></a>
          </div>
          <div className="category-grid">
            {categories.map((category, index) => (
              <a
                className={`category-card${category.active ? " category-active" : ""}`}
                href="#featured"
                key={index}
              >
                <span className="category-icon" aria-hidden="true">{category.icon}</span>
                <span>{category.name}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="content-section featured-section" id="featured">
          <div className="section-heading">
            <h2>Featured Brands</h2>
            <a href="#featured">All Brands <span aria-hidden="true">⟶</span></a>
          </div>
          <div className="featured-grid">
            {featured.map((item) => (
              <a className={`featured-card ${item.color}`} href="#categories" key={item.name}>
                <span className="featured-emoji" aria-hidden="true">{item.icon}</span>
                <span className="eyebrow">{item.label}</span>
                <strong>{item.name}</strong>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
