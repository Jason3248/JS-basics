export const verifyUpdationData = data => {
    if(Object.keys(data).length === 0){
        return null;
    }
    return data;
}
export default verifyUpdationData;