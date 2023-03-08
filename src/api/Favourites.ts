import instance from "./index";

const FavouritesAPI = {
  getFavourites: () => instance.get("/favorites"),
  addFavourites:(stockCode:any)=>instance.post("/favourites/"+stockCode),
  deleteFavourites:(stockCode:any)=>instance.delete("/favourites/"+stockCode)
};
