export function generateCustomersTabelHead() {
  return `<td>id</td>
  <td>name</td>
  <td>Email</td>
  <td>number of orders</td>
  <td>Date</td>
    <td>Actions</td>
  `;
}
export function generateCustomersTabelBody(arrayOfCustomers) {
  return arrayOfCustomers
    .map(
      (customer) =>
        `<tr>
        <td>${customer.id}</td>
        <td>${customer.name}</td>
        <td>${customer.email}</td>
        <td>${customer.orders.length}</td>
        <td>${new Date(customer.id).toISOString().split("T")[0]}</td>
        <td>
      <button class="btn btn-sm btn-danger" data-id="${
        customer.id
      }">Delete</button>
        <button class="btn btn-sm btn-primary" data-id="${
          customer.id
        }">Edit</button>
        </td>
      </tr>`
    )
    .join("");
}
