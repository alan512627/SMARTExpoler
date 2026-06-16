import React from "react";

export default function FileList({ files, onOpen }){
  return (
    <div style={{height:'100%'}}>
      <div style={{padding:8,borderBottom:'1px solid #eee',fontWeight:600}}>Files</div>
      <ul style={{listStyle:'none',padding:8,margin:0}}>
        {files.map(f => (
          <li key={f.path} style={{padding:'6px 8px',cursor:'pointer'}} onDoubleClick={()=>onOpen(f)}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
              <span>{f.name}</span>
              <small style={{color:'#888'}}>{f.size}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
