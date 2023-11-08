import React, { useState } from "react";
import Modall from "./Modall";
import { Characters } from "./CharacterList";
function Navbar({children}) {
  return (
    <nav className="navbar my-4 d-flex flex-row bd-highlight  justify-content-center p-2">
      <Logo />
      {children}
      
    </nav>
  );
}

export default Navbar;

function Logo() {
  return <div className="p-2 text-start logo">LOGO</div>;
}

export function Search({query,setQuery}) {
  return (
    <div className="p-2 text-center ">
      <input
        value={query}
        onChange={(e)=>{setQuery(e.target.value)}}
        className="form-control me-2 w-75"
        type="search"
        placeholder="Search..."
        aria-label="Search"
      />
    </div>
  );
}
export function SearchResult({numOfResult}) {
  return <div className="p-2 text-center ">{numOfResult}</div>;
}
export function Favourites({favourites ,onDeletedFav}) {
  const[isOpen,setIsOpen]=useState(false)

  return (<>
    <Modall open={isOpen} onOpen={setIsOpen} title={"list of favourites"}>
    {favourites.map((item)=><Characters key={item.id} item={item}><div className="col-lg-2 col-12">
            <button onClick={()=>onDeletedFav(item.id)}>
            <i class="bi bi-trash3"></i>
            </button>
          </div></Characters>)}
  </Modall>
    <button className="p-2 text-end position-relative me-2" onClick={()=>setIsOpen((is)=>!is)}>
      <i className="bi bi-suit-heart "></i>
      <span className="position-absolute  translate-middle badge rounded-pill bg-danger">
        {favourites.length}<span className="visually-hidden">unread messages</span>
      </span>
    </button>
    </>
  );
}
