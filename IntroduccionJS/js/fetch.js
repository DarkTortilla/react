///perrito bailando

const url = "https://jsonplaceholder.typicode.com/comments";

// promesas
fetch(url)
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error("Firus");
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });

// async await

// const consultarApi= async ()=>{
//    const response = await fetch(url);
//    const data = await response.json();
// }

const consultarApi = async () => {
  try {
    
    const response = await fetch(url);
    if(!response.ok){
        throw new Error('Firus')
    }
    const data = await response.json();
  } catch (error) {
    console.log(error);
  }
};

consultarApi();
