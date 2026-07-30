const parseIntId = id => {
    try {
        const parsedId = Number(id);
        if(!Number.isInteger(parsedId) || parsedId <= 0){
            return null;
        } 
        return parsedId;
    } catch (error) {
        console.log("Error while parsing ID :", error.message)
    }
}

export default parseIntId;