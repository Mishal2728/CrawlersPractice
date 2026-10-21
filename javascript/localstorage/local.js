console.log(localStorage);

localStorage.setItem("name", "mishal");

localStorage.length;

localStorage.getItem("name");

localStorage.setItem("age", 28);
const movies = [
  {
    id: 1,
    title: "Tourist Family",
  },
  {
    id: 2,
    title: "Thug Life!",
  },
];
localStorage.setItem("movies", JSON.stringify(movies));
localstorage.setItem("movies", "updated movies");
