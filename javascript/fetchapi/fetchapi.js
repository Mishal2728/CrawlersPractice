// const URL = "https://official-joke-api.appspot.com/random_joke";

// const factpara = document.querySelector("#fact");

// const btn = document.querySelector("#btn")

// const getFacts = async () => {
//     console.log("getting data ....");

//   let response = await fetch(URL);

//   const data = await response.json();

//     console.log(data);

//   const joke = data.setup;

//     console.log("your question is", joke);

//   factpara.innerText = joke;
// };

// btn.addEventListener("click" , getFacts)

const url = "https://randomuser.me/api";

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
