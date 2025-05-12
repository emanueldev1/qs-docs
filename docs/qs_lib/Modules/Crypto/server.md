---
title: Crypto (Server)
sidebar_position: 18
description: Documentation for server-side cryptographic utilities with qs_lib.
---

# Crypto (Server)

## lib.crypto

Provides server-side cryptographic utilities for FiveM, including hashing, message authentication, and encryption/decryption functions.

```lua
crypto = lib.crypto
```

### crypto.SHA256

Computes the SHA-256 hash of a message, useful for data integrity checks.

```lua
crypto.SHA256(msg)
```

- msg: `string`
  - The message to hash.

**Returns:**

- hash: `string`
  - The SHA-256 hash as a hexadecimal string (e.g., "a948904f2f0f479b8f8197694b30184b0d2ed1c1cd2a1ec0fb85d299a192a447").

#### Example: Hashing a Password

Computes the SHA-256 hash of a player's password for secure storage.

```lua title="Server: Hashing a Password"
local password = "MySecurePassword123"
local hash = crypto.SHA256(password)
print("Hashed password:", hash)
```

### crypto.HMACSHA256

Computes an HMAC-SHA256 hash for a message using a key, useful for message authentication.

```lua
crypto.HMACSHA256(key, msg)
```

- key: `string`
  - The secret key for HMAC.
- msg: `string`
  - The message to hash.

**Returns:**

- hmac: `string`
  - The HMAC-SHA256 hash as a hexadecimal string (e.g., "f7bc83f430538424b13298e6aa6fb143ef4d59a14946175997479dbc2d1a3cd").

#### Example: Authenticating a Message

Generates an HMAC-SHA256 hash to authenticate a message.

```lua title="Server: Authenticating a Message"
local key = "secretkey123"
local message = "Player transaction: $100"
local hmac = crypto.HMACSHA256(key, message)
print("Message HMAC:", hmac)
```

### crypto.AESEncrypt

Encrypts a message using AES-256-CBC with a key and IV, useful for secure data storage or transmission.

```lua
crypto.AESEncrypt(msg, key, iv)
```

- msg: `string`
  - The message to encrypt.
- key: `string`
  - The encryption key (must be 32 bytes, e.g., a 32-character string).
- iv: `string`
  - The initialization vector (must be 16 bytes, e.g., a 16-character string).

**Returns:**

- encrypted: `string` | `nil`
  - The encrypted message as a hex string (e.g., "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"), or `nil` if parameters are invalid.

#### Example: Encrypting Player Data

Encrypts sensitive player data using AES-256-CBC.

```lua title="Server: Encrypting Player Data"
local key = "12345678901234567890123456789012" -- 32 bytes
local iv = "1234567890123456" -- 16 bytes
local data = "PlayerID:12345"
local encrypted = crypto.AESEncrypt(data, key, iv)
if encrypted then
    print("Encrypted data:", encrypted)
else
    print("Encryption failed.")
end
```

### crypto.AESDecrypt

Decrypts a message encrypted with AES-256-CBC using a key and IV.

```lua
crypto.AESDecrypt(encrypted, key, iv)
```

- encrypted: `string`
  - The encrypted message as a hex string (e.g., "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6").
- key: `string`
  - The decryption key (must be 32 bytes, e.g., a 32-character string).
- iv: `string`
  - The initialization vector (must be 16 bytes, e.g., a 16-character string).

**Returns:**

- decrypted: `string` | `nil`
  - The decrypted message (e.g., "PlayerID:12345"), or `nil` if parameters are invalid or decryption fails.

#### Example: Decrypting Player Data

Decrypts previously encrypted player data using AES-256-CBC.

```lua title="Server: Decrypting Player Data"
local key = "12345678901234567890123456789012" -- 32 bytes
local iv = "1234567890123456" -- 16 bytes
local encryptedData = "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6" -- Example encrypted hex string
local decrypted = crypto.AESDecrypt(encryptedData, key, iv)
if decrypted then
    print("Decrypted data:", decrypted)
else
    print("Decryption failed.")
end
```