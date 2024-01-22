export function generateSellersTabelHead() {
  return `
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Seller Name</th>
      <th scope="col">Email</th>
      <th scope="col">Products Number</th>
      <th scope="col">Orders Number</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
`;
}

export function generateSellersTabelBody(arrayOfSellers) {
  return arrayOfSellers
    .map(
      (seller) =>
        `
        <tbody>
        <tr>
        <td>${seller.id}</td>
        <td>${seller.name}</td>
        <td>${seller.email}</td>
        <td>${seller.products.length}</td>
        <td>${seller.orders.length}</td>
        <td>
        <button class="btn btn-sm btn-danger"  data-id="${seller.id}">Delete</button>
        <button class="btn btn-sm btn-primary"  data-id="${seller.id}">Edit</button>
        </td>
      </tr>
      </tbody>
      `
    )
    .join("");
}
