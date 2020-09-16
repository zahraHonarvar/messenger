import React, { useState, useRef, useEffect } from "react";
import SideBar from "./sideBar";

function Top({ onChange, value }) {
  const [mode, setMode] = useState("text");
  const [open,setOpen]=useState(false)
  const ref = useRef(null);

  function handleChange(e) {
    onChange(e);
  }
  function changeModeToSearch() {
    setMode("search");
  }
  function changeModeToText() {
    setMode("text");
  }
  function handleShowContacts(){
    console.log('ok')
    setOpen(true)
    
  }
  useEffect(() => {
    if (mode === "search") {
      ref.current.focus();
    }
  }, [mode]);
  return (
    <>
     <SideBar open={open} onClose={() => setOpen(false)}/>
    <div className="top-bar">
      {mode === "search" ? (
        <i className="fa fa-arrow-left" onClick={changeModeToText} />
      ) : (
        <i className="fa fa-list" onClick={handleShowContacts}/>
      )}
      {mode === "search" ? (
        <input
          ref={ref}
          type="text"
          className="search"
          value={value}
          onChange={handleChange}
        />
      ) : (
        <h6 className="messenger">MESSAENGER</h6>
      )}

      <i className="fa fa-search" onClick={changeModeToSearch} />
    </div>
    </>
  );
}

export default Top;
