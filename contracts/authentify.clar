
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

;; Define dispute codes
(define-constant DISPUTE_NONE u0)
(define-constant DISPUTE_STOLEN u1)
(define-constant DISPUTE_LOST u2)
(define-constant DISPUTE_DAMAGED u3)

;; data vars
;;
;; Define a data structure for ownership transfer
(define-data-var transfer-id-nonce uint u0)

;; data maps
;;
;; Map to store product information
(define-map products
  { product-id: uint }
  {
    created-by: principal,
    owner: (optional principal),
    name: (string-ascii 50),
    description: (string-ascii 256),
    created-at: uint,
    is-licensed: bool,
    dispute: uint
  }
)

;; Map to store product license information
(define-map product-licenses
  { product-id: uint }
  {
    initial-owner: principal,
    license-history: (list 200 uint), ;; list of transfer ID's up to 200 entries
    ;;licensed-at: uint,
    current-owner: principal
  }
)

;; Map to store ownership transfers
(define-map ownership-transfers
  { transfer-id: uint }
    {
        product-id: uint,
        from: principal,
        to: principal,
        transferred-at: uint
    }
)

;; public functions
;;
;; Function to create a new product
(define-public (create-product (product-id uint) (name (string-ascii 50)) (description (string-ascii 256)))
  (let
    (
        (caller tx-sender)
        (block-time (unwrap! (get-block-info? time u0) (err u108)))
    )
    (asserts! (is-eq caller (var-get contract-owner)) (err u100))
    (asserts! (valid-product-id? product-id) (err u105))
    (asserts! (valid-name? name) (err u106))
    (asserts! (valid-description? description) (err u107))
    (asserts! (is-none (map-get? products { product-id: product-id })) (err u101))
    (ok (map-set products
      { product-id: product-id }
      {
        created-by: caller,
        owner: none,
        name: name,
        description: description,
        created-at: block-time,
        is-licensed: false,
        dispute: u0
      }
    ))
  )
)

;; Define a function to license a product to a buyer
(define-public (license-product (product-id uint) (buyer principal))
  (let
    (
        (product (unwrap! (map-get? products { product-id: product-id }) (err u102)))
        (caller tx-sender)
        (block-time (unwrap! (get-block-info? time u0) (err u108)))
        (transfer-id (generate-transfer-id))
    )
    (asserts! (valid-product-id? product-id) (err u105))
    (asserts! (is-eq (get created-by product) caller) (err u103))
    (asserts! (not (get is-licensed product)) (err u104))

    
    (map-set products
        { product-id: product-id }
        (merge product { owner: (some buyer), is-licensed: true })
    )

    (asserts! 
        (map-set products
            { product-id: product-id }
            (merge product { owner: (some buyer), is-licensed: true })
        ) (err u114)
    )

    (map-set ownership-transfers
        { transfer-id: transfer-id }
        {
            product-id: product-id,
            from: caller,
            to: buyer,
            transferred-at: block-time
        }
    )

    (asserts!
        (map-set ownership-transfers
            { transfer-id: transfer-id }
            {
                product-id: product-id,
                from: caller,
                to: buyer,
                transferred-at: block-time
            }
        ) (err u114)
    )

    (ok (map-set product-licenses
      { product-id: product-id }
      {
        initial-owner: caller,
        license-history: (list transfer-id),
        current-owner: buyer
      }
    ))
  )
)

;; Define a function to transfer ownership of a licensed product
(define-public (transfer-ownership (product-id uint) (new-owner principal)) 
    (let
        (
            (product (unwrap! (map-get? products { product-id: product-id }) (err u102)))
            (license (unwrap! (map-get? product-licenses { product-id: product-id }) (err u110)))
            (caller tx-sender)
            (block-time (unwrap! (get-block-info? time u0) (err u108)))
            (transfer-id (generate-transfer-id))
        )
        
        (asserts! (valid-product-id? product-id) (err u105))
        (asserts! (get is-licensed product) (err u111))
        (asserts! (is-eq (get current-owner license) caller) (err u112))

        (map-set products
            { product-id: product-id }
            (merge product { owner: (some new-owner) })
        )

        (asserts! 
            (map-set products
                { product-id: product-id }
                (merge product { owner: (some new-owner) })
            ) (err u114)
        )

        (map-set ownership-transfers
            { transfer-id: transfer-id }
            {
                product-id: product-id,
                from: caller,
                to: new-owner,
                transferred-at: block-time
            }
        )

        (asserts!
            (map-set ownership-transfers
                { transfer-id: transfer-id }
                {
                    product-id: product-id,
                    from: caller,
                    to: new-owner,
                    transferred-at: block-time
                }
            ) (err u114)
        )

        (ok (map-set product-licenses 
            { product-id: product-id } 
            (merge license
                {
                    current-owner: new-owner,
                    license-history: (unwrap! 
                        (as-max-len? 
                            (append (get license-history license) transfer-id)
                            u200
                        ) 
                        (err u113)
                    )
                }
            )
        ))
    )
)

;; Define a function to dispute a product
(define-public (dispute-product (product-id uint) (dispute-code uint))
  (let
    (
        (product (unwrap! (map-get? products { product-id: product-id }) (err u102)))
        (caller tx-sender)
    )
    (asserts! (is-eq (get created-by product) caller) (err u103))
    (asserts! (valid-product-id? product-id) (err u105))
    (asserts! (valid-dispute-code? dispute-code) (err u108))

    (ok (map-set products
      { product-id: product-id }
      (merge product { dispute: dispute-code })
    ))
  )
)

;; read only functions
;;
;; Define a function to get product details
(define-read-only (get-product-details (product-id uint))
  (map-get? products { product-id: product-id })
)

;; Define function to get product license details
(define-read-only (get-license-details (product-id uint)) 
    (map-get? product-licenses { product-id: product-id })
)

;; Define a function to get transfer details
(define-read-only (get-transfer-details (transfer-id uint))
    (map-get? ownership-transfers { transfer-id: transfer-id })
)

;; Define a function to get all transfers for a product
(define-read-only (get-all-transfers (product-id uint))
    (match (map-get? product-licenses { product-id: product-id })
        license (map get-transfer-details (get license-history license))
        (list)
    )
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

;; Helper function to validate dispute codes
(define-private (valid-dispute-code? (dispute-code uint))
  (or
    (is-eq dispute-code DISPUTE_NONE)
    (is-eq dispute-code DISPUTE_STOLEN)
    (is-eq dispute-code DISPUTE_LOST)
    (is-eq dispute-code DISPUTE_DAMAGED)
  )
)

;; Helper function to generate a get and increment transfer id
(define-private (generate-transfer-id)
  (let
    (
        (current-id (var-get transfer-id-nonce))
    )
    (var-set transfer-id-nonce (+ current-id u1))
    current-id
  )
)
