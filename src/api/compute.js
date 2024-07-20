 function millisecondsToTime(ms) {
    // 確保輸入為數字
    if (typeof ms !== 'number') {
      return 'Invalid input';
    }
  
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
  
    const remainingSeconds = seconds % 60;
    const remainingMinutes = minutes % 60;
    if(hours===0){
        return `${remainingMinutes}:${remainingSeconds}`;
    }
    else{
    return `${hours}:${remainingMinutes}:${remainingSeconds}`;
    }
  }
  export default millisecondsToTime;