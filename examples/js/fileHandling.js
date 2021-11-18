function writeFile(fName, content) {
    localStorage.setItem(fName,  content);
}
    
function readFile(fName) {
    try {
        return localStorage.getItem(fName);
    } catch {
        return null;
    }
}

function deleteFile(fName) {
    localStorage.removeItem(fName);
}

function fileExists(fName) {
    if (readFile(fName) == null) { return false; }
    return true;
}