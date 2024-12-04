import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
    const [files, setFiles] = useState<FileList | null>(null);
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const filesList = event.target.files;
        if(filesList) setFiles(filesList);
    }
    
    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault(); 

        if(!files) return;
         
        const filesArray = Array.from(files);
        try {
            await invoke("upload_files", { files: filesArray })
            alert("Successfully uploaded files");
        } catch(error: any) {
            alert("Error uploading files");
        }
    }

    return (
        <main>
            <div> Hello world </div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} multiple></input>
                <input type="submit" value="Submit"></input>
            </form>
        </main>
    );
}

export default App;
