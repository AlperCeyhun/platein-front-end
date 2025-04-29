
import React from "react";

export default function Footer(){
    return(
        <footer className="p-4 text-center text-black mt-auto">
           <p>&copy; {new Date().getFullYear()} Platein. All rights reserved.</p>
        </footer>
    );
}
