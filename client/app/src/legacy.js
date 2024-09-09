
function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState(0);
  const [newTitle, setNewTitle] = useState("");

  const fetchBooks = async () => {
    try { 
      const response = await fetch("http://127.0.0.1:8000/api/books/");
      const data = await response.json();
      console.log(data);
      setBooks(data);
    } catch (err) {
      console.log(err);
    }
  }

  const addBook = async () => {
    const bookData = {title: title, release_year : year};
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/create", {
        method : "POST", 
        headers : {
          'Content-Type' : "application/json",

        },
        body: JSON.stringify(bookData)

      });
      const data = await response.json();
      setBooks((prev) => [...prev, data])
      console.log(data);
    } catch (err){
      console.log(err);
    }
  }

  const updateTitle = async (pk, release_year) => {
    const bookTile = {title: newTitle, release_year : release_year};
    
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}`, {
        method : "PUT", 
        headers : {
          'Content-Type' : "application/json",

        },

        body: JSON.stringify(bookTile)
      });
      const data = await response.json();
      setBooks((prev) => prev.map((book) => {
        if(book.id === pk){
          return data
        } else {
          return book
        }
      }))
    } catch (err){
      console.log(err);
    }
  }

  const deleteBook = async (pk) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}`, {
        method : "DELETE"
      });
      
      setBooks((prev) => prev.filter((book) =>  book.id !== pk));
    
    } catch (err){
      console.log(err);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <h1>Book Website 2 </h1>
      <div> 
        <input type="text" placeholder="Book title" onChange={ e => setTitle(e.target.value)}/> 
        <input type = "number" placeholder= "Release date" onChange = {e => setYear(e.target.value)}/>
        <button onClick={addBook}> Add book </button>

      </div>
      {books.map((book) => {
        console.log("here??");
        return <div>
          <p> Title: {book.title}</p>
          <p> Release Year: {book.release_year}</p>
          <input type = "text" placeholder='Type new title...' onChange={e => setNewTitle(e.target.value)}/>
          <button onClick={() => updateTitle(book.id, book.release_year)}> Change title</button>  
          <button onClick={() => deleteBook(book.id)}> Delete book</button>       
        </div>
      })}
    </>
  )
}