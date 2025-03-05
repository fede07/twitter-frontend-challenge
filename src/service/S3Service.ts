import axios from "axios";

export const S3Service = {
  upload: async (file: File, url: string) => {
    const blob = new Blob([file], { type: file.type });

    await axios.put(url, blob, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  getPublicUrl: (key: string) => {
    const bucketName = process.env.REACT_APP_AWS_S3_BUCKET
    const region = process.env.REACT_APP_REGION

    return `https://${bucketName ?? ''}.s3.${region ?? ''}.amazonaws.com/${key}`
  }
};
