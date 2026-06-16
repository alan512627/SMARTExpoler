import React, { useState } from "react";
import FileList from "./components/FileList";
import TabView from "./components/TabView";

function makeId(){ return Math.random().toString(36).slice(2,9); }

export default function App(){
  const sampleFiles = [
    { path: 'C:/example/logs/app.log', name: 'app.log', size: '12 KB' },
    { path: 'C:/example/readme.txt', name: 'readme.txt', size: '1 KB' },
    { path: 'C:/example/config.json', name: 'config.json', size: '2 KB' }
  ];

  const [files] = useState(sampleFiles);
  const [tabs,setTabs] = useState([]);
  const [active,setActive] = useState(null);

  function openFile(file){
    // if already open, select
    const existing = tabs.find(t=>t.path===file.path);
    if(existing){ setActive(existing.id); return; }
    const newTab = { id: makeId(), title: file.name, path: file.path, content: `Loaded content for ${file.name}\n\n(placeholder)` };
    setTabs(prev=>[...prev,newTab]);
    setActive(newTab.id);
  }

  function closeTab(id){
    setTabs(prev=>{
      const n = prev.filter(t=>t.id!==id);
      if(n.length===0){ setActive(null); return n }
      if(id===active){ setActive(n[n.length-1].id) }
      return n;
    });
  }

  function duplicateTab(id){
    const t = tabs.find(x=>x.id===id);
    if(!t) return;
    const copy = { ...t, id: makeId(), title: t.title + ' (copy)' };
    setTabs(prev=>[...prev,copy]);
    setActive(copy.id);
  }

  return (
    <div style={{display:'flex',height:'100vh'}}>
      <div style={{width:300,borderRight:'1px solid #e6e6e6',overflow:'auto'}}>
        <FileList files={files} onOpen={openFile} />
      </div>
      <div style={{flex:1}}>
        <TabView tabs={tabs} activeId={active} onSelect={setActive} onClose={closeTab} onDuplicate={duplicateTab} />
      </div>
    </div>
  );
}
