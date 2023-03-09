import instance from "./index";

const FavouritesAPI = {
  getFavourites: () => instance.get("/favorites"),
  addFavourites:(stockCode:any)=>instance.post("/favorites/"+stockCode),
  deleteFavourites:(stockCode:any)=>instance.delete("/favorites/"+stockCode)
};


export default FavouritesAPI;