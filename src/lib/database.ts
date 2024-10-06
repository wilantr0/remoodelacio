import { Pool } from 'pg'


let conn: Pool | undefined

console.log(process.env.URI_SERVER)

if(!conn){
conn = new Pool({
  connectionString: process.env.URI_SERVER
  
});
}



export { conn }