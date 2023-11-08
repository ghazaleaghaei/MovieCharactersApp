import React, { useEffect, useState } from "react";
import Navbar, { Favourites, Search, SearchResult } from "./components/Navbar";
import "./app.css";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import Loading from "./components/Loading";
import  { Toaster } from "react-hot-toast";
import { useCharacter } from "./hooks/useCharacter";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [query, setQuery] = useState("");
  const{characters,isLoading}=useCharacter("https://rickandmortyapi.com/api/character/?name",query)
  const [selectedId, setSelectedId] = useState(null);
  const[favourites,setFavourites]=useLocalStorage("FAVOURIT",[])
  const selectedCharacterHandler = (id) => {
    setSelectedId((prevId) => (prevId == id ? null : id));
  };
  const addFavouritHandler = (char) => {
    setFavourites((prevFav) => [...prevFav, char]);
  };
  const deletedFavHandler = (id) => {
    setFavourites(favourites.filter((item) => item.id !== id));
  };
  const isAddToFavourite = favourites.map((fav) => fav.id).includes(selectedId);

  return (
    <div className="container-fluid">
      <Toaster position="top-center" reverseOrder={true} />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="row justify-content-center">
          <div className="col-12">
            <Navbar>
              <Search query={query} setQuery={setQuery} />
              <SearchResult numOfResult={characters.length} />
              <Favourites
                favourites={favourites}
                onDeletedFav={deletedFavHandler}
              />
            </Navbar>
          </div>
          <div className="col-md-5  col-12">
            {characters.length > 0 ? (
              <CharacterList
                selectedId={selectedId}
                characters={characters}
                onSelectedCharacter={selectedCharacterHandler}
              />
            ) : (
              <h4 className="hideSearch">not found any thing!!</h4>
            )}
          </div>
          <div className="col-md-5  col-12">
            <CharacterDetail
              selectedId={selectedId}
              onAddFavourit={addFavouritHandler}
              isAddToFavourite={isAddToFavourite}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
