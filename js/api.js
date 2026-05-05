 
//Creat the GET method
export async function getBooks() {
   try {
    const req =  await fetch('/data/books.json');
    const data = await req.json();
    return data;
    
   } catch (error) {
   }
}

