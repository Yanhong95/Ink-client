import { axiosInstance } from '../utility';

export const S3Object = {
  uploadS3Bucket: 'mypersonalblogstore',
  noteFolder: 'notes',
  userFolder: 'users',
  storageURL: 'https://s3.us-east-2.amazonaws.com/'
}

export const getSignedURL = async ( uploadFolder, fileName, fileType, token) => {
  const validateURL = `uploadS3Bucket=${S3Object.uploadS3Bucket}&uploadPath=${uploadFolder}&filename=${fileName}&type=${fileType}`;
  try {
    const res = await axiosInstance.get(`/s3/getS3SignedUrl?${validateURL}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    });
    console.log(res);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const uploadFileToS3 = async(uploadFolder, file, resObject) => {
  try {
    console.log(uploadFolder);
    console.log(file);
    const signedUrl =  resObject.signedUrl;
    const fileName = resObject.fileName;
    await axiosInstance.put(signedUrl,  file, {
      headers: {
        'Content-Type': file.type 
      }
    });
    // https://s3.us-east-2.amazonaws.com/mypersonalblogstore/notes/algorithm/array/5eefd6d8068aae68d6e35c78-note.md
    const fileURL = `https://s3.us-east-2.amazonaws.com/${S3Object.uploadS3Bucket}/${uploadFolder}/${fileName}`;
    return fileURL;
  } catch (error) {
    throw error;
  }
}