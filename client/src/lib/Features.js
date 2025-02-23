import moment from "moment"

const fileformat = (url = '') => {
    const fileExtension = url.split('.').pop()
    if(fileExtension === 'mp4' || fileExtension === 'webm' || fileExtension === 'ogg')
    return 'video'
    if (fileExtension === 'mp3' || fileExtension === 'wav' )
    return 'audio'
    if (fileExtension === 'jpg' || fileExtension === 'png' || fileExtension === 'jpeg' || fileExtension === 'gif')
    return 'image'
    return 'file'
}

const transformImage =  (url = '', width = 100) => {}


const getLast7Days = () => {
const currentDate = moment();
const last7Days = [];

for (let index = 0; index < 7; index++) {
    const dayDate = currentDate.clone().subtract(index, 'days')
    const dayName = dayDate.format('dddd')
    last7Days.unshift(dayName)   
}
return last7Days
}


export {
    fileformat,
    transformImage,
    getLast7Days
}