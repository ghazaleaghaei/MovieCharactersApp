import React from "react";

function CharacterList({ characters, onSelectedCharacter, selectedId }) {
  return (
    <div>
      {characters.map((item) => (
        <Characters
          key={item.id}
          item={item}
          
        >
          <div className="col-lg-2 col-12">
            <button
              onClick={() => {
                onSelectedCharacter(item.id);
              }}
            >
              {selectedId == item.id ? (
                <i class="bi bi-eye-slash fs-2"></i>
              ) : (
                <i class="bi bi-eye fs-2"></i>
              )}
            </button>
          </div>
        </Characters>
      ))}
    </div>
  );
}

export default CharacterList;
export function Characters({
  item,
   children
}) {
  return (
    <div className="d-block p-3 text-white m-3 rounded character">
      <div className="row txt-start">
        <div className="col-12 col-lg-4">
          <img src={item.image} alt={item.name} />
        </div>
        <div className="col-lg-6 col-12 ">
          <h3 className="d-inline-block text-truncate p-lg-2 font-weight-light">
            <span>
              {item.gender == "Male" ? (
                <i class="bi bi-gender-male"></i>
              ) : (
                <i class="bi bi-gender-female"></i>
              )}
            </span>
            <span className="font-weight-light">{item.name}</span>
          </h3>
          <div className="d-flex p-lg-2">
            <span
              className={`status ${item.status == "Dead" ? "dead" : ""}`}
            ></span>
            <span className="px-2">{item.status}</span>
            <span className="fw-bolder">-</span>
            <span className="px-2">{item.species}</span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
