
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

;; Define error codes
(define-constant ERR_UNAUTHORIZED u100)
(define-constant ERR_PRODUCT_EXISTS u101)
(define-constant ERR_PRODUCT_NOT_FOUND u102)
(define-constant ERR_INVALID_CREATOR u103)
(define-constant ERR_PRODUCT_ALREADY_LICENSED u104)
(define-constant ERR_INVALID_PRODUCT_ID u105)
(define-constant ERR_INVALID_NAME u106)
(define-constant ERR_INVALID_DESCRIPTION u107)
(define-constant ERR_INVALID_DISPUTE_CODE u108)
(define-constant ERR_INVALID_GET_RESPONSE u109)
(define-constant ERR_INVALID_TRANSFER_ID u110)
(define-constant ERR_INVALID_SET_RESPONSE u111)
(define-constant ERR_INVALID_PRODUCT_LICENSE u112)
(define-constant ERR_INVALID_TRANSFER_CODE u113)
(define-constant ERR_TRANSFER_EXPIRED u114)
(define-constant ERR_ALREADY_APPROVED u115)
(define-constant ERR_INVALID_TRANSFER_STATUS u116)
(define-constant ERR_TRANSFER_CODE_LENGTH u117)


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
;; Define error codes with their corresponding messages
(define-map error-messages
  uint
  (string-ascii 50)
)

;; Initialize error messages
(map-set error-messages ERR_UNAUTHORIZED "Unathorized access")
(map-set error-messages ERR_PRODUCT_EXISTS "Product already exists")
(map-set error-messages ERR_PRODUCT_NOT_FOUND "Product not found")
(map-set error-messages ERR_INVALID_CREATOR "Not Eroduct Creator")
(map-set error-messages ERR_PRODUCT_ALREADY_LICENSED "Product already Licensed")
(map-set error-messages ERR_INVALID_PRODUCT_ID "Invalid product ID")
(map-set error-messages ERR_INVALID_NAME "Invalid Name length")
(map-set error-messages ERR_INVALID_DESCRIPTION "Invalid Description Length")
(map-set error-messages ERR_INVALID_DISPUTE_CODE "Invalid Dispute Code")
(map-set error-messages ERR_INVALID_GET_RESPONSE "Get response Error!")
(map-set error-messages ERR_INVALID_TRANSFER_ID "Invalid Transfer ID")
(map-set error-messages ERR_INVALID_SET_RESPONSE "Set response error!")
(map-set error-messages ERR_INVALID_PRODUCT_LICENSE "Invalid product license")
(map-set error-messages ERR_INVALID_TRANSFER_CODE "Invalid transfer code provided")
(map-set error-messages ERR_TRANSFER_EXPIRED "Transfer request has expired")
(map-set error-messages ERR_ALREADY_APPROVED "Transfer already approved")
(map-set error-messages ERR_INVALID_TRANSFER_STATUS "Invalid transfer status")
(map-set error-messages ERR_TRANSFER_CODE_LENGTH "Transfer code must be 4 digits")


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
    creator: principal,
    ownership-history: (list 200 uint), ;; list of transfer ID's up to 200 entries
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

;; Store transfer proposals with transfer codes
(define-map transfer-proposals
    { transfer-id: uint }
    {
        product-id: uint,
        from: principal,
        to: principal,
        transfer-code: uint,  ;; 4-digit code
        created-at: uint,
        expires-at: uint,
        status: (string-ascii 20)  ;; "pending", "approved", "expired", "completed" "cancelled"
    }
)

;; public functions
;;
;; Function to create a new product
(define-public (create-product (product-id uint) (name (string-ascii 50)) (description (string-ascii 256)))
  (let
    (
        (caller tx-sender)
        (block-time (unwrap! (get-block-info? time u0) (err-with-message ERR_INVALID_GET_RESPONSE)))
    )
    (asserts! (is-eq caller (var-get contract-owner)) (err-with-message ERR_UNAUTHORIZED))
    (asserts! (valid-product-id? product-id) (err-with-message ERR_INVALID_PRODUCT_ID))
    (asserts! (valid-name? name) (err-with-message ERR_INVALID_NAME))
    (asserts! (valid-description? description) (err-with-message ERR_INVALID_DESCRIPTION))
    (asserts! (is-none (map-get? products { product-id: product-id })) (err-with-message ERR_PRODUCT_EXISTS))
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
        (product (unwrap! (map-get? products { product-id: product-id }) (err-with-message ERR_PRODUCT_NOT_FOUND)))
        (caller tx-sender)
        (block-time (unwrap! (get-block-info? time u0) (err-with-message ERR_INVALID_GET_RESPONSE)))
        (transfer-id (generate-transfer-id))
    )
    (asserts! (valid-product-id? product-id) (err-with-message ERR_INVALID_PRODUCT_ID))
    (asserts! (is-eq (get created-by product) caller) (err-with-message ERR_INVALID_CREATOR))
    (asserts! (not (get is-licensed product)) (err-with-message ERR_PRODUCT_ALREADY_LICENSED))
    (asserts! (not (is-eq buyer caller)) (err-with-message ERR_UNAUTHORIZED))

    
    (map-set products
        { product-id: product-id }
        (merge product { owner: (some buyer), is-licensed: true })
    )

    (asserts! 
        (map-set products
            { product-id: product-id }
            (merge product { owner: (some buyer), is-licensed: true })
        ) (err-with-message ERR_INVALID_SET_RESPONSE)
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
        ) (err-with-message ERR_INVALID_SET_RESPONSE)
    )

    (ok (map-set product-licenses
      { product-id: product-id }
      {
        creator: caller,
        ownership-history: (list transfer-id),
        current-owner: buyer
      }
    ))
  )
)

