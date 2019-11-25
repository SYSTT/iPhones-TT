import React, { useState, useContext, useCallback } from 'react';
import uuid from 'uuid';
import { useDropzone } from 'react-dropzone';
import { Spin } from 'antd';
import { Colors } from '../../utils';
import { FirebaseContext } from '../../modules/firebase';

interface Props {
  storagePath: string;
  accept: string;
  onUploadComplete: (imageUrls: string[]) => void;
  disabled?: boolean;
}

const Uploader = ({
  storagePath,
  accept,
  onUploadComplete,
  disabled,
}: Props) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploadingCount, setUploadingCount] = useState(0);

  const firebase = useContext(FirebaseContext);
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const uploadedImages = [...imageUrls];
      await Promise.all(
        acceptedFiles.map(
          (file: File) =>
            new Promise(done => {
              const reader = new FileReader();

              reader.onload = async () => {
                setUploadingCount(count => count + 1);
                const binaryStr = reader.result as ArrayBuffer;
                const ref = firebase.storage.ref(storagePath).child(uuid());
                const { ref: resultRef } = await ref.put(binaryStr);
                const downloadUrl = await resultRef.getDownloadURL();
                uploadedImages.push(downloadUrl);
                setUploadingCount(count => count - 1);
                done();
              };

              reader.readAsArrayBuffer(file);
            }),
        ),
      );

      onUploadComplete(uploadedImages);
      setImageUrls(uploadedImages);
    },
    [firebase.storage, storagePath, imageUrls, onUploadComplete],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    disabled,
  });
  return (
    <>
      {imageUrls.length !== 0 && <p>{imageUrls.length} images uploaded</p>}
      <div
        {...getRootProps({
          style: {
            height: 100,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            border: `1px solid ${Colors['Grey/Light']}`,
            borderRadius: 4,
          },
        })}
      >
        <input {...getInputProps()} />
        <div style={{ textAlign: 'center' }}>
          {!uploadingCount ? 'Click or drop to upload.' : <Spin />}
        </div>
      </div>
    </>
  );
};

export default Uploader;
