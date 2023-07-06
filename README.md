# Comicable - Web Application (In Progress)

## Features:
## Version 1.0

### Database CRUD
#### Tables
1. collections
   - uid
   - title: comic title (from api)
   - endpoint
   - user: users.uid
2. users
   - uid
   - date_of_birth
   - email
   - first_name
   - last_name
   - password
   - verified (true or false)
3. checkpoints
   - uid
   - collection: collection.uid
   - endpoint

#### CRUD
1. create
   - [x] collections
   - [x] users
   - [x] checkpoints
2. read
   - [x] collections
   - [x] users
   - [x] checkpoints
3. update
   - [x] users
   - [x] checkpoints
4. delete
   - [x] collections
   - [x] checkpoints (kalo delete collection nya)
 
## Version 1.1
### Manga API
Provides unofficial public API \
from https://shinigami.id \
originally developed by https://github.com/AzwarKusumah/ryukoapi-shinigami \
with restructured code architecture by https://github.com/AwpticGH

## Version 2.0
### Web
Integration of the API into the website with crud features

## Penjelasan
### config
Konfigurasi untuk koneksi ke firebase dan menginisialisasi firebase app dengan flag tertentu.

### controller
Mengolah data dari web/firebase ke firebase/web.

### model
Bentuk model dari table yang ada di database (atribut/properti table).

### middleware
Penghubung client mengakses suatu halaman

### WebVariable
Kamus untuk name dan id dari variable-variable input yang berada di client-side.\
Contoh Client : \
\<input class="my-input" id="WebVariable.EMAIL" name="WebVariable.EMAIL"/>\
Contoh WebVariable : \
class WebVariable { \
    static EMAIL = "my-email";\
}\
Maka name dan id nya "my-email".

### References
Kamus untuk path/route/references di Firebase Realtime Database.

### flag
Peraturan-peraturan tertentu dalam program.