;; Define a function to Initiate a transfer with a 4-digit code
(define-public (initiate-transfer (product-id uint) (new-owner principal) (transfer-code uint))
    (let
        (
            (caller tx-sender)
            (product (unwrap! (map-get? products { product-id: product-id }) (err-with-message ERR_PRODUCT_NOT_FOUND)))
            (license (unwrap! (map-get? product-licenses { product-id: product-id }) (err-with-message ERR_INVALID_PRODUCT_LICENSE)))
            (block-time (unwrap! (get-block-info? time u0) (err-with-message ERR_INVALID_GET_RESPONSE)))
            (transfer-id (generate-transfer-id))
        )
        
        ;; Verify conditions
        (asserts! (valid-product-id? product-id) (err-with-message ERR_INVALID_PRODUCT_ID))
        (asserts! (get is-licensed product) (err-with-message ERR_PRODUCT_ALREADY_LICENSED))
        (asserts! (is-eq (get current-owner license) caller) (err-with-message ERR_UNAUTHORIZED))
        (asserts! (not (is-eq new-owner caller)) (err-with-message ERR_UNAUTHORIZED))
        (asserts! (valid-transfer-code? transfer-code) (err-with-message ERR_TRANSFER_CODE_LENGTH))

        ;; Create transfer proposal
        (ok (map-set transfer-proposals
            { transfer-id: transfer-id }
            {
                product-id: product-id,
                from: caller,
                to: new-owner,
                transfer-code: transfer-code,
                created-at: block-time,
                expires-at: (+ block-time u86400), ;; Expires in 24 hours
                status: "pending"
            }
        ))
    )
)

;; Define a function to transfer ownership of a licensed product
(define-public (transfer-ownership (product-id uint) (new-owner principal)) 
    (let
        (
            (product (unwrap! (map-get? products { product-id: product-id }) (err-with-message ERR_PRODUCT_NOT_FOUND)))
            (license (unwrap! (map-get? product-licenses { product-id: product-id }) (err-with-message ERR_INVALID_PRODUCT_LICENSE)))
            (caller tx-sender)
            (block-time (unwrap! (get-block-info? time u0) (err-with-message ERR_INVALID_GET_RESPONSE)))
            (transfer-id (generate-transfer-id))
        )
        
        (asserts! (valid-product-id? product-id) (err-with-message ERR_INVALID_PRODUCT_ID))
        (asserts! (get is-licensed product) (err-with-message ERR_PRODUCT_ALREADY_LICENSED))
        (asserts! (is-eq (get current-owner license) caller) (err-with-message ERR_UNAUTHORIZED))
        (asserts! (not (is-eq new-owner caller)) (err-with-message ERR_UNAUTHORIZED))

        (map-set products
            { product-id: product-id }
            (merge product { owner: (some new-owner) })
        )

        (asserts! 
            (map-set products
                { product-id: product-id }
                (merge product { owner: (some new-owner) })
            ) (err-with-message ERR_INVALID_SET_RESPONSE)
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
            ) (err-with-message ERR_INVALID_SET_RESPONSE)
        )

        (ok (map-set product-licenses 
            { product-id: product-id } 
            (merge license
                {
                    current-owner: new-owner,
                    ownership-history: (unwrap! 
                        (as-max-len? 
                            (append (get ownership-history license) transfer-id)
                            u200
                        ) 
                        (err-with-message ERR_INVALID_SET_RESPONSE)
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
        (product (unwrap! (map-get? products { product-id: product-id }) (err-with-message ERR_PRODUCT_NOT_FOUND)))
        (caller tx-sender)
    )
    (asserts! (is-eq (get created-by product) caller) (err-with-message ERR_INVALID_CREATOR))
    (asserts! (valid-product-id? product-id) (err-with-message ERR_INVALID_PRODUCT_ID))
    (asserts! (valid-dispute-code? dispute-code) (err-with-message ERR_INVALID_DISPUTE_CODE))

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
  (match (map-get? product-licenses { product-id: product-id })
    value (ok value)
    (err-with-message ERR_INVALID_PRODUCT_LICENSE)
  )
)

;; Define a function to get transfer details
(define-read-only (get-transfer-details (transfer-id uint))
  (map-get? ownership-transfers { transfer-id: transfer-id })
)

;; Define a function to get all transfers for a product
(define-read-only (get-ownership-history (product-id uint))
  (match (map-get? product-licenses { product-id: product-id })
    license (map get-transfer-details (get ownership-history license))
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
;; Helper function to get error message
(define-private (get-error-message (error-code uint))
  (default-to "UNKNOWN_ERROR" (map-get? error-messages error-code))
)

;; Helper functon to validate transfer code

;; Modified error response function
(define-private (err-with-message (error-code uint))
  (err (tuple (code error-code) (message (get-error-message error-code))))
)
