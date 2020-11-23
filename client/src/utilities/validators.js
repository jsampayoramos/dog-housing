export const passwordCheck = (password, confirmPassword) => {
    if(password !== confirmPassword) {
        return false;
    }
    return true;
};