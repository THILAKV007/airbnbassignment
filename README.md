How to use

1. Open Postman → *Import* → Select File → Choose the JSON.
2. First, *Create User / Login* to get the JWT token.
3. Set the *token variable* in Postman:
* Click **Manage Environments → Add variable token → Paste JWT**.
4. All protected endpoints will use {{token}} in the *Authorization header*.
5. Replace OWNER_ID_HERE, PROPERTY_ID_HERE, USER_ID_HERE with actual DB IDs when creating properties or reservations.