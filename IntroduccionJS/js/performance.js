const url = "https://jsonplaceholder.typicode.com/comments";
const url2= 'https://jsonplaceholder.typicode.com/todos'

const consultarApi = async () => {
    try {
      const inicio= performance.now()

      const response = await fetch(url);
      if(!response.ok){
          throw new Error('Firus')
      }
      const data = await response.json();
      const fin  = performance.now()
      console.log(fin -inicio)
    } catch (error) {
      console.log(error);
    }
  };