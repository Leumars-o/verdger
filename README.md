## Authentify-v2 Smart Contract

## Summary
The authentify-v2 smart contract is designed for managing the authentication and verification of products. It provides functionality for creating new products, licensing products to buyers, initiating and accepting product ownership transfers, and disputing product authenticity.
Key Features

- Product Creation: The contract allows authorized entities to create new products by providing a unique product ID, name, and description.
Product Licensing: Product creators can license their products to buyers, transferring ownership and marking the product as licensed.
Ownership Transfers: The contract supports initiating, accepting, and canceling product ownership transfers using a 4-digit transfer code.
Dispute Handling: Product creators can dispute the authenticity of their products by setting a dispute code (stolen, lost, damaged).
Read-Only Functions: The contract provides several read-only functions to retrieve product, license, and transfer details.

### Contract calls:

- Create new Product

`(define-public (create-product (product-id uint) (name (string-ascii 50)) (description (string-ascii 256))))`
This function allows an authorized entity to create a new product with the specified product-id, name, and description.



### Read-Only Functions
The contract provides several read-only functions to retrieve information about products, licenses, and transfers:

(define-read-only (get-product-details (product-id uint)))
(define-read-only (get-license-details (product-id uint)))
(define-read-only (get-transfer-details (transfer-id uint)))
(define-read-only (get-ownership-history (product-id uint)))
(define-read-only (get-all-transfers (product-id uint)))
(define-read-only (get-transfer-proposal (transfer-id uint)))

These functions allow querying the state of the contract and retrieving detailed information about specific products, licenses, and transfers.