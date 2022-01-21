import { defHttp } from 'app/utils/http';

export function uploadApi(params: { file: any; type?: number }) {
  return defHttp.uploadFile(
    {
      url: '/user/upload',
    },
    params,
  );
}

export const uploadMedia = async (media: any) => {
  let uriMedia = media.path.replace('file://', '').replace('', 'file://');
  const type = media.mime.split('/')[0] === 'video' ? 2 : 1;
  const file = {
    type: media.mime,
    name: media.name || 'file.' + media.mime.split('/')[1],
    uri: uriMedia,
  };
  const responseRaw = await uploadApi({ type, file });
  return responseRaw;
};
