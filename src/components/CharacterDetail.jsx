import axios from "axios";
import React, { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";

function CharacterDetail({ selectedId, onAddFavourit, isAddToFavourite }) {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episode, setEpisode] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        setCharacter(data);
        const episodesId = data.episode.map((e) => e.split("/").at(-1));
        console.log(episodesId);
        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );
        console.log(episodeData);
        setEpisode([episodeData].flat().slice(0, 6));
        console.log(episode);
      } catch (err) {
        console.log(err.response.data.error);
        toast.error(err.response.data.error, {
          className: "errorToast",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
          },
        });
      } finally {
        setIsLoading(false);
      }
    }
    if (selectedId) {
      fetchData();
    }
  }, [selectedId]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <InfinitySpin width="300" color="#82d8ed" />
      </div>
    );
  }

  if (!character || !selectedId) {
    return (
      <div style={{ flex: 1, color: "white" }}>please select character</div>
    );
  }
  return (
    <div className="row  text-white  characterDatail">
      <Toaster position="top-center" reverseOrder={true} />
      <CharacterSubInfo
        isAddToFavourite={isAddToFavourite}
        character={character}
        onAddFavourit={onAddFavourit}
      />
      <EpisodeDetail episode={episode} />
    </div>
  );
}

export default CharacterDetail;

function CharacterSubInfo({ isAddToFavourite, character, onAddFavourit }) {
  return (
    <div className="col-12  my-3 p-0">
      <div className="row  m-md-0 m-4 ">
        <div className="col-md-6 col-12 ps-0 l-border">
          <img src={character.image} alt={character.name} />
        </div>
        <div className="col-md-6 col-12 p-2 r-border">
          <h3>
            <span>
              {character.gender == "Male" ? (
                <i className="bi bi-gender-male"></i>
              ) : (
                <i className="bi bi-gender-female"></i>
              )}
            </span>
            <span>{character.name}</span>
          </h3>
          <div className="d-flex mb-4">
            <span
              className={`status ${character.status == "Dead" ? "dead" : ""}`}
            ></span>
            <span>{character.status}</span>
            <span className="fw-bolder mx-2">-</span>
            <span>{character.species}</span>
          </div>
          <div className="mb-4">
            <p className="mb-0">last known location:</p>
            <p>{character.location.name}</p>
          </div>
          <div>
            {isAddToFavourite ? (
              <button type="button" className="btn btn-secondary" disabled>
                Added To Favouriut
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => onAddFavourit(character)}
              >
                Add To Favouriut
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function EpisodeDetail({ episode }) {
  const [sortBy, setSortBy] = useState(true);
  let sortedEpisodes;
  if (sortBy) {
    sortedEpisodes = [...episode].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    sortedEpisodes = [...episode].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }
  return (
    <div className="col-11 mx-auto col-md-12 my-2 detail">
      <div className="d-flex justify-content-between mx-3 mt-4">
        <h4>List of Episodes:</h4>
        <button className="border-0 arrowUp" onClick={() => setSortBy((is) => !is)} style={{rotate:sortBy?"0deg":"180deg"}}>
          <i className="bi bi-arrow-up-circle"></i>
        </button>
      </div>
      <ul className="p-2">
        {sortedEpisodes.map((item, index) => (
          <li className="d-flex justify-content-between m-2" key={item.id}>
            <div>
              {String(index + 1).padStart(2, "")}-{item.episode}:
              <strong>{item.name}</strong>
            </div>
            <div className="badge rounded-pill bg-secondary h-100 align-items-center p-2">
              {item.air_date}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
