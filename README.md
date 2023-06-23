# Comicable - Web Application (In Progress)

## Features:
## Version 1.0

### Database CRUD
#### Tables
1. collections
   - uid
   - title: comic title (from api)
   - user: users.uid
2. users
   - uid
   - address
   - date_of_birth
   - email
   - first_name
   - last_name
   - password
   - phone_number
   - verified (0 or 1)
3. checkpoints
   - uid
   - collection: collection.uid
   - chapter

#### CRUD
1. create
   - collections
   - users
   - checkpoints
2. read
   - collections
   - users
   - checkpoints
3. update
   - users
   - checkpoints
4. delete
   - collections
   - checkpoints (kalo delete collection nya)
 
## Version 1.1
### Manga API
Provides unofficial public API \
from https://shinigami.id \
originally from https://github.com/AzwarKusumah/ryukoapi-shinigami \
with restructured code architecture by AwpticGH

## Version 2.0
### Web
Integration of the API into the website with crud features

## To Do
### Frontend
- [x] Restructure folder (rafi)
- [] Konversi file ke ejs (rafi/praba)
- [x] Bikin layout components dan main layout (rafi/praba)
- [] Remove unnecessary features in web for crud, see tables in database section for reference (rafi)

### Backend
- [] Nyari restful api (rafi)
- [] Nyari library untuk rest api (rafi)
- [] Implementasi api nya (rafi)
- [] Bikin config (praba)
- [] Bikin controller (praba)
- [] Bikin model (praba)
- [] Bikin middleware (rafi)
- [] Bikin router (rafi)
- [] Bikin dictionary/WebVariable (rafi)
- [] Bikin dictionary/References (rafi)
- [] Bikin flag (rafi)

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