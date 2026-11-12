
const products = [
  // DIAMOND KECIL
  { name: "5 Diamonds", price: 3000 },
  { name: "10 Diamonds", price: 4500 },
  { name: "19 Diamonds", price: 7500 },
  { name: "28 Diamonds", price: 10500 },
  { name: "36 Diamonds", price: 13500 },
  { name: "44 Diamonds", price: 15000 },
  { name: "59 Diamonds", price: 20000 },
  { name: "71 Diamonds", price: 24000 },
  { name: "85 Diamonds", price: 28000 },
  { name: "86 Diamonds", price: 27500 },

  // DIAMOND MENENGAH
  { name: "97 Diamonds", price: 32500 },
  { name: "113 Diamonds", price: 37000 },
  { name: "128 Diamonds", price: 42500 },
  { name: "144 Diamonds", price: 47000 },
  { name: "170 Diamonds", price: 54000 },
  { name: "172 Diamonds", price: 53000 },
  { name: "185 Diamonds", price: 59000 },
  { name: "201 Diamonds", price: 69500 },
  { name: "219 Diamonds", price: 71000 },
  { name: "240 Diamonds", price: 75500 },
  { name: "257 Diamonds", price: 82500 },
  { name: "284 Diamonds", price: 90500 },
  { name: "296 Diamonds", price: 92000 },

  // DIAMOND BESAR
  { name: "340 Diamonds", price: 108000 },
  { name: "344 Diamonds", price: 107000 },
  { name: "345 Diamonds", price: 111000 },
  { name: "374 Diamonds", price: 119000 },
  { name: "408 Diamonds", price: 125000 },
  { name: "425 Diamonds", price: 135000 },
  { name: "429 Diamonds", price: 133000 },
  { name: "452 Diamonds", price: 143000 },
  { name: "510 Diamonds", price: 160000 },
  { name: "512 Diamonds", price: 162000 },
  { name: "514 Diamonds", price: 160000 },
  { name: "568 Diamonds", price: 170000 },
  { name: "600 Diamonds", price: 181000 },
  { name: "601 Diamonds", price: 185000 },

  // DIAMOND SUPER BESAR
  { name: "706 Diamonds", price: 211000 },
  { name: "716 Diamonds", price: 218000 },
  { name: "750 Diamonds", price: 231000 },
  { name: "875 Diamonds", price: 262000 },
  { name: "960 Diamonds", price: 296000 },
  { name: "1045 Diamonds", price: 319000 },
  { name: "1136 Diamonds", price: 346000 },
  { name: "1412 Diamonds", price: 431000 },
  { name: "1672 Diamonds", price: 507000 },
  { name: "2010 Diamonds", price: 568000 },
  { name: "2180 Diamonds", price: 634000 },
  { name: "2350 Diamonds", price: 686000 },
  { name: "2536 Diamonds", price: 727000 },
  { name: "2885 Diamonds", price: 835000 }
];

// HARGA PROMO KINGOO STORE
products.forEach(item => {
  item.price = Math.floor(
    (item.price * 0.90) / 500
  ) * 500;
});

let selected = null;

const productContainer = document.getElementById("products");

function rupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);
}

// MENAMPILKAN SEMUA PRODUK
products.forEach((item) => {
  const card = document.createElement("div");
  card.className = "product";

  const title = document.createElement("h3");
  title.textContent = item.name;

  const price = document.createElement("p");
  price.textContent = rupiah(item.price);

  card.append(title, price);

  card.addEventListener("click", () => {
    selected = item;

    document.querySelectorAll(".product").forEach(
      element => element.classList.remove("active")
    );

    card.classList.add("active");

    document.getElementById("selectedProduct")
      .textContent = item.name;

    document.getElementById("selectedPrice")
      .textContent = rupiah(item.price);
  });

  productContainer.appendChild(card);
});

// FORM PEMESANAN DEMO
document.getElementById("orderForm")
  .addEventListener("submit", function(event) {
    event.preventDefault();

    if (!selected) {
      alert("Silakan pilih diamond terlebih dahulu!");
      return;
    }

    const userId =
      document.getElementById("userId").value.trim();

    const zoneId =
      document.getElementById("zoneId").value.trim();

    const phone =
      document.getElementById("phone").value.trim();

    if (!/^\d+$/.test(userId) ||
        !/^\d+$/.test(zoneId)) {
      alert("User ID dan Zone ID harus berupa angka!");
      return;
    }

    if (!/^08\d{8,13}$/.test(phone)) {
      alert("Masukkan nomor WhatsApp yang valid!");
      return;
    }

    const orderId = "KINGOO-" +
      Date.now().toString().slice(-8);

    const order = {
      orderId: orderId,
      product: selected.name,
      userId: userId,
      zoneId: zoneId,
      phone: phone,
      price: selected.price,
      status: "Menunggu pemeriksaan admin"
    };

    const result = document.getElementById("result");

    result.replaceChildren();

    const heading = document.createElement("h3");
    heading.textContent = "Pesanan Demo Berhasil Dibuat!";

    const detail = document.createElement("p");
    detail.textContent =
      "Order ID: " + order.orderId +
      " | Produk: " + order.product +
      " | Total: " + rupiah(order.price) +
      " | Status: " + order.status;

    result.append(heading, detail);

    console.log("DEMO ORDER:", order);
  });
