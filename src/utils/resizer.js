export default {
    getResizedImageUrl (origImageUrl, params) {
        const resizerBaseUrl = process.env.VUE_APP_RESIZER_BASE_URL;

        const origUrl = new URL(origImageUrl);

        let url = '#BASE_URL#/insecure/fill/#WIDTH#/#HEIGHT#/sm/0/plain/s3:/#IMG_PATH#';

        url = url.replace('#BASE_URL#', resizerBaseUrl);
        url = url.replace('#WIDTH#', params['WIDTH']);
        url = url.replace('#HEIGHT#', params['HEIGHT']);
        url = url.replace('#IMG_PATH#', origUrl.pathname);

        return url;
    },
}
