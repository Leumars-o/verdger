
;; title: authentify
;; version: 0.1.0
;; summary: Authentify is a smart contract for managing authentication and verification of products.
;; description:

;; Define the contract owner
(define-data-var contract-owner principal tx-sender)

;; traits
;;

;; token definitions
;;

;; constants
;;
(define-constant MAX_PRODUCT_ID u1000000)
(define-constant MIN_NAME_LENGTH u1)
(define-constant MIN_DESCRIPTION_LENGTH u1)

;; data vars
;;

;; data maps
;;
;; Map to store product information
(define-map products
  { product-id: uint }
  {
    owner: principal,
    name: (string-ascii 50),
    description: (string-ascii 256),
    is-licensed: bool
  }
)

;; public functions
;;
;; Function to create a new product
(define-public (create-product (product-id uint) (name (string-ascii 50)) (description (string-ascii 256)))
  (let
    ((caller tx-sender))
    (asserts! (is-eq caller (var-get contract-owner)) (err u100))
    (asserts! (valid-product-id? product-id) (err u105))
    (asserts! (valid-name? name) (err u106))
    (asserts! (valid-description? description) (err u107))
    (asserts! (is-none (map-get? products { product-id: product-id })) (err u101))
    (ok (map-set products
      { product-id: product-id }
      {
        owner: caller,
        name: name,
        description: description,
        is-licensed: false
      }
    ))
  )
)

;; Define a function to license a product to a buyer
(define-public (license-product (product-id uint) (buyer principal))
  (let
    ((product (unwrap! (map-get? products { product-id: product-id }) (err u102)))
     (caller tx-sender))
    (asserts! (is-eq (get owner product) caller) (err u103))
    (asserts! (valid-product-id? product-id) (err u105))
    (asserts! (not (get is-licensed product)) (err u104))
    (ok (map-set products
      { product-id: product-id }
      (merge product { owner: buyer, is-licensed: true })
    ))
  )
)

;; read only functions
;;
;; Define a function to get product details
(define-read-only (get-product-details (product-id uint))
  (map-get? products { product-id: product-id })
)

;; private functions
;;
;; Helper function to validate name
(define-private (valid-name? (name (string-ascii 50)))
  (and
    (>= (len name) MIN_NAME_LENGTH)
    (<= (len name) u50)
  )
)

;; Helper function to validate description
(define-private (valid-description? (description (string-ascii 256)))
  (and
    (>= (len description) MIN_DESCRIPTION_LENGTH)
    (<= (len description) u256)
  )
)

;; Helper function to validate product id
(define-private (valid-product-id? (product-id uint)) 
  (and
    (>= product-id u1)
    (<= product-id MAX_PRODUCT_ID)
  )
)